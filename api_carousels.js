/*jslint es6*/
/*global document window fetch console*/

/*This file has in charge the API requests for carousels film images*/

/**
 * Select the carousel witch number is done in arguments. the carousel is
 * selected by its class attribute: carousel + carouselIndex.
 * Receive in arguments a request promise witch contains films images.
 * Put this images in the carousel's five first boxes.
 * @param  {Object} values - request's promise
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

/**
 * Select the carousel witch number is done in arguments.
 * Receive in arguments a request promise witch contains films images.
 * Put this images in the carousel's last two boxes.
 * @param  {Object} values
 * @param  {number} carouselIndex
 */
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

/**
 * Launch two requests on API with search option given in argument.
 * the first request is on page one, and the second in on page two.
 * Each request contains data of five films.
 * Promise's object and carousel's index are send to functions.
 * @param  {Number} carouselIndex - carousel's number concerned by the requests.
 * @param  {String} request - option of search for the request
 */
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

/**
 * Concern request for the fisrt carousel whitch shown
 * the 7 best films in imdb score.
 * @arg  {number} - carousel's number concerned by the requests.
 * @arg  {String} - search option of the request
 */
carouselRequest(0, "sort_by=-imdb_score");

/**
 * Concern request for the second carousel whitch shown
 * the 7 Science fiction bests votes films of.
 * @arg  {number} - carousel's number concerned by the requests.
 * @arg  {String} - search option of the request
 */
carouselRequest(1, "genre=sci-Fi&sort_by=-votes");

/**
 * Concern request for the third carousel whitch shown
 * the 7 Comedy bests votes films.
 * @arg  {number} - carousel's number concerned by the requests.
 * @arg  {String} - search option of the request
 */
carouselRequest(2, "genre=comedy&sort_by=-votes");

/**
 * Concern request for the fourth carousel whitch shown
 * the 7 Thriller bests votes films.
 * @arg  {number} - carousel's number concerned by the requests.
 * @arg {String} - search option of the request
 */
carouselRequest(3, "genre=thriller&sort_by=-votes");
