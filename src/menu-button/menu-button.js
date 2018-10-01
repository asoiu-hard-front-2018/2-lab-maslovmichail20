var menuState = 'close';

var menu = document.body.querySelector('.page__menu');
var menuButton = document.body.querySelector('.page__menu-button');
var menuButtonLines = document.body.querySelectorAll('.menu-button__line');

var topLine = document.body.querySelector('.menu-button__top-line');
var centerLine = document.body.querySelector('.menu-button__center-line');
var bottomLine = document.body.querySelector('.menu-button__bottom-line');

var onClickHandler = {
  'close': function() {
      menu.style.height = document.body.offsetHeight + 'px ';

      menu.style.left = '0';
      menuButton.style.left = '348px';
      for (var i = 0 ; i < 3 ; i++) {
          menuButtonLines[i].classList.remove('menu-button__line_menu_close');
          menuButtonLines[i].classList.add('menu-button__line_menu_open');
      }

      topLine.style.top = 'initial';
      topLine.style.transform = 'rotate(225deg)';

      centerLine.style.opacity = '0';

      bottomLine.style.bottom = 'initial';
      bottomLine.style.transform = 'rotate(-225deg)';
  },
  'open': function () {
      menu.style.left = '-385px';
      menuButton.style.left = '6.7%';
      for (var i = 0 ; i < 3 ; i++) {
          menuButtonLines[i].classList.remove('menu-button__line_menu_open');
          menuButtonLines[i].classList.add('menu-button__line_menu_close');
      }

      topLine.style.top = '0';
      topLine.style.transform = 'rotate(180deg)';

      centerLine.style.opacity = '1';

      bottomLine.style.bottom = '0';
      bottomLine.style.transform = 'rotate(-180deg)';
  }
};

function menuButtonOnClick() {
    onClickHandler[menuState]();
    menuState = menuState === 'close' ? 'open' : 'close';
}

menuButton.onclick = menuButtonOnClick;
