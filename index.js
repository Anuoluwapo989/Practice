
// Hala, you can work on the button for start and a function that takes it from page1.html to page2.html on click.
//We need to have a function that spawns two of each card type onto the page at random slots
//We also need a function that counts the users score and returns "game over" if they lose and "congratulations" if they win.

// We also need to connect the pages when an event listener is active
// I'm trying the event listener rn

// If the user chooses the easy level, the number becomes 4, 8 for hard and so on.
// I want to find a way to get this value to change
// I might just track input from the settings page

//I also decided to put the card images in an array for organization and also randomization
var count = 0; //This variable is the index of the score
var inc = []; //Stores all the random values generated
function generateRandomNumber(size, min, max) {
    var rand = Number(Math.floor(Math.random() * max)); //This generates a number between 0 and the number you specified
    while (inc.length < size / 2) {
        let randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!inc.includes(randomValue)) {
            inc.push(randomValue);
        }
        else {
            if (inc.length <= max) {
                generateRandomNumber(size, min, max); //Recursively generates a random number
            }
            else {
                console.log("There are no numbers available, sorry. :("); //This means that all the numbers between 0 and the maximum number has been specified already
                return false;
            }
        }
    }

    var duplicate = inc.concat(inc); //This joins the array with itself
    for (let i = duplicate.length - 1; i > 0; i--) { //We then have to randomize the order of the merged array
        const j = Math.floor(Math.random() * (i + 1));
        [duplicate[i], duplicate[j]] = [duplicate[j], duplicate[i]]; //I looked up this randomizing strategy online
    }

    return duplicate;

}

var number = 8;
//I want this to run only once so as to not introduce any duplicates asides two of each.
var arr = generateRandomNumber(number, 0, (number / 2) - 1);
var arr_result = [];
for (var j = 0; j < arr.length; j++) {
    arr_result[j] = arr[j];
    console.log(arr_result[j]);
}



var time = 3000; //For how long the peek animation runs for

function peekaboo(runtime) {
    const cards = document.querySelectorAll('.flipcard');
    // Use a regular for loop to add the 'flipped' class
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('flipped'); // Show all cards
    }

    // Set a timeout to remove the 'flipped' class after runtime
    setTimeout(() => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('flipped'); // Hide all cards
        }
    }, runtime);
}

//We then have to Call this function to trigger the peekaboo effect

// console.log(gameboard.children);

function getFileNames(folderPath) {
    const fileName = [];
    const files = folderPath.files;

    for (let i = 0; i < files.length; i++) {
        fileName.push(files[i].name);
    }

    return fileName;
}

    let flippedCards = [];


    function checkGameStatus() {
        flippedCards = Array.from(document.querySelectorAll(".flipcard.flipped"));
        var counter = 0;
        if (flippedCards.length === 2) {
            // Check if the flipped cards match
            const [card1, card2] = flippedCards;
            const front1 = card1.querySelector(".flipcard-front").style.backgroundImage;
            const front2 = card2.querySelector(".flipcard-front").style.backgroundImage;

            if (front1 === front2) {
                // Match found, leave cards flipped
                flippedCards = [];
                counter++;
                var count = document.createElement('div');
                count.classList.add('points');
                count.innerText("Your score is: " + counter);
                count.appendChild(gameboard);
            } else {
                // Not a match, unflip cards after a short delay
                setTimeout(() => {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                    flippedCards = [];
                }, 1000);
            }
        }
    }

    const gameboard = document.getElementById("game-board");
    var counter = 0;

    //Storing the names of the card images in an array
    var flipcardFrontImages =
    ['./images/2C.png',
        './images/2D.png',
        './images/2S.png',
        './images/2H.png',
        './images/AS.png'
    ];


    const flipcardBackImages = './images/purple_back.png';

    // This just runs for the number implied when the user chooses the level.
    for (var i = 0; i < number; i++) {
        // we have to make the back of the card in JS instead of using CSS.
        const flipcard = document.createElement("div");
        flipcard.classList.add("flipcard"); //This adds a class for the div element.

        const flipcardInner = document.createElement("div");
        flipcardInner.classList.add("flipcard-inner");

        const flipcardFront = document.createElement("div");
        flipcardFront.classList.add("flipcard-front");
        flipcardFront.style.backgroundImage = `url('${flipcardFrontImages[arr_result[i]]}')`;

        const flipcardBack = document.createElement("div");
        flipcardBack.classList.add("flipcard-back");
        flipcardBack.style.backgroundImage = `url('${flipcardBackImages}')`;

        flipcardInner.appendChild(flipcardFront); //We then have to add the front and back to flipcardInner
        flipcardInner.appendChild(flipcardBack);

        flipcard.appendChild(flipcardInner); //We also need to add the inner flipcard to its parent, flipcard.

        // I had to look this one up, idk what's happening here but I guess it should just be an event listener that checks if the user is clicking
        flipcard.addEventListener('click', () => {
            flipcard.classList.toggle('flipped');
        });

        gameboard.appendChild(flipcard);

    }

checkGameStatus();
