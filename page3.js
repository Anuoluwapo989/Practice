<<<<<<< HEAD

// // Hala, you can work on the button for start and a function that takes it from page1.html to page2.html on click.
// //We need to have a function that spawns two of each card type onto the page at random slots
// //We also need a function that counts the users score and returns "game over" if they lose and "congratulations" if they win.

// // We also need to connect the pages when an event listener is active
// // I'm trying the event listener rn

// // If the user chooses the easy level, the number becomes 4, 8 for hard and so on.
// // I want to find a way to get this value to change
// // I might just track input from the settings page

// //I also decided to put the card images in an array for organization and also randomization
// var count = 0; //This variable is the index of the score
// var inc = []; //Stores all the random values generated
//
// function generateRandomNumber(size, min, max) {
//     var rand = Number(Math.floor(Math.random() * max)); //This generates a number between 0 and the number you specified
//     while (inc.length < size / 2) {
//         let randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
//         if (!inc.includes(randomValue)) {
//             inc.push(randomValue);
//         }
//         // else {
//         //     if (inc.length <= max) {
//         //         generateRandomNumber(size, min, max); //Recursively generates a random number
//         //     }
//         //     else {
//         //         console.log("There are no numbers available, sorry. :("); //This means that all the numbers between 0 and the maximum number has been specified already
//         //         return false;
//         //     }
//         // }
//         if (inc.length > max - min + 1) {
//             console.log("No numbers available, stopping generation.");
//             break;
//         }
//     }

//     var duplicate = inc.concat(inc); //This joins the array with itself
//     for (let i = duplicate.length - 1; i > 0; i--) { //We then have to randomize the order of the merged array
//         const j = Math.floor(Math.random() * (i + 1));
//         [duplicate[i], duplicate[j]] = [duplicate[j], duplicate[i]]; //I looked up this randomizing strategy online
//     }

//     return duplicate;

// }

// var number = 8;
// //I want this to run only once so as to not introduce any duplicates asides two of each.
// var arr = generateRandomNumber(number, 0, (number / 2) - 1);
// var arr_result = [];
// for (var j = 0; j < arr.length; j++) {
//     arr_result[j] = arr[j];
//     console.log(arr_result[j]);
// }



// var time = 3000; //For how long the peek animation runs for
// var isPeekabooActive = false;
// function peekaboo(runtime) {
//     isPeekabooActive = true;
//     var cards = document.querySelectorAll('.flipcard');
//     // Use a regular for loop to add the 'flipped' class
//     for (let i = 0; i < cards.length; i++) {
//         cards[i].classList.add('flipped'); // Show all cards
//     }

//     // Set a timeout to remove the 'flipped' class after runtime
//     setTimeout(() => {
//         for (let i = 0; i < cards.length; i++) {
//             cards[i].classList.remove('flipped'); // Hide all cards
//         }
//     }, runtime);

// }



// //We then have to Call this function to trigger the peekaboo effect


// // var path = './images';
// // function getFileNames(folderPath) {
// //     const fileName = [];
// //     const file = folderPath.files;

// //     for (let i = 0; i < file.length; i++) {
// //         fileName.push(file[i].name);
// //     }
// //     console.log(fileName);
// //     return fileName;
// // }

// // console.log(getFileNames(path));

// // let flippedCards = [];

// const gameboard = document.getElementById("game-board");

// //Storing the names of the card images in an array
// var flipcardFrontImages =
//     ['./images/2C.png',
//         './images/2D.png',
//         './images/2S.png',
//         './images/2H.png',
//         './images/AS.png'
//     ];

// const flipcardBackImages = './images/purple_back.png';

// // This just runs for the number implied when the user chooses the level.
// for (var i = 0; i < number; i++) {
//     // we have to make the back of the card in JS instead of using CSS.
//     const flipcard = document.createElement("div");
//     flipcard.classList.add("flipcard"); //This adds a class for the div element.

//     const flipcardInner = document.createElement("div");
//     flipcardInner.classList.add("flipcard-inner");

//     const flipcardFront = document.createElement("div");
//     flipcardFront.classList.add("flipcard-front");
//     flipcardFront.style.backgroundImage = `url('${flipcardFrontImages[arr_result[i]]}')`;

//     const flipcardBack = document.createElement("div");
//     flipcardBack.classList.add("flipcard-back");
//     flipcardBack.style.backgroundImage = `url('${flipcardBackImages}')`;

//     flipcardInner.appendChild(flipcardFront); //We then have to add the front and back to flipcardInner
//     flipcardInner.appendChild(flipcardBack);

//     flipcard.appendChild(flipcardInner); //We also need to add the inner flipcard to its parent, flipcard.

//     // I had to look this one up, idk what's happening here but I guess it should just be an event listener that checks if the user is clicking
//     flipcard.addEventListener('click', () => {
//         if (!isPeekabooActive && !flipcard.classList.contains("flipped") && !flipcard.classList.contains("matched")) {
//             flipcard.classList.add("flipped");
//             checkGameStatus();
//         }
//     });

//     gameboard.appendChild(flipcard);

// }

// var counter = 0;

// function updateScore(score) {
//     let scoreDisplay = document.getElementById("score-display");

//     if (!scoreDisplay) {
//         scoreDisplay = document.createElement("div");
//         scoreDisplay.id = "score-display";
//         document.body.appendChild(scoreDisplay);
//         scoreDisplay.style.visibility = "visible";
//     }

//     scoreDisplay.textContent = `Your score is: ${score}`;
//     console.log("Your Score:", score);
// }

// // var level = querySelector("button").value;

// // function setDifficulty(level) {
// //     if (level === "easy") number = 4;
// //     else if (level === "medium") number = 8;
// //     else if (level === "hard") number = 16;

// //     console.log("Difficulty set to", level, "with number of cards:", number);

// // }

// function startGame(time) {
//     peekaboo(time);

//     document.querySelectorAll(".flipcard").forEach(cards => {
//         cards.addEventListener("click", () => {
//             if (!cards.classList.contains("flipped")) {
//                 cards.classList.add("flipped");
//                 checkGameStatus();
//             }
//         });
//     });
// }

// function checkGameStatus() {
//     console.log("checkGameStatus called");
//     const flippedCards = Array.from(document.querySelectorAll(".flipped:not(.matched)")); //This ":not" apparently selects the ones without matched in it


//     if (flippedCards.length === 2) { 

//         var [card1, card2] = flippedCards;
//         var front1 = card1.querySelector(".flipcard-front").style.backgroundImage;
//         var front2 = card2.querySelector(".flipcard-front").style.backgroundImage;
//         console.log(front1);
//         console.log(front2);

//         setTimeout(() => {
//             if (front1 === front2) { // Check if the flipped cards match
            
//                 counter++;
//                 updateScore(counter);    //Use the helper function to update the score
//                 //Remove the flipped class
//                 flippedCards.forEach(cards => {
//                     cards.classList.add("matched");
//                 });
    
//                 if (document.querySelectorAll(".matched").length === number) {
//                     setTimeout(() => alert("Congratulations, you win!"), 500);  //Tbh we can make this anything we want
//                     console.log("Congrats!");
//                 }
    
//             } else {
//                 // Not a match, unflip cards after a short delay
//                 console.log("No match, unflipping cards.");
//                 setTimeout(() => {
//                     flippedCards.forEach(cards => cards.classList.remove("flipped"));
//                 }, 1000);
    
//             }
//         }, 500);
        
//     }


// }










//from here on out is Hala's code 

const cardDeck = [
    "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S",
    "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S",
    "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S",
    "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S",
    "10C", "10D", "10H", "10S", "AC", "AD", "AH", "AS",
    "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS",
    "KC", "KD", "KH", "KS"
].map(name => `./images/${name}`);

=======
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
const backgroundMusic = new Audio('background.mp3');
backgroundMusic.loop = true;
const pointSound = new Audio('point.wav');
const nopeSound = new Audio('nope.wav');
const levelSound = new Audio('level.wav');

// Play background music if enabled in settings
if (settings.music) {
    backgroundMusic.volume = settings.musicVolume / 100;
    backgroundMusic.play();
}

// Card deck
const cardDeck = [
    "2C.png", "2D.png", "2H.png", "2S.png", "3C.png", "3D.png", "3H.png", "3S.png",
    "4C.png", "4D.png", "4H.png", "4S.png", "5C.png", "5D.png", "5H.png", "5S.png",
    "6C.png", "6D.png", "6H.png", "6S.png", "7C.png", "7D.png", "7H.png", "7S.png",
    "8C.png", "8D.png", "8H.png", "8S.png", "9C.png", "9D.png", "9H.png", "9S.png",
    "10C.png", "10D.png", "10H.png", "10S.png", "AC.png", "AD.png", "AH.png", "AS.png",
    "JC.png", "JD.png", "JH.png", "JS.png", "QC.png", "QD.png", "QH.png", "QS.png",
    "KC.png", "KD.png", "KH.png", "KS.png"
];

// Game state variables
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
let level = 1;
let score = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
<<<<<<< HEAD

=======
let isPaused = false;

// DOM elements
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
const cardBoard = document.getElementById('card-board');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
<<<<<<< HEAD

restartButton.addEventListener('click', startGame);

=======
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
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function startGame() {
    level = 1;
    score = 0;
    updateScore();
    generateLevel();
}

<<<<<<< HEAD
=======
// Update the score display
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function updateScore() {
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

<<<<<<< HEAD
function generateLevel() {
    cardBoard.innerHTML = '';
    const numCards = level * 2 + 2;
    const cards = [...cardDeck].sort(() => Math.random() - 0.5).slice(0, numCards / 2);
    const cardPairs = [...cards, ...cards].sort(() => Math.random() - 0.5);

    cardBoard.style.gridTemplateColumns = `repeat(${Math.ceil(numCards / 4)}, 1fr)`;
=======
// Generate a new level
function generateLevel() {
    cardBoard.innerHTML = '';
    let numCards = level * 2 + 2;  // Adjusted to ensure levels progress correctly
    const cards = [...cardDeck].sort(() => Math.random() - 0.5).slice(0, numCards / 2);
    const cardPairs = [...cards, ...cards].sort(() => Math.random() - 0.5);

    // Determine grid layout based on number of cards
    const cols = Math.ceil(Math.sqrt(numCards));
    const rows = Math.ceil(numCards / cols);
    cardBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    cardBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
    cardPairs.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
<<<<<<< HEAD
=======
        cardElement.style.backgroundImage = `url('backC.png')`;  // Show card back initially
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
        cardBoard.appendChild(cardElement);
    });
}

<<<<<<< HEAD
=======
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
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
<<<<<<< HEAD
    this.style.backgroundImage = `url(${this.dataset.card}.png)`;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

=======
    this.style.backgroundImage = `url(${this.dataset.card})`;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Check if two flipped cards match
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {
        disableCards();
<<<<<<< HEAD
        score++;
        if (cardBoard.querySelectorAll('.card:not(.matched)').length === 0) {
            level++;
            setTimeout(generateLevel, 1000);
        }
    } else {
=======
        playSound(pointSound);
        score++;
        if (cardBoard.querySelectorAll('.card:not(.matched)').length === 0) {
            showCongratsPanel();
            playSound(levelSound);
        }
    } else {
        playSound(nopeSound);
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
        unflipCards();
    }

    updateScore();
}

<<<<<<< HEAD
=======
// Play sound effect
function playSound(sound) {
    sound.currentTime = 0;
    sound.volume = settings.effectsVolume / 100;
    sound.play();
}

// Disable matched cards
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

<<<<<<< HEAD
=======
// Unflip unmatched cards
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
<<<<<<< HEAD
        firstCard.style.backgroundImage = `url(backC.png)`;
        secondCard.style.backgroundImage = `url(backC.png)`;
=======
        firstCard.style.backgroundImage = 'url(backC.png)';
        secondCard.style.backgroundImage = 'url(backC.png)';
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
        resetBoard();
    }, 1000);
}

<<<<<<< HEAD
=======
// Reset board after each turn
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

<<<<<<< HEAD
// Initialize the game
startGame();


=======
// Show congratulations panel when level is complete
function showCongratsPanel() {
    congratsPanel.style.display = 'block';
    document.getElementById('next-level').addEventListener('click', () => {
        congratsPanel.style.display = 'none';
        level++;
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
>>>>>>> a3d91178132ba82739c3f9d19367014bf5c2bf4c
