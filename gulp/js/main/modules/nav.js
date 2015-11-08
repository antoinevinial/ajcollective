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
		this.ui.$links  = $('.js-nav-link');
	},

	bindEvents: function bindEvents() {
		this.ui.$toggle.on('click', $.proxy(this.toggleNav, this));
		this.ui.$links.on('click', $.proxy(this.getClickedLink, this));
	},

	toggleNav: function toggleNav(e) {
		// Prevent default.
		e.preventDefault();

		// Add is-nav-open class on body.
		this.ui.$body.toggleClass('is-nav-open');
	},

	getClickedLink: function getClickedLink(e) {
		// Prevent default.
		e.preventDefault();

		// Close nav.
		this.ui.$body.removeClass('is-nav-open');

		// Add is-active class.
		this.ui.$links.removeClass('is-active');
		$(e.currentTarget).addClass('is-active');
	}

};

// Export nav.
module.exports = nav;
