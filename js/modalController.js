export const modalController = ({ modal, btnOpen, btnClose }) => {
  const openModalBtns = document.querySelectorAll(btnOpen);
  const modalModul = document.querySelector(modal);
  const modalTitle = modalModul.children[0].children[0];
  const form = modalModul.children[0].children[1];

  const nameJs = document.querySelector('.name-js');
  const messageJs = document.querySelector('.message-js');
  const mailJs = document.querySelector('.mail-js');
  const captchaJs = document.querySelector('.captcha-js');
  const captcha = 'secrat';

  let validlName = false;
  let validMessage = false;
  let validEmail = false;
  let validCaptcha = false;

  const regName = /^[а-яА-Яa-zA-Z\s]{1,24}$/;
  const regMessage = /^[а-яА-Яa-zA-Z0-9\s\,\.\:\?\!\-]{1,99}$/;
  const regMail = /^\w+@\w+\.\w{2,}$/;

  const validField = (target, regExpression, validElem) => {
    if (regExpression.test(target.value)) {
      target.style.borderColor = 'var(--blue-light)';
      return validElem = true;
    } else {
      target.style.borderColor = 'red';
      return validElem = false;
    }
  };

  const validFieldCaptcha = () => {
    if (captchaJs.value.toLowerCase() === captcha) {
      form[3].style.borderColor = 'var(--blue-light)';
      return validCaptcha = true;
    } else {
      form[3].style.borderColor = 'red';
      return validCaptcha = false;
    }
  };

  nameJs.addEventListener('input', () => {
    validlName = validField(nameJs, regName, validlName);
  });

  messageJs.addEventListener('input', () => {
    validMessage = validField(messageJs, regMessage, validMessage);
  });

  mailJs.addEventListener('input', () => {
    validEmail = validField(mailJs, regMail, validEmail);
  });

  captchaJs.addEventListener('input', validFieldCaptcha);

  const scrollControl = {
    scrollPosition: 0,
    disabledScroll() {
      scrollControl.scrollPosition = window.scrollY;
      document.body.style.cssText = `
      overflow: 'hidden';
      position: fixed;
      top: -${scrollControl.scrollPosition}px;
      left: 0;
      width: 100vw;
      height: 100vh;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px;
      `;
      document.documentElement.style.scrollBehavior = 'unset';
    },
    enabledScroll() {
      document.body.style.cssText = `
      overflow: '';
      position: '';
      top: '';
      left: '';
      width: '';
      height: '';
      `;
      window.scroll({ top: scrollControl.scrollPosition });
      document.documentElement.style.scrollBehavior = '';
    },
  };

  const conditionKeydown = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const openModal = () => {
    modalModul.style.cssText = `
    visibility: visible;
    opacity: 1;
    `;
    modalTitle.innerHTML = 'Оставить заявку';
    window.addEventListener('keydown', conditionKeydown);
    scrollControl.disabledScroll();
    form.reset();
    form[0].style.borderColor = 'transparent';
    form[1].style.borderColor = 'transparent';
    form[2].style.borderColor = 'transparent';
    form[3].style.borderColor = 'transparent';
    form[4].disabled = false;
  };

  const closeModal = () => {
    modalModul.style.opacity = 0;
    setTimeout(() => {
      modalModul.style.visibility = 'hidden';
    }, 200);
    window.removeEventListener('keydown', conditionKeydown);
    scrollControl.enabledScroll();
  };

  const transportToPhp = async () => {
    return await fetch('send_mail.php', {
      method: 'POST',
      body: new FormData(form),
    });
  };

  const sendForm = async () => {
    const response = await transportToPhp();

    if (response.ok) {
      let result = await response.json();
      modalTitle.innerHTML = result.notification;
    } else {
      modalTitle.innerHTML = `Что-то пошло не так, ошбка: ${response.status}`;
    }
  };

  openModalBtns.forEach(item => item.addEventListener('click', openModal));

  modalModul.addEventListener('click', async (e) => {
    const target = e.target;

    if (
      target === modalModul ||
      target.closest(btnClose)
    ) {
      closeModal();
    }

    if (target.closest('.modal__send_form')) {
      e.preventDefault();

      if (validlName && validMessage && validEmail && validCaptcha) {
        modalTitle.innerHTML = 'Началась отправка сообщения'
        form[4].disabled = true;

        await sendForm();
        validlName = false;
        validMessage = false;
        validEmail = false;
        validCaptcha = false;
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        modalTitle.innerHTML = 'Неверно заполнены поля!'
        validField(nameJs, regName, validlName);
        validField(messageJs, regMessage, validMessage);
        validField(mailJs, regMail, validEmail);
        validFieldCaptcha();
      }
    }
  });
};
