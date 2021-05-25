/*jslint es6*/
/*global document window fetch console*/

function best_image(values, index) {
    'use-strict';
    const image_url = values.results[index].image_url;
    const best_img = document.getElementsByClassName("best__img")[index];
    best_img.src = image_url;
}

function seven_bests(values) {
    'use-strict';
    const carousel0_items = document
        .getElementById("carousel0")
        .getElementsByClassName("carousel__slider__item__img");
    const index = 0;
    while (index < 8) {
        const image_url = values.results[index].image_url;
        carousel0_items[index].src = image_url;
    }
}

fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(function (response) {
        'use-strict';
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (values) {
        'use-strict';
        best_image(values, 0);
        seven_bests(values);
    })
    .catch(function (error) {
        'use-strict';
        console.log(error);
    });

