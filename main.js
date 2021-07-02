console.log("script loaded");

var btnPlay = document.getElementById("btn-play");
var btnPause = document.getElementById("btn-pause");
var audioPlayer = document.getElementById("audio-player");
var progressBar = document.getElementById("progress");
var btnBackward = document.getElementById("btn-backward");
var btnForward = document.getElementById("btn-forward");
var btnPlaybackPointFive = document.getElementById("btn-playback-point-five");
var btnPlayback1PointFive = document.getElementById("btn-playback-1-point-five");
var btnPlaybackNormal = document.getElementById("btn-playback-1");
var btnPlaybackpoint25 = document.getElementById("btn-playback-point-2five");
var btnVolumeInc = document.getElementById("btn-volume-inc");
var btnVolumeDec = document.getElementById("btn-volume-dec");
var playerVolume = document.getElementById("player-volume");
var btnNext = document.getElementById("btn-next");
var btnPrev = document.getElementById("btn-prev");
//setting byDefault audion to .2
audioPlayer.volume = 0.2;

/*progress
1.duration for which it play
2.current time
3.prgrass bar percentage cal.

*/

btnForward.addEventListener("click",function(){
  var updateDuration = audioPlayer.currentTime + 10;
  /*If update can exceeds total duration then just
  set the current time as total duration */
  if(updateDuration > audioPlayer.duration){
    audioPlayer.currentTime = audioPlayer.duration;
  }
  else{
    audioPlayer.currentTime = updateDuration;
  }

});
btnBackward.addEventListener("click",function(){
  var updateDuration = audioPlayer.currentTime - 10;
  /*If update can goes  below  0 then just
  set the current time as 0 */
  if(updateDuration > audioPlayer.duration){
    audioPlayer.currentTime = 0;
  }
  else{
    audioPlayer.currentTime = updateDuration;
  }

});

audioPlayer.addEventListener("timeupdate", function(){
  
  var durationPlayerSoFar = audioPlayer.currentTime/audioPlayer.duration;

  progressBar.style.width = (durationPlayerSoFar*100 ) + "%";

 //  console.log("time updating ->" + audioPlayer.currentTime);
})

/*Play button */
btnPlay.addEventListener("click", function(){
  console.log("play clicked !!");
  audioPlayer.play();
})

/* pause button*/
btnPause.addEventListener("click", function(){
  console.log("pause clicked !!");
  audioPlayer.pause();
})


//playbackrate
btnPlayback1PointFive.addEventListener("click", function(){
  audioPlayer.playbackRate = 1.5;
})
btnPlaybackPointFive.addEventListener("click", function(){
  audioPlayer.playbackRate = 0.5;
})
btnPlaybackNormal.addEventListener("click", function(){
  audioPlayer.playbackRate = 1;
})

btnPlaybackpoint25.addEventListener("click", function(){
  audioPlayer.playbackRate = 0.25;
})


//Volume Increase functionality.
btnVolumeInc.addEventListener("click", function(){
  var updatedVolume = audioPlayer.volume + 0.1;

  if(updatedVolume>1){
    updatedVolume = 1;
    audioPlayer.volume = 1;
    playerVolume.innerHTML = "100%";
  }
  else{
    audioPlayer.volume += 0.1;
    
    playerVolume.innerHTML = parseInt(audioPlayer.volume*100) + "%";
    
  }
})

//Volume Decrease functionality.
btnVolumeDec.addEventListener("click", function(){
  var updatedVolume = audioPlayer.volume - 0.1;

  if(updatedVolume<0){
    updatedVolume = 0;
    audioPlayer.volume = 0;
    playerVolume.innerHTML = "0%";
  }
  else{
    audioPlayer.volume -= 0.1;
    
    playerVolume.innerHTML = parseInt(audioPlayer.volume*100) + "%";
    
  }  
});

function renderAudioTrack(data){
  var card = $("<article>").addClass("playlist-card").attr("id" , data.id);
  var thumbnail = $("<img>").addClass("cover-img").attr("src" , data.albumCover);

  var meta = $("<div>")
  var title = $("<h3>").addClass("track-title").html(data.track);
  var artist = $("<p>").addClass("track-artist").html(data.artist);

  meta.append(title,artist);

  card.append(thumbnail, meta);
  $("#playlist-section").append(card);

  //add event listen to each fucntion
  
  card.click(function(){
    // $(this).addClass("active");
    var id = $(this).attr("id");
    console.log("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist/" + id);

    $.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist/" + id, function(response){

      
      $("#audio-track-title").html(response.track);
      $("#audio-track-artist").html(response.artist);
      $("#audio-source").attr("src", response.file);
      $("#album-cover").attr("src", response.albumCover);  
      
      audioPlayer.load();
      audioPlayer.play(); 

    })
    
  })

}



$.get("https://5dd1894f15bbc2001448d28e.mockapi.io/playlist", function(response){
  
   console.log(response.length)
  for(var i = 0; i < response.length;i++){
    //creat each playlist from data received from backend api
    //creaste a card ;
    
    renderAudioTrack(response[i]);
    // console.log(response[i]);


    // console.log(response[i].track);
  }

  
})


