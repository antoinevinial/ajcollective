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
