(function() {
    var playPause = document.querySelector('.play');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var before = document.querySelector('.before');
    var audioCodec = document.getElementById('audio');
    var audioList = document.querySelectorAll('li a');
    var volumeControl = document.querySelector('.volume-control');
    var currentPlay = audioCodec.getAttribute('src');
    var progressVolume = document.querySelector('.progress-volume');
    var canvas = document.querySelector('#canvas');
    var mute = document.querySelector('.mute');
    var volumeUp = document.querySelector('.volume-up');
    var volumeDown = document.querySelector('.volume-down');
    var timeDuration = document.querySelector('.time-duration');
    var timeCurrent = document.querySelector('.time-spend');
    var e = 1;
    var currentPositionSong = audioCodec.textContent;
    var itemCount = 0;
    var title = document.querySelector('.current-song');
    var percentCurrentVolume = document.querySelector('.current-volume');
    var currentFile = audioCodec.getAttribute('src');
    var volSong = 10;
    var fasrForwardPlus = document.querySelector('.fast-forward');
    var fastBackwardPlus = document.querySelector('.fast-backward');

    window.addEventListener('storage', function (event) {
        if (event.key === 'play') {
            if (!audioCodec.paused || !audioCodec.ended) {
                audioCodec.pause();
            }
        }
    });

    for (var i = 0; i < audioList.length; i++) {
        var elList = audioList[i].getAttribute('data-file');
        audioList[i].setAttribute('position-el', itemCount++);
        audioList[i].addEventListener('click', function (event) {
            var el = event.currentTarget.getAttribute('data-file');
            audioCodec.setAttribute('src', 'mp3s/'+el);
            var titleSong = event.currentTarget.textContent;
            currentPositionSong = titleSong;
            if ('mp3s/'+ el !== currentFile) {
                currentFile = 'mp3s/' + el;
            }
            playList(el);
        });
    }
    progressVolume.value = audioCodec.volume;
    
    function playList(e) {
        audioCodec.addEventListener("timeupdate", updateCurrentTime, true);
        title.innerHTML = currentPositionSong;
        if (audioCodec.paused || audioCodec.ended) {
            audioCodec.play();
            playPause.classList.add('glyphicon-pause');
            audioCodec.addEventListener("timeupdate", progressBar, true);
            if (localStorage) {
                localStorage.setItem('play', 'true');
            }
        } else {
            audioCodec.pause();
            playPause.classList.remove('glyphicon-pause');
            if (localStorage) {
                localStorage.removeItem('play', 'true');
            }
        }
    };
    
    function updateCurrentTime() {
        var currTime = parseInt(audioCodec.currentTime);
        var s = parseInt(audioCodec.currentTime % 60);
        var m = parseInt((audioCodec.currentTime / 60) % 60);
        var durationS = parseInt(audioCodec.duration % 60);
        var durationM = parseInt((audioCodec.duration / 60) % 60);

        if (s < 10) {
            s = '0' + s;
        }
        timeCurrent.innerHTML = m + ':' + s;
        if (durationS < 10) {
            durationS = '0' + durationS;
        }
        timeDuration.innerText = durationM + ':' + durationS;

    };

    playPause.addEventListener('click', function play() {
        playList();
    });

    prev.addEventListener('click', function (event) {
        for (var i = 0; i < audioList.length; i++) {
            if (currentFile === 'mp3s/'+ audioList[i].getAttribute('data-file')) {
                if(i !== 0) {
                    j = i -1;
                    var el = audioList[j].getAttribute('data-file');
                    var titleSong = audioList[j].textContent;
                    audioCodec.setAttribute('src', 'mp3s/' + el);
                    currentFile = 'mp3s/' + el;
                    currentPositionSong = titleSong;
                    playList(e);
                }
            }
        }
    });

    next.addEventListener('click', function (event) {
        var Ilenght = audioList.length - 1;
        for (var i = 0; i < Ilenght; i++) {
            if (currentFile === 'mp3s/'+ audioList[i].getAttribute('data-file')) {
                if(i !== 0) {
                    j = i + 1;
                    var el = audioList[j].getAttribute('data-file');
                    var titleSong = audioList[j].textContent;
                    audioCodec.setAttribute('src', 'mp3s/' + el);
                    currentPositionSong = titleSong;
                    currentFile = 'mp3s/' + el;
                    playList(e);
                }
            }
        }
    });

    function progressBar() {
        var time = Math.round(audioCodec.currentTime);
        if (canvas.getContext) {
            var canvasData = canvas.getContext("2d");
            canvasData.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            canvasData.fillStyle = "#3B99FC";
            var widthBar = (time / audioCodec.duration) * (canvas.clientWidth);
            if (widthBar > 0) {
                canvasData.fillRect(0, 0, widthBar, canvas.clientHeight);
            }
        }
    };

    canvas.addEventListener("click", function(e) {
        if (!e) {
            e = window.event;
        }
        try {
            audioCodec.currentTime = audioCodec.duration * (e.offsetX / canvas.clientWidth);
        }
        catch (err) {
            if (window.console && console.error("Error:" + err));
        }
    }, true);

    volumeUp.addEventListener("click", function () {
        if (audioCodec.volume < 1 ){
            progressVolume.value += 0.1;
            audioCodec.volume += 0.1;
            percentCurrentVolume.innerHTML = ++volSong + '0' + '%';
        }
    }, false);

    volumeDown.addEventListener("click", function () {
        progressVolume.value -= 0.1;
        audioCodec.volume -= 0.1;
        percentCurrentVolume.innerHTML = --volSong + '0' + '%';

    }, false);

    mute.addEventListener("click", function muteVolume() {
        if (audioCodec.muted === true) {
            audioCodec.muted = false;
            mute.classList.add('glyphicon-volume-up');
            mute.classList.remove('glyphicon-volume-off');
        } else {
            audioCodec.muted = true;
            mute.classList.remove('glyphicon-volume-up');
            mute.classList.add('glyphicon-volume-off');
        }
    }, false);

    fasrForwardPlus.addEventListener('click', function () {
        try {
            audioCodec.currentTime += 10.0;
        }
        catch (e) {
            if (window.console && console.error("Error:" + err));
        }

    });

    fastBackwardPlus.addEventListener('click', function () {
        try {
            audioCodec.currentTime -= 10.0;
        }
        catch (e) {
            if (window.console && console.error("Error:" + err));
        }
    });

})();
