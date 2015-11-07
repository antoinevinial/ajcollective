var contact = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$body   = $('body');
		this.ui.$toggle = $('.js-contact-toggle');
	},

	bindEvents: function bindEvents() {
		this.ui.$toggle.on('click', $.proxy(this.toggleContact, this));
	},

	toggleContact: function toggleContact(e) {
		// Prevent default.
		e.preventDefault();

		// Toggle class on body.
		this.ui.$body.toggleClass('is-contact-open');
	}

};

module.exports = contact;