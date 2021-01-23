'use strict'

$(document).ready(function () {
    function animateScroll(positionToScroll, delay) {
        $('html, body').animate({scrollTop: positionToScroll}, delay);
    }
    $(".animate-scroll").click(function (e) {
        e.preventDefault();
        let elementClick = $(this).attr("href");
        if (elementClick == 'top') {
            animateScroll(0, 600);
        } else {
            let destination = $(elementClick).offset().top;
            let mainNav = $(".main-nav");
            animateScroll(destination, 600);
            if (mainNav.hasClass('main-nav--open')){
                mainNav.toggleClass('main-nav--open')
            }
        }
        return false;
    })

    $('.input--phone').inputmask({"mask": "+7(999) 999-99-99"})

    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

})
let headerNavToggle = document.querySelector('.header__nav-toggle')
let mainNavToggle = document.querySelector('.main-nav__close')
let mainNav= document.querySelector('.main-nav')

function navToggle (){
    mainNav.classList.toggle('main-nav--open')
}
headerNavToggle.addEventListener('click',navToggle)
mainNavToggle.addEventListener('click',navToggle)
