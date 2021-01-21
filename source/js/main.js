'use strict'
let headerNavToggle = document.querySelector('.header__nav-toggle')
let mainNavToggle = document.querySelector('.main-nav__close')
let mainNav= document.querySelector('.main-nav')

function navToggle (){
    mainNav.classList.toggle('main-nav--open')
}
headerNavToggle.addEventListener('click',navToggle)
mainNavToggle.addEventListener('click',navToggle)
