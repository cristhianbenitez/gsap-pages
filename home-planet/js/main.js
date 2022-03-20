const storyTimeline = gsap.timeline();

const scene = 'section#scene';
const header = 'header';
const house = 'section#house';

gsap.set(house, { opacity: 0 });
gsap.set(scene, { opacity: 0 });
gsap.set(`${scene} img `, {
  x: (i) => `${i * 100 + 300}vh`
});

storyTimeline
  .to(header, { opacity: 0, delay: 3 })
  .addLabel('startScene')
  .to(scene, { opacity: 1 }, 'startScene')
  .to(`${scene} img `, { x: '0vh', duration: 15, ease: 'linear' }, 'startScene')
  .addLabel('endScene')
  .to(scene, { opacity: 0 }, 'endScene')
  .to(house, { opacity: 1 }, 'endScene');

storyTimeline.pause();

let update;

window.addEventListener('scroll', () => {
  const pixels = window.pageYOffset;
  const currentTime = pixels / 300;

  cancelAnimationFrame(update);

  update = requestAnimationFrame(() => {
    storyTimeline.seek(currentTime);
  });
});

const eyesTimeline = gsap.timeline({
  repeat: -1
});

const eyeballs = document.querySelectorAll(
  '#ball, #ball_2, #ball_3, #ball_4, #ball_5, #ball_6'
);

eyesTimeline
  .set(eyeballs, { y: 0 })
  .to(eyeballs, { y: 7, duration: 0.25, delay: 2 })
  .to(eyeballs, { y: 0, duration: 0.25, delay: 4 });

const hatTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 4
});

const hat = document.querySelector('#hat');

hatTimeline
  .set(hat, { y: 0 })
  .to(hat, { y: -50, rotation: -10, duration: 0.25, delay: 1 })
  .to(hat, { y: 0, rotation: 0, duration: 0.25, delay: 0.1 });

const rightArmTimeline = gsap.timeline({
  repeat: -1
});

const rightArm = document.querySelector('#right-arm');

rightArmTimeline
  .set(rightArm, { rotation: 0 })
  .to(rightArm, { rotation: -20, delay: 2, duration: 0.25 })
  .to(rightArm, { rotation: 0, delay: 2, duration: 0.25 });

const leftArmTimeline = gsap.timeline({
  repeat: -1
});

const leftArm = document.querySelector('#left-arm');

leftArmTimeline
  .set(leftArm, { rotation: 0 })
  .to(leftArm, { rotation: 20, delay: 3, duration: 0.25 })
  .to(leftArm, { rotation: 0, delay: 2, duration: 0.25 });

const tvTimeline = gsap.timeline({ repeat: -1 });

const tvLight = document.querySelector('#tv-light');

let o = 0.75;

tvTimeline
  .set(tvLight, { opacity: o })
  .to(tvLight, { opacity: 1, delay: 0.5, duration: 1 })
  .to(tvLight, { opacity: o })
  .to(tvLight, { opacity: 1, duration: 0.4, delay: 0.5 })
  .to(tvLight, { opacity: o });

const tooltipLabel = document.querySelector('.tooltip-label');
const links = document.querySelectorAll('svg a');

links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    tooltipLabel.classList.add('is-visible');
    tooltipLabel.textContent = link.getAttribute('data-label');

    gsap.to(links, { opacity: 0.25 });
    gsap.to(link, { opacity: 1 });
  });

  link.addEventListener('mouseleave', () => {
    tooltipLabel.classList.remove('is-visible');
    tooltipLabel.textContent = 'Tooltip Label';

    gsap.to(links, { opacity: 1 });
  });
});

document.addEventListener('mousemove', (event) => {
  tooltipLabel.style.left = `${event.clientX}px`;
  tooltipLabel.style.top = `${event.clientY}px`;
});
