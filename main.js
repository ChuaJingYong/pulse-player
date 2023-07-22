let currentAudio = null; // reference to the currently playing audio
const players = Array.from(document.querySelectorAll('.player')); // get all player divs

// Set the first audio as default audio
currentAudio = players[0].querySelector('audio')
console.log({currentAudio})

players.forEach(player => {
  const audio = player.querySelector('audio');
  const savedTime = localStorage.getItem(`audioTime${player.id}`);
  if (savedTime) audio.currentTime = savedTime;

  // Event to save current timestamp whenever audio time updates
  audio.ontimeupdate = () => localStorage.setItem(`audioTime${player.id}`, audio.currentTime);

  player.onclick = () => {

    // Toggle selected player class. If already has 'selected', then return whole function
    //if(player.classList.contains('selected')) return;

    // Remove 'selected' class from all players
    players.forEach(p => p.classList.remove('selected'));

    // Add 'selected' class to the clicked player
    player.classList.add('selected');
    
    console.log(`current audio now is ${currentAudio} with audio being ${audio}`,Boolean(audio) )
    if (currentAudio) currentAudio.pause();
    currentAudio = audio;
    audio.play();
  };

  // Changing the selected class when user clicks on play button
  audio.onplay = () =>{
    // Remove 'selected' class from all players
    players.forEach(p => p.classList.remove('selected'));

    // Add 'selected' class to the clicked player
    player.classList.add('selected');
  }
});

// Set timestamp button event
document.getElementById('setTimestamp').onclick = () => {
    if (currentAudio) {
      const timestamp = document.getElementById('timestamp').value;
      if (timestamp) currentAudio.currentTime = timestamp;
    }
  };

// Play button event
document.getElementById('play').onclick = () => {
    console.log({currentAudio})
  if (currentAudio) currentAudio.play();
};

// Pause button event
document.getElementById('pause').onclick = () => {
  if (currentAudio) currentAudio.pause();
};

// Forward button event
document.getElementById('forward').onclick = () => {
    console.log({currentAudio})
  if (currentAudio) currentAudio.currentTime += 5;
};

// Backward button event
document.getElementById('backward').onclick = () => {
  if (currentAudio) currentAudio.currentTime -= 5;
};

//// Integrating Media Session API to allow the audio to play in the background
//if ('mediaSession' in navigator) {

//    // Event listener to update Media Session metadata when an audio element is clicked
//    audios.forEach(audio => {
//      audio.addEventListener('click', () => {
//        navigator.mediaSession.metadata = new MediaMetadata({
//          title: `Track ${audio.id}`,
//          artist: 'Unknown Artist',
//          album: 'Pulse Player Album',
//          artwork: [
//            { src: 'https://path/to/album-art-small.jpg',  sizes: '96x96',   type: 'image/jpg' },
//            { src: 'https://path/to/album-art-large.jpg',  sizes: '256x256', type: 'image/jpg' },
//          ]
//        });
//      });
//    });
  
//    // Media Session Action Handlers
//    navigator.mediaSession.setActionHandler('play', function() {  
//      currentAudio.play();
//      navigator.mediaSession.playbackState = "playing";
//    });
  
//    navigator.mediaSession.setActionHandler('pause', function() {  
//      currentAudio.pause();
//      navigator.mediaSession.playbackState = "paused";
//    });
  
//    navigator.mediaSession.setActionHandler('seekbackward', function() { 
//      currentAudio.currentTime = Math.max(currentAudio.currentTime - 5, 0);
//    });
  
//    navigator.mediaSession.setActionHandler('seekforward', function() { 
//      currentAudio.currentTime = Math.min(currentAudio.currentTime + 5, currentAudio.duration);
//    });
  
//    // Note: As of September 2021, the 'previoustrack' and 'nexttrack' handlers are not widely supported
//    // navigator.mediaSession.setActionHandler('previoustrack', function() {
//    //   // Logic to select and play the previous track
//    // });
  
//    // navigator.mediaSession.setActionHandler('nexttrack', function() {
//    //   // Logic to select and play the next track
//    // });
  
//  } else {
//    console.log("Media Session API not supported in this browser");
//  }