const monthlybtn = document.getElementById('togglemonthly');
const yearlybtn = document.getElementById('toggleyearly');



const priceM = document.querySelectorAll('.priceM');
const priceY = document.querySelectorAll('.priceY');


// monthly button
monthlybtn.addEventListener('click', () => {
    yearlybtn.classList.remove('active');
    monthlybtn.classList.add('active');


    for (let i = 0; i < priceY.length; i++) {
        priceY[i].classList.remove('show');
    }
    setTimeout(() => {
        for (let i = 0; i < priceM.length; i++) {
            priceM[i].classList.add('show');
        }
    }, 375);

});


// yearly button 
yearlybtn.addEventListener('click', () => {
    monthlybtn.classList.remove('active');
    yearlybtn.classList.add('active');


    for (let i = 0; i < priceM.length; i++) {
        priceM[i].classList.remove('show');
    }

    setTimeout(() => {
        for (let i = 0; i < priceY.length; i++) {
            priceY[i].classList.add('show');
        }
    }, 375);

});