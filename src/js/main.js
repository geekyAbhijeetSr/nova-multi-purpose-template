// const checkresize = () => {
//     const banner = document.querySelector(".banner");
//     console.log(window.innerHeight, window.innerWidth);
//     if (window.innerHeight <= 700) {
//         banner.classList.add("resized");
//     }
//     else {
//         banner.classList.remove("resized");
//     }
// }





const issMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const dropdown = document.querySelector('.dropdown');
const dropdowncontent = document.querySelector('.dropdown-content');
if (issMobile) {
    dropdown.classList.remove('hover');
    dropdown.addEventListener('click', () => {
        dropdowncontent.classList.toggle('active');
        console.log(dropdowncontent);
    });

    // checkresize();
    // window.addEventListener("resize", checkresize);
};



const menu = document.querySelector(".menu");
const menuspan = document.querySelectorAll('.menu span');
const nav = document.querySelector('.navigation');
const body = document.querySelector('body');


menu.addEventListener("click", () => {
    menuspan.forEach((item) => {
        item.classList.toggle('toggle');
    });
    nav.classList.toggle('show');
    body.classList.toggle('overflow');
});

window.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
        menuspan.forEach((item) => {
            item.classList.remove('toggle');
        })
        nav.classList.remove('show');
        body.classList.remove('overflow');

    }
});

nav.addEventListener('click', (event) => {
    event.stopPropagation();
});




