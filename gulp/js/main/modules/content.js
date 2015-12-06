// Import plugins.
var jqueryMousewheel = require('jquery-mousewheel')($);
var jqueryCarousel   = require('./../plugins/jquery.carousel.js');

// Import modules.
var slideshow = require('./slideshow.js');
var nav = require('./nav.js');
var panel = require('./panel.js');
var carousel = require('./carousel.js');
var contact = require('./contact.js');
var splash = require('./splash.js');

var content = {

	ui: {},
	JSON: '',

	init: function init() {
		this.bindUI();
		this.bindEvents();
	},

	bindUI: function bindUI() {
		this.ui.$main    = $('.js-main');
		this.ui.$navList = $('.js-nav-list');
	},

	bindEvents: function bindEvents() {
		this.getContent();
	},

	getContent: function getContent() {
		var self = this;

		$.getJSON("../data.json", function(data) {

			// Save content inside global variable.
			self.JSON = data;

		}).done(function() {
		    // Build navigation.
		    self.buildNav();

		    // Build panels.
		    self.buildPanels();

		    // Update splash screens.
		    splash.init();

		    // Init slideshow.
		    slideshow.init();

		    // Init navigation.
		    nav.init();

		    // Init panels.
		    panel.init();

		    // Init carousel.
		    carousel.init();

		    // Init contact.
		    contact.init();

		});
	},

	buildNav: function buildNav() {
		// Init navHTML variable.
		var navHTML = '';

		// Loop through the JSON and create list item for each link.
		$.each(this.JSON, function() {
			navHTML += '<li class="nav__item">';
			navHTML += '<a class="nav__link js-nav-link" href="#' + this.id + '">';
			navHTML += '<h2 class="nav__link__name">' + this.name + '</h2>';
			navHTML += '<h3 class="nav__link__jobtitle">' + this.jobtitle + '</h3>';
			if (this.thumbnail) { navHTML += '<img class="nav__link__img js-nav-img" src="' + this.thumbnail + '"/>'; }
			navHTML += '</a></li>';
		});

		// Append content inside navList.
		this.ui.$navList.html('').append(navHTML);
	},

	buildPanels: function buildPanels() {
		var self = this;

		// Init panelHTML variable.
		var panelHTML = '';

		// Loop through the JSON and create panel for each person.
		$.each(this.JSON, function() {

			// Start section.
			panelHTML += '<section class="panel panel--black js-panel is-bottom" id="' + this.id + '" tabindex="1">';

				// Start pager.
				panelHTML += '<div class="panel__pager">';
					panelHTML += '<div class="panel__btn panel__btn--top panel__btn--bordered panel__btn--bordered--top">';
						panelHTML += '<span class="panel__btn__label panel__btn__label--left panel__btn__label--lrg">AJCollective</span>';

						// If there is a prev person.
						if (self.JSON[this.id - 1]) {
							panelHTML += '<a class="panel__btn__label panel__btn__label--bordered js-panel-move js-panel-move--top" data-direction="top" href="#' + (this.id - 1) + '">Prev ' + self.JSON[this.id - 1].jobtitle + '</a>';
						} else {
							panelHTML += '<a class="panel__btn__label panel__btn__label--bordered js-panel-move js-panel-move--top" data-direction="top" href="#home">Back home</a>';
						}

						panelHTML += '<a class="panel__btn__label panel__btn__label--right js-contact-toggle" href="#">About / Contact</a>';
					panelHTML += '</div>';

					// If there is a next person, build next link.
					if (self.JSON[this.id + 1]) {
						panelHTML += '<div class="panel__btn panel__btn--bottom panel__btn--bordered panel__btn--bordered--bottom">';
							panelHTML += '<a class="panel__btn__label js-panel-move js-panel-move--bottom" data-direction="bottom" href="#' + (this.id + 1) + '">Next ' + self.JSON[this.id + 1].jobtitle + '</a>';
						panelHTML += '</div>';
					} else {
						panelHTML += '<div class="panel__btn panel__btn--bottom"></div>';
					}

					panelHTML += '<div class="panel__btn panel__btn--left">';
						panelHTML += '<a class="panel__btn__label js-nav-toggle" href="#">Creative Researchers &amp; Writers</a>';
					panelHTML += '</div>';
				panelHTML += '</div>';

				// Start content.
				panelHTML += '<div class="panel__container">';
					panelHTML += '<div class="grid">';
						panelHTML += '<div class="cell-31 prepend-5">';

						// Change carousel markup based on the template to use.
						if (this.template == "researcher") {
							panelHTML += '<div class="carousel js-carousel">';
								panelHTML += '<ul class="carousel__slider js-carousel-slider">';
									panelHTML += '<li class="carousel__item carousel__item--text js-carousel-item js-carousel-item--text">';
										panelHTML += '<h2 class="heading-2">' + this.name + '</h2>';
										panelHTML += '<span class="carousel__jobtitle">' + this.jobtitle + '</span>';
										panelHTML += '<p class="carousel__txt">' + this.description + '</p>';
									panelHTML += '</li>';

									// Loop through each medias.
									for (i = 0; i < this.medias.length; i++) {
										var str = this.medias[i];

											if (str.search('vimeo') != -1) {
												panelHTML += '<li class="carousel__item js-carousel-item js-carousel-item--video" data-index="' + (i + 1) + '">';
													panelHTML += '<div class="carousel__item__container">';
														panelHTML += '<div class="carousel__video">';
														panelHTML += this.medias[i];
														panelHTML += '</div>';

											} else {
												panelHTML += '<li class="carousel__item js-carousel-item" data-index="' + (i + 1) + '">';
													panelHTML += '<div class="carousel__item__container">';
														panelHTML += '<img class="carousel__img" src="' + this.medias[i] + '"/>';
														panelHTML += '<a class="carousel__full js-carousel-full-btn" href="#"><svg class="icon icon-full" viewBox="0 0 20 20"><path d="M7,9 L7,11 L1,17 L1,15 L0,15 L0,20 L5,20 L5,19 L3,19 L9,13 L11,13 L17,19 L15,19 L15,20 L20,20 L20,15 L19,15 L19,17 L13,11 L13,9 L19,3 L19,5 L20,5 L20,0 L15,0 L15,1 L17,1 L11,7 L9,7 L3,1 L5,1 L5,0 L0,0 L0,5 L1,5 L1,3 L7,9 Z"></path></svg></a>';
											}

											panelHTML += '</div>';
										panelHTML += '</li>';
									}

								panelHTML += '</ul>';
						} else if (this.template == "writer") {
							panelHTML += '<div class="carousel carousel--writer js-carousel">';
								panelHTML += '<ul class="carousel__slider js-carousel-slider">';
									panelHTML += '<li class="carousel__item carousel__item--text js-carousel-item js-carousel-item--text" data-index="' + (i + 1) + '">';
										panelHTML += '<h2 class="heading-2">' + this.name + '</h2>';
										panelHTML += '<span class="carousel__jobtitle">' + this.jobtitle + '</span>';
										panelHTML += '<p class="carousel__txt">' + this.description + '</p>';
									panelHTML += '</li>';

									// Loop through each document.
									for (i = 0; i < this.documents.length; i++) {
										panelHTML += '<li class="carousel__item carousel-item--doc js-carousel-item js-carousel-item--doc" data-index="' + (i + 1) + '">';
											panelHTML += '<div class="carousel__doc">';
												panelHTML += '<span class="carousel__doc__title">' + this.documents[i].title + '</span>';
												panelHTML += '<span class="carousel__doc__type">' + this.documents[i].type + '</span>';
												panelHTML += '<span class="carousel__doc__pages">' + this.documents[i].pages + '</span>';
												panelHTML += '<a class="carousel__doc__overlay" href="' + this.documents[i].link + '" target="_blank">';
													panelHTML += '<span class="carousel__doc__btn"><svg class="icon icon-pdf" viewBox="0 0 18 20"><path d="M6,0 L18,0 L18,2 L6,2 L6,0 Z M16,2 L18,2 L18,15 L16,15 L16,2 Z M12,13 L16,13 L16,15 L12,15 L12,13 Z M6,2 L8,2 L8,5 L6,5 L6,2 Z M0,5 L12,5 L12,7 L0,7 L0,5 Z M10,7 L12,7 L12,20 L10,20 L10,7 Z M0,18 L10,18 L10,20 L0,20 L0,18 Z M0,7 L2,7 L2,18 L0,18 L0,7 Z"></path></svg></span>';
												panelHTML += '</a>';
											panelHTML += '</div>';
										panelHTML += '</li>';
									}

								panelHTML += '</ul>';
						}

						panelHTML += '<div class="carousel__pager">'
							panelHTML += '<button class="carousel__btn carousel__btn--prev js-carousel-btn js-carousel-btn-prev" data-direction="prev" href="#"></button>';
							panelHTML += '<button class="carousel__btn carousel__btn--next js-carousel-btn js-carousel-btn-next" data-direction="next" href="#"></button>';
						panelHTML += '</div>';

						panelHTML += '<div class="carousel__viewer js-carousel-viewer">';
							panelHTML += '<div class="carousel__viewer__rectangle"></div>';
							panelHTML += '<div class="carousel__viewer__slider js-carousel-viewer-slider"></div>';
						panelHTML += '</div>';

						panelHTML += '<a class="carousel__close js-carousel-full-btn js-carousel-full-close" href="#">leave full screen view';
							panelHTML += '<span class="carousel__close__btn"><svg class="icon icon-close" viewBox="0 0 20 20"><path d="M0,2.12133113 L18.0001831,20.1213311 L20.1214927,18 L2.12130955,0 L0,2.12133113 L0,2.12133113 Z"></path><path d="M17.8914413,0 L0,17.8915564 L2.10855875,20 L20,2.10844362 L17.8914413,0 L17.8914413,0 Z"></path></svg></span>';
						panelHTML += '</a>';

						// Close carousel.
						panelHTML += '</div>';

						panelHTML += '</div>';
					panelHTML += '</div>';
				panelHTML += '</div>';
			
			// Close section.
			panelHTML += '</section>';

		});

		// Append panels inside main container.
		this.ui.$main.append(panelHTML);
	}

};

module.exports = content;
