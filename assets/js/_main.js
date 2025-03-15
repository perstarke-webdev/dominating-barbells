/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(function() {
  // FitVids init
  $("#main").fitVids();

  // Sticky sidebar
  var stickySideBar = function() {
    var show =
      $(".author__urls-wrapper").find("button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper").find("button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  stickySideBar();

  $(window).resize(function() {
    stickySideBar();
  });

  // Follow menu drop down
  $(".author__urls-wrapper").find("button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper").find("button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function() {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function() {
      $(".search-content").find("input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).has("> img").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  $('.page__content').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
      var anchor = document.createElement("a");
      anchor.className = 'header-link';
      anchor.href = '#' + id;
      anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas fa-link\"></i>';
      anchor.title = "Permalink";
      $(this).append(anchor);
    }
  });
});


/* ==========================================================================
   Own js
   ========================================================================== */

var zero = document.getElementById('ref-zero');
var one = document.getElementById('ref-one');
var two = document.getElementById('ref-two');
var three = document.getElementById('ref-three');
var four = document.getElementById('ref-four');
var five = document.getElementById('ref-five');
var six = document.getElementById('ref-six');
var seven = document.getElementById('ref-seven');
var eight = document.getElementById('ref-eight');
var nine = document.getElementById('ref-nine');
var ten = document.getElementById('ref-ten');
var eleven = document.getElementById('ref-eleven');
var twelve = document.getElementById('ref-twelve');
var fourteen = document.getElementById('ref-fourteen');
var fifteen = document.getElementById('ref-fifteen');
var thirteen = document.getElementById('ref-thirteen');
var sixteen = document.getElementById('ref-sixteen');
var seventeen = document.getElementById('ref-seventeen');
var eighteen = document.getElementById('ref-eighteen');
var nineteen = document.getElementById('ref-nineteen');
var twenty = document.getElementById('ref-twenty');
var twentyone = document.getElementById('ref-twenty-one');
var twentytwo = document.getElementById('ref-twenty-two');
var twentythree = document.getElementById('ref-twenty-three');
var twentyfour = document.getElementById('ref-twenty-four');
var twentyfive = document.getElementById('ref-twenty-five');
var twentysix = document.getElementById('ref-twenty-six');
var twentyseven = document.getElementById('ref-twenty-seven');
var twentyeight = document.getElementById('ref-twenty-eight');
var twentynine = document.getElementById('ref-twenty-nine');
var thirty = document.getElementById('ref-thirty');
var thirtyone = document.getElementById('ref-thirty-one');
var thirtytwo = document.getElementById('ref-thirty-two');
var thirtythree = document.getElementById('ref-thirty-three');
var thirtyfour = document.getElementById('ref-thirty-four');
var thirtyfive = document.getElementById('ref-thirty-five');
var thirtysix = document.getElementById('ref-thirty-six');
var thirtyseven = document.getElementById('ref-thirty-seven');
var thirtyeight = document.getElementById('ref-thirty-eight');
var thirtynine = document.getElementById('ref-thirty-nine');


// Fade in elements on scroll

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Das Element ist im sichtbaren Bereich
      entry.target.classList.add('fade-in');
    }
  });
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver(handleIntersection, options);
observer.observe(zero);
observer.observe(one);
observer.observe(two);
observer.observe(three);
observer.observe(four);
observer.observe(five);
observer.observe(six);
observer.observe(seven);
observer.observe(eight);
observer.observe(nine);
observer.observe(ten);
observer.observe(eleven);
observer.observe(twelve);
observer.observe(fourteen);
observer.observe(thirteen);
observer.observe(fifteen);
observer.observe(sixteen);
observer.observe(seventeen);
observer.observe(eighteen);
observer.observe(nineteen);
observer.observe(twenty);
observer.observe(twentyone);
observer.observe(twentytwo);
observer.observe(twentythree);
observer.observe(twentyfour);
observer.observe(twentyfive);
observer.observe(twentysix);
observer.observe(twentyseven);
observer.observe(twentyeight);
observer.observe(twentynine);
observer.observe(thirty);
observer.observe(thirtyone);
observer.observe(thirtytwo);
observer.observe(thirtythree);
observer.observe(thirtyfour);
observer.observe(thirtyfive);
observer.observe(thirtysix);
observer.observe(thirtyseven);
observer.observe(thirtyeight);
observer.observe(thirtynine);


