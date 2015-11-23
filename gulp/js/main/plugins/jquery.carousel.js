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
                    this.ui.$win.on('load', $.proxy(this.initCarousel, this));
                    this.ui.$btns.on('click', $.proxy(this.prevNext, this));
                    this.ui.$carousel.on('keydown', $.proxy(this.keyboardHandler, this));
                    this.ui.$fullBtn.on('click', $.proxy(this.toggleFullScreen, this));
                },

                initCarousel: function initCarousel() {
                    // Init variables.
                    this.itemActive = 0;
                    this.nbItems    = this.ui.$items.length;

                    // Init width on items.
                    this.initWidth();

                    // Init viewer.
                    this.initViewer();

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();

                    // Init btns.
                    this.updateBtns();
                },

                initWidth: function initWidth() {
                    var self = this;

                    setTimeout(function() {
                        // On each items, get img width and set width on item.
                        $.each(self.ui.$items, function() {
                            var $el   = $(this);

                            // Set auto on items.
                            $el.outerWidth('auto');

                            // Get img inside item.
                            var $img = $el.find('img');

                            // If img exists, get its width and set it on item.
                            if ($img.length) {
                                $el.outerWidth($img.outerWidth());
                            }
                        });
                    }, 200);
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
                        var $el   = $(this),
                            index = $el.index();

                        // If item has text inside, create list item with icon.
                        if ($el.hasClass('js-carousel-item--text')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<svg class="icon icon-text" viewBox="0 0 30 39"><rect fill="#FFFFFF" x="0" y="0" width="25" height="2"></rect><rect fill="#FFFFFF" x="0" y="7" width="30" height="2"></rect><rect fill="#4D4D4D" x="0" y="14" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="18" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="22" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="26" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="30" width="30" height="1"></rect><rect fill="#4D4D4D" x="0" y="34" width="25" height="1"></rect><rect fill="#4D4D4D" x="0" y="38" width="20" height="1"></rect></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has a video inside, create video item with icon.
                        if ($el.hasClass('js-carousel-item--video')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<svg class="icon icon-video" viewBox="0 0 21 29"><path d="M0,29 L3.92668354e-15,0 L21,14.5 L0,29 Z"></path></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has a doc inside, create list item with icon.
                        if ($el.hasClass('js-carousel-item--doc')) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<svg class="icon icon-pdf--sml" viewBox="0 0 26 40"><rect x="0" y="0" width="26" height="40"></rect></svg>';
                            viewerHTML += '</li>';
                        }

                        // If item has picture inside, create a thumbnail.
                        if ($el.find('img').length) {
                            viewerHTML += '<li class="carousel__viewer__item js-carousel-viewer-item" data-index="' + index + '">';
                            viewerHTML += '<img class="carousel__viewer__img" src="' + $el.find('img').attr('src') + '"/>';
                            viewerHTML += '</li>';
                        }
                    });

                    // Add all carousel viewer item inside carousel slider.
                    this.ui.$viewerSlider.html('').append(viewerHTML);

                    // Bind new UI.
                    this.ui.$viewerItems = this.ui.$carousel.find('.js-carousel-viewer-item');

                    // Bind new event/
                    this.ui.$viewerItems.on('click', $.proxy(this.goTo, this));
                },

                goTo: function goTo(e) {
                    var index = $(e.currentTarget).data('index');

                    // Update item active variable.
                    this.itemActive = index;

                    // Translate slider.
                    this.translateSlider();

                    // Translate viewer.
                    this.translateViewer();
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