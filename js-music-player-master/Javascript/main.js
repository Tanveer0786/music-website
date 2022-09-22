let now_playing = document.querySelector(".now-playing");
// let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

 const musicList = document.getElementById("music_list");
const moreMusicBtn = document.getElementById("more-music");
 const closemoreMusic = document.getElementById("close");
const ulTag=document.getElementById("list");

const
musicImg = document.querySelector(".track-art img"),
musicName = document.querySelector(".track-name"),
musicArtist = document.querySelector(".track-artist");
//mainAudio = document.querySelector(".playpause-track");


let track_index = Math.floor((Math.random() * allMusic.length) + 1);


window.addEventListener("load", ()=>{
  loadTrack(track_index);
 
});
let curr_track = document.createElement('audio');


for (let i = 0; i < allMusic.length; i++) 
{
let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); 
   
  
}




let isPlaying = false;
let updateTimer;






function random_bg_color() {

  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

 
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";


  document.body.style.background = bgColor;
}


function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < allMusic.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = allMusic.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
const allLiTag = ulTag.querySelectorAll("li");

  
  for (let j = 0; j < allLiTag.length; j++) {
 

    allLiTag[j].setAttribute("onclick", "clicked(this)");
    
 
}

function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  track_index = getLiIndex; 
   loadTrack(track_index-1);
  updateTimer = setInterval(seekUpdate, 1000);
  
}

function loadTrack(track_index){
  musicName.innerText = allMusic[track_index ].name;
  musicArtist.innerText = allMusic[track_index ].artist;
  musicImg.src = `images/${allMusic[track_index].img}.jpg`;
  curr_track.src = `songs/${allMusic[track_index].src}.mp3`;
  curr_track.load();

  updateTimer = setInterval(seekUpdate, 1000);
  playTrack();
  random_bg_color();
}