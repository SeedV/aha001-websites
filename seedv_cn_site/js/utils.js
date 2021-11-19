function linkButtonToSection(buttonId, sectionName) {
  document.getElementById(buttonId).addEventListener('click', () => {
    const sectionElem = document.getElementById(sectionName);
    sectionElem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    window.history.pushState(sectionName, "", "#" + sectionName);
  });
}
