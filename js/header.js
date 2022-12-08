export const header = () => {
  const header = document.querySelector('.header');

  if (window.pageYOffset >= 1) {
    header.style.backgroundColor = 'var(--dark3)';
  }

  const changeBackGround = () => {
    if (window.pageYOffset >= 1) {
      header.style.backgroundColor = 'var(--dark3)';
    }
    else {
      header.style.backgroundColor = '';
    }
  }
  document.addEventListener('scroll', changeBackGround);
};
