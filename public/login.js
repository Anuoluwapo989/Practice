"use strict";

// Get the input and button elements
const playerNameInput = document.getElementById('playerName');
const submitButton = document.getElementById('submitButton');
const backgroundMusic = new Audio('../assets/background.wav'); // Path to your background music file

// Play the background music when allowed
function playBackgroundMusic() {
 
  backgroundMusic.loop = true;
  backgroundMusic.play();
  //catch((error) => {
  //   console.log("Music play prevented by browser:", error);
  // });
}


submitButton.addEventListener('click', function () {
  playBackgroundMusic();
  const playerName = playerNameInput.value.trim(); 

  if (playerName) {
    // Store the player's name in localStorage
    localStorage.setItem('playerName', playerName);

    // Try to play the background music
    

    // Redirect to the next page (e.g., home page)
    window.location.href = 'page1.html'; 
  } else {
    alert('Please enter your name!');
  }
});

const params = new URLSearchParams(window.location.search);
const error = params.get('error');

if (error) {
    const errorMessage = {
        missing_credentials: 'Please enter both email and password.',
        invalid_credentials: 'Invalid email or password. Please try again.',
        server_error: 'An unexpected error occurred. Please try again later.',
    }[error] || 'Unknown error occurred.';

    document.getElementById('error-message').textContent = errorMessage;
}

// if (response.ok) { // This automatically checks if the status is in the 200s
//     window.location.href = '/page1.html';
// } else if (response.status === 401) {
//     showError("Wrong email or password");
// }
