let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show the "Install App" button when the app is eligible for installation
  document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', (e) => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
      // Hide the "Install App" button after user interaction
      document.getElementById('installButton').style.display = 'none';
    });
  }
});
