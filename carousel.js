/*jslint es6*/
/*global document window*/

"use strict";


function activeSlide(carousel) {

    const slider = carousel.getElementsByClassName('carousel__slider')[0],
    items = carousel.getElementsByClassName('carousel__slider__item'),
    prevBtn = carousel.getElementsByClassName('carousel__nav__prev')[0],
    nextBtn = carousel.getElementsByClassName('carousel__nav__next')[0];

    let width = 300,
        height = 300,
        totalWidth = 20,
        margin = 20,
        currIndex = 0;

    function resize() {
        
        height = Math.max(window.innerWidth * 0.18, 300);
        width = height * 182 / 266 ;
        totalWidth = width * items.length;

        slider.style.width = totalWidth + "px";

        for (const item of items) {
            item.style.width = (width - (margin * 2)) + "px";
            item.style.height = height + "px";
        }

    }

    function move(index) {
        if (index < 1) {
            index = (items.length - 1);
        } else if (index > (items.length - 2)) {
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

    function init() {
        resize();
        move(1);
        bindEvents();
    }

    init();

}
var carousel1 = document.getElementById('carousel0');
activeSlide(carousel0);

var carousel1 = document.getElementById('carousel1');
activeSlide(carousel1);

var carousel1 = document.getElementById('carousel2');
activeSlide(carousel2);

var carousel1 = document.getElementById('carousel3');
activeSlide(carousel3);
