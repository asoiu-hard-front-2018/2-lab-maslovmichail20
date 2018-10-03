var menuState = 'close';

var menu = document.body.querySelector('.page__menu');
var menuButton = document.body.querySelector('.page__menu-button');
var menuButtonLines = document.body.querySelectorAll('.menu-button__line');

var topLine = document.body.querySelector('.menu-button__top-line');
var centerLine = document.body.querySelector('.menu-button__center-line');
var bottomLine = document.body.querySelector('.menu-button__bottom-line');

var buttonStyle  = {
    leftDesktop: {
        close: '348px',
        open: '6.7%'
    },
    leftMobile: {
        close: '200px',
        open: '5.1%'
    }
};

var onClickHandler = {
  'close': function(buttonLeft) {
      menu.style.left = '0';
      menuButton.style.left = buttonLeft.close;
      menuButton.style.position = 'fixed';

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
  'open': function (buttonLeft) {
      menu.style.left = '-385px';
      menuButton.style.left = buttonLeft.open;
      menuButton.style.position = 'absolute';

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
    var buttonLeft = document.body.offsetWidth >= 990 ? buttonStyle.leftDesktop : buttonStyle.leftMobile;
    onClickHandler[menuState](buttonLeft);
    menuState = menuState === 'close' ? 'open' : 'close';
}

menuButton.onclick = menuButtonOnClick;
