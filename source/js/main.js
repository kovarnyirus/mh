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
            if (mainNav.hasClass('main-nav--open')) {
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


    let quizProgressStep = $('.quiz__progress-step')
    let quizProgressAll = $('.quiz__progress-all')
    let btn = $('.quiz__btn-close');
    let quizProgressLineDone = $('.quiz__progress-line-done');

    function quizPrevStep(e) {
        e.preventDefault();
        let stepActive = $('.quiz__step--active');
        if (stepActive.hasClass("quiz__step--two")) {
            stepActive.removeClass('quiz__step--active');
            btn.attr('disabled', true)
            $('.quiz__step--one').addClass('quiz__step--active');
            quizProgressStep.text('1')
            quizProgressLineDone.width('5%')
        } else if (stepActive.hasClass("quiz__step--three")) {
            $('.quiz__step--three').addClass('quiz__step--active');
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--two').addClass('quiz__step--active');
            quizProgressStep.text('2')
            quizProgressLineDone.width('20%')
        } else if (stepActive.hasClass("quiz__step--four")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--three').addClass('quiz__step--active');
            quizProgressStep.text('3')
            quizProgressLineDone.width('40%')
        } else if (stepActive.hasClass("quiz__step--five")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--four').addClass('quiz__step--active');
            quizProgressStep.text('4')
            quizProgressLineDone.width('60%')
            // $('.quiz__btn').text('Отправить');
        } else if (stepActive.hasClass("quiz__step--six")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--five').addClass('quiz__step--active');
            quizProgressStep.text('5')
            quizProgressAll.show()
            quizProgressLineDone.width('80%')
            // $('#popup-quiz form').submit()
        }
    }

    function quizNextStep(e) {
        let stepActive = $('.quiz__step--active');
        if (stepActive.hasClass("quiz__step--one")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--two').addClass('quiz__step--active');
            btn.attr('disabled', false)
            quizProgressStep.text('2')
            quizProgressLineDone.width('20%')
        } else if (stepActive.hasClass("quiz__step--two")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--three').addClass('quiz__step--active');
            quizProgressStep.text('3')
            quizProgressLineDone.width('40%')
        } else if (stepActive.hasClass("quiz__step--three")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--four').addClass('quiz__step--active');
            quizProgressStep.text('4')
            quizProgressLineDone.width('60%')
        } else if (stepActive.hasClass("quiz__step--four")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--five').addClass('quiz__step--active');
            quizProgressStep.text('5')
            quizProgressLineDone.width('80%')
        } else if (stepActive.hasClass("quiz__step--five")) {
            stepActive.removeClass('quiz__step--active');
            $('.quiz__step--six').addClass('quiz__step--active');
            quizProgressStep.text('Спасибо, что ответили на вопросы')
            quizProgressAll.hide()
            quizProgressLineDone.width('100%')
            // $('.quiz__btn').text('Отправить');
        } else if (stepActive.hasClass("quiz__step--six")) {
            // $('#popup-quiz form').submit()
        }
    }

    $('.quiz__step').on('change', function (e) {
        quizNextStep(e)
    });

    $('.quiz__btn-close').on('click', function (e) {
        quizPrevStep(e)
    });

    $('.custom-select').select2({
        minimumResultsForSearch: -1,
    })


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

    var swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            }
        }
    });

})
let headerNavToggle = document.querySelector('.header__nav-toggle')
let mainNavToggle = document.querySelector('.main-nav__close')
let mainNav = document.querySelector('.main-nav')

function navToggle() {
    mainNav.classList.toggle('main-nav--open')
}

headerNavToggle.addEventListener('click', navToggle)
mainNavToggle.addEventListener('click', navToggle)
