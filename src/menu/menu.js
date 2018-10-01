var links = document.body.querySelectorAll('.menu__list__item__link');

function onClickLink() {
  menuButton.onclick();
}

for (var i = 0 ; i < links.length ; i++) {
  links[i].addEventListener('click', onClickLink);
}