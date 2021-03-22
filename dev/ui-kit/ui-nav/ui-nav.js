/**
 * 1.Bootstrap responsive menu
 * 2.Custom responsive menu
 * 3.Highlight active menu item
 * 4.Hide & show menu elements
 */

// 1.Bootstrap responsive menu
var $dropdown = $(".dropdown");
var $dropdownToggle = $(".dropdown-toggle");
var $dropdownMenu = $(".dropdown-menu");
var showClass = "show";
$dropdownToggle.on('click', function () {
    var $this = $(this);

    if ($this.parent().hasClass('show')) {
        if ($this.length && $this.attr('href')) {
            location.href = $this.attr('href');
        }
    } else {
    }
});
$(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
        $dropdown.hover(function () {
            var $this = $(this);
            $this.addClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "true");
            $this.find($dropdownMenu).addClass(showClass);
        }, function () {
            var $this = $(this);
            $this.removeClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "false");
            $this.find($dropdownMenu).removeClass(showClass);
        });
    } else {
        $dropdown.off("mouseenter mouseleave");
    }
});

// 2.Custom responsive menu
$(window).on("load resize", function () {
    if (this.matchMedia("(max-width: 991px)").matches) {
        const menu = $('.menu')
        const menuLink = menu.find('.js-menu-dropdown-toggle')

        menuLink.on('click', function(event) {
            event.preventDefault()
            if ($(this).parent().hasClass('is-active') && $(this).parent().children('.dropdown__menu').length > 0) {
                if ($(this).length && $(this).attr('href')) {
                    location.href = $(this).attr('href');
                }
            } else if ($(this).parent().children('.dropdown__menu').length === 0) {
                if ($(this).length && $(this).attr('href')) {
                    location.href = $(this).attr('href');
                }
            }
            $(this).closest('li').toggleClass('is-active')
        })
    }
})

// 3.Highlight active menu item
$(function () {
    $('nav ul li a').each(function () {
        var location = window.location.href;
        var link = this.href;
        if (location == link) {
            $(this).parents('li').addClass('is-active');
        }
    });
});

// 4.Hide & show menu elements
const navMobile = document.querySelector('.nav-mobile')
const navHeader = document.querySelector('.header__nav')
const searchHeader = document.querySelector('.search')
const socialsHeader = document.querySelector('.header__socials')
const btnHeader = document.querySelector('.header__btn')
const topPanelHeader = document.querySelector('.header__top-panel')
const sandwich = document.querySelector('.sandwich')
const phonesHeader = document.querySelectorAll('.contacts__item_mobile_sandwich')
const contactsHeader = document.querySelector('.header__contacts')
const loginHeader = document.querySelector('.header__login')
$(window).on("load resize", function () {
    if ($(window).width() <= 1000) {
        navMobile.appendChild(contactsHeader)
    } else {
        document.querySelector('.header__top-panel').prepend(contactsHeader)
    }
    if ($(window).width() <= 970) {
        navMobile.appendChild(navHeader)
    } else {
        document.querySelector('.header__content').appendChild(navHeader)
    }
    if ($(window).width() <= 670) {
        navMobile.appendChild(btnHeader)
    } else {
        document.querySelector('.header__btns').insertBefore(btnHeader, sandwich)
    }
    if ($(window).width() <= 400) {
        navMobile.appendChild(socialsHeader)
    } else {
        topPanelHeader.insertBefore(socialsHeader, loginHeader)
    }
    if ($(window).width() <= 500) {
        navMobile.appendChild(socialsHeader)
        for (let i = 0; i < phonesHeader.length; i++) {
            navMobile.appendChild(phonesHeader[i])
        }
    } else {
        topPanelHeader.appendChild(socialsHeader)
        for (let i = 0; i < phonesHeader.length; i++) {
            contactsHeader.prepend(phonesHeader[i])
        }
    }
})