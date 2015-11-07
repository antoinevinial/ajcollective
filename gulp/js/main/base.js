// Import modules.
var nav = require('./modules/nav.js');
var panel = require('./modules/panel.js');
var carousel = require('./modules/carousel.js');
var contact = require('./modules/contact.js');

$(function() {
	
	if ($('.js-nav').length) {
		nav.init();
	}

	if ($('.js-panel').length) {
		panel.init();
	}

	if ($('.js-carousel').length) {
		carousel.init();
	}

	if ($('.js-contact-toggle').length) {
		contact.init();
	}

});

