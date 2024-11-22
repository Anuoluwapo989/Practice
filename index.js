
// Hala, you can work on the button for start and a function that takes it from page1.html to page2.html on click.
//We need to have a function that spawns two of each card type onto the page at random slots
//We also need a function that counts the users score and returns "game over" if they lose and "congratulations" if they win.

// We also need to connect the pages when an event listener is active
// I'm trying the event listener rn

// If the user chooses the easy level, the number becomes 4, 8 for hard and so on.
// I want to find a way to get this value to change
// I might just track input from the settings page

//I also decided to put the card images in an array for organization and also randomization
var count = 0; //This variable counts the index of the
var inc = []; //Stores all the random values generated
function generateRandomNumber(size, min, max) {
    var rand = Number(Math.floor(Math.random() * max)); //This generates a number between 0 and the number you specified
    while (inc.length < size / 2) {
        let randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!inc.includes(randomValue)) {
            inc.push(randomValue);
        }
        else {
            if (inc.length < max) {
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



//I want this to run only once so as to not inroduce any duplicates asides two of each.


var arr = generateRandomNumber(8, 0, 4);
var arr_result = [];
for (var j = 0; j < arr.length; j++) {
    arr_result[j] = arr[j];
    console.log(arr_result[j]);
}


const flipcardFrontImages = ['spades.png','clubs.png','heart.png','diamond.png'];

const flipcardBackImages = 'blank.png';

var number = 8;
const gameboard = document.getElementById("game-board");
// console.log(gameboard.children);

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

