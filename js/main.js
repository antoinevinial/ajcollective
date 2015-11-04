(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Import modules.
var nav = require('./modules/nav.js');
var panel = require('./modules/panel.js');
var carousel = require('./modules/carousel.js');

$(function() {
	
	if ($('.js-nav').length) {
		nav.init();
	}

	if ($('.js-panel').length) {
		panel.init();
	}

	if ($('.js-carousel').length) {
		carousel.init();
	}

});


},{"./modules/carousel.js":2,"./modules/nav.js":3,"./modules/panel.js":4}],2:[function(require,module,exports){
var carousel = {

	ui: {},
	itemActive: 0,
	nbItems: 0,

	init: function init() {
		this.bindUI();
		this.bindEvents();
		this.initCarousel();
	},

	bindUI: function bindUI() {
		this.ui.$win      = $(window);
		this.ui.$carousel = $('.js-carousel');
		this.ui.$slider   = $('.js-carousel-slider');
		this.ui.$items    = this.ui.$carousel.find('.js-carousel-item');

		this.ui.$btns     = $('.js-carousel-btn');
		this.ui.$prev     = $('.js-carousel-btn-prev');
		this.ui.$next     = $('.js-carousel-btn-next');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('resize', $.proxy(this.initCarousel, this));
		this.ui.$btns.on('click', $.proxy(this.prevNext, this));
		this.ui.$win.on('keydown', $.proxy(this.keyboardHandler, this));
	},

	initCarousel: function initCarousel() {
		// Init variables.
		this.itemActive = 0;
		this.nbItems    = this.ui.$items.length;

		// Translate slider.
		this.translateSlider();

		// Init btns.
		this.updateBtns();
	},

	keyboardHandler: function keyboardHandler(e) {
		// If press arrow right, bind click on next btn.
		if (e.keyCode == 39) {
			this.ui.$next.click();
		}

		// If press arrow left, bind click on prev btn.
		if (e.keyCode == 37) {
			this.ui.$prev.click();
		}
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

		// Update btns.
		this.updateBtns();
	},

	updateBtns: function updateBtns() {
		if (this.itemActive == 0) {
			this.ui.$prev.addClass('is-fade');
		} else if (this.itemActive == this.ui.$items.length - 1) {
			this.ui.$next.addClass('is-fade');
		} else {
			this.ui.$btns.removeClass('is-fade');
		}
	}

};

module.exports = carousel;
},{}],3:[function(require,module,exports){
var nav = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$body   = $('body');
		this.ui.$nav    = $('.js-nav');
		this.ui.$toggle = $('.js-nav-toggle');
	},

	bindEvents: function bindEvents() {
		this.ui.$toggle.on('click', $.proxy(this.toggleNav, this));
	},

	toggleNav: function toggleNav(e) {
		// Prevent default.
		e.preventDefault();

		// Add is-nav-open class on body.
		this.ui.$body.toggleClass('is-nav-open');
	}

};

// Export nav.
module.exports = nav;

},{}],4:[function(require,module,exports){
var panel = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$panels = $('.js-panel');
		this.ui.$move   = $('.js-panel-move');
	},

	bindEvents: function bindEvents() {
		this.ui.$move.on('click', $.proxy(this.movePanel, this));
	},

	movePanel: function movePanel(e) {
		// Prevent default.
		e.preventDefault();

		// Get active panel.
		var $active = $('.js-panel.is-active');

		// Get data panel.
		var data = $(e.currentTarget).data('panel');

		// Get target panel.
		var $target = $('#' + data);

		// Move active panel.
		$active.addClass('is-push');

		// Show target panel.
		$target.addClass('is-show');
	}

};

module.exports = panel;
},{}]},{},[1]);
