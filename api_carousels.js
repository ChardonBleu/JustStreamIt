/*jslint es6*/
/*global document window fetch console*/

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

