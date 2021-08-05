/*
VIDEO PLAYER AND OPERATION

Provides basic functionality for video player, including scrubbing, play/pause, full screen. Also displays height as a function of time.
*/

var player = function() {

    let DOM = {};
    let whichVid,
        duration,   // in sec
        skipTo,
        currTime,
        source,
        maxedVid;   // which video is fullscreen (starting at 1)

    /* ----- INITIALIZING FUNCTIONS ----- */

    function cache() {
        DOM.vid = document.querySelector("video");

        // containers for all small videos and full screen video

        // Buttons
        DOM.icons = $('.playback-icons use');
        DOM.play = $('#play');
        // DOM.cameras = $('.nav-container button');
        DOM.maximize = $('.fullscreen');

        // Progress bar items
        DOM.timeElapsed = $('#time-elapsed');
        DOM.duration = $('#duration');
        DOM.progress = $('#progress');
        DOM.seekInput = $('#seek-input');
        DOM.seekDiv = $('#seek-div');

        DOM.height = $('#height');
    }

    /*
    Gets, stores, and displays total duration of video
    */
    function initVideo() {
        duration = Math.round(DOM.vid.duration);
        let formatted = formatTime(duration);

        if (!isNaN(duration)) {
            DOM.seekInput.attr('max', duration);
            DOM.progress.attr('max', duration);
            DOM.duration.html(formatted);
        }
    }

    function bindEvents() {

        // initialize video
        DOM.vid.addEventListener('loadedmetadata', initVideo);

        // Progress bar use and updates
        $(document).on('keydown', keyScrub);
        DOM.play.on('click', togglePlay);
        DOM.progress.on('click', renderProgress.bind(DOM.progress));
        DOM.seekInput.on({
            mousemove: seeking,
            mouseleave: function() { DOM.seekDiv.hide(); },
            input: skip
        });
        DOM.vid.addEventListener('timeupdate', updateTime);
    }

    /* ----- EVENT HANDLERS ----- */

    /*
    Toggles video playing in every video syncronously
    */
    function togglePlay() {
        DOM.icons.toggleClass("hidden");

        if (DOM.vid.paused || DOM.vid.ended ) {
            DOM.vid.play();
        } else {
            DOM.vid.pause();
        }
        currTime = DOM.vid.currentTime;
        updateTime();
    }

    /*
    Updates the time and height displayed on the UI. Entries from height are
    taken 0.5 sec apart and are lined up with currTime of the videos
    */
    function updateTime() {

        currTime = DOM.vid.currentTime;

        // update values of progress bar, bar input, and time displayed
        DOM.seekInput.val(currTime);
        DOM.progress.val(currTime);
        DOM.timeElapsed.html(formatTime(currTime));

        // displaying height from height.json
        let i = Math.round(currTime / 0.5);
    }

    /*
    Displays dynamic timestamp when hovering "seeking" over the progress
    bar. Time calculated from the horizontal position of the mouse in the
    window in proportion to the total time of the videos
    */
    function seeking(e) {
        skipTo = Math.round((e.offsetX / e.target.clientWidth) *
            parseInt(e.target.getAttribute('max'), 10));

        let formatted = formatTime(skipTo);

        DOM.seekDiv.show();
        DOM.seekDiv.html(formatted);
        // DOM.seekDiv.css('left', `${event.pageX - rect.left}px`);
        DOM.seekDiv.css('left', `${e.pageX}px`);
    }

    /*
    Use to skip forward to various points in the view
    */
    function skip() {
        DOM.vid.currentTime = skipTo;
        DOM.progress.val(skipTo);
        DOM.seekInput.val(skipTo);
        currTime = skipTo;
    }

    /*
    Moves progress bar to wherever the mouse clicked on it.
    */
    function renderProgress(e) {
        let pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;

        currTime = pos * DOM.vid.duration;
        DOM.vid.currentTime = currTime;
        seeking = false;
    }

    /*
    Allows scrubbing with the left and right arrow keys. Each press moves
    the video by 0.5s. Space also pauses the video.
    */
    function keyScrub(event) {
        if (skipTo == null) {
            skipTo = 0;
        } else {
            skipTo = currTime;
        }

        if (event.key == "ArrowRight") {
            skipTo += 0.5;
            skip();
        } else if (event.key == "ArrowLeft") {
            skipTo -= 0.5;
            skip();
        } else if (event.keyCode == 32) {
            togglePlay();
        }
    }


    /* ----- HELPER FUNCTIONS ----- */

    /*
    Formats time given in t sec into a string min:sec
    */
    function formatTime(t) {
        let min = Math.floor(Math.abs(t)/60);
        let sec = Math.floor(Math.abs(t)%60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec; // returns string of time
    }

    /* ----- PUBLIC METHODS & EXPORT ----- */

    function init() {
        cache();
        bindEvents();
    }

    return {
        init: init
    };
}();
