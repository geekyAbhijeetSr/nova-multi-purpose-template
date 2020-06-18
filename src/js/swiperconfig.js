////   my config

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    mousewheel: true,
    keyboard: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
        },
    },
});

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const nxt = document.querySelector('.swiper-button-next');
const prv = document.querySelector('.swiper-button-prev');
if (isMobile) {
    nxt.style.visibility = 'hidden';
    prv.style.visibility = 'hidden';

}
else {
    nxt.style.visibility = 'visible';
    prv.style.visibility = 'visible';

}
