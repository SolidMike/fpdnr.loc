/**
 * 1.Svg for everebody
 * 2.Fixed header
 * 3.Custom sandwich with overlay
 * 4.Custom responsive menu
 * 5.Highlight active menu item
 * 6.Hide & show menu elements
 * 7.yandex-map on hover
 * 8.magnific-popup
 * 9.to-top-btn
 */

// 1.Svg for everebody
$(document).ready(function () {
    svg4everybody({})
})

// 2.Fixed header
$(function () {
    const windowHeight = window.innerHeight
    const headerHeight = document.querySelector('.header').offsetHeight
    const contentHeight = document.querySelector('.wrapper').offsetHeight

    if (contentHeight - headerHeight > windowHeight) {
        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                $('.header').addClass('header--fixed')
            } else {
                $('.header').removeClass('header--fixed')
            }
        })
    }
})

// 3.Custom sandwich with overlay
const sandwichToggle = function () {
    // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
    let sandwichElements = document.querySelectorAll('.js-sandwich-toggle')
    // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс
    sandwichElements.forEach((item) => {
        item.addEventListener('click', showSandwichTarget)
    })

    function showSandwichTarget() {
        let targetElem = this.getAttribute('data-target'),
            targetClassToggle = this.getAttribute('data-target-class-toggle')
        this.classList.toggle('is-active')
        if (targetElem && targetClassToggle) {
            document
                .getElementsByClassName(targetElem)[0]
                .classList.toggle(targetClassToggle)
        }
        $(document).mouseup(function (e) {
            var container = $('.nav-mobile')

            // if the target of the click isn't the container nor a descendant of the container
            if (
                !container.is(e.target) &&
                container.has(e.target).length === 0
            ) {
                document
                    .querySelector('.js-sandwich-toggle')
                    .classList.remove('is-active')
                document
                    .getElementsByClassName(targetElem)[0]
                    .classList.remove(targetClassToggle)
            }
        })
    }
}
sandwichToggle()

// 4.Custom responsive menu
$(window).on('load resize', function () {
    if (this.matchMedia('(max-width: 1100px)').matches) {
        const menu = $('.menu')
        const menuLink = menu.find('.js-menu-dropdown-toggle')

        menuLink.on('click', function (event) {
            event.preventDefault()
            if (
                $(this).parent().hasClass('is-active') &&
                $(this).parent().children('.dropdown__menu').length > 0
            ) {
                if (
                    $(this).length &&
                    $(this).attr('href') &&
                    !$(this).is('[data-link-state]')
                ) {
                    location.href = $(this).attr('href')
                }
            } else if (
                $(this).parent().children('.dropdown__menu').length === 0
            ) {
                if (
                    $(this).length &&
                    $(this).attr('href') &&
                    !$(this).is('[data-link-state]')
                ) {
                    location.href = $(this).attr('href')
                }
            }
            $(this).closest('li').toggleClass('is-active')
        })
    }
})

// 5.Highlight active menu item
$(function () {
    $('nav ul li a').each(function () {
        var location = window.location.href
        var link = this.href
        if (location == link) {
            $(this).parents('li').addClass('is-active')
        }
    })
})

// 6.Hide & show menu elements
const $navMobile = document.querySelector('.nav-mobile')
const $navHeader = document.querySelector('.header__nav .menu')
const $searchHeader = document.querySelector('.header__search')
const $btnHeader = document.querySelector('.header__btn')
const $infoHeader = document.querySelector('.header__info')
const $sandwich = document.querySelector('.sandwich')
const $contactsHeader = document.querySelector('.header__contacts')
const $navMobileContacts = document.querySelector('.nav-mobile__contacts')
const $contactsItem = document.querySelectorAll(
    '.header__contacts .contacts__item.contacts__item--mobile--hidden'
)

$(window).on('load resize', function () {
    if ($(window).width() <= 920) {
        $navMobile.appendChild($searchHeader)
    } else {
        $infoHeader.insertBefore($searchHeader, $sandwich)
    }
    if ($(window).width() <= 1100) {
        $navMobile.appendChild($navHeader)
    } else {
        document.querySelector('.header__nav').appendChild($navHeader)
    }
    if ($(window).width() <= 1200) {
        $navMobile.appendChild($btnHeader)
    } else {
        $infoHeader.appendChild($btnHeader)
    }

    if ($(window).width() <= 750) {
        for (let i = 0; i < $contactsItem.length; i++) {
            $navMobileContacts.appendChild($contactsItem[i])
        }
    } else {
        for (let i = 0; i < $contactsItem.length; i++) {
            $contactsHeader.prepend($contactsItem[i])
        }
    }
})

var swiper = new Swiper('.js-gallery-slider', {
    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 30,
    navigation: {
        nextEl: '.js-gallery-btn-next',
        prevEl: '.js-gallery-btn-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            slidesPerColumn: 2,
        },
        576: {
            slidesPerView: 2,
            slidesPerColumn: 2,
        },
        768: {
            slidesPerView: 3,
            slidesPerColumn: 2,
        },
    },
})

var heroSwiper = new Swiper('.js-hero-slider', {
    slidesPerView: 1,
    allowTouchMove: false,
    autoplay: true,
    speed: 500,
})

//7.yandex-map on hover

//Переменная для включения/отключения индикатора загрузки
var spinner = $('.map__wrapper').children('.loader')
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init() {
    var myMapTemp = new ymaps.Map('map-yandex', {
        center: [47.998661, 37.805302], // координаты центра на карте
        zoom: 16, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'], // выбираем только те функции, которые необходимы при использовании
    })
    var myPlacemarkTemp = new ymaps.Placemark(
        [47.998661, 37.805302],
        {
            balloonContent: 'ул. Артёма 87, Донецк',
        },
        {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            //iconImageHref: 'img/map-marker.png',
            // Размеры метки.
            iconImageSize: [50, 50],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-25, -50],
        }
    )
    myMapTemp.geoObjects.add(myPlacemarkTemp) // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0)

    // Решение по callback-у для определения полной загрузки карты
    waitForTilesLoad(layer).then(function () {
        // Скрываем индикатор загрузки после полной загрузки карты
        spinner.removeClass('is-active')
    })
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer),
            readyAll = true
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false
            }
        })
        if (readyAll) {
            resolve()
        } else {
            tc.events.once('ready', function () {
                resolve()
            })
        }
    })
}

function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
                layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k]
            }
        }
    }
    return null
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback) {
    var script = document.createElement('script')

    if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
            if (
                script.readyState == 'loaded' ||
                script.readyState == 'complete'
            ) {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {
        // Другие браузеры
        script.onload = function () {
            callback()
        }
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function () {
    $('.map__wrapper').mouseenter(function () {
        if (!check_if_load) {
            // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

            // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
            check_if_load = true

            // Показываем индикатор загрузки до тех пор, пока карта не загрузится
            spinner.addClass('is-active')

            // Загружаем API Яндекс.Карт
            loadScript(
                'https://api-maps.yandex.ru/2.1/?apikey=079199d3-8494-4878-93d9-da27d87e0443&lang=ru_RU&amp;loadByRequire=1',
                function () {
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init)
                }
            )
        }
    })
}

$(function () {
    //Запускаем основную функцию
    ymap()
})

//8.magnific-popup
if (typeof pdoPage !== 'undefined') {
    pdoPage.callbacks['after'] = function (config, response) {
        $('#pdopage').removeClass('loading')
        $('#pdopage').css({
            opacity: 1,
        })
        $('[data-magnific-popup="gallery"]').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                preload: [0, 2],
            },
        })
    }
}

$('[data-magnific-popup="gallery"]').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true,
        preload: [0, 2],
    },
})

//9.to-top-btn
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('.js-top-btn').fadeIn(500)
        } else {
            $('.js-top-btn').fadeOut(500)
        }
    })
    if ($(this).scrollTop() != 0) {
        $('.js-top-btn').fadeIn()
    } else {
        $('.js-top-btn').fadeOut()
    }
    $('.js-top-btn').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 800)
    })
})

document.addEventListener('DOMContentLoaded', function () {
    let e = document.querySelectorAll('[data-link-state]')
    Array.prototype.forEach.call(e, function (e) {
        'disabled' === e.dataset.linkState &&
            (e.onclick = (e) => {
                e.preventDefault()
            })
    })
})
