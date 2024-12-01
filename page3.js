
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

let level = 1;
let score = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cardBoard = document.getElementById('card-board');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', startGame);

function startGame() {
    level = 1;
    score = 0;
    updateScore();
    generateLevel();
}

function updateScore() {
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

function generateLevel() {
    cardBoard.innerHTML = '';
    const numCards = level * 2 + 2;
    const cards = [...cardDeck].sort(() => Math.random() - 0.5).slice(0, numCards / 2);
    const cardPairs = [...cards, ...cards].sort(() => Math.random() - 0.5);

    cardBoard.style.gridTemplateColumns = `repeat(${Math.ceil(numCards / 4)}, 1fr)`;
    cardPairs.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        cardBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    this.style.backgroundImage = `url(${this.dataset.card}.png)`;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {
        disableCards();
        score++;
        if (cardBoard.querySelectorAll('.card:not(.matched)').length === 0) {
            level++;
            setTimeout(generateLevel, 1000);
        }
    } else {
        unflipCards();
    }

    updateScore();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.style.backgroundImage = `url(backC.png)`;
        secondCard.style.backgroundImage = `url(backC.png)`;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Initialize the game
startGame();


