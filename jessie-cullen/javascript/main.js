const headerTag = document.querySelector('header');
const blobs = document.querySelectorAll('g.blob');
const sectionTags = document.querySelectorAll('section');
const arrow = document.querySelector('img.arrow');

const easingInCubic = (x) => x * x * x;

const fadeHeader = () => {
  const pixels = window.pageYOffset;

  headerTag.style.opacity = 1 - easingInCubic(pixels / 500);
};

const fadeArrow = () => {
  const pixels = window.pageYOffset;

  arrow.style.opacity = 1 - easingInCubic(pixels / 250);
};

const checkBlobs = () => {
  const pixels = window.pageYOffset;

  blobs.forEach((blob, i) => {
    const currentSection = sectionTags[i];

    if (pixels > currentSection.offsetTop - 300) {
      blob.classList.add('in-view');
    } else {
      blob.classList.remove('in-view');
    }
  });
};

window.addEventListener('scroll', () => {
  fadeHeader();
  fadeArrow();
  checkBlobs();
});
