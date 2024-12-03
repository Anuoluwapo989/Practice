"use strict";

// Get the input and button elements
const playerNameInput = document.getElementById('playerName');
const submitButton = document.getElementById('submitButton');
const backgroundMusic = new Audio('../assets/background.wav'); // Path to your background music file

// Play the background music when allowed
function playBackgroundMusic() {
 
  backgroundMusic.loop = true;
  backgroundMusic.play().catch((error) => {
    console.log("Music play prevented by browser:", error);
  });
}


submitButton.addEventListener('click', function () {
  playBackgroundMusic();
  // const playerName = playerNameInput.value.trim(); 

  // if (playerName) {
  //   // Store the player's name in localStorage
  //   localStorage.setItem('playerName', playerName);

  //   // Try to play the background music
    

  //   // Redirect to the next page (e.g., home page)
  //   // window.location.href = 'page1.html'; 
  // } else {
  //   alert('Please enter your name!');
  // }
});