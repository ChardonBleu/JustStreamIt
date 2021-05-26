/*jslint es6*/
/*global document window*/

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
    
    let width = 182,
        height = 182,
        margin = 30,
        totalWidth = width * items.length + 7 * margin,
        visibleBoxes = 4,
        currentIndex = 0;

    /**
     * Adapt carousel boxes dimentions and adjust apparent number of boxes
     */
    function resize() {
        
        if (window.innerWidth > 1024) {
            visibleBoxes = 4;
        } else {
            visibleBoxes = 2;
        }  

        width =  Math.max((window.innerWidth * 0.7 - (visibleBoxes - 1) * margin) / visibleBoxes, 182);
        height = width / 0.7;
        totalWidth = width * items.length + (items.length - 1) * margin;

        slider.style.width = totalWidth + "px";

        for (const item of items) {
            item.style.width = width + "px";
            item.style.height = height + "px";
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
            index = (items.length - (visibleBoxes - 1));
        } else if (index > (items.length - (visibleBoxes - 1))) {
            index = 1;
        }

        currentIndex = index;
        slider.style.transform = "translateX(" + ((index-1) * (-width - margin)) + "px)";

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
