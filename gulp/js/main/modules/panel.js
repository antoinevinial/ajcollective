var panel = {

	ui: {},

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$panels = $('.js-panel');
		this.ui.$move   = $('.js-panel-move');
	},

	bindEvents: function bindEvents() {
		this.ui.$move.on('click', $.proxy(this.movePanel, this));
	},

	movePanel: function movePanel(e) {
		// Prevent default.
		e.preventDefault();

		// Get active panel.
		var $active = $('.js-panel.is-active');

		// Get data panel.
		var data = $(e.currentTarget).data('panel');

		// Get target panel.
		var $target = $('#' + data);

		// Move active panel.
		$active.addClass('is-push');

		// Show target panel.
		$target.addClass('is-show');
	}

};

module.exports = panel;