// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // jQuery Typed plugin
    $('#typed').typed({
        stringsElement: $('#typed-strings'),
        typeSpeed: 100,
        cursorChar: '|',
        backDelay: 500,
        contentType: 'html',
        loop: true,
        loopCount: Infinity,
        // callback: function() {
        //     callHeading();
        // }
    });

})(jQuery); // End of use strict

    // function callHeading() {
    //     console.log('Callback!');
    //     $('.intro-heading').show(500);
    // }
