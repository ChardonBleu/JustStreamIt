/*jslint es6*/

function activeSlide(carousel) {
    "use strict";

    var slider = carousel.getElementsByClassName('carousel__slider')[0],
    items = carousel.getElementsByClassName('carousel__slider__item'),
    prevBtn = carousel.getElementsByClassName('carousel__nav__prev')[0],
    nextBtn = carousel.getElementsByClassName('carousel__nav__next')[0];

    var width, height, totalWidth, margin = 20,
        currIndex = 0;

    function init() {
        resize();
        move(1);
        bindEvents();
    }

    function resize() {
        width = Math.max(window.innerWidth * 0.2, 300);
        height = window.innerHeight * 0.2;
        totalWidth = width * items.length;

        slider.style.width = totalWidth + "px";

        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            item.style.width = (width - (margin * 2)) + "px";
            item.style.height = height + "px";
        }
    }

    function move(index) {
        if (index < 1) {
            index = (items.length - 1);
        } else if (index > (items.length - 1)) {
            index = 1;
        }
        currIndex = index;
        slider.style.transform = "translateX(" + ((index-1) * -width) + "px)";

    }

    function prev() {
        move(--currIndex);
    }

    function next() {
        move(++currIndex);
    }

    function bindEvents() {
        window.addEventListener("resize", resize);
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
    }

    init();

}

var carousel1 = document.getElementById('carousel1');
activeSlide(carousel1);

var carousel2 = document.getElementById('carousel2');
activeSlide(carousel2);

var carousel3 = document.getElementById('carousel3');
activeSlide(carousel3);
