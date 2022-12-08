// здесь важно чтобы html разметке имя кнопки меню совпадало с id секции которую она открывает!!!

export const navigation = () => {
  const sections = document.getElementsByTagName('section');
  const menuList = document.querySelector('.menu__list');
  const footerMenu = document.querySelector('.footer__menu');
  const mapsiteList = document.querySelector('.mapsite__list');
  const cardsList = document.querySelector('.cards__list');
  const headerMenuBtn = document.querySelector('.header__menu_btn');
  const menuItems = menuList.children;
  const submenu = menuItems[1].children[2];

  // функция закрытия submenu и удаления события "click" с документа
  const closeSubmenu = () => {
    submenu.classList.remove('menu__item-submenu-show');
    document.removeEventListener('click', closeSubmenu);
  };

  // функция смены секций
  const changeSection = (targetId) => {
    Array.from(sections).forEach(item => {
      if (item.id === targetId) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    })

    Array.from(menuList.children).forEach(elem => {
      if (elem.children[0].name === targetId) {
        elem.style.borderBottomColor = 'var(--blue-light)';
      } else if (targetId === 'individual' || targetId === 'organization') {
        menuItems[0].style.borderBottomColor = 'transparent';
        menuItems[1].style.borderBottomColor = 'var(--blue-light)';
        menuItems[2].style.borderBottomColor = 'transparent';
        menuItems[3].style.borderBottomColor = 'transparent';
      }
      else {
        elem.style.borderBottomColor = 'transparent';
      }
    })
    window.scrollTo(0, 0);
    closeSubmenu();
    
    // убираем мобильное меню и крестик дераем бургером
    menuList.classList.remove('menu__list_show');
    headerMenuBtn.children[0].classList.remove('btn_top_transform');
    headerMenuBtn.children[1].classList.remove('btn_middle_transform');
    headerMenuBtn.children[2].classList.remove('btn_down_transform');
  };

  // главное меню
  const handlerNavigation = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.name) {
      changeSection(target.name);
    }
  };

  // навешиваем слушатель событий на главное меню
  menuList.addEventListener('click', (e) => {
    handlerNavigation(e);
  });

  // кнопка "услуги"
  menuItems[1].addEventListener('click', () => {
    if (getComputedStyle(submenu).opacity === '0') {
      submenu.classList.add('menu__item-submenu-show');

      setTimeout(() => {
        document.addEventListener('click', closeSubmenu);
      }, 100);
    } else {
      closeSubmenu();
    }
  });

  // меню footer
  footerMenu.addEventListener('click', (e) => {
    handlerNavigation(e);
  });

  // карта сайта
  mapsiteList.addEventListener('click', (e) => {
    handlerNavigation(e);
  });

  // карточки на главном экране
  cardsList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.card__item')) {
      changeSection(target.closest('.card__item').dataset.name);
    }
  });

  // функция показывает и скрывает меню на мобильных экранах
  headerMenuBtn.addEventListener('click', () => {
    menuList.classList.toggle('menu__list_show');
    headerMenuBtn.children[0].classList.toggle('btn_top_transform');
    headerMenuBtn.children[1].classList.toggle('btn_middle_transform');
    headerMenuBtn.children[2].classList.toggle('btn_down_transform');
  });
};
