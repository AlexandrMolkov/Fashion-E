 "use strict";

function addWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
addWebP(function (support) {
    if (support == true) {
        document.querySelector(`body`).classList.add(`webp`);
    }
})
//============================================================ Timer


const hours = document.querySelector(`#timer-hours`)
const minutes = document.querySelector(`#timer-minutes`)
const seconds = document.querySelector(`#timer-seconds`)

const timer = {
    hours: 9,
    minutes: 1,
    seconds: 11,

    start() {
        setInterval(()=>{
            if ((this.seconds - 1) > 0) {
                this.seconds -= 1
            } else {
                this.seconds = 59
                if ((this.minutes - 1) > 0) {
                    this.minutes -= 1
                } else {
                    if ((this.hours - 1) > 0) {
                        this.hours -= 1
                        this.minutes = 59
                    }
                }
            }

            seconds.textContent = this.seconds < 10 ? `0${this.seconds}` : this.seconds
            minutes.textContent = this.minutes < 10 ? `0${this.minutes}` : this.minutes
            hours.textContent = this.hours < 10 ? `0${this.hours}` : this.hours
        },1000)
    }
}

timer.start()










//============================================================ Slider
const slides = document.querySelectorAll(`.slider__slide`),
    prev = document.querySelector(`#btn-slider-prev`),
    next = document.querySelector(`#btn-slider-next`),
    //total = document.querySelector(`.offer__slide-counter-total`),
    sliderName = document.querySelector('.slider__name'),
    current = document.querySelector(`.slider__number`),
    slidesWrapper = document.querySelector(`.slider`),
    slidesField = document.querySelector(`.slider__sliders`);

let width = window.getComputedStyle(slidesWrapper).width;
let slideIndex = 1;
let offset = 0;

const sliderNames = [
    `MEN'S WEAR`,
    `WOOMEN'S WEAR`,
    `CHILDREN'S WEAR`
]

window.onresize = function() {
    

    width = window.getComputedStyle(slidesWrapper).width;
    slides.forEach(slide=>{
        slide.style.width = width; 
    })

    if(offset == +width.slice(0, width.length - 1) * (slides.length - 1)){
        offset = 0;
    } else {
        offset = ((100 / slides.length) * slideIndex).toFixed(3)
    }
    slidesField.style.transform = `translateX(-${offset}%)`;
}
    


/*
if(slides.length < 10) {
    total.textContent = `0${slides.length}`
} else total.textContent = `${slides.length}`
*/

slides.forEach(slide=>{
    slide.style.width = width;
})

slidesField.style.width = 100 * slides.length + '%';

slidesField.style.display = "flex";
slidesField.style.transition = "0.5s all";
slidesWrapper.style.overflow = "hidden";

next.addEventListener(`click`, () => {
    
    if(slideIndex == slides.length){
        offset = 0;
        slideIndex = 1;
    } else {
        offset = ((100 / slides.length) * slideIndex).toFixed(3)
        slideIndex++;
    }
    
    slidesField.style.transform = `translateX(-${offset}%)`;
    sliderName.textContent = sliderNames[slideIndex - 1]

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex;
    }
})

prev.addEventListener(`click`, () => {
    
    if(slideIndex == 1){
        slideIndex = slides.length;
        offset = ((100 / slides.length) * (slideIndex - 1)).toFixed(3)
        
    } else {
        slideIndex--;
        offset = ((100 / slides.length) * (slideIndex - 1)).toFixed(3)
        
    }

    slidesField.style.transform = `translateX(-${offset}%)`;
    sliderName.textContent = sliderNames[slideIndex - 1]

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex;
    }

}) 