/*jslint es6*/
/*global document console*/

/* This file has in charge the API request for modal window*/

const span = document.getElementsByClassName("modal__close")[0];
const bestButton = document.getElementsByClassName("best__details__button")[0];
const modal = document.getElementById("myModal");
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
function modalCarousel(event) {
    'use-strict';
    const modalText = document.getElementsByClassName("modal__content")[0];
    modalText.innerHTML = '<div class="modal__content__court">' +
        '<div class="modal__content__court__text">' +
        '</div><div class="modal__content__court__img">' +
        '<img id="modalImg"/></div></div>' +
        '<div class="modal__content__long"></div>';
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
    const modalText = document.getElementsByClassName("modal__content")[0];
    modalText.innerHTML = '<div class="modal__content__court">' +
        '<div class="modal__content__court__text">' +
        '</div><div class="modal__content__court__img">' +
        '<img id="modalImg"/></div></div>' +
        '<div class="modal__content__long"></div>';
    modal.style.display = "flex";
    const modalImg = document.getElementById("modalImg");
    bestImg = document.getElementsByClassName("best__details__img")[0];
    modalImg.src = bestImg.src;
    const idFilm = bestImg.alt;
    modalDetails(idFilm);
}

/**
 * Convert API array into string
 * @param  {object} array from API
 */
function convertArrayString(array) {
    'use-strict';
    let string = "";
    for (const element of array){
        string += element + ", ";
    }
    return string;
}

/**
 * Add details film designed by id film into modal
 * @param  {number} id API id film
 */
function modalDetails(id) {
    'use-strict';
    fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(function (response) {
            if (response.ok){
                return response.json();
            }
        })
        .then(function (values) {
            const modalTextCourt = document
                .getElementsByClassName("modal__content__court__text")[0];
            const modalTextLong = document
                .getElementsByClassName("modal__content__long")[0];

            const modalTitle = "<h1 id='modalTitle'></h1>";
            newParagraph(modalTextCourt, modalTitle, "modalTitle", values.title);

            const modalDuration = "<p><mark>Duration: </mark><span id='duration'></span> min<p>"
            newParagraph(modalTextCourt, modalDuration, "duration", values.duration);

            const modalDate = "<p><mark>Release date: </mark><span id='date'></span></p>";
            newParagraph(modalTextCourt, modalDate, "date", values.date_published);

            let stringCountries = "";
            stringCountries = convertArrayString(values.countries);
            const modalCountries = "<p><mark>Countries: </mark><span id='countries'</span></p>"
            newParagraph(modalTextCourt, modalCountries, "countries", stringCountries.slice(0, stringCountries.length - 2));

            let rated = "";
            if (values.rated == "Not rated or unkown rating") {
                rated = "Unknown";
            } else if (values.rated == "R") {
                rated = "Restricted";
            } else if (values.rated == "0") {
                rated = "For all";
            } else {
                rated = values.rated + " years +";
            }
            const modalRated = "<p><mark>Rated: </mark><span id='rated'></span></p>";
            newParagraph(modalTextCourt, modalRated, 'rated', rated);

            const modalImdb = "<p><mark>IMDb score: </mark><span id='imdb'></span></p>"
            newParagraph(modalTextCourt, modalImdb, 'imdb', values.imdb_score);

            let boxOffice = "";
            if (values.worldwide_gross_income === null) {
                boxOffice = "Unknown";
            } else {
                boxOffice = new Intl.NumberFormat().format(values.worldwide_gross_income);
            };
            const modalBoxOffice = "<p><mark>World box office: </mark><span id='box'></span></p>";
            newParagraph(modalTextCourt, modalBoxOffice, 'box', boxOffice);

            let stringGenres = "";
            stringGenres = convertArrayString(values.genres);
            const modalGenres = "<p><mark>Genres: </mark><span id='genres'></span></p>";
            newParagraph(modalTextCourt, modalGenres, 'genres', stringGenres.slice(0, stringGenres.length - 2));

            let stringDirectors = "";
            stringDirectors = convertArrayString(values.directors);
            const modalDirectors = "<p><mark>Director: </mark><span id='directors'></span></p>";
            newParagraph(modalTextCourt, modalDirectors, "directors", stringDirectors.slice(0, stringDirectors.length - 2));

            let stringActors = "";
            stringActors = convertArrayString(values.actors);
            const modalActors = "<p><mark>Actors: </mark><span id='actors'></span></p>";
            newParagraph(modalTextLong, modalActors, "actors", stringActors.slice(0, stringActors.length - 2));

            const modalDescription = "<p><mark>R??sum??: </mark><span id='modalResume'></span></p>";
            newParagraph(modalTextLong, modalDescription, "modalResume", values.long_description);
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
