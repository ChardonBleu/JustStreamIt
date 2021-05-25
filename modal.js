/*jslint es6*/
/*global document console*/

var span = document.getElementsByClassName("modal__close")[0];
var bestButton = document.getElementsByClassName("best__details__button")[0];
var modal = document.getElementById("myModal");
const imgs = document.getElementsByClassName("carousel__slider__item__img");

function modalClose() {
    'use-strict';
    modal.style.display = 'none';
}

function ModaleCarousel(event) {
    'use-strict';
    modal.style.display = "flex";
    var modalImg = document.getElementById("modalImg");
    modalImg.src = event.target.src;
}

function ModaleBest() {
    'use-strict';
    modal.style.display = "flex";
    var modalImg = document.getElementById("modalImg");
    bestImg = document.getElementsByClassName("best__img")[0];
    modalImg.src = bestImg.src;
}

span.addEventListener('click', modalClose);

for (const img of imgs) {
    img.addEventListener('click', ModaleCarousel)
 }

bestButton.addEventListener('click', ModaleBest);