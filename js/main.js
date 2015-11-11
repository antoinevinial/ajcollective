(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Import plugins.
var jqueryMousewheel = require('jquery-mousewheel')($);
var jqueryCarousel   = require('./plugins/jquery.carousel.js');

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


},{"./modules/carousel.js":2,"./modules/contact.js":3,"./modules/nav.js":4,"./modules/panel.js":5,"./plugins/jquery.carousel.js":6,"jquery-mousewheel":7}],2:[function(require,module,exports){
var carousel = {

    init: function() {
    	$.each($('.js-carousel'), function() {
    		$(this).carouselPlugin();
    	});
    }
};

//Export module
module.exports = carousel;

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
var panel = {

	ui: {},
	scroll: 0,
	timerPanel: 500,
	isAnimated: false,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win    = $(window);
		this.ui.$panels = $('.js-panel');
		this.ui.$active = $('.js-panel.is-active');
		this.ui.$move   = $('.js-panel-move');

		this.ui.$btnTop    = this.ui.$active.find('.js-panel-move--top');
		this.ui.$btnBottom = this.ui.$active.find('.js-panel-move--bottom');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('mousewheel', $.proxy(this.scrollHandler, this));
		this.ui.$win.on('keydown', $.proxy(this.keydownHandler, this));
		this.ui.$move.on('click', $.proxy(this.movePanel, this));
	},

	scrollHandler: function scrollHandler(event) {
		// If the panel is animated, return.
		if (this.isAnimated) { return; }

		// If we scroll down and there is a next panel, click on it.
		if (event.deltaY <= -125 && this.ui.$btnBottom.length) {
			this.ui.$btnBottom.click();
		} else if (event.deltaY > 125 && this.ui.$btnTop) {
			this.ui.$btnTop.click();
		}
	},

	keydownHandler: function keydownHandler(e) {
		// If press arrow down, click on bottom link.
		if (e.keyCode == 40 && this.ui.$btnBottom.length) {
			this.ui.$btnBottom.click();
		}

		// If press arrow up, click on top link.
		if (e.keyCode == 38 && this.ui.$btnTop.length) {
			 this.ui.$btnTop.click();
		}
	},

	updateUIEvents: function updateUIEvents($target) {
		// Update active panel.
		this.ui.$active = $target;

		// Update btns.
		this.ui.$btnTop    = this.ui.$active.find('.js-panel-move--top');
		this.ui.$btnBottom = this.ui.$active.find('.js-panel-move--bottom');
	},

	movePanel: function movePanel(e) {
		var self = this,
			$el  = $(e.currentTarget);

		// Return if we already move a panel.
		if (this.isAnimated) { return; }

		// Prevent default.
		e.preventDefault();

		// Update is animated variable.
		this.isAnimated = true;

		// Get target element.
		var $target = $($el.attr('href'));

		// Get direction.
		var direction = $el.data('direction');

		// Top or bottom depending on data direction for active panel.
		if (direction == "bottom") {
			this.ui.$active.addClass('is-top');
		} else {
			this.ui.$active.addClass('is-bottom');
		}

		// Remove is-active class.
		this.ui.$active.removeClass('is-active');

		// Show target panel.
		$target.removeClass('is-top is-bottom').addClass('is-active');

		// Update UI and events.
		this.updateUIEvents($target);

		// Focus on carousel to enable keyboard navigation.
		setTimeout(function() {
			$target.find('.js-carousel-btn-next').focus();
			self.isAnimated = false;
		}, this.timerPanel);
	}

};

module.exports = panel;
},{}],6:[function(require,module,exports){
// Plugin Carousel.

(function($) {

    $.fn.carouselPlugin = function(options) {

        // Create defaults parameters in case we don't pass any argument.
        var defaults = {
            "$el" : $(this)
        };

        // Merge the defaults and the options arguments.
        var options = $.extend(defaults, options);

        // Launch the carousel function.
        return this.each(function() {

            var carousel = {

                ui: {},
                itemActive: 0,
                nbItems: 0,

                init: function init() {
                    this.bindUI();
                    this.bindEvents();
                    this.initCarousel();
                },

                bindUI: function bindUI() {
                    this.ui.$win      = $(window);
                    this.ui.$body     = $('body');
                    this.ui.$carousel = options.$el;
                    this.ui.$slider   = this.ui.$carousel.find('.js-carousel-slider');
                    this.ui.$items    = this.ui.$carousel.find('.js-carousel-item');

                    this.ui.$fullBtn  = this.ui.$carousel.find('.js-carousel-full-btn');

                    this.ui.$viewer       = this.ui.$carousel.find('.js-carousel-viewer');
                    this.ui.$viewerSlider = this.ui.$carousel.find('.js-carousel-viewer-slider');

                    this.ui.$btns     = this.ui.$carousel.find('.js-carousel-btn');
                    this.ui.$prev     = this.ui.$carousel.find('.js-carousel-btn-prev');
                    this.ui.$next     = this.ui.$carousel.find('.js-carousel-btn-next');
                },

                bindEvents: function bindEvents() {
                    this.ui.$win.on('resize', $.proxy(this.initCarousel, this));
                    this.ui.$btns.on('click', $.proxy(this.prevNext, this));
                    this.ui.$carousel.on('keydown', $.proxy(this.keyboardHandler, this));
                    this.ui.$fullBtn.on('click', $.proxy(this.toggleFullScreen, this));
                },

                initCarousel: function initCarousel() {
                    // Init variables.
                    this.itemActive = 0;
                    this.nbItems    = this.ui.$items.length;

                    // Init viewer.
                    this.initViewer();

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();

                    // Init btns.
                    this.updateBtns();
                },

                keyboardHandler: function keyboardHandler(e) {
                    // If press arrow right, bind click on next btn.
                    if (e.keyCode == 39 && !this.ui.$body.hasClass('is-carousel-full')) {
                        this.ui.$next.click();
                    }

                    // If press arrow left, bind click on prev btn.
                    if (e.keyCode == 37 && !this.ui.$body.hasClass('is-carousel-full')) {
                        this.ui.$prev.click();
                    }

                    // If press esc, close full screen.
                    if (e.keyCode == 27 && this.ui.$body.hasClass('is-carousel-full')) {
                        this.ui.$body.removeClass('is-carousel-full');
                    }
                },

                initViewer: function initViewer() {
                    var viewerHTML = '';

                    // Loop through each carousel items and create thumbnail.
                    $.each(this.ui.$items, function() {
                        var $el = $(this);

                        // If item has text inside, create list item with icon.
                        if ($el.hasClass('js-carousel-item--text')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item">';
                            viewerHTML += '<svg class="icon icon-text" viewBox="0 0 30 39"><rect fill="#FFFFFF" x="0" y="0" width="25" height="2"></rect><rect fill="#FFFFFF" x="0" y="7" width="30" height="2"></rect><rect fill="#4D4D4D" x="0" y="14" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="18" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="22" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="26" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="30" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="34" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="38" width="20" height="1"></rect></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has a doc inside, create list item with icon.
                        if ($el.hasClass('js-carousel-item--doc')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item">';
                            viewerHTML += '<svg class="icon icon-pdf--sml" viewBox="0 0 26 40"><rect x="0" y="0" width="26" height="40"></rect></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has picture inside, create a thumbnail.
                        if ($el.find('img').length) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item">';
                            viewerHTML += '<img class="carousel__viewer__img" src="' + $el.find('img').attr('src') + '"/>';
                            viewerHTML += '</li>';
                        }
                    });

                    // Add all carousel viewer item inside carousel slider.
                    this.ui.$viewerSlider.html('').append(viewerHTML);

                    // Bind new UI.
                    this.ui.$viewerItems = this.ui.$carousel.find('.js-carousel-viewer-item');
                },

                prevNext: function prevNext(e) {
                    // Get direction.
                    var direction = $(e.currentTarget).data('direction');

                    // Return if we reach the first or last item.
                    if (direction == "prev" && this.itemActive == 0) { return; }
                    if (direction == "next" && this.itemActive == this.nbItems - 1) { return; }

                    // Get item active index.
                    if (direction == "next") {
                        this.itemActive++;
                    } else {
                        this.itemActive--;
                    }

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();
                },

                translateSlider: function translateSlider() {
                    var translate = 0;

                    // Loop through each items and get current item left position.
                    for (i = 0; i < this.itemActive; i++) {
                        translate -= $(this.ui.$items[i]).outerWidth();
                    }

                    // Translate carousel container for animations.
                    this.ui.$slider.css({
                        "-webkit-transform":"translate(" + translate + "px,0)",
                        "-moz-transform":"translate(" + translate + "px,0)",
                        "-ms-transform":"translate(" + translate + "px,0)",
                        "-o-transform":"translate(" + translate + "px,0)",
                        "transform":"translate(" + translate + "px,0)"
                    });

                    // Add is-active class on current item.
                    this.ui.$items.removeClass('is-active');
                    $(this.ui.$items[this.itemActive]).addClass('is-active');

                    // Update btns.
                    this.updateBtns();
                },

                translateViewer: function translateViewer() {
                    var translate = 0;

                    // Loop through each items and get current item left position.
                    for (i = 0; i < this.itemActive; i++) {
                        translate -= $(this.ui.$viewerItems[i]).outerWidth();
                    }

                    // Translate carousel container for animations.
                    this.ui.$viewerSlider.css({
                        "-webkit-transform":"translate(" + translate + "px,0)",
                        "-moz-transform":"translate(" + translate + "px,0)",
                        "-ms-transform":"translate(" + translate + "px,0)",
                        "-o-transform":"translate(" + translate + "px,0)",
                        "transform":"translate(" + translate + "px,0)"
                    });
                },

                updateBtns: function updateBtns() {
                    if (this.itemActive == 0) {
                        this.ui.$prev.addClass('is-fade');
                        this.ui.$next.removeClass('is-fade');
                    } else if (this.itemActive == this.ui.$items.length - 1) {
                        this.ui.$prev.removeClass('is-fade');
                        this.ui.$next.addClass('is-fade');
                    } else {
                        this.ui.$btns.removeClass('is-fade');
                    }
                },

                toggleFullScreen: function toggleFullScreen(e) {
                    // Prevent default.
                    e.preventDefault();

                    // Add correct class on body.
                    this.ui.$body.toggleClass('is-carousel-full');
                }

            };

            // Intialize the carousel.
            carousel.init();
        });

    };

})(jQuery);
},{}],7:[function(require,module,exports){
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

},{}]},{},[1]);
