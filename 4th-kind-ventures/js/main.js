const mqDark = window.matchMedia('(prefers-color-scheme: dark)');

const darkModeToggle = document.querySelector('a.dark-mode-toggle');
const darkModeToggleText = darkModeToggle.querySelector('span');

const menuToggle = document.querySelector('a.menu-toggle');
const menuToggleText = menuToggle.querySelector('span');

const bodyTag = document.querySelector('body');

menuToggle.addEventListener('click', () => {
  bodyTag.classList.toggle('nav-open');

  if (bodyTag.classList.contains('nav-open')) {
    menuToggleText.innerHTML = 'Close';

    gsap.to('.burger-top', { rotation: 45, transformOrigin: '50% 50%', y: 8 });
    gsap.to('.burger-bottom', {
      rotation: -45,
      transformOrigin: '50% 50%',
      y: -8
    });
    gsap.to('.burger-mid', { width: 0 });
  } else {
    menuToggleText.innerHTML = 'Menu';

    gsap.to('.burger-top', { rotation: 0, y: 0 });
    gsap.to('.burger-bottom', { rotation: 0, y: 0 });
    gsap.to('.burger-mid', { width: 28 });
  }
});

darkModeToggle.addEventListener('click', () => {
  if (bodyTag.classList.contains('dark-mode')) {
    darkModeToggleText.innerHTML = 'Light mode';
    gsap.to('.toggle', { x: 43 });
  } else {
    darkModeToggleText.innerHTML = 'Dark mode';
    gsap.to('.toggle', { x: 19 });
  }

  const timeline = gsap.timeline();
  const wipe = 'div.wipe-effect';

  timeline
    .set(wipe, { height: '0%', top: '0%' })
    .to(wipe, { height: '100%', duration: 1 })
    .add(() => {
      bodyTag.classList.toggle('dark-mode');
    })
    .to(wipe, { height: '0%', top: '100%', duration: 1 });
});

const updateDarkMode = () => {
  if (mqDark.matches) {
    bodyTag.classList.add('dark-mode');
    darkModeToggleText.innerHTML = 'Light mode';
    gsap.to('.toggle', { x: 43 });
  } else {
    bodyTag.classList.remove('dark-mode');
    darkModeToggleText.innerHTML = 'Dark mode';
    gsap.to('.toggle', { x: 19 });
  }
};

updateDarkMode();

mqDark.addListener(() => {
  updateDarkMode();
});

const spiralTimeline = gsap.timeline({
  repeat: -1
});
const spiralRect = 'svg.spiral rect';

spiralTimeline
  .set(spiralRect, { rotation: 0, transformOrigin: '50% 50%' })
  .set('svg.spiral rect:nth-child(1)', {
    rotation: 15
  })
  .set('svg.spiral rect:nth-child(3)', {
    rotation: -15
  })
  .to(spiralRect, {
    rotation: '+=90',
    transformOrigin: '50% 50%',
    duration: 4,
    stagger: -0.25
  });
