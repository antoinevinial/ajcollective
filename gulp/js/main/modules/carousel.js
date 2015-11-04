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