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

    $('.quiz__btn-close').on('click', function (e) {
        e.preventDefault();
        let stepActive = $('.quiz__step--active');
        if (stepActive.hasClass("quiz__step--one")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--two').addClass('quiz__step--active');
        } else if (stepActive.hasClass("quiz__step--two")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--three').addClass('quiz__step--active');
        } else if (stepActive.hasClass("quiz__step--three")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--four').addClass('quiz__step--active');
        } else if (stepActive.hasClass("quiz__step--four")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--five').addClass('quiz__step--active');
        } else if (stepActive.hasClass("quiz__step--five")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--six').addClass('quiz__step--active');
            $('.quiz__btn').text('Отправить');
        } else if (stepActive.hasClass("quiz__step--six")) {
            $('#popup-quiz form').submit()
        }
    });


    // анимация при сколле
    function animations() {
        $('.animate, .animate-line').each(function () {
            let animation = $(this).attr('data-animation');
            let top = $(document).scrollTop() + jQuery(window).height();
            let pos_top = $(this).offset().top + 100;
            let checkClassAnimateLine = $(this).hasClass('animate-line')
            if (top > pos_top && checkClassAnimateLine) {
                $(this).addClass('animate-line__animated');
            } else if (top > pos_top) {
                $(this).addClass('animate__animated  animate__' + animation);
            }
        });
    }


    $(window).on('load scroll', function () {
        animations();
    })

    // триггер скрола, для появления анимации  если она вверху страницы, не дожидаясь скролла пользователя
    $(window).scroll()

})
let headerNavToggle = document.querySelector('.header__nav-toggle')
let mainNavToggle = document.querySelector('.main-nav__close')
let mainNav= document.querySelector('.main-nav')

function navToggle (){
    mainNav.classList.toggle('main-nav--open')
}
headerNavToggle.addEventListener('click',navToggle)
mainNavToggle.addEventListener('click',navToggle)
