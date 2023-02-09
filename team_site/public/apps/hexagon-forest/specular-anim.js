const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const ISOMETRIC_FRUSTUM = 130;
const DIMENSION = 13;
const GLOBAL_SCALE = 7;
const MAX_HEIGHT = 20;
const MIN_HEIGHT = 1;
const SCALE_DELTA = .01;
const GLOBAL_ROTATE = -15;

let hexagon;
let elements;
let hue;

function setup() {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
  canvas.parent('processing_container');
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 1);
  const camera = createCamera();
  ortho(-ISOMETRIC_FRUSTUM, ISOMETRIC_FRUSTUM,
    ISOMETRIC_FRUSTUM, -ISOMETRIC_FRUSTUM, 0.1, 1000);
  camera.setPosition(100, 200, 100);
  camera.lookAt(0, -25, 0);
  hexagon = createHexagon();

  generateElements();

  hue = 0;
  noStroke();
}

function mousePressed() {
  generateElements();
}

function generateElements() {
  elements = [];
  for (let j = 0; j < DIMENSION; j++) {
    elements.push([]);
  }
  for (let j = 0; j < DIMENSION; j++) {
    for (let i = 0; i < DIMENSION; i++) {
      const delta = j % 2 == 0 ? -.5 : .5;
      elements[j].push({
        x: ((i - 5) * 2 + delta) * cos(30),
        y: -10,
        z: (j - 5) * 1.5 - sin(30),
        scaleX: 1,
        scaleY: random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT,
        scaleZ: 1,
        delta: SCALE_DELTA,
      });
    }
  }
}

function updateElements() {
  for (let j = 0; j < DIMENSION; j++) {
    for (let i = 0; i < DIMENSION; i++) {
      const element = elements[j][i];
      element.scaleY += element.delta;
      if (element.scaleY > MAX_HEIGHT) {
        element.delta = -SCALE_DELTA;
      } else if (element.scaleY < MIN_HEIGHT) {
        element.delta = SCALE_DELTA;
      }
    }
  }
}

function createHexagon() {
  return new p5.Geometry(null, null, createHexagonGeometry);
}

function createHexagonGeometry() {
  for (let y = 0; y < 2; y++) {
    this.vertices.push(new p5.Vector(0, y, 0));
    for (let angle = 30; angle < 360; angle += 60) {
      const x = cos(angle);
      const z = sin(angle);
      this.vertices.push(new p5.Vector(x, y, z));
    }
  }
  let count = this.vertices.length;
  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;

    const bottomA = 0;
    const bottomB = i + 1;
    const bottomC = j + 1;
    this.faces.push([bottomA, bottomB, bottomC]);

    const topA = 7;
    const topB = i + 7 + 1;
    const topC = j + 7 + 1;
    this.faces.push([topA, topC, topB]);

    this.vertices.push(this.vertices[topB].copy());
    this.vertices.push(this.vertices[topC].copy());
    this.vertices.push(this.vertices[bottomB].copy());
    this.vertices.push(this.vertices[bottomC].copy());

    this.faces.push([count, count+3, count+2]);
    this.faces.push([count, count+1, count+3]);
    count += 4;
  }
  this.gid = 'hexagon';
  this.computeNormals();
}

function draw() {
  background(0, 0, 0);

  lightFalloff(.7, 0, 0)
  pointLight(0, 0, 100,
      -100,
      50,
      -100 + Math.sin(frameCount / 100) * 300);

  push();
  scale(GLOBAL_SCALE);
  rotateY(GLOBAL_ROTATE);
  for (let j = 0; j < DIMENSION; j += 1) {
    for (let i = j % 2 == 0 ? 0 : 1; i < DIMENSION; i += 2) {
      const element = elements[j][i];
      push();
      specularMaterial(hue%360, 70, 100);
      translate(element.x, element.y, element.z);
      scale(element.scaleX, element.scaleY, element.scaleZ);
      model(hexagon);
      pop();
    }
  }
  pop();

  hue++;
  updateElements();
}
