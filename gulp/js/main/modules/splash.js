// Require imagesloaded plugin.
var imagesLoaded = require('imagesloaded');

var splash = {

	ui: {},
	imgsLength: 0,
	imgsLoaded: 0,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win = $(window);
		this.ui.$splash  = $('.js-splash');
	},

	bindEvents: function bindEvents() {
		var self = this;

		setTimeout(function() {
			self.toggleSplash();
		}, 3000);
	},

	toggleSplash: function toggleSplash() {
		this.ui.$splash.removeClass('is-visible');
	}

};

module.exports = splash;