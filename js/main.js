(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Import modules.
var content = require('./modules/content.js');

$(function() {

	// Add content inside the page from the JSON.
	content.init();

});


},{"./modules/content.js":4}],2:[function(require,module,exports){
var carousel = {

    init: function() {
    	$.each($('.js-carousel'), function() {
    		$(this).carouselPlugin();
    	});
    }
};

//Export module
module.exports = carousel;

},{}],3:[function(require,module,exports){
var contact = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win    = $(window);
		this.ui.$body   = $('body');
		this.ui.$toggle = $('.js-contact-toggle');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('keydown', $.proxy(this.keyboardHandler, this));
		this.ui.$toggle.on('click', $.proxy(this.toggleContact, this));
	},

	keyboardHandler: function keyboardHandler(e) {
		if (e.keyCode == 27 && this.ui.$body.hasClass('is-contact-open')) {
			this.ui.$body.removeClass('is-contact-open');
		}
	},

	toggleContact: function toggleContact(e) {
		// Prevent default.
		e.preventDefault();

		// Toggle class on body.
		this.ui.$body.toggleClass('is-contact-open');
	}

};

module.exports = contact;
},{}],4:[function(require,module,exports){
// Import plugins.
var jqueryMousewheel = require('jquery-mousewheel')($);
var jqueryCarousel   = require('./../plugins/jquery.carousel.js');

// Import modules.
var slideshow = require('./slideshow.js');
var nav = require('./nav.js');
var panel = require('./panel.js');
var carousel = require('./carousel.js');
var contact = require('./contact.js');
var splash = require('./splash.js');

var content = {

	ui: {},
	JSON: '',

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$main    = $('.js-main');
		this.ui.$navList = $('.js-nav-list');
	},

	bindEvents: function bindEvents() {
		this.getContent();
	},

	getContent: function getContent() {
		var self = this;

		$.getJSON("../data.json", function(data) {

			// Save content inside global variable.
			self.JSON = data;

		}).done(function() {
		    // Build navigation.
		    self.buildNav();

		    // Build panels.
		    self.buildPanels();

		    // Update splash screens.
		    splash.init();

		    // Init slideshow.
		    slideshow.init();

		    // Init navigation.
		    nav.init();

		    // Init panels.
		    panel.init();

		    // Init carousel.
		    carousel.init();

		    // Init contact.
		    contact.init();

		});
	},

	buildNav: function buildNav() {
		// Init navHTML variable.
		var navHTML = '';

		// Loop through the JSON and create list item for each link.
		$.each(this.JSON, function() {
			navHTML += '<li class="nav__item">';
			navHTML += '<a class="nav__link js-nav-link" href="#' + this.id + '">';
			navHTML += '<h2 class="nav__link__name">' + this.name + '</h2>';
			navHTML += '<h3 class="nav__link__jobtitle">' + this.jobtitle + '</h3>';
			if (this.thumbnail) { navHTML += '<img class="nav__link__img js-nav-img" src="' + this.thumbnail + '"/>'; }
			navHTML += '</a></li>';
		});

		// Append content inside navList.
		this.ui.$navList.html('').append(navHTML);
	},

	buildPanels: function buildPanels() {
		var self = this;

		// Init panelHTML variable.
		var panelHTML = '';

		// Loop through the JSON and create panel for each person.
		$.each(this.JSON, function() {

			// Start section.
			panelHTML += '<section class="panel panel--black js-panel is-bottom" id="' + this.id + '"';

				// Start pager.
				panelHTML += '<div class="panel__pager">';
					panelHTML += '<div class="panel__btn panel__btn--top panel__btn--bordered panel__btn--bordered--top">';
						panelHTML += '<span class="panel__btn__label panel__btn__label--left panel__btn__label--lrg">AJCollective</span>';

						// If there is a prev person.
						if (self.JSON[this.id - 1]) {
							panelHTML += '<a class="panel__btn__label panel__btn__label--bordered js-panel-move js-panel-move--top" data-direction="top" href="#' + (this.id - 1) + '">Prev ' + self.JSON[this.id - 1].jobtitle + '</a>';
						} else {
							panelHTML += '<a class="panel__btn__label panel__btn__label--bordered js-panel-move js-panel-move--top" data-direction="top" href="#home">Back home</a>';
						}

						panelHTML += '<a class="panel__btn__label panel__btn__label--right js-contact-toggle" href="#">About / Contact</a>';
					panelHTML += '</div>';

					// If there is a next person, build next link.
					if (self.JSON[this.id + 1]) {
						panelHTML += '<div class="panel__btn panel__btn--bottom panel__btn--bordered panel__btn--bordered--bottom">';
							panelHTML += '<a class="panel__btn__label js-panel-move js-panel-move--bottom" data-direction="bottom" href="#' + (this.id + 1) + '">Next ' + self.JSON[this.id + 1].jobtitle + '</a>';
						panelHTML += '</div>';
					} else {
						panelHTML += '<div class="panel__btn panel__btn--bottom"></div>';
					}

					panelHTML += '<div class="panel__btn panel__btn--left">';
						panelHTML += '<a class="panel__btn__label js-nav-toggle" href="#">Creative Researchers &amp; Writers</a>';
					panelHTML += '</div>';
				panelHTML += '</div>';

				// Start content.
				panelHTML += '<div class="panel__container">';
					panelHTML += '<div class="grid">';
						panelHTML += '<div class="cell-31 prepend-5">';

						// Change carousel markup based on the template to use.
						if (this.template == "researcher") {
							panelHTML += '<div class="carousel js-carousel">';
								panelHTML += '<ul class="carousel__slider js-carousel-slider">';
									panelHTML += '<li class="carousel__item carousel__item--text js-carousel-item js-carousel-item--text">';
										panelHTML += '<h2 class="heading-2">' + this.name + '</h2>';
										panelHTML += '<span class="carousel__jobtitle">' + this.jobtitle + '</span>';
										panelHTML += '<p class="carousel__txt">' + this.description + '</p>';
									panelHTML += '</li>';

									// Loop through each medias.
									for (i = 0; i < this.medias.length; i++) {
										var str = this.medias[i];

											if (str.search('vimeo') != -1) {
												panelHTML += '<li class="carousel__item js-carousel-item js-carousel-item--video" data-index="' + (i + 1) + '">';
													panelHTML += '<div class="carousel__item__container">';
														panelHTML += '<div class="carousel__video">';
														panelHTML += this.medias[i];
														panelHTML += '</div>';

											} else {
												panelHTML += '<li class="carousel__item js-carousel-item" data-index="' + (i + 1) + '">';
													panelHTML += '<div class="carousel__item__container">';
														panelHTML += '<img class="carousel__img" src="' + this.medias[i] + '"/>';
														panelHTML += '<a class="carousel__full js-carousel-full-btn" href="#"><svg class="icon icon-full" viewBox="0 0 20 20"><path d="M7,9 L7,11 L1,17 L1,15 L0,15 L0,20 L5,20 L5,19 L3,19 L9,13 L11,13 L17,19 L15,19 L15,20 L20,20 L20,15 L19,15 L19,17 L13,11 L13,9 L19,3 L19,5 L20,5 L20,0 L15,0 L15,1 L17,1 L11,7 L9,7 L3,1 L5,1 L5,0 L0,0 L0,5 L1,5 L1,3 L7,9 Z"></path></svg></a>';
											}

											panelHTML += '</div>';
										panelHTML += '</li>';
									}

								panelHTML += '</ul>';
						} else if (this.template == "writer") {
							panelHTML += '<div class="carousel carousel--writer js-carousel">';
								panelHTML += '<ul class="carousel__slider js-carousel-slider">';
									panelHTML += '<li class="carousel__item carousel__item--text js-carousel-item js-carousel-item--text" data-index="' + (i + 1) + '">';
										panelHTML += '<h2 class="heading-2">' + this.name + '</h2>';
										panelHTML += '<span class="carousel__jobtitle">' + this.jobtitle + '</span>';
										panelHTML += '<p class="carousel__txt">' + this.description + '</p>';
									panelHTML += '</li>';

									// Loop through each document.
									for (i = 0; i < this.documents.length; i++) {
										panelHTML += '<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc" data-index="' + (i + 1) + '">';
											panelHTML += '<div class="carousel__doc">';
												panelHTML += '<span class="carousel__doc__title">' + this.documents[i].title + '</span>';
												panelHTML += '<span class="carousel__doc__type">' + this.documents[i].type + '</span>';
												panelHTML += '<span class="carousel__doc__pages">' + this.documents[i].pages + '</span>';
												panelHTML += '<a class="carousel__doc__overlay" href="' + this.documents[i].link + '" target="_blank">';
													panelHTML += '<span class="carousel__doc__btn"><svg class="icon icon-pdf" viewBox="0 0 18 20"><path d="M6,0 L18,0 L18,2 L6,2 L6,0 Z M16,2 L18,2 L18,15 L16,15 L16,2 Z M12,13 L16,13 L16,15 L12,15 L12,13 Z M6,2 L8,2 L8,5 L6,5 L6,2 Z M0,5 L12,5 L12,7 L0,7 L0,5 Z M10,7 L12,7 L12,20 L10,20 L10,7 Z M0,18 L10,18 L10,20 L0,20 L0,18 Z M0,7 L2,7 L2,18 L0,18 L0,7 Z"></path></svg></span>';
												panelHTML += '</a>';
											panelHTML += '</div>';
										panelHTML += '</li>';
									}

								panelHTML += '</ul>';
						}

						panelHTML += '<div class="carousel__pager">'
							panelHTML += '<button class="carousel__btn carousel__btn--prev js-carousel-btn js-carousel-btn-prev" data-direction="prev" href="#"></button>';
							panelHTML += '<button class="carousel__btn carousel__btn--next js-carousel-btn js-carousel-btn-next" data-direction="next" href="#"></button>';
						panelHTML += '</div>';

						panelHTML += '<div class="carousel__viewer js-carousel-viewer">';
							panelHTML += '<div class="carousel__viewer__rectangle"></div>';
							panelHTML += '<div class="carousel__viewer__slider js-carousel-viewer-slider"></div>';
						panelHTML += '</div>';

						panelHTML += '<a class="carousel__close js-carousel-full-btn js-carousel-full-close" href="#">leave full screen view';
							panelHTML += '<span class="carousel__close__btn"><svg class="icon icon-close" viewBox="0 0 20 20"><path d="M0,2.12133113 L18.0001831,20.1213311 L20.1214927,18 L2.12130955,0 L0,2.12133113 L0,2.12133113 Z"></path><path d="M17.8914413,0 L0,17.8915564 L2.10855875,20 L20,2.10844362 L17.8914413,0 L17.8914413,0 Z"></path></svg></span>';
						panelHTML += '</a>';

						// Close carousel.
						panelHTML += '</div>';

						panelHTML += '</div>';
					panelHTML += '</div>';
				panelHTML += '</div>';
			
			// Close section.
			panelHTML += '</section>';

		});

		// Append panels inside main container.
		this.ui.$main.append(panelHTML);
	}

};

module.exports = content;

},{"./../plugins/jquery.carousel.js":9,"./carousel.js":2,"./contact.js":3,"./nav.js":5,"./panel.js":6,"./slideshow.js":7,"./splash.js":8,"jquery-mousewheel":12}],5:[function(require,module,exports){
var nav = {

	ui: {},
	timerNav: 350,
	timerPanel: 500,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$body    = $('body');
		this.ui.$nav     = $('.js-nav');
		this.ui.$navList = $('.js-nav-list');
		this.ui.$panels  = $('.js-panel');
		this.ui.$toggle  = $('.js-nav-toggle');
		this.ui.$links   = $('.js-nav-link');
		this.ui.$imgs    = $('.js-nav-img');
		this.ui.$panels  = $('.js-panel');
	},

	bindEvents: function bindEvents() {
		var self = this;

		this.ui.$toggle.on('click', $.proxy(this.toggleNav, this));
		this.ui.$links.on('click', $.proxy(this.getClickedLink, this));
		this.ui.$panels.on('mouseenter', $.proxy(this.hideImgs, this));
		this.ui.$toggle.on('mouseenter', $.proxy(this.hideImgs, this));

		this.ui.$links.on('mousemove', self.throttle(function(e){
		    self.overHandler(e);
		}, 20));
	},

	overHandler: function overHandler(e) {
		var $el  = $(e.currentTarget),
			$img = $el.find('.js-nav-img');
			X    = e.pageX,
			Y    = e.pageY - $el.offset().top;

		// Remove is-hover class on all links.
		this.ui.$links.not($el).removeClass('is-hover');

		// Translate Image.
		$img.css({
		    "-webkit-transform":"translate(" + X + "px," + Y + "px)",
		    "-moz-transform":"translate(" + X + "px," + Y + "px)",
		    "-ms-transform":"translate(" + X + "px," + Y + "px)",
		    "-o-transform":"translate(" + X + "px," + Y + "px)",
		    "transform":"translate(" + X + "px," + Y + "px)"
		});

		// Add class is-hover.
		if (!$el.hasClass('is-hover')) {
			setTimeout(function() {
				$el.addClass('is-hover');
			}, 80);
		}
	},

	hideImgs: function hideImgs() {
		this.ui.$links.removeClass('is-hover');
	},

	toggleNav: function toggleNav(e) {
		// Prevent default.
		e.preventDefault();

		// Add is-nav-open class on body.
		this.ui.$body.toggleClass('is-nav-open');

		// Remove is-hover class on all links.
		this.ui.$links.removeClass('is-hover');
	},

	getClickedLink: function getClickedLink(e) {
		var self = this,
			$el  = $(e.currentTarget);

		// Prevent default.
		e.preventDefault();

		// Close nav.
		this.ui.$body.removeClass('is-nav-open');

		// Add is-active class.
		this.ui.$links.removeClass('is-active');
		$(e.currentTarget).addClass('is-active');

		// Go to panel.
		setTimeout(function() {
			self.goToPanel($el);
		}, this.timerNav);
	},

	goToPanel: function goToPanel($el) {
		var self = this,
			href = $el.attr('href');

		// Get active panel.
		var $active = $('.js-panel.is-active');

		// Get target panel.
		var $target = $(href);

		// Add no transition on hiding panels.
		this.ui.$panels.not($active).not($target).addClass('no-transition');

		// Get index of the clicked link.
		var index = this.ui.$navList.find('li').index($el.parent());

		// Add is-bottom class on all panel.
		$.each(this.ui.$panels, function() {
			$(this).not($active).removeClass('is-top').addClass('is-bottom'); 
		});

		// Loop through each panel until the target one.
		for (i = 0; i < index + 1; i++) {
			$(this.ui.$panels[i]).not($active).removeClass('is-bottom').addClass('is-top');
		}

		// Get href of active and target.
		var hrefAct    = $active.attr('id').replace("#", "");
		var hrefTarget = $target.attr('id').replace("#", "");

		if (hrefTarget > hrefAct || hrefAct == "home") {
			$active.removeClass('is-active').addClass('is-top');
			$target.removeClass('is-top is-bottom').addClass('is-active');
		} else {
			$active.removeClass('is-active').addClass('is-bottom');
			$target.removeClass('is-top is-bottom').addClass('is-active');
		}

		// Remove no transition classes.
		setTimeout(function() {
			self.ui.$panels.removeClass('no-transition');
		}, this.timerPanel);
	},

	throttle: function throttle(callback, delay) {
	    var last;
	    var timer;

	    return function () {
	        var context = this;
	        var now = +new Date();
	        var args = arguments;
	        if (last && now < last + delay) {
	            // le délai n'est pas écoulé on reset le timer
	            clearTimeout(timer);
	            timer = setTimeout(function () {
	                last = now;
	                callback.apply(context, args);
	            }, delay);
	        } else {
	            last = now;
	            callback.apply(context, args);
	        }
	    };
	}

};

// Export nav.
module.exports = nav;

},{}],6:[function(require,module,exports){
var panel = {

	ui: {},
	scroll: 0,
	timerPanel: 500,
	isAnimated: false,

	touch: {
		isCalculating: false,
	    start: 0,
	    move: 0,
	    delta: 0
	},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win    = $(window);
		this.ui.$body   = $('body');
		this.ui.$panels = $('.js-panel');
		this.ui.$active = $('.js-panel.is-active');
		this.ui.$move   = $('.js-panel-move');

		this.ui.$navItems = $('.js-nav-list').find('li');
		this.ui.$navLink  = $('.js-nav-link');

		this.ui.$btnTop    = this.ui.$active.find('.js-panel-move--top');
		this.ui.$btnBottom = this.ui.$active.find('.js-panel-move--bottom');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('mousewheel', $.proxy(this.scrollHandler, this));
		this.ui.$win.on('keydown', $.proxy(this.keydownHandler, this));
		this.ui.$move.on('click', $.proxy(this.movePanel, this));
		this.ui.$navLink.on('click', $.proxy(this.updatePanel, this));

		// Touch events.
		this.ui.$win.on('touchstart', $.proxy(this.touchStart, this));
		this.ui.$win.on('touchmove', $.proxy(this.touchMove, this));
	},

	scrollHandler: function scrollHandler(event) {

		// If the panel is animated, return.
		if (this.isAnimated || this.ui.$body.hasClass('is-nav-open')) { return; }

		// If we scroll down and there is a next panel, click on it.
		if (event.deltaY <= -50 && this.ui.$btnBottom.length) {
			this.ui.$btnBottom.click();
		} else if (event.deltaY > 50 && this.ui.$btnTop) {
			this.ui.$btnTop.click();
		}
	},

	keydownHandler: function keydownHandler(e) {
		// If press arrow down, click on bottom link.
		if (e.keyCode == 40 && this.ui.$btnBottom.length) {
			this.ui.$btnBottom.click();
		}

		// If press arrow up, click on top link.
		if (e.keyCode == 38 && this.ui.$btnTop.length) {
			 this.ui.$btnTop.click();
		}

		// If press arrow right, bind click on next btn.
		if (e.keyCode == 39) {
			$('.js-panel.is-active').find('.js-carousel-btn-next').click();
		}

		// If press arrow left, bind click on prev btn.
		if (e.keyCode == 37) {
		    $('.js-panel.is-active').find('.js-carousel-btn-prev').click();
		}
	},

	touchStart: function touchStart(e) {
	    // Prevent default.
	    e.preventDefault();

	    // Update touch start position.
	    this.touch.start = e.originalEvent.touches[0].pageY;
	},

	touchMove: function touchMove(e) {
		// If panels are already animated, do nothing.
		if (this.touch.isCalculating) { return; }

		// Update touch move position.
		this.touch.move = e.originalEvent.touches[0].pageY;

		// Update isCalculating variable.
		this.touch.isCalculating = true;

		// Click prev or next btn.
		if (this.touch.start > this.touch.move && this.ui.$btnBottom) {
			this.ui.$btnBottom.click();
		} else if (this.touch.start < this.touch.move && this.ui.$btnTop) {
			this.ui.$btnTop.click();
		}
	},

	movePanel: function movePanel(e) {
		var self = this,
			$el  = $(e.currentTarget);

		// Return if we already move a panel.
		if (this.isAnimated) { return; }

		// Prevent default.
		e.preventDefault();

		// Update is animated variable.
		this.isAnimated = true;

		// Get target element.
		var $target = $($el.attr('href'));

		// Get direction.
		var direction = $el.data('direction');

		// Top or bottom depending on data direction for active panel.
		if (direction == "bottom") {
			this.ui.$active.addClass('is-top');
		} else {
			this.ui.$active.addClass('is-bottom');
		}

		// Remove is-active class.
		this.ui.$active.removeClass('is-active');

		// Show target panel.
		$target.removeClass('is-top is-bottom').addClass('is-active');

		// Update UI and events.
		this.updateUIEvents($target);

		// Focus on carousel to enable keyboard navigation.
		setTimeout(function() {
			$target.find('.js-carousel-btn-next').focus();
			self.isAnimated = false;
			self.touch.isCalculating = false;
		}, this.timerPanel);
	},

	updatePanel: function updatePanel(e) {
		var $target = $($(e.currentTarget).attr('href'));

		this.updateUIEvents($target);
	},

	updateUIEvents: function updateUIEvents($target) {
		// Update active panel.
		this.ui.$active = $target;

		// Get current ID.
		var id = this.ui.$active.attr('id');

		// Update btns.
		this.ui.$btnTop    = this.ui.$active.find('.js-panel-move--top');
		this.ui.$btnBottom = this.ui.$active.find('.js-panel-move--bottom');

		// Update navigation.
		if (id != 'home') {
			this.ui.$navLink.removeClass('is-active');
			this.ui.$navItems.eq(id).find('.js-nav-link').addClass('is-active');
		} else {
			this.ui.$navLink.removeClass('is-active');
		}
	},

};

module.exports = panel;
},{}],7:[function(require,module,exports){
var slideshow = {

	ui: {},
	intervalListener: '',
	itemActive: 0,
	timer: 200,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$slideshow = $('.js-slideshow');
		this.ui.$home      = $('#home');
		this.ui.$items     = this.ui.$slideshow.find('.js-slideshow-item');
		this.ui.$move      = $('.js-panel-move');
	},

	bindEvents: function bindEvents() {
		var self = this;

		// Init slideshow.
		this.launchSlideshow();

		// Bind slideshow on click.
		this.ui.$move.on('click', $.proxy(this.playPauseSlideshow, this));
	},

	playPauseSlideshow: function playPauseSlideshow() {
		var self = this;

		setTimeout(function() {
			if (self.ui.$home.hasClass('is-active')) {
				self.launchSlideshow();
			} else {
				self.pauseSlideshow();
			}
		}, 20);
	},

	launchSlideshow: function launchSlideshow() {
		var self = this;

		intervalListener = setInterval(function() {
			self.changeSlide();
		}, this.timer);
	},

	pauseSlideshow: function pauseSlideshow() {
		window.clearInterval(intervalListener);
	},

	changeSlide: function changeSlide() {
		// Update itemActive variable.
		if (this.itemActive == (this.ui.$items.length - 1)) {
			this.itemActive = 0;
		} else {
			this.itemActive++;
		}

		// Remove is-active class on all items.
		this.ui.$items.removeClass('is-active');

		// Add on next item.
		$(this.ui.$items[this.itemActive]).addClass('is-active');
	},

};

module.exports = slideshow;
},{}],8:[function(require,module,exports){
// Require imagesloaded plugin.
var imagesLoaded = require('imagesloaded');

var splash = {

	ui: {},
	imgsLength: 0,
	imgsLoaded: 0,

	init: function init() {
		this.bindUI();
		this.initSplash();
	},

	bindUI: function bindUI() {
		this.ui.$splash  = $('.js-splash');
		this.ui.$loader  = $('.js-splash-loader');
		this.ui.$percent = $('.js-splash-percent');
		this.ui.$imgs = $('img');
	},

	initSplash: function initSplash() {
		var self = this;

		// Get container to track img loading.
		var imgLoad = imagesLoaded('body');

		// Get number of imgs.
		this.imgsLength = imgLoad.images.length;

		// Bind event each time an image is loaded.
		imgLoad.on( 'always', function() {
			for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
			    var image = imgLoad.images[i];
			    
			    // Update imgsLoaded counter.
			    self.imgsLoaded++;

			    // Update splash screen.
			    self.updateSplash();
			}
		});
	},

	updateSplash: function updateSplash() {
		var percent = Math.round(this.imgsLoaded / this.imgsLength * 100);

		// Update percent value.
		this.ui.$percent.text(percent + '%');

		// Hide splash when all images are loaded.
		if (this.imgsLength == this.imgsLoaded) {
			this.ui.$splash.removeClass('is-visible');
		}
	}

};

module.exports = splash;
},{"imagesloaded":11}],9:[function(require,module,exports){
// Plugin Carousel.

(function($) {

    $.fn.carouselPlugin = function(options) {

        // Create defaults parameters in case we don't pass any argument.
        var defaults = {
            "$el" : $(this)
        };

        // Merge the defaults and the options arguments.
        var options = $.extend(defaults, options);

        // Launch the carousel function.
        return this.each(function() {

            var carousel = {

                ui: {},
                itemActive: 0,
                nbItems: 0,
                timerLinks: 250,
                timerCarousel: 350,

                init: function init() {
                    this.bindUI();
                    this.bindEvents();
                    this.initCarousel();
                },

                bindUI: function bindUI() {
                    this.ui.$win      = $(window);
                    this.ui.$body     = $('body');
                    this.ui.$loader   = $('.js-loader');

                    this.ui.$carousel = options.$el;
                    this.ui.$slider   = this.ui.$carousel.find('.js-carousel-slider');
                    this.ui.$items    = this.ui.$carousel.find('.js-carousel-item');

                    this.ui.$fullBtn   = this.ui.$carousel.find('.js-carousel-full-btn');

                    this.ui.$viewer       = this.ui.$carousel.find('.js-carousel-viewer');
                    this.ui.$viewerSlider = this.ui.$carousel.find('.js-carousel-viewer-slider');

                    this.ui.$btns     = this.ui.$carousel.find('.js-carousel-btn');
                    this.ui.$prev     = this.ui.$carousel.find('.js-carousel-btn-prev');
                    this.ui.$next     = this.ui.$carousel.find('.js-carousel-btn-next');
                },

                bindEvents: function bindEvents() {
                    this.ui.$win.on('resize', $.proxy(this.initCarousel, this));
                    this.ui.$win.on('load', $.proxy(this.initCarousel, this));
                    this.ui.$btns.on('click', $.proxy(this.prevNext, this));
                    this.ui.$win.on('keydown', $.proxy(this.keyboardHandler, this));

                    this.ui.$fullBtn.on('click', $.proxy(this.toggleFullScreen, this));
                },

                initCarousel: function initCarousel() {
                    // Init variables.
                    this.itemActive = 0;
                    this.nbItems    = this.ui.$items.length;

                    // Init viewer.
                    this.initViewer();

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();

                    // Init btns.
                    this.updateBtns();
                },

                keyboardHandler: function keyboardHandler(e) {
                    // If press esc, close full screen.
                    if (e.keyCode == 27 && this.ui.$body.hasClass('is-carousel-full')) {
                        this.toggleFullScreen();
                    }
                },

                initViewer: function initViewer() {
                    var viewerHTML = '';

                    // Loop through each carousel items and create thumbnail.
                    $.each(this.ui.$items, function() {
                        var $el   = $(this),
                            index = $el.index();

                        // If item has text inside, create list item with icon.
                        if ($el.hasClass('js-carousel-item--text')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<svg class="icon icon-text" viewBox="0 0 30 39"><rect fill="#FFFFFF" x="0" y="0" width="25" height="2"></rect><rect fill="#FFFFFF" x="0" y="7" width="30" height="2"></rect><rect fill="#4D4D4D" x="0" y="14" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="18" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="22" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="26" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="30" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="34" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="38" width="20" height="1"></rect></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has a video inside, create video item with icon.
                        if ($el.hasClass('js-carousel-item--video')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<img class="carousel__viewer__img" src="' + $el.find('iframe').data('thumbnail') + '"/>';
                            viewerHTML += '</li>';
                        }

                        // If item has a doc inside, create list item with icon.
                        if ($el.hasClass('js-carousel-item--doc')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<svg class="icon icon-pdf--sml" viewBox="0 0 26 40"><rect x="0" y="0" width="26" height="40"></rect></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has picture inside, create a thumbnail.
                        if ($el.find('img').length) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<img class="carousel__viewer__img" src="' + $el.find('img').attr('src') + '"/>';
                            viewerHTML += '</li>';
                        }
                    });

                    // Add all carousel viewer item inside carousel slider.
                    this.ui.$viewerSlider.html('').append(viewerHTML);

                    // Bind new UI.
                    this.ui.$viewerItems = this.ui.$carousel.find('.js-carousel-viewer-item');

                    // Bind new event/
                    this.ui.$viewerItems.on('click', $.proxy(this.goTo, this));
                },

                goTo: function goTo(e) {
                    var index = $(e.currentTarget).data('index');

                    // Update item active variable.
                    this.itemActive = index;

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();
                },

                prevNext: function prevNext(e) {
                    // Get direction.
                    var direction = $(e.currentTarget).data('direction');

                    // Return if we reach the first or last item.
                    if (direction == "prev" && this.itemActive == 0) { return; }
                    if (direction == "next" && this.itemActive == this.nbItems - 1) { return; }

                    // Get item active index.
                    if (direction == "next") {
                        this.itemActive++;
                    } else {
                        this.itemActive--;
                    }

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();
                },

                translateSlider: function translateSlider() {
                    var translate = 0;

                    // Loop through each items and get current item left position.
                    for (i = 0; i < this.itemActive; i++) {
                        translate -= $(this.ui.$items[i]).outerWidth();
                    }

                    // Translate carousel container for animations.
                    this.ui.$slider.css({
                        "-webkit-transform":"translate(" + translate + "px,0)",
                        "-moz-transform":"translate(" + translate + "px,0)",
                        "-ms-transform":"translate(" + translate + "px,0)",
                        "-o-transform":"translate(" + translate + "px,0)",
                        "transform":"translate(" + translate + "px,0)"
                    });

                    // Add is-active class on current item.
                    this.ui.$items.removeClass('is-active');
                    $(this.ui.$items[this.itemActive]).addClass('is-active');

                    // Update btns.
                    this.updateBtns();
                },

                translateViewer: function translateViewer() {
                    var translate = 0;

                    // Loop through each items and get current item left position.
                    for (i = 0; i < this.itemActive; i++) {
                        translate -= $(this.ui.$viewerItems[i]).outerWidth();
                    }

                    // Translate carousel container for animations.
                    this.ui.$viewerSlider.css({
                        "-webkit-transform":"translate(" + translate + "px,0)",
                        "-moz-transform":"translate(" + translate + "px,0)",
                        "-ms-transform":"translate(" + translate + "px,0)",
                        "-o-transform":"translate(" + translate + "px,0)",
                        "transform":"translate(" + translate + "px,0)"
                    });
                },

                updateBtns: function updateBtns() {
                    if (this.itemActive == 0) {
                        this.ui.$prev.addClass('is-fade');
                        this.ui.$next.removeClass('is-fade');
                    } else if (this.itemActive == this.ui.$items.length - 1) {
                        this.ui.$prev.removeClass('is-fade');
                        this.ui.$next.addClass('is-fade');
                    } else {
                        this.ui.$btns.removeClass('is-fade');
                    }
                },

                toggleFullScreen: function toggleFullScreen(e) {
                    var self = this;

                    // Prevent default.
                    if (e) {
                        e.preventDefault();
                    }

                    // Show loader.
                    this.ui.$loader.addClass('is-visible');

                    // Wait anim loader to be finished.
                    setTimeout(function() {

                        // Add correct class on body.
                        self.ui.$body.toggleClass('is-carousel-full');

                        // Wait carousel full to be toggle.
                        setTimeout(function() {

                            // Update item active variable only if it's not the close btn.
                            if (e && !$(e.currentTarget).hasClass('js-carousel-full-close')) {
                                self.itemActive = $(e.currentTarget).closest('.js-carousel-item').data('index');
                            }

                            // Translate slider.
                            self.translateSlider();

                            // Translate viewer.
                            self.translateViewer();

                            // Hide loader.
                            setTimeout(function() {
                                self.ui.$loader.removeClass('is-visible');
                            }, self.timerCarousel);

                        }, self.timerCarousel);

                    }, this.timerLinks); 
                }

            };

            // Intialize the carousel.
            carousel.init();
        });

    };

})(jQuery);
},{}],10:[function(require,module,exports){
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

},{}],11:[function(require,module,exports){
/*!
 * imagesLoaded v3.2.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) == '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options, onAlways );
    }
    // use elem as selector string
    if ( typeof elem == 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options == 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0; i < this.elements.length; i++ ) {
      var elem = this.elements[i];
      this.addElementImages( elem );
    }
  };

  /**
   * @param {Node} element
   */
  ImagesLoaded.prototype.addElementImages = function( elem ) {
    // filter siblings
    if ( elem.nodeName == 'IMG' ) {
      this.addImage( elem );
    }
    // get background image on element
    if ( this.options.background === true ) {
      this.addElementBackgroundImages( elem );
    }

    // find children
    // no non-element nodes, #143
    var nodeType = elem.nodeType;
    if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
      return;
    }
    var childImgs = elem.querySelectorAll('img');
    // concat childElems to filterFound array
    for ( var i=0; i < childImgs.length; i++ ) {
      var img = childImgs[i];
      this.addImage( img );
    }

    // get child background images
    if ( typeof this.options.background == 'string' ) {
      var children = elem.querySelectorAll( this.options.background );
      for ( i=0; i < children.length; i++ ) {
        var child = children[i];
        this.addElementBackgroundImages( child );
      }
    }
  };

  var elementNodeTypes = {
    1: true,
    9: true,
    11: true
  };

  ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
    var style = getStyle( elem );
    // get url inside url("...")
    var reURL = /url\(['"]*([^'"\)]+)['"]*\)/gi;
    var matches = reURL.exec( style.backgroundImage );
    while ( matches !== null ) {
      var url = matches && matches[1];
      if ( url ) {
        this.addBackground( url, elem );
      }
      matches = reURL.exec( style.backgroundImage );
    }
  };

  // IE8
  var getStyle = window.getComputedStyle || function( elem ) {
    return elem.currentStyle;
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.addBackground = function( url, elem ) {
    var background = new Background( url, elem );
    this.images.push( background );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    this.progressedCount = 0;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !this.images.length ) {
      this.complete();
      return;
    }

    function onProgress( image, elem, message ) {
      // HACK - Chrome triggers event before object properties have changed. #83
      setTimeout( function() {
        _this.progress( image, elem, message );
      });
    }

    for ( var i=0; i < this.images.length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.once( 'progress', onProgress );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image, elem, message ) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // progress event
    this.emit( 'progress', this, image, elem );
    if ( this.jqDeferred && this.jqDeferred.notify ) {
      this.jqDeferred.notify( this, image );
    }
    // check if completed
    if ( this.progressedCount == this.images.length ) {
      this.complete();
    }

    if ( this.options.debug && console ) {
      console.log( 'progress: ' + message, image, elem );
    }
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emit( eventName, this );
    this.emit( 'always', this );
    if ( this.jqDeferred ) {
      var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[ jqMethod ]( this );
    }
  };

  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    var isComplete = this.getIsImageComplete();
    if ( isComplete ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    this.proxyImage = new Image();
    eventie.bind( this.proxyImage, 'load', this );
    eventie.bind( this.proxyImage, 'error', this );
    // bind to image as well for Firefox. #191
    eventie.bind( this.img, 'load', this );
    eventie.bind( this.img, 'error', this );
    this.proxyImage.src = this.img.src;
  };

  LoadingImage.prototype.getIsImageComplete = function() {
    return this.img.complete && this.img.naturalWidth !== undefined;
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'progress', this, this.img, message );
  };

  // ----- events ----- //

  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  LoadingImage.prototype.onload = function() {
    this.confirm( true, 'onload' );
    this.unbindEvents();
  };

  LoadingImage.prototype.onerror = function() {
    this.confirm( false, 'onerror' );
    this.unbindEvents();
  };

  LoadingImage.prototype.unbindEvents = function() {
    eventie.unbind( this.proxyImage, 'load', this );
    eventie.unbind( this.proxyImage, 'error', this );
    eventie.unbind( this.img, 'load', this );
    eventie.unbind( this.img, 'error', this );
  };

  // -------------------------- Background -------------------------- //

  function Background( url, element ) {
    this.url = url;
    this.element = element;
    this.img = new Image();
  }

  // inherit LoadingImage prototype
  Background.prototype = new LoadingImage();

  Background.prototype.check = function() {
    eventie.bind( this.img, 'load', this );
    eventie.bind( this.img, 'error', this );
    this.img.src = this.url;
    // check if image is already complete
    var isComplete = this.getIsImageComplete();
    if ( isComplete ) {
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      this.unbindEvents();
    }
  };

  Background.prototype.unbindEvents = function() {
    eventie.unbind( this.img, 'load', this );
    eventie.unbind( this.img, 'error', this );
  };

  Background.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'progress', this, this.element, message );
  };

  // -------------------------- jQuery -------------------------- //

  ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
    jQuery = jQuery || window.jQuery;
    if ( !jQuery ) {
      return;
    }
    // set local variable
    $ = jQuery;
    // $().imagesLoaded()
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  };
  // try making plugin
  ImagesLoaded.makeJQueryPlugin();

  // --------------------------  -------------------------- //

  return ImagesLoaded;

});

},{"eventie":10,"wolfy87-eventemitter":13}],12:[function(require,module,exports){
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

},{}],13:[function(require,module,exports){
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

},{}]},{},[1]);
