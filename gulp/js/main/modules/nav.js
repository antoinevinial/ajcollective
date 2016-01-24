var nav = {

	ui: {},
	timerNav: 350,
	timerPanel: 500,

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$body    = $('body');
		this.ui.$nav     = $('.js-nav');
		this.ui.$navList = $('.js-nav-list');
		this.ui.$panels  = $('.js-panel');
		this.ui.$toggle  = $('.js-nav-toggle');
		this.ui.$links   = $('.js-nav-link');
		this.ui.$imgs    = $('.js-nav-img');
		this.ui.$panels  = $('.js-panel');

		this.ui.$navMobile = $('.js-nav-mobile');
		this.ui.$navMobileLinks = this.ui.$navMobile.find('.js-nav-link');
		this.ui.$navMobilePanels = this.ui.$navMobile.find('.js-nav-mobile-panel');
		this.ui.$navMobileBtn = this.ui.$navMobile.find('.js-nav-mobile-btn');
		this.ui.$navMobilePanelBtn = this.ui.$navMobile.find('.js-nav-mobile-btn-panel');
		this.ui.$navMobilePanelLinks = this.ui.$navMobile.find('.js-nav-mobile-panel-link');
	},

	bindEvents: function bindEvents() {
		var self = this;

		this.ui.$toggle.on('click', $.proxy(this.toggleNav, this));
		this.ui.$links.on('click', $.proxy(this.getClickedLink, this));
		this.ui.$panels.on('mouseenter', $.proxy(this.hideImgs, this));
		this.ui.$toggle.on('mouseenter', $.proxy(this.hideImgs, this));
		this.ui.$links.on('mousemove', self.throttle(function(e){
		    self.overHandler(e);
		}, 20));

		// Nav mobile.
		this.ui.$navMobileBtn.on('click', $.proxy(this.toggleNavMobile, this));
		this.ui.$navMobilePanelBtn.on('click', $.proxy(this.hideNavMobilePanel, this));
		this.ui.$navMobilePanelLinks.on('click', $.proxy(this.switchPanel, this));
		this.ui.$navMobileLinks.on('click', $.proxy(this.hideNavMobilePanel, this));
	},

	overHandler: function overHandler(e) {
		var $el  = $(e.currentTarget),
			$img = $el.find('.js-nav-img');
			X    = e.pageX,
			Y    = e.pageY - $el.offset().top;

		// Remove is-hover class on all links.
		this.ui.$links.not($el).removeClass('is-hover');

		// Translate Image.
		$img.css({
		    "-webkit-transform":"translate(" + X + "px," + Y + "px)",
		    "-moz-transform":"translate(" + X + "px," + Y + "px)",
		    "-ms-transform":"translate(" + X + "px," + Y + "px)",
		    "-o-transform":"translate(" + X + "px," + Y + "px)",
		    "transform":"translate(" + X + "px," + Y + "px)"
		});

		// Add class is-hover.
		if (!$el.hasClass('is-hover')) {
			setTimeout(function() {
				$el.addClass('is-hover');
			}, 80);
		}
	},

	hideImgs: function hideImgs() {
		this.ui.$links.removeClass('is-hover');
	},

	toggleNav: function toggleNav(e) {
		// Prevent default.
		e.preventDefault();

		// Add is-nav-open class on body.
		this.ui.$body.toggleClass('is-nav-open');

		// Remove is-hover class on all links.
		this.ui.$links.removeClass('is-hover');
	},

	getClickedLink: function getClickedLink(e) {
		var self = this,
			$el  = $(e.currentTarget);

		// Prevent default.
		e.preventDefault();

		// Close nav.
		this.ui.$body.removeClass('is-nav-open is-nav-mobile-open is-nav-mobile-panel-open');

		// Add is-active class.
		this.ui.$links.removeClass('is-active');
		$(e.currentTarget).addClass('is-active');

		// Go to panel.
		setTimeout(function() {
			self.goToPanel($el);
		}, this.timerNav);
	},

	goToPanel: function goToPanel($el) {
		var self = this,
			href = $el.attr('href');

		// Get active panel.
		var $active = $('.js-panel.is-active');

		// Get target panel.
		var $target = $(href);

		// Add no transition on hiding panels.
		this.ui.$panels.not($active).not($target).addClass('no-transition');

		// Get index of the clicked link.
		var index = this.ui.$navList.find('li').index($el.parent());

		// Add is-bottom class on all panel.
		$.each(this.ui.$panels, function() {
			$(this).not($active).removeClass('is-top').addClass('is-bottom'); 
		});

		// Loop through each panel until the target one.
		for (i = 0; i < index + 1; i++) {
			$(this.ui.$panels[i]).not($active).removeClass('is-bottom').addClass('is-top');
		}

		// Get href of active and target.
		var hrefAct    = $active.attr('id').replace("#", "");
		var hrefTarget = $target.attr('id').replace("#", "");

		if (hrefTarget > hrefAct || hrefAct == "home") {
			$active.removeClass('is-active').addClass('is-top');
			$target.removeClass('is-top is-bottom').addClass('is-active');
		} else {
			$active.removeClass('is-active').addClass('is-bottom');
			$target.removeClass('is-top is-bottom').addClass('is-active');
		}

		// Remove no transition classes.
		setTimeout(function() {
			self.ui.$panels.removeClass('no-transition');
		}, this.timerPanel);
	},

	toggleNavMobile: function toggleNavMobile() {
		this.ui.$body.toggleClass('is-nav-mobile-open');
	},

	hideNavMobilePanel: function hideNavMobilePanel() {
		var self = this;

		// Hide panels with no transition.
		this.ui.$navMobilePanels.addClass('no-transition').addClass('is-hidden');

		// Remove class on body.
		this.ui.$body.removeClass('is-nav-mobile-panel-open');

		// Re-add transition on panels.
		setTimeout(function() {
			self.ui.$navMobilePanels.removeClass('no-transition');
		}, this.timerNav);
	},

	switchPanel: function switchPanel(e) {
		// Prevent default.
		e.preventDefault();

		// Get target panel.
		var href = $(e.currentTarget).attr('href');

		// Get target panel.
		var $target = $(href);

		// Remove is-hidden class on target element.
		$target.removeClass('is-hidden');

		// Add class on body.
		this.ui.$body.addClass('is-nav-mobile-panel-open');
	},

	throttle: function throttle(callback, delay) {
	    var last;
	    var timer;

	    return function () {
	        var context = this;
	        var now = +new Date();
	        var args = arguments;
	        if (last && now < last + delay) {
	            // le délai n'est pas écoulé on reset le timer
	            clearTimeout(timer);
	            timer = setTimeout(function () {
	                last = now;
	                callback.apply(context, args);
	            }, delay);
	        } else {
	            last = now;
	            callback.apply(context, args);
	        }
	    };
	}

};

// Export nav.
module.exports = nav;
