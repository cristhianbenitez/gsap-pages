const mainTag = document.querySelector('main');
const bodyTag = document.querySelector('body');
const figCaptions = document.querySelectorAll('figcaption');

const mq = window.matchMedia(
  '(prefers-reduced-motion:no-preference) and (min-width:600px)'
);

const scripts = () => {
  if (mq.matches) {
    mainTag.style.position = 'fixed';
    mainTag.style.width = '100%';
    mainTag.style.top = '0';
    mainTag.style.left = '0';

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.25) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: [0, 0.25, 1]
      }
    );

    figCaptions.forEach((caption) => {
      observer.observe(caption);
    });

    let currentScroll = 0;
    let aimScroll = 0;

    const changeScroll = () => {
      bodyTag.style.height = `${mainTag.offsetHeight}px`;

      currentScroll = currentScroll + (aimScroll - currentScroll) * 0.05;

      mainTag.style.top = `${-1 * currentScroll}px`;

      figCaptions.forEach((caption) => {
        const box = caption.getBoundingClientRect();
        const midY = box.y + box.height / 2;
        const midScreen = window.innerHeight / 2;
        const diff = midY - midScreen;

        const images = caption.querySelectorAll('img');

        images.forEach((image, index) => {
          const speed = 0.1 + index;
          image.style.top = `${diff * speed}px`;
        });
      });

      requestAnimationFrame(changeScroll);
    };

    window.addEventListener('scroll', () => {
      aimScroll = window.pageYOffset;
    });

    changeScroll();
  }
};

scripts();
mq.addListener(() => {
  scripts();
});
