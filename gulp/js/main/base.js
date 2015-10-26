// Import modules.
var nav = require('./modules/nav.js');

$(function() {
	
	if ($('.js-nav').length) {
		nav.init();
	}

});

