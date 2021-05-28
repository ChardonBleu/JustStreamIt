/*jslint es6*/
/*global document console*/

const span = document.getElementsByClassName("modal__close")[0];
const bestButton = document.getElementsByClassName("best__details__button")[0];
const modal = document.getElementById("myModal");
const imgs = document.getElementsByClassName("carousel__slider__item__img");

const modalText = document.getElementsByClassName("modal__content modal__content__text")[0];
modalText.innerHTML = "<img class='modal__content__text__img' id='modalImg'></div>";

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
function modalCarousel(event) {
    'use-strict';
    const modalText = document.getElementsByClassName("modal__content modal__content__text")[0];
    modalText.innerHTML = "<img class='modal__content__text__img' id='modalImg'></div>";
    modal.style.display = "flex";
    const modalImg = document.getElementById("modalImg");
    modalImg.src = event.target.src;
    const idFilm = event.target.alt;
    modalDetails(idFilm);
}

/**
 * show modal window for best film
 */
function modalBest() {
    'use-strict';
    const modalText = document.getElementsByClassName("modal__content modal__content__text")[0];
    modalText.innerHTML = "<img class='modal__content__text__img' id='modalImg'></div>";
    modal.style.display = "flex";
    const modalImg = document.getElementById("modalImg");
    bestImg = document.getElementsByClassName("best__details__img")[0];
    modalImg.src = bestImg.src;
    const idFilm = bestImg.alt;
    modalDetails(idFilm);
}

function convertArrayString(array) {
    'use-strict';
    let string = "";
    for (const element of array){
        string += element + ", ";
    }
    return string;
}

function modalDetails(id) {
    'use-strict';
    fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(function (response) {
            if (response.ok){
                return response.json();
            }
        })
        .then(function (values) {
            const modalText = document.getElementsByClassName("modal__content modal__content__text")[0];

            const modalTitle = "<h1>" + values.title + "</h1>";

            const modalDate = "<p>Release date: " + values.date_published + "</p>";
            const modalRated = "<p>Rated: " + values.rated + "</p>";
            const modalImdb = "<p>IMDb score: " + values.imdb_score + "</p>";
            const modalDuration = "<p>Duration: " + values.duration + " min</p>";
            const modalBoxOffice = "<p>Résultats box office mondial: " + values.worldwide_gross_income + " entries</p>";
            const modalDescription = "<p>Résumé: " + values.long_description + "</p>";

            let stringGenres = "";
            stringGenres = convertArrayString(values.genres);
            const modalGenres = "<p>Genres: " + stringGenres.slice(0, stringGenres.length - 2) + "</p>";

            let stringDirectors = "";
            stringDirectors = convertArrayString(values.directors);
            const modalDirectors = "<p>Director: " + stringDirectors.slice(0, stringDirectors.length - 2) + "</p>";

            let stringActors = "";
            stringActors = convertArrayString(values.actors);
            const modalActors = "<p>Actors: " + stringActors.slice(0, stringActors.length - 2) + "</p>";

            let stringCountries = "";
            stringCountries = convertArrayString(values.countries);
            const modalCountries = "<p>Countries: " + stringCountries.slice(0, stringCountries.length - 2) + "</p>";

            newParagraph(modalText, modalTitle);
            newParagraph(modalText, modalDuration);
            newParagraph(modalText, modalDate);
            newParagraph(modalText, modalCountries);
            newParagraph(modalText, modalRated);
            newParagraph(modalText, modalImdb);
            newParagraph(modalText, modalDirectors);
            newParagraph(modalText, modalActors);
            newParagraph(modalText, modalBoxOffice);
            newParagraph(modalText, modalDescription);

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
bestButton.addEventListener('click', modalBest);

/**
* Waiting for modal window for each carousel's films
*/
for (const img of imgs) {
    img.addEventListener('click', modalCarousel);
 }
