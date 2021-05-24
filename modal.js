/*jslint es6*/
/*global document console*/

var span = document.getElementsByClassName("modal__close")[0];
var modal = document.getElementById("myModal");

function fonctionModale(carousel_img) {
    'use-strict';
    modal.style.display = "flex";
    var modalImg = document.getElementById("modalImg");
    modalImg.src = carousel_img.src;
}

function modalClose() {
    'use-strict';
    modal.style.display = 'none';
}

span.addEventListener('click', modalClose);