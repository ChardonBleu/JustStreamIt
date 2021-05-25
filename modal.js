/*jslint es6*/
/*global document console*/

var span = document.getElementsByClassName("modal__close")[0];
var modal = document.getElementById("myModal");
const imgs = document.getElementsByClassName("carousel__slider__item__img");

function fonctionModale(event) {
    'use-strict';
    modal.style.display = "flex";
    var modalImg = document.getElementById("modalImg");
    modalImg.src = event.target.src;
}

function modalClose() {
    'use-strict';
    modal.style.display = 'none';
}

span.addEventListener('click', modalClose);

for (const img of imgs) {
    img.addEventListener('click', fonctionModale)
 }