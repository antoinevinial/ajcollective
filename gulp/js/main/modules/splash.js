// Require imagesloaded plugin.
var imagesLoaded = require('imagesloaded');

var splash = {

	ui: {},
	imgsLength: 0,
	imgsLoaded: 0,

	init: function init() {
		this.bindUI();
		this.initSplash();
	},

	bindUI: function bindUI() {
		this.ui.$splash  = $('.js-splash');
		this.ui.$loader  = $('.js-splash-loader');
		this.ui.$percent = $('.js-splash-percent');
		this.ui.$imgs = $('img');
	},

	initSplash: function initSplash() {
		var self = this;

		// Get container to track img loading.
		var imgLoad = imagesLoaded('body');

		// Get number of imgs.
		this.imgsLength = imgLoad.images.length;

		// Bind event each time an image is loaded.
		imgLoad.on( 'always', function() {
			for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
			    var image = imgLoad.images[i];
			    
			    // Update imgsLoaded counter.
			    self.imgsLoaded++;

			    // Update splash screen.
			    self.updateSplash();
			}
		});
	},

	updateSplash: function updateSplash() {
		var percent = Math.round(this.imgsLoaded / this.imgsLength * 100);

		console.log('yo');

		// Update percent value.
		this.ui.$percent.text(percent + '%');

		// Hide splash when all images are loaded.
		if (this.imgsLength == this.imgsLoaded) {
			this.ui.$splash.removeClass('is-visible');
		}
	}

};

module.exports = splash;