var searchLayerIsActive = false;

var searchButton = document.body.querySelector('.search-button');
var pageWrapper = document.body.querySelector('.page__wrapper');
var searchLayer = document.body.querySelector('.search-layer');

function searchButtonOnClick() {
    console.log('click');
    searchLayer.style.top = searchLayerIsActive ? '-20%' : '32.2%';
    searchLayer.style.opacity = searchLayerIsActive ? '0' : '1';
    pageWrapper.style.opacity = searchLayerIsActive ? '1' : '0.2';

    searchLayerIsActive = !searchLayerIsActive;
}

searchButton.addEventListener('click', searchButtonOnClick);