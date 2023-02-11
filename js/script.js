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

    document.querySelectorAll(`.burg`)
    .forEach( b => {
        const inner = document.createElement('div')
        inner.classList.add('burg__icon')
        //b.append(document.createElement('span'))
        b.append(inner)
        document.querySelector(b.dataset.target).classList.add(`nav-burg`)

        b.addEventListener('click', (e) => {
            if(e.target.closest('.burg')) {
                const burg = e.target.closest('.burg')
                burg.classList.toggle(`open`)
                document.querySelector(burg.dataset.target).classList.toggle(`show`)
                if (document.querySelector(burg.dataset.target).classList.contains(`show`))
                {
                    document.body.classList.add(`lock`)
                } else{
                    document.body.classList.remove(`lock`)
                }

                
            }
        })
    })

}


const swiper = new Swiper('.slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
  
    // Navigation arrows
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    },
  });

const swiper2 = new Swiper('.product-types__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 26,
  
    // Navigation arrows
    navigation: {
      nextEl: '#product-next',
      prevEl: '#product-prev',
    },

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
  });

const swiper3 = new Swiper('.featured-products__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 35,
  
    // Navigation arrows
    navigation: {
      nextEl: '#featured-products-next',
      prevEl: '#featured-products-prev',
    },

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
  });

const swiperBlogs = new Swiper('.blogs__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
  
    // Navigation arrows
    navigation: {
      nextEl: '#blogs-next',
      prevEl: '#blogs-prev',
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    },
  });


  


















