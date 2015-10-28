var carousel = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$carousel = $('.js-carousel');
	},

	bindEvents: function bindEvents() {
		console.log(this.ui.$carousel);
	}

};

module.exports = carousel;