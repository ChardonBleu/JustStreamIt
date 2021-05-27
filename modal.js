/*jslint es6*/
/*global document console*/

var span = document.getElementsByClassName("modal__close")[0];
var bestButton = document.getElementsByClassName("best__details__button")[0];
var modal = document.getElementById("myModal");
const imgs = document.getElementsByClassName("carousel__slider__item__img");


/**
 * Hide modal window
 */
function modalClose() {
    'use-strict';
    modal.style.display = 'none';
}

/**
 * Show modal window for carousel's box
 * @param  {Object} event
 */
function ModaleCarousel(event) {
    'use-strict';
    modal.style.display = "flex";
    var modalImg = document.getElementById("modalImg");
    modalImg.src = event.target.src;
}

/**
 * show modal window for best film
 */
function ModaleBest() {
    'use-strict';
    modal.style.display = "flex";
    var modalImg = document.getElementById("modalImg");
    bestImg = document.getElementsByClassName("best__details__img")[0];
    modalImg.src = bestImg.src;
}

/**
* Waiting for modal window closure
*/
span.addEventListener('click', modalClose);

/**
* Waiting for modal window for the best film
*/
bestButton.addEventListener('click', ModaleBest);

/**
* Waiting for modal window for each carousel's films
*/
for (const img of imgs) {
    img.addEventListener('click', ModaleCarousel)
 }
