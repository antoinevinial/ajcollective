var popin = {

    ui: {},

    init: function init() {
        this.bindUI();
        this.bindEvents();
    },

    bindUI: function bindUI() {
        this.ui.$win    = $(window);
        this.ui.$popin  = $('.js-popin');
        this.ui.$video  = $('.js-popin-video');
        this.ui.$toggle = $('.js-popin-toggle');
        this.ui.$close  = $('.js-popin-close');
    },

    bindEvents: function bindEvents() {
        this.ui.$win.on('keydown', $.proxy(this.keyboardHandler, this));
        this.ui.$toggle.on('click', $.proxy(this.createIframe, this));
        this.ui.$close.on('click', $.proxy(this.closePopin, this));
    },

    keyboardHandler: function keyboardHandler(e) {
        // If press esc, close the popin.
        if (e.keyCode == 27) {
            this.closePopin();
        }
    },

    createIframe: function createIframe(e) {
        var $el     = $(e.currentTarget),
            content = '';

        // Prevent default.
        e.preventDefault();

        // Get video informations.
        var url    = $el.attr('href'),
            title  = $el.data('title'),
            author = $el.data('author');

        // Build content.
        content += '<div class="iframe">';
            content += '<iframe src="' + url + '"></iframe>';
        content += '</div>';
        content += '<h2 class="popin__author">' + author + '</h2>';
        content += '<p class="popin__title">' + title + '</p>';

        console.log(content);

        // Append content inside popin video.
        this.ui.$video.html('').append(content);

        // Show popin.
        this.ui.$popin.removeClass('is-hidden');
    },

    closePopin: function closePopin(e) {
        // Prevent default.
        if (e) { e.preventDefault(); }

        // Empty popin.
        this.ui.$video.html('');

        // Hide popin.
        this.ui.$popin.addClass('is-hidden');
    }

};

module.exports = popin;
