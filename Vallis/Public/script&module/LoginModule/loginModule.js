import { submitbutton } from '../LoginModule/login.js';
import { initializeScrollButton } from '../LoginModule/scroll.js';
import '../LoginModule/interceptors.js';

document.addEventListener('DOMContentLoaded', function() {
  initializeScrollButton();
  document.querySelector('.button__submit').addEventListener('click', submitbutton);
});

