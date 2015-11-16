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