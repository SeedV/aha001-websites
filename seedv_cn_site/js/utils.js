const utils = {};

utils.linkButtonToSection = function(buttonId, sectionName) {
  document.getElementById(buttonId).addEventListener('click', () => {
    const sectionElem = document.getElementById(sectionName);
    utils.scrollIntoElement(sectionElem);
    window.history.pushState(sectionName, "", "#" + sectionName);
  });
};

utils.scrollIntoElement = function(targetElem) {
  const topPos = targetElem.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({top: topPos, left: 0, behavior: 'smooth'});
};
