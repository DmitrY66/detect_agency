import { themeChange } from "./theme.js";
import { header } from "./header.js";
import { navigation } from "./navigation.js";
import { modalController } from "./modalController.js";

themeChange();

header();

navigation();

modalController({
  modal: '.modal',
  btnOpen: '.open-modal-js',
  btnClose: 'svg',
});
