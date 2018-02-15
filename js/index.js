const $VIDEO = document.querySelector('.video'),
      $VIDEO_CONTROLS = document.querySelector('.video-controls'),
      $BUTTON_PAUSE_AND_PLAY = document.querySelector('.play-and-pause-video'),
      $PROGRESS_VIDEO = document.querySelector('.progress-video'),
      $CHANGE_VOLUME = document.querySelector('.slide-volume-video'),
      $FULLSCREEN = document.querySelector('.fullscreen-video');

function durationVideo() {
    let durationMidia = $VIDEO.duration,
        $durationTime = document.querySelector('.duration-time');
    $durationTime.innerHTML = transformVideoDuration(durationMidia);
    animationVolume($VIDEO.volume);
};

function progressVideo() {
    var autoProgress = $VIDEO.currentTime,
        $progressBar = document.querySelector('.progress-video'),
        $progressTime = document.querySelector('.progress-time');
    $progressBar.value = autoProgress.toFixed(0);
    $progressBar.setAttribute('max', $VIDEO.duration);

    $progressTime.innerHTML = transformVideoDuration(autoProgress);
    animationProgress();
};

function ChangeProgressVideo() {
    $changeProgress = document.querySelector('.progress-video');
    $VIDEO.currentTime = $changeProgress.value;
};

function animationProgress() {
    let percentageProgress = (($PROGRESS_VIDEO.value - $PROGRESS_VIDEO.min) * 100) / ($PROGRESS_VIDEO.max - $PROGRESS_VIDEO.min);
    $PROGRESS_VIDEO.style.backgroundSize = `${percentageProgress}% 100%`;
    console.log('progress: ' + percentageProgress)
};

function animationVolume(volume) {
    let animationVolume = volume;
    animationVolume = volume * 100;
    if (animationVolume === 100) {
        animationVolume = 100;        
    }
    $CHANGE_VOLUME.style.backgroundSize = `${animationVolume}% 100%`;
};

function transformVideoDuration(timeVideo) {
    let hours, mins, secds, time;
    hours = Math.floor(timeVideo / 3600);
    mins = Math.floor(timeVideo / 60);
    secds = Math.floor(timeVideo - mins * 60)
    return time = formartTimeVideo(hours, mins, secds);
};

function formartTimeVideo(hours, mins, secds) {
    let time;
    if (hours < 1) {
        hours = '';
    };
    if (hours < 10 && hours != '') {
        hours = '0' + hours + ':';
    };
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (secds < 10) {
        secds = '0' + secds;
    }
    return time = `${hours}${mins}:${secds}`;
};

function playAndPause() {
    let $playButton = document.querySelector('.play-and-pause-video');
    if ($VIDEO.paused == true) {
        playVideo();
        $playButton.classList.remove('fa-play');
        $playButton.classList.add('fa-pause');
    } else {
        pauseVideo();
        $playButton.classList.remove('fa-pause');
        $playButton.classList.add('fa-play');
    }
};

function pauseVideo(){
    $VIDEO.pause();
};

function playVideo(){
    $VIDEO.play();
};

function volume() {
    let $changeVolume = document.querySelector('.slide-volume-video').value;
    $VIDEO.volume = $changeVolume;
    let $buttonVolume = document.querySelector('.volume-video');
    if ($VIDEO.volume === 0) {
        $buttonVolume.classList.remove('fa-volume-up');
        $buttonVolume.classList.add('fa-volume-off');
    } else {
        $buttonVolume.classList.remove('fa-volume-off');
        $buttonVolume.classList.add('fa-volume-up');
    };
    animationVolume($changeVolume);
};

function endVideo(){
    let $playButtonEnd = document.querySelector('.play-and-pause-video');
    $VIDEO_CONTROLS.classList.remove('video-controls-visibility--hidden');
    $playButtonEnd.classList.remove('fa-pause');
    $playButtonEnd.classList.add('fa-play');

}

function videoFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        if ($VIDEO.requestFullscreen) {
            $VIDEO.requestFullscreen();
        } else if ($VIDEO.msRequestFullscreen) {
            $VIDEO.msRequestFullscreen();
        } else if ($VIDEO.mozRequestFullScreen) {
            $VIDEO.mozRequestFullScreen();
        } else if ($VIDEO.webkitRequestFullscreen) {
            $VIDEO.webkitRequestFullscreen();
        }
        $FULLSCREEN.classList.remove('fa-expand');
        $FULLSCREEN.classList.add('fa-compress'); 
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            $FULLSCREEN.classList.remove('fa-compress');
            $FULLSCREEN.classList.add('fa-expand'); 
        };
};

function controlVisibility(){
    setTimeout(function(){
        $VIDEO_CONTROLS.classList.remove('video-controls-visibility--visible');
        $VIDEO_CONTROLS.classList.add('video-controls-visibility--hidden');
    }, 10000)
    console.log('play')
};


//               EVENTS PLAYER

// EVENTS VIDEO
$VIDEO.addEventListener('loadeddata', durationVideo);

$VIDEO.addEventListener('timeupdate', progressVideo);

$VIDEO.addEventListener('play', controlVisibility);

$VIDEO.addEventListener('click', playAndPause);

$VIDEO.addEventListener('ended', endVideo);

// EVENTS VIDEO CONTROLS

$PROGRESS_VIDEO.addEventListener('change', ChangeProgressVideo)

$BUTTON_PAUSE_AND_PLAY.addEventListener('click', playAndPause);

$CHANGE_VOLUME.addEventListener('change', volume);

$FULLSCREEN.addEventListener('click', videoFullScreen);

// get the audio element
pls.audio = document.getElementById("audio");
// hook onEnded and onError events to jump to next PLS item
pls.audio.addEventListener("error", audioEvent, false);
pls.audio.addEventListener("ended", audioEvent, false);
// load audio tag with first source
pls.listOk = loadPLS(pls.curItem ++ );
function audioEvent(event) {
    // if the listOk is still true (ie not at the end of the list)
    // step to the next item either on ended or error
    if (pls.listOk) {
        pls.listOk = loadPLS(pls.curItem ++ );
    } else {
        // action to indicate end of stream    
    }
}
function loadPLS(whichItem) {
    if (whichItem >= pls.Count) {
        return false;
    } else {
        pls.audio.autoplay = false;
        pls.audio.src = pls.Items[whichItem].file;
        var title = document.getElementById("title");
        title.innerText = pls.Items[whichItem].title + "[" + pls.curItem + "/" + pls.Items[whichItem].file + "]";
        return true;
    }
}