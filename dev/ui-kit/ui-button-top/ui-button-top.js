$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop()!=0) {
            $('.js-top-btn').fadeIn(500);
        }
        else {
            $('.js-top-btn').fadeOut(500);
        }
    });
    if ($(this).scrollTop()!=0) {
        $('.js-top-btn').fadeIn();
    }
    else {
        $('.js-top-btn').fadeOut();
    }
    $('.js-top-btn').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});