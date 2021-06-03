/*jslint es6*/
/*global document window fetch console*/

/*This file has in charge the requests for the best film in imdb score*/

/**
 * Add new paragraph inside parent document given in arguments.
 * @param  {Object} parent_document - design tags in witch paragraph have to be inserted
 * @param  {String} paragraph - contains integral string with <p> tags.
 */
function newParagraph(parent_document, child, id_child, data) {
    'use-strict';
    const newElt = document.createElement("div");
    parent_document.appendChild(newElt).innerHTML = child;
    document.querySelector("#" + id_child).textContent = data;
}

/**
 * Search best film details using the id_film given in argument.
 * Add film informations in html document.
 * @param  {number} id_film - best film id in API datas
 */
function detailsBestFilm(id_film) {
    'use-strict';
    fetch("http://localhost:8000/api/v1/titles/" + id_film)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (values) {
            const best_details = (document
                .getElementsByClassName("best__details__text")[0]);

            const title_html = "<h2 id='bestTitle'><strong></strong></h2>";
            newParagraph(best_details, title_html, "bestTitle", values.title);

            const resume_html = "<strong>Résumé: </strong><span id='resume'></span>";
            newParagraph(best_details, resume_html, "resume", values.long_description);
        })
        .catch(function (error) {
            console.log(error);
        });

}

/**
 * Use the first value of promise's data given in argument values.
 * Put the image of this film in concerned html tags.
 * send id_film to another function.
 * @param  {Object} values - promise's object from principal request
 */
function bestFilm(values) {
    'use-strict';
    const image_url = values.results[0].image_url;
    const best_img = document.getElementsByClassName("best__details__img")[0];
    best_img.src = image_url;
    const id_film = values.results[0].id;
    best_img.alt = id_film;
    detailsBestFilm(id_film);
}

/**
 * Principal requests searching for the 5 bests IMDb score films.
 * Promise's object is send to the function bestFilm.
 */
fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=1")
    .then(function (response) {
        'use-strict';
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (values) {
        'use-strict';
        bestFilm(values);
    })
    .catch(function (error) {
        'use-strict';
        console.log(error);
    });
