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



class Slider {
    constructor(slider,slidesContainer,slidesAll,sliderNameBlock,sliderNames,totalBlock,currentBlock,prevBtn,nextBtn,countOfSlides = 1) {

        this.slides = document.querySelectorAll(`${slidesAll}`),
        this.prev = document.querySelector(`${prevBtn}`),
        this.next = document.querySelector(`${nextBtn}`),
        this.total = totalBlock ? document.querySelector(`${totalBlock}`) : undefined,
        this.sliderName = sliderNameBlock ? document.querySelector(`${sliderNameBlock}`) : undefined,
        this.current = currentBlock ? document.querySelector(`${currentBlock}`) : undefined,
        this.slidesWrapper = document.querySelector(`${slider}`),
        this.slidesField = document.querySelector(`${slidesContainer}`),

        this.sliderNames = sliderNames,
        this.countOfSlides = countOfSlides

        this.width = window.getComputedStyle(this.slidesWrapper).width;
        this.slideIndex = 1;
        this.offset = 0;
    }

    onRes() {

        this.width = window.getComputedStyle(this.slidesWrapper).width;
        this.slides.forEach(slide=>{
           slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
        })

        this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    }

    init() {

        this.width = window.getComputedStyle(this.slidesWrapper).width;

        this.slides.forEach(slide=>{
            slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
        })

        this.sizeOfSlide = 100 / this.countOfSlides
        this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';

        this.slidesField.style.display = "flex";
        this.slidesField.style.transition = "0.5s all";
        this.slidesWrapper.style.overflow = "hidden";
    
        this.next.addEventListener(`click`, () => {
            
            if(this.slideIndex == this.slides.length - (this.countOfSlides - 1)){
                this.offset = 0;
                this.slideIndex = 1;
            } else {
                this.offset = ((100 / this.slides.length) * this.slideIndex).toFixed(3)
                this.slideIndex++;
            }
            
            this.slidesField.style.transform = `translateX(-${this.offset}%)`;

            if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
           
            if (this.slides.length < 10) {
                this.current.textContent = `0${this.slideIndex}`
            } else {
                this.current.textContent = this.slideIndex;
            }
        })
    
        this.prev.addEventListener(`click`, () => {
            
            if(this.slideIndex == 1){
                this.slideIndex = this.slides.length - (this.countOfSlides - 1);
                this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                
            } else {
                this.slideIndex--;
                this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
            }
    
            this.slidesField.style.transform = `translateX(-${this.offset}%)`;

            if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
    
            if (this.slides.length < 10) {
                this.current.textContent = `0${this.slideIndex}`
            } else {
                this.current.textContent = this.slideIndex;
            }
    
        }) 
    }
}


const slider1Names = [
    `MEN'S WEAR`,
    `WOMEN'S WEAR`,
    `CHILDREN'S WEAR`
]

const slider1 = new Slider('.slider','.slider__sliders','.slider__slide','.slider__name',slider1Names,'','.slider__number','#btn-slider-prev','#btn-slider-next')
slider1.init()
const slider2 = new Slider('.product-types__slider','.product-types__items','.product-types__item','','','','','#product-prev','#product-next',3)
slider2.init()
const slider3 = new Slider('.featured-products__slider','.featured-products__items','.featured-products__item','','','','','#featured-products-prev','#featured-products-next',4)
slider3.init()
const slider4 = new Slider('.blogs__slider','.blogs__slider-wrapper','.blogs__slide','','','','','#blogs-prev','#blogs-next',2)
slider4.init()

window.onresize = function() {
    slider1.onRes()
    slider2.onRes()
    slider3.onRes()
    slider4.onRes()
}
































