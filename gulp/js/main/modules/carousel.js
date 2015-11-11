var carousel = {

    init: function() {
    	$.each($('.js-carousel'), function() {
    		$(this).carouselPlugin();
    	});
    }
};

//Export module
module.exports = carousel;
