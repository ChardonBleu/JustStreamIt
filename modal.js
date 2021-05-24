/*jslint es6*/
/*global document console*/

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
console.log(span);

function fonctionModale(carousel_img) {
    'use-strict';
    modal.style.display = "block";
    var modalImg = document.getElementById("modalImg");
    modalImg.src = carousel_img.src;
}

function modalClose() {
    'use-strict';
    modal.style.display = 'none';
}
