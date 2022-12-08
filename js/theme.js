export const themeChange = () => {
  const elemBody = document.body;
  const headerBtntheme = document.querySelector('.header__btntheme');

  elemBody.attributes.theme.value = localStorage.getItem('theme') || 'dark';

  headerBtntheme.addEventListener('click', (e) => {
    e.preventDefault();
    if (elemBody.attributes.theme.value === 'dark') {
      elemBody.attributes.theme.value = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      elemBody.attributes.theme.value = 'dark';
      localStorage.setItem('theme', 'dark');
    }
  });
};
