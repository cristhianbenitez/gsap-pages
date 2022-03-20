const mqDark = window.matchMedia('(prefers-color-scheme: dark)');

const darkModeToggle = document.querySelector('a.dark-mode-toggle');
const darkModeToggleText = darkModeToggle.querySelector('span');

const bodyTag = document.querySelector('body');

darkModeToggle.addEventListener('click', () => {
  bodyTag.classList.toggle('dark-mode');

  if (bodyTag.classList.contains('dark-mode')) {
    darkModeToggleText.innerHTML = 'Light mode';
  } else {
    darkModeToggleText.innerHTML = 'Dark mode';
  }
});

const updateDarkMode = () => {
  if (mqDark.matches) {
    bodyTag.classList.add('dark-mode');
  } else {
    bodyTag.classList.remove('dark-mode');
  }
};

updateDarkMode();

mqDark.addListener(() => {
  updateDarkMode();
});
console.log('aaa');
