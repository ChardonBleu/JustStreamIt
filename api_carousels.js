/*jslint es6*/
/*global document window fetch console*/

/**
 * @param  {} values
 * @param  {number} carouselIndex

 */
function fiveFirstImagesCarousel(values, carouselIndex) {
    'use-strict';
    const carouselItems = document
        .getElementById("carousel" + carouselIndex)
        .getElementsByClassName("carousel__slider__item__img");
    let index = 0;
    while (index < 5) {
        const imageUrl = values.results[index].image_url;
        carouselItems[index].src = imageUrl;
        index += 1;
    }
}

function twoLastImagesCarousel(values, carouselIndex) {
    'use-strict';
    const carouselItems = document
        .getElementById("carousel" + carouselIndex)
        .getElementsByClassName("carousel__slider__item__img");
    let index = 0;
    while (index < 2) {
        const imageUrl = values.results[index].image_url;
        carouselItems[index + 5].src = imageUrl;
        index += 1;
    }
}

function carouselRequest(carouselIndex, request) {
    'use-strict';
    fetch("http://127.0.0.1:8000/api/v1/titles/?" + request + "&page=1")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (values) {
            fiveFirstImagesCarousel(values, carouselIndex);
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
            twoLastImagesCarousel(values, carouselIndex);
        })
        .catch(function (error) {
            console.log(error);
        });
}

carouselRequest(0, "sort_by=-imdb_score");
carouselRequest(1, "genre=sci-Fi&sort_by=-votes");
carouselRequest(2, "genre=comedy&sort_by=-votes");
carouselRequest(3, "genre=thriller&sort_by=-votes");
