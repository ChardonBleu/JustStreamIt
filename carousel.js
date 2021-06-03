/*jslint es6*/
/*global document window*/

/* This file has in charge carousel display and navigation*/

"use strict";

/**
 * Active carousel navigation and resize
 * @param  {object} carousel - carousel's DOM
 */
function activeSlide(carousel) {

    const slider = carousel.getElementsByClassName('carousel__slider')[0],
    items = carousel.getElementsByClassName('carousel__slider__item'),
    prevBtn = carousel.getElementsByClassName('carousel__nav__prev')[0],
    nextBtn = carousel.getElementsByClassName('carousel__nav__next')[0];

    let widthBox = 182,
        heightBox = 268, /*width/height = 0,68*/
        margin = 30,
        totalWidth = widthBox * items.length + (items.length - 1) * margin,
        numberVisibleBoxes = 4,
        currentIndex = 0;

    /**
     * Adapt carousel boxes dimentions and adjust apparent number of boxes.
     * carousel width is 70% of window. The numberVisibleBoxes choosen might
     * be visible in this box, with the margin choosen between each box:
     * NumberVisibleBoxes * widthBox + (numberVisibleBoxes - 1) * margin =
     * window.innerWidth * 70%
     */
    function resize() {
        if (window.innerWidth >= 900) {
            numberVisibleBoxes = 4;
            margin = 30;
        } else if (window.innerWidth >= 600 && window.innerWidth <= 900) {
            numberVisibleBoxes = 2;
            margin = 30;
        } else if (window.innerWidth <= 600 && window.innerWidth >= 350) {
            numberVisibleBoxes = 2;
            margin = 0;
        } else if (window.innerWidth <= 350 && window.innerWidth >= 50){
            numberVisibleBoxes = 1;
            margin = 0;
        }


        widthBox = (window.innerWidth * 0.7 - (numberVisibleBoxes - 1) *
                        margin) / numberVisibleBoxes;
        heightBox = widthBox / 0.68;
        totalWidth = widthBox * items.length + (items.length - 1) * margin;

        slider.style.width = totalWidth + "px";

        for (const item of items) {
            item.style.width = widthBox + "px";
            item.style.height = heightBox + "px";
        }
        move(1);
    }

    /**
     * calculation of the translation when clik on navigation arrows for
     * each carousel
     * @param  {number} index - box index
     */
    function move(index) {

        if (index < 1) {
            index = (items.length - (numberVisibleBoxes - 1));
        } else if (index > (items.length - (numberVisibleBoxes - 1))) {
            index = 1;
        }

        currentIndex = index;
        slider.style.transform = "translateX(" +
                                ((index-1) * (-widthBox - margin)) + "px)";

    }

    /**
     * decrease the index box and ask for a move with this new index
     */
    function prev() {
        move(--currentIndex);
    }

    /**
     * increase the index box and ask for a move with this new index
     */
    function next() {
        move(++currentIndex);
    }

    /**
     * Wait for events:
     * window resize --> carousels boxes resize too
     * clik on previous arrow to navigate in slider
     * clik on next arrow to navigate in slider
     */
    function bindEvents() {
        window.addEventListener("resize", resize);
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
    }

    /**
     * when the window is opened for the first time shwo first boxes of each
     * carousel and adapt boxes number and sizes on window size.
     * Wait for resize window or carousel navigation.
     */
    function init() {
        resize();
        move(1);
        bindEvents();
    }

    init();

}

/**
 * Activation of the four carousels
 * @arg {Object} - carousel's DOM
 */
activeSlide(document.getElementById('carousel0'));
activeSlide(document.getElementById('carousel1'));
activeSlide(document.getElementById('carousel2'));
activeSlide(document.getElementById('carousel3'));
