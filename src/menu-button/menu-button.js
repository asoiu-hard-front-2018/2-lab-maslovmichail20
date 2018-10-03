var menuState = 'close';

var menu = document.body.querySelector('.page__menu');
var menuButton = document.body.querySelector('.page__menu-button');
var menuButtonLines = document.body.querySelectorAll('.menu-button__line');

var topLine = document.body.querySelector('.menu-button__top-line');
var centerLine = document.body.querySelector('.menu-button__center-line');
var bottomLine = document.body.querySelector('.menu-button__bottom-line');

var buttonStyle = {
    leftDesktop: {
        close: '348px',
        open: '6.7%'
    },
    leftMobile: {
        close: '730px',
        open: '5.1%'
    }
};

var menuStyle = {
    leftDesktop: {
        close: '0',
        open: '-385px'
    },
    leftMobile: {
        close: '0',
        open: '-820px'
    }
};

var onClickHandler = {
  'close': function(buttonLeft, menuLeft) {
      menu.style.left = menuLeft.close;
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
  'open': function (buttonLeft, menuLeft) {
      menu.style.left = menuLeft.open;
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
    var menuLeft = document.body.offsetWidth >= 990 ? menuStyle.leftDesktop : menuStyle.leftMobile;
    onClickHandler[menuState](buttonLeft, menuLeft);
    menuState = menuState === 'close' ? 'open' : 'close';
}

function update() {
    var state = menuState === 'close' ? 'open' : 'close';

    if (document.body.offsetWidth < 990) {
        menu.style.left = menuStyle.leftMobile[state];
        menuButton.style.left = buttonStyle.leftMobile[state];
    } else {
        menu.style.left = menuStyle.leftDesktop[state];
        menuButton.style.left = buttonStyle.leftDesktop[state];
    }
}

menuButton.onclick = menuButtonOnClick;
window.addEventListener('resize', update);
