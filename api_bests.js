/*jslint es6*/
/*global document window fetch console*/

function newParagraph(parent_document, paragraph) {
    'use-strict';
    const newElt = document.createElement("p");
    parent_document.appendChild(newElt).innerHTML = paragraph;
}

function details_film(id_film) {
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



function best_film(values, index) {
    'use-strict';
    const image_url = values.results[index].image_url;
    const best_img = document.getElementsByClassName("best__img")[index];
    best_img.src = image_url;    
    const id_film = values.results[index].id;
    details_film(id_film);
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
        best_film(values, 0);
    })
    .catch(function (error) {
        'use-strict';
        console.log(error);
    });

function five_first_images_carousel(values, carousel_index) {
    'use-strict';
    const carousel_items = document
        .getElementById("carousel" + carousel_index)
        .getElementsByClassName("carousel__slider__item__img");
    let index = 0;
    while (index < 5) {
        const image_url = values.results[index].image_url;
        carousel_items[index].src = image_url;
        index += 1;
    }
}

function two_last_images_carousel(values, carousel_index) {
    'use-strict';
    const carousel_items = document
        .getElementById("carousel" + carousel_index)
        .getElementsByClassName("carousel__slider__item__img");
    let index = 0;
    while (index < 2) {
        const image_url = values.results[index].image_url;
        carousel_items[index + 5].src = image_url;
        index += 1;
    }
}

function carousel_request(carousel_index, request) {
    'use-strict';
    fetch("http://127.0.0.1:8000/api/v1/titles/?" + request + "&page=1")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (values) {
            five_first_images_carousel(values, carousel_index);
        })
        .catch(function (error) {
            console.log(error);
        });

    fetch("http://127.0.0.1:8000/api/v1/titles/?" + request + "&page=2")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (values) {
            two_last_images_carousel(values, carousel_index);
        })
        .catch(function (error) {
            console.log(error);
        });
}

carousel_request(0, "sort_by=-imdb_score");
carousel_request(1, "sci-Fi");
carousel_request(2, "genre=comedy");
carousel_request(3, "genre=adventure");

