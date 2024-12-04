"use strict";

// Load settings from localStorage
const settings = JSON.parse(localStorage.getItem('settings')) || {
    musicVolume: 50,
    effectsVolume: 50,
    music: true,
    theme: 'default',
    difficulty: 'easy'
};

// Apply theme settings
document.body.classList.add(settings.theme);

// Sound elements
const backgroundMusic = new Audio('../assets/background.mp3');
backgroundMusic.loop = true;
const pointSound = new Audio('../assets/point.wav');
const nopeSound = new Audio('../assets/nope.wav');
const levelSound = new Audio('../assets/level.wav');

// Play background music if enabled in settings
if (settings.music) {
    backgroundMusic.volume = settings.musicVolume / 100;
    backgroundMusic.play();
}

// Card deck
var cardDeck = [
    "2C.png", "2D.png", "2H.png", "2S.png", "3C.png", "3D.png", "3H.png", "3S.png",
    "4C.png", "4D.png", "4H.png", "4S.png", "5C.png", "5D.png", "5H.png", "5S.png",
    "6C.png", "6D.png", "6H.png", "6S.png", "7C.png", "7D.png", "7H.png", "7S.png",
    "8C.png", "8D.png", "8H.png", "8S.png", "9C.png", "9D.png", "9H.png", "9S.png",
    "10C.png", "10D.png", "10H.png", "10S.png", "AC.png", "AD.png", "AH.png", "AS.png",
    "JC.png", "JD.png", "JH.png", "JS.png", "QC.png", "QD.png", "QH.png", "QS.png",
    "KC.png", "KD.png", "KH.png", "KS.png"
];


// Game state variables
let level = 1;
let score = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let isPaused = false;

// DOM elements
const cardBoard = document.getElementById('card-board');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
const congratsPanel = document.getElementById('congrats-panel');
const playerName = localStorage.getItem('playerName') || "Player";

// Display player name
document.getElementById('player-name').textContent = playerName;

// Event listeners
restartButton.addEventListener('click', startGame);
document.querySelector('.settings').addEventListener('click', () => {
    isPaused = true;
    pauseGame();
    window.location.href = 'settings.html';
});

// Start a new game
function startGame() {
    level = 1;
    score = 0;
    // var fliptime = getFlipDuration();

    // peekaboo(fliptime);
    updateScore();
    generateLevel();
}

// function peekaboo(runtime) {


//     // var isPeekabooActive = true;
//     const cards = document.querySelectorAll('.card');
//     // Use a regular for loop to add the 'flipped' class

//     cards.forEach(card => card.classList.add('flip')); // Show all cards


//     // Set a timeout to remove the 'flipped' class after runtime
//     setTimeout(() => {
//         cards.forEach(card => card.classList.remove('flip')); // Hide all cards
//     }, runtime);

// }
// Update the score display
function updateScore() {
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
}


// Generate a new level
function generateLevel() {
    cardBoard.innerHTML = '';
    console.log("generated",level);
    let numCards = level * 2;  // Adjusted to ensure levels progress correctly
    // console.log(numCards)
    const cards = [...cardDeck].sort(() => Math.random() - 0.5).slice(0, numCards / 2);
    // console.log(cards)
    const cardPairs = [...cards, ...cards].sort(() => Math.random() - 0.5);
    // console.log(cardPairs)

    // Determine grid layout based on number of cards
    const cols = Math.ceil(Math.sqrt(numCards));
    // console.log('cols:',cols)
    const rows = Math.ceil(numCards / cols);
    // console.log('rows:', rows)
    cardBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    cardBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    cardPairs.forEach(card => {
        // Show card back initially
        const cardElement = document.createElement("div");
        cardElement.classList.add("card"); //This adds a class for the div element.
        // cardElement.dataset.card = card;


        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("front");
        cardFront.style.backgroundImage = `url('../assets/${card}')`;

        const cardBack = document.createElement("div");
        cardBack.classList.add("back");
        // cardBack.style.backgroundImage = `url(../assets/backC.jpg)`;

        cardInner.appendChild(cardFront); //We then have to add the front and back to flipcardInner
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        cardElement.addEventListener('click', flipCard);

        //Idk if we will be needing this
        // document.querySelectorAll('.card').forEach(card => {
        //     card.addEventListener('click', () => {
        //          card.classList.toggle('flip');
        //          checkForMatch();
        //     });
        // });

        cardBoard.appendChild(cardElement);
    });
}

// Get flip duration based on difficulty
function getFlipDuration() {
    switch (settings.difficulty) {
        case 'super-easy': return 5000;
        case 'easy': return 4000;
        case 'medium': return 3000;
        case 'hard': return 2000;
        case 'extra-hard': return 1000;
        default: return 0;
    }
}

// Flip a card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Check if two flipped cards match
function checkForMatch() {
    var first = firstCard.querySelector(".front");
    var second = secondCard.querySelector(".front");
    const isMatch = first.style.backgroundImage === second.style.backgroundImage;
    console.log(first.style.backgroundImage);
    setTimeout(() => {
        if (isMatch) {
            disableCards();
            playSound(pointSound);
            score++;
            if (cardBoard.querySelectorAll('.card:not(.matched)').length === 0) {
        level++;
    
                showCongratsPanel();
                playSound(levelSound);
            }
        } else {
            playSound(nopeSound);
            unflipCards();
        }
    
        updateScore();
    }, 500);
}

// Play sound effect
function playSound(sound) {
    sound.currentTime = 0;
    sound.volume = settings.effectsVolume / 100;
    sound.play();
}

// Disable matched cards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // firstCard.style.backgroundImage = 'url(backC.png)';
        // secondCard.style.backgroundImage = 'url(backC.png)';
        resetBoard();
    }, 1000);
}

// Reset board after each turn
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Show congratulations panel when level is complete
function showCongratsPanel() {
    congratsPanel.style.display = 'block';
    document.getElementById('next-level').addEventListener('click', () => {
        congratsPanel.style.display = 'none';
        
        updateScore();  // Update level display immediately
        generateLevel();
    });
    document.getElementById('home').addEventListener('click', () => {
        window.location.href = 'page1.html';
    });
}

// Pause and resume game logic
function pauseGame() {
    backgroundMusic.pause();

}

function resumeGame() {
    backgroundMusic.play();

}

// When returning from settings page
window.addEventListener('focus', () => {
    if (isPaused) {
        isPaused = false;
        resumeGame();
    }
});

// Initialize the game
startGame();
