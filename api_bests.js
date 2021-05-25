/*jslint es6*/
/*global document window fetch console*/

function newParagraph(parent_document, paragraph) {
    'use-strict';
    const newElt = document.createElement("p");
    parent_document.appendChild(newElt).innerHTML = paragraph;
}

function detailsBestFilm(id_film) {
    'use-strict';
    fetch("http://localhost:8000/api/v1/titles/" + id_film)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (values) {
            const best_details = (document.getElementsByClassName("best__details")[0]);
            const title = values.title;
            let title_html = "<p><strong>Titre:</strong> " + title + "</p>";
            newParagraph(best_details, title_html);
            const resume = values.long_description;
            let resume_html = "<p><strong>Résumé:</strong> " + resume + "</p>";
            newParagraph(best_details, resume_html);
        })
        .catch(function (error) {
            console.log(error);
        });

}

function bestFilm(values, index) {
    'use-strict';
    const image_url = values.results[index].image_url;
    const best_img = document.getElementsByClassName("best__img")[index];
    best_img.src = image_url;
    const id_film = values.results[index].id;
    detailsBestFilm(id_film);
}

fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=1")
    .then(function (response) {
        'use-strict';
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (values) {
        'use-strict';
        bestFilm(values, 0);
    })
    .catch(function (error) {
        'use-strict';
        console.log(error);
    });
