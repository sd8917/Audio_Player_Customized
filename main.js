console.log("script loaded");

var audioPlayer = document.getElementById("audioplayer")
var progress = document.getElementById("progress");
var playBtn = document.getElementById("playbtn")
var pauseBtn = document.getElementById("pausebtn")
var volmUp = document.getElementById("vol_inc");
var volmDown = document.getElementById("vol_dec");
var slowBtn = document.getElementById("slow");
var normalBtn = document.getElementById("normal");
var fastBtn = document.getElementById("fast");

// progress.style.width = 90 + "%" //  Code to increase the width of the progress bar // ;

audioPlayer.ontimeupdate = function() {
  progress.style.width = ((audioPlayer.currentTime/audioPlayer.duration)*100) + "%";
  // console.log((audioPlayer.currentTime/audioPlayer.duration)*100);
};
// audioPlayer.volume  = 0.2;
volmUp.addEventListener("click", function(){
  audioPlayer.volume  = audioPlayer.volume  + 0.2;
  console.log("volume increased ");
});

volmDown.addEventListener("click", function(){
  audioPlayer.volume  = audioPlayer.volume  -  0.2;
  console.log("volume decreased ");
  
})
playBtn.addEventListener('click', function(){
  console.log("clicked played !!");
  audioPlayer.play();
});

pauseBtn.addEventListener('click', function(){
  console.log("clicked paused !!");
  audioPlayer.pause();
});


slowBtn.addEventListener("click", function(){
  audioPlayer.playbackRate  =  0.5;
  console.log("slow clicked !!");
});


normalBtn.addEventListener("click", function(){
  audioPlayer.playbackRate  = 1;
  console.log("Normal clicked !!");
});


fastBtn.addEventListener("click", function(){
  audioPlayer.playbackRate = 1.5;
  console.log("fast clicked !!");
});


