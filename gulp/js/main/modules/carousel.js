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
		this.ui.$items    = $('.js-carousel-item');

		this.ui.$viewer       = $('.js-carousel-viewer');
		this.ui.$viewerSlider = $('.js-carousel-viewer-slider');

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
		// If press arrow right, bind click on next btn.
		if (e.keyCode == 39) {
			this.ui.$next.click();
		}

		// If press arrow left, bind click on prev btn.
		if (e.keyCode == 37) {
			this.ui.$prev.click();
		}
	},

	initViewer: function initViewer() {
		var viewerHTML = '';

		// Loop through each carousel items and create thumbnail.
		$.each(this.ui.$items, function() {
			var $el = $(this);

			// If item has text inside.
			if ($el.hasClass('js-carousel-item--text')) {
				viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item">';
				viewerHTML += '<svg width="30px" height="39px" viewBox="0 0 30 39"><rect fill="#FFFFFF" x="0" y="0" width="25" height="2"></rect><rect fill="#FFFFFF" x="0" y="7" width="30" height="2"></rect><rect fill="#4D4D4D" x="0" y="14" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="18" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="22" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="26" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="30" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="34" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="38" width="20" height="1"></rect></svg>';
				viewerHTML += '</li>';
			}

			// If item has picture inside, create a thumbnail.
			if ($el.find('img').length) {
				viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item">';
				viewerHTML += '<img class="carousel__viewer__img" src="' + $el.find('img').attr('src') + '"/>';
				viewerHTML += '</li>';
			}
		});

		// Add all carousel viewer item inside carousel slider.
		this.ui.$viewerSlider.append(viewerHTML);

		// Bind new UI.
		this.ui.$viewerItems = $('.js-carousel-viewer-item');
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
		} else if (this.itemActive == this.ui.$items.length - 1) {
			this.ui.$next.addClass('is-fade');
		} else {
			this.ui.$btns.removeClass('is-fade');
		}
	}

};

module.exports = carousel;