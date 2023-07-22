let currentAudio = null; // reference to the currently playing audio
const players = Array.from(document.querySelectorAll('.player')); // get all player divs

players.forEach(player => {
  const audio = player.querySelector('audio');
  const savedTime = localStorage.getItem(`audioTime${player.id}`);
  if (savedTime) audio.currentTime = savedTime;

  // Event to save current timestamp whenever audio time updates
  audio.ontimeupdate = () => localStorage.setItem(`audioTime${player.id}`, audio.currentTime);

  player.onclick = () => {
      console.log(`current audio now is ${currentAudio} with audio being ${audio}`,Boolean(audio) )
    if (currentAudio) currentAudio.pause();
    currentAudio = audio;
    audio.play();
  };
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