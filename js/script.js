(function($) {
    'use strict';

    /* ========================================================================= */
    /*	Page Preloader
    /* ========================================================================= */

    $(window).on('load', function() {
        // preloader
        $('.preloader').fadeOut(700);

        // Portfolio Filtering
        var containerEl = document.querySelector('.filtr-container');
        var filterizd;
        if (containerEl) {
            filterizd = $('.filtr-container').filterizr({});
        }
        //Active changer
        $('.portfolio-filter button').on('click', function() {
            $('.portfolio-filter button').removeClass('active');
            $(this).addClass('active');
        });
    });

    /* ========================================================================= */
    /*	Post image slider
    /* ========================================================================= */
    $('#post-thumb, #gallery-post').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000

    });
    $('#features').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });


    /* ========================================================================= */
    /*	Magnific popup
    /* =========================================================================  */
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 160, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function() {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true,
        fixedContentPos: false,
        fixedBgPos: true
    });

    // counterUp
    function counter() {
        var oTop;
        if ($('.jsCounter').length !== 0) {
            oTop = $('.jsCounter').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.jsCounter').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },

                    {
                        duration: 500,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
            });
        }
    }

    $(window).on('scroll', function() {
        counter();
    });



    //   magnific popup video
    $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-zoom-in',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
    });

    /* ========================================================================= */
    /*	Testimonial Carousel
    /* =========================================================================  */
    //Init the carousel
    $('#testimonials').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });


    /* ========================================================================= */
    /*	Smooth Scroll
    /* ========================================================================= */
    $('a.nav-link, .smooth-scroll').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(':focus')) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    }
                });
            }
        }
    });
})(jQuery);
// End Jquery Function


/* ========================================================================= */
/*	Animated section
/* ========================================================================= */

var wow = new WOW({
    offset: 100, // distance to the element when triggering the animation (default is 0)
    mobile: false // trigger animations on mobile devices (default is true)
});
wow.init();

/* ========================================================================= */
/*	Navbar Menu Collapse
/* ========================================================================= */

//Navbar Menu Collapse after click on options

$('.navbar-collapse a').click(function() {
    $(".navbar-collapse").collapse('hide');
});

//Navbar Menu Collapse after click anywhere 

$('body').click(function() {
    $(".navbar-collapse").collapse('hide');
});

//Navbar Menu Collapse on scrolling down or up

/* ========================================================================= */
/*   Top and Bottom buttons
/* ========================================================================= */
//Get the button:
var topbutton = document.getElementById("TopBtn");
var Btmbutton = document.getElementById("BtmBtn");

//When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20) {
        topbutton.style.display = "inline";
        Btmbutton.style.display = "inline";
    } else {

        $('.BtmBtn').hide(1300);
        $('.TopBtn').hide(1300);
    }
}

/* ========================================================================= */
/*	Social Media Floating Icons
/* ========================================================================= */

$(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
        $('.social-media').css({
            'display': 'inline'
        });
    } else {
        $('.social-media').hide(800);
    }
});


/* ========================================================================= */
/*	Copyright Year
/* ========================================================================= */
window.addEventListener('load', (
    function() {
        document.getElementById('copyright-year').appendChild(
            document.createTextNode(
                new Date().getFullYear()
            )
        );
    }
));

/* ========================================================================= */
/*	International Telephone Input
/* ========================================================================= */
var input = document.querySelector("#mobile");
window.intlTelInput(input, {
    // allowDropdown: false,
    // autoHideDialCode: false,
    autoPlaceholder: "off",
    // dropdownContainer: document.body,
    // excludeCountries: ["us"],
    // formatOnDisplay: false,
    // geoIpLookup: function(callback) {
    //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
    //     var countryCode = (resp && resp.country) ? resp.country : "";
    //     callback(countryCode);
    //   });
    // },
    hiddenInput: "full",
    // initialCountry: "auto",
    // localizedCountries: { 'de': 'Deutschland' },
    // nationalMode: false,
    // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    // placeholderNumberType: "MOBILE",
    // preferredCountries: ['cn', 'jp'],
    preferredCountries: ["in"],
    separateDialCode: true,
    utilsScript: "plugins/international_telephone_input/js/utils.js",
});


$("form.gform").submit(function() {
    var full_number = input.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='mobile[full]'").val(full_number);
    alert(full_number)
});