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





{

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

}




//============================================================ Burger



{

const burgers = document.querySelectorAll(`.burg`)

burgers.forEach(function(elem) {
    //console.log(elem)
    elem.addEventListener('click', (e)=>{
        const burg = e.target
        
        //element.preventDefault();
        burg.classList.toggle(`open`)
        burg.nextElementSibling.classList.toggle(`show`)
/*         if(burg.classList.contains(`open`) && !burg.nextElementSibling.classList.contains(`navigation_pos_static`)){
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        } */

    })
})

}



//============================================================ Slider

{

    class Slider {
        constructor(slider,slidesContainer,slidesAll,countOfSlides = 1,sliderLoop = true) {
    
            this.slidesWrapper = document.querySelector(`${slider}`)
            this.slidesField = this.slidesWrapper.querySelector(`${slidesContainer}`)
            this.slides =  this.slidesWrapper.querySelectorAll(`${slidesAll}`)

            this.prevBtn = undefined
            this.nextBtn = undefined

            this.total = undefined
            this.current = undefined
            
            this.sliderName = undefined
            this.sliderNames = undefined

            this.countOfSlidesDefault = countOfSlides
            this.countOfSlides = countOfSlides
            
    
            this.width = window.getComputedStyle(this.slidesWrapper).width;
            this.slideIndex = 1;
            this.offset = 0;
            this.loop = sliderLoop;

            this.breakPoints = undefined
        }
    
        onRes() {
    
            if (this.breakPoints) {
                
                const keys = Object.keys(this.breakPoints)                  
                const last = keys[keys.length - 1]                               
                let currentIndex = keys.length - 1;

                const watchWidth = (value) => {
                    
                    if(window.innerWidth < value) {

                        this.countOfSlides = this.breakPoints[keys[currentIndex]];

                        if(currentIndex - 1 > -1) {

                            currentIndex--
                            watchWidth(keys[currentIndex])  
                        }   
                    }  else if (window.innerWidth > value) {

                        currentIndex++
                        this.countOfSlides = currentIndex > keys.length - 1 ? this.countOfSlidesDefault : this.breakPoints[keys[currentIndex]];

                    }

                }
                watchWidth(last)

                this.width = window.getComputedStyle(this.slidesWrapper).width;
                this.slides.forEach(slide=>{
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                })
                
                this.sizeOfSlide = 100 / this.countOfSlides
                this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';
    
                this.slidesField.style.transform = `translateX(0%)`;
                this.slideIndex = 1
    
                if (!this.loop){
                    this.nextBtn.disabled = false
                    this.prevBtn.disabled = true
                }
    
            } else{
                this.width = window.getComputedStyle(this.slidesWrapper).width;
                this.slides.forEach(slide=>{
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px';   
                })
    
                this.sizeOfSlide = 100 / this.countOfSlides
                this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';
            }

        }
    
        init() {
    
            if (this.total) {
                if (this.slides.length < 10) {
                    this.total.textContent = `0${this.slides.length}`
                } else {
                    this.total.textContent = this.slides.length;
                }
            }
    
    
            if (!this.fixed) {
    
/*                 if(this.countOfSlides768 && window.innerWidth <= 768) {
    
                    this.countOfSlides = this.countOfSlides768;
                }
                if(this.countOfSlides768 && window.innerWidth > 768) {
                    
                    this.countOfSlides = this.countOfSlidesDefault;
                }  */
    
                this.width = window.getComputedStyle(this.slidesWrapper).width;
    
                this.slides.forEach(slide=>{
                    slide.style.width = (+this.width.slice(0, this.width.length - 2) / this.countOfSlides) + 'px'; 
                    
                })
    
                this.sizeOfSlide = 100 / this.countOfSlides
                this.slidesField.style.width = (100 + ((this.slides.length - this.countOfSlides) * this.sizeOfSlide)) + '%';
    
            } else {
                this.slidesField.style.width = (this.fixed * this.slides.length) + 'px';
            }
    
            
            this.slidesField.style.display = "flex";
            this.slidesField.style.transition = "0.5s all";
            this.slidesWrapper.style.overflow = "hidden";
 
            
        }

        initButtons(prevButton,nextButton) {

            this.prevBtn = this.slidesWrapper.querySelector(`${prevButton}`)
            this.nextBtn = this.slidesWrapper.querySelector(`${nextButton}`)

            if(this.loop) {     
      
                this.prevBtn.addEventListener(`click`, () => {
                    
                    if(this.slideIndex == 1){
    
                        this.slideIndex = this.slides.length - (this.countOfSlides - 1);
                    this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                        
                    } else {
                        this.slideIndex--;
                        this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                    }
            
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                    if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
            
                    if (this.current) {
                        if (this.slides.length < 10) {
                            this.current.textContent = `0${this.slideIndex}`
                        } else {
                            this.current.textContent = this.slideIndex;
                        }
                    }
                }) 
    
                this.nextBtn.addEventListener(`click`, () => {
    
                    if(this.slideIndex == this.slides.length - (this.countOfSlides - 1)){
                        this.offset = 0;
                        this.slideIndex = 1;
                    } else {
                        this.offset = ((100 / this.slides.length) * this.slideIndex).toFixed(3)
                        this.slideIndex++;
                    }
                
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                    if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
                
                    if (this.current) {
                        if (this.slides.length < 10) {
                                this.current.textContent = `0${this.slideIndex}`
                        } else {
                                this.current.textContent = this.slideIndex;
                        }
                    }
    
                })
    
    
            } else {
    
                this.prevBtn.addEventListener(`click`, () => {
                
                    if(this.slideIndex != 1){
                        this.slideIndex--;
                        this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                        this.nextBtn.disabled = false
                    }
                    if(this.slideIndex == 1) {
                        this.prevBtn.disabled = true
                    } else  this.prevBtn.disabled = false
        
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        
                    if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
            
                    if (this.current) {
                        if (this.slides.length < 10) {
                            this.current.textContent = `0${this.slideIndex}`
                        } else {
                            this.current.textContent = this.slideIndex;
                        }
                    }
                })            
    
                this.nextBtn.addEventListener(`click`, () => {
    
                    this.offset = ((100 / this.slides.length) * this.slideIndex).toFixed(3)
                    this.slideIndex++;
                    this.prevBtn.disabled = false
        
                    if(this.slideIndex == this.slides.length - (this.countOfSlides - 1)) {
                        this.nextBtn.disabled = true
                    }
        
                    
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
        
                    if (this.sliderName) this.sliderName.textContent = this.sliderNames[this.slideIndex - 1]
                    
                    if (this.current) {
                        if (this.slides.length < 10) {
                            this.current.textContent = `0${this.slideIndex}`
                        } else {
                            this.current.textContent = this.slideIndex;
                        }
                    }
    
                })
    
            }
        }

        initPagination(){
            const navDots = document.createElement('ul')
            navDots.classList.add('slider__nav')
    
            for(let i = 0; this.slides.length > i; i++) {
                const dot = document.createElement('li')
                dot.classList.add('slider__nav-li')
    
                dot.setAttribute('data-slidenumber', i + 1)
    
                dot.addEventListener(`click`, (e) => {
                
                    this.slideIndex = e.target.getAttribute('data-slidenumber')
    
                    this.offset = ((100 / this.slides.length) * (this.slideIndex - 1)).toFixed(3)
                    this.slidesField.style.transform = `translateX(-${this.offset}%)`;
    
                })            
    
                navDots.append(dot)
            }
    
            this.slidesWrapper.append(navDots)
        }

        initText(sliderNameBlock,sliderNames,sliderTextBlock,text){
            this.sliderName = this.slidesWrapper.querySelector(`${sliderNameBlock}`)
            this.sliderNames = sliderNames
        }

        initCounter(curent,total){

            this.total = total ? this.slidesWrapper.querySelector(`${total}`) : undefined
            this.current = curent ? this.slidesWrapper.querySelector(`${curent}`) : undefined
    
            if (this.total) {
                if (this.slides.length < 10) {
                    this.total.textContent = `0${this.slides.length}`
                } else {
                    this.total.textContent = this.slides.length;
                }
            }
        }

        initBreakPoints(breakPoints) {
            this.breakPoints = breakPoints
            this.onRes()
        }
    }
    
    
    
    
    

    
    
    const slider1 = new Slider('.slider','.slider__slides','.slider__slide',1,true)
    slider1.init()
    slider1.initButtons('#btn-slider-prev','#btn-slider-next')
    slider1.initText('.slider__name',[
        `MEN'S WEAR`,
        `WOMEN'S WEAR`,
        `CHILDREN'S WEAR`
        ])

    slider1.initCounter('.slider__number')

    const slider2 = new Slider('.product-types__slider','.product-types__items','.product-types__item',3,true)
    slider2.init()
    slider2.initButtons('#product-prev','#product-next')
    slider2.initBreakPoints({
        768: 2,
        375: 1
    })
    slider2.onRes()

    const slider3 = new Slider('.featured-products__slider','.featured-products__items','.featured-products__item',4,false)
    slider3.init()
    slider3.initButtons('#featured-products-prev','#featured-products-next')
    slider3.initBreakPoints({
        768: 2,
        375: 1
    })
    slider3.onRes()
    
    const slider4 = new Slider('.blogs__slider','.blogs__slider-wrapper','.blogs__slide',2,false)
    slider4.init()
    slider4.initButtons('#blogs-prev','#blogs-next')
    slider4.initBreakPoints({
        768: 1
    })
    slider4.onRes()
    
    window.onresize = function() {
        slider1.onRes()
        slider2.onRes()
        slider3.onRes()
        slider4.onRes()
    }
    
    }
    






















