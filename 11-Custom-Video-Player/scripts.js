// Grab our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'; //using this as it is bound to video
    toggle.textContent = icon;
    //console.log('Update the button');
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
    video[this.name] = this.value; //name is the value we want to update 
    console.log(this.name);
    console.log(this.value);
}

function handleProgress () {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //found offsetX from properties listed on object 
    video.currentTime = scrubTime; //updates video
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; //flag variable
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => {
    if(mousedown) {
        scrub();
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
