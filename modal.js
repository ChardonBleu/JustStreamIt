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
function modaleCarousel(event) {
    'use-strict';
    modal.style.display = "flex";
    const modalImg = document.getElementById("modalImg");
    modalImg.src = event.target.src;
    const idFilm = event.target.alt;
    modalDetails(idFilm);
}

/**
 * show modal window for best film
 */
function modaleBest() {
    'use-strict';
    modal.style.display = "flex";
    const modalImg = document.getElementById("modalImg");
    bestImg = document.getElementsByClassName("best__details__img")[0];
    modalImg.src = bestImg.src;
    const idFilm = bestImg.alt;
    modalDetails(idFilm);
}

function modalDetails(id) {
    fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(function (response) {
            if (response.ok){
                return response.json();
            }
        })
        .then(function (values) {            
            const modalText = document.getElementsByClassName("modal__content modal__content__text")[0];
            modalText.innerHTML = "<br>";
            const modalTitle = "<h1>" + values.title + "</h1>";
            let stringGenres = "";
            for (const genre of values.genres){
                stringGenres += genre + ", ";
            }
            const modalGenres = "<p>Genres: " + stringGenres.slice(0, stringGenres.length - 2) + "</p>";
            newParagraph(modalText, modalTitle);
            newParagraph(modalText, modalGenres);

        })
        .catch(function(error){
            console.log(error);
        });
}

/**
* Waiting for modal window closure
*/
span.addEventListener('click', modalClose);

/**
* Waiting for modal window for the best film
*/
bestButton.addEventListener('click', modaleBest);

/**
* Waiting for modal window for each carousel's films
*/
for (const img of imgs) {
    img.addEventListener('click', modaleCarousel)
 }
