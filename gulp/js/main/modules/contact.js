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