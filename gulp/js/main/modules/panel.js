var panel = {

	ui: {},
	scroll: 0,
	timerPanel: 500,
	isAnimated: false,

	touch: {
		isCalculating: false,
	    start: 0,
	    move: 0,
	    delta: 0
	},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$win    = $(window);
		this.ui.$body   = $('body');
		this.ui.$panels = $('.js-panel');
		this.ui.$active = $('.js-panel.is-active');
		this.ui.$move   = $('.js-panel-move');

		this.ui.$navItems = $('.js-nav-list').find('li');
		this.ui.$navLink  = $('.js-nav-link');

		this.ui.$btnTop    = this.ui.$active.find('.js-panel-move--top');
		this.ui.$btnBottom = this.ui.$active.find('.js-panel-move--bottom');
	},

	bindEvents: function bindEvents() {
		this.ui.$win.on('mousewheel', $.proxy(this.scrollHandler, this));
		this.ui.$win.on('keydown', $.proxy(this.keydownHandler, this));
		this.ui.$move.on('click', $.proxy(this.movePanel, this));
		this.ui.$navLink.on('click', $.proxy(this.updatePanel, this));

		// Touch events.
		this.ui.$win.on('touchstart', $.proxy(this.touchStart, this));
		this.ui.$win.on('touchmove', $.proxy(this.touchMove, this));
		this.ui.$win.on('touchend', $.proxy(this.touchEnd, this));
	},

	scrollHandler: function scrollHandler(event) {
		// If the panel is animated, return.
		if (this.isAnimated || this.ui.$body.hasClass('is-nav-open') || !this.isDesktop()) { return; }

		// If we scroll down and there is a next panel, click on it.
		if (event.deltaY <= -50 && this.ui.$btnBottom.length) {
			this.ui.$btnBottom.click();
		} else if (event.deltaY > 50 && this.ui.$btnTop) {
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

		// If press arrow right, bind click on next btn.
		if (e.keyCode == 39) {
			$('.js-panel.is-active').find('.js-carousel-btn-next').click();
		}

		// If press arrow left, bind click on prev btn.
		if (e.keyCode == 37) {
		    $('.js-panel.is-active').find('.js-carousel-btn-prev').click();
		}
	},

	touchStart: function touchStart(e) {
		// Return if we're on mobile version.
		if (!this.isDesktop()) { return; }

		// Return if nav is open.
		if (this.isNavOpen()) { return; }

	    // Update touch start position.
	    this.touch.start = e.originalEvent.touches[0].pageY;
	    this.touch.move = e.originalEvent.touches[0].pageY;
	},

	touchMove: function touchMove(e) {
		// Return if we're on mobile version.
		if (!this.isDesktop()) { return; }

		// Return if nav is open.
		if (this.isNavOpen()) { return; }

		// Prevent default.
		e.preventDefault();

		// Update touch move position.
		this.touch.move = e.originalEvent.touches[0].pageY;
	},

	touchEnd: function touchEnd() {
		var self = this;

		// Return if we're on mobile version.
		if (!this.isDesktop()) { return; }

		// Return if nav is open.
		if (this.isNavOpen()) { return; }

		// If panels are already animated, do nothing.
		if (this.touch.isCalculating) { return; }

		// Track the delta to do something only if user really slide.
		if (Math.abs(this.touch.move - this.touch.start) < 125) { return; }

		// Update isCalculating variable.
		this.touch.isCalculating = true;

		// Click prev or next btn.
		if (this.touch.start > this.touch.move && this.ui.$btnBottom && this.touch.move != 0) {
			this.ui.$btnBottom.click();
		} else if (this.touch.start < this.touch.move && this.ui.$btnTop && this.touch.move != 0) {
			this.ui.$btnTop.click();
		}

		// Update isCalculating variable.
		setTimeout(function() {
			self.touch.isCalculating = false;
		}, this.timerPanel);
	},

	movePanel: function movePanel(e) {
		var self = this,
			$el  = $(e.currentTarget);

		// Return if we already move a panel.
		if (this.isAnimated || this.ui.$body.hasClass('is-carousel-full')) { return; }

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
	},

	updatePanel: function updatePanel(e) {
		var $target = $($(e.currentTarget).attr('href'));

		this.updateUIEvents($target);
	},

	updateUIEvents: function updateUIEvents($target) {
		// Update active panel.
		this.ui.$active = $target;

		// Get current ID.
		var id = this.ui.$active.attr('id');

		// Update btns.
		this.ui.$btnTop    = this.ui.$active.find('.js-panel-move--top');
		this.ui.$btnBottom = this.ui.$active.find('.js-panel-move--bottom');

		// Update navigation.
		if (id != 'home') {
			this.ui.$navLink.removeClass('is-active');
			this.ui.$navItems.eq(id).find('.js-nav-link').addClass('is-active');
		} else {
			this.ui.$navLink.removeClass('is-active');
		}
	},

	isNavOpen: function isNavOpen() {
		if (this.ui.$body.hasClass('is-nav-open')) {
			return true;
		} else {
			return false;
		}
	},

	isDesktop: function isDesktop() {
		if (this.ui.$win.outerWidth() > 768) {
			return true;
		} else {
			return false;
		}
	}

};

module.exports = panel;