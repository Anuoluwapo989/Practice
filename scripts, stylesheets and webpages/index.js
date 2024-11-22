"use strict";
// Hala, you can work on the button for start and a function that takes it from page1.html to page2.html on click.
//We need to have a function that spawns two of each card type onto the page at random slots
//We also need a function that counts the users score and returns "game over" if they lose and "congratulations" if they win.

// We also need to connect the pages when an event listener is active
// I'm trying the event listener rn

// var button = document.getElementById("");
// button.addEventListener( click, function(){
//     document.location.href("http://localhost:8080");
// });

// If the user chooses the easy level
// I want to find a way to get this value to change
// I might just track input from the settings page

//I also decided to put the card images in an array for organization and also randomization
const flipcardFrontImages = [
'c:/Users/Admin/Downloads/Practice/images/pngegg (1).png',
'c:/Users/Admin/Downloads/Practice/images/pngegg (2).png',
'c:/Users/Admin/Downloads/Practice/images/pngegg (3).png',
'c:/Users/Admin/Downloads/Practice/images/pngegg (4).png',
'c:/Users/Admin/Downloads/Practice/images/pngegg (5).png',
'c:/Users/Admin/Downloads/Practice/images/pngegg (6).png'
];

const flipcardBackImages = 'c:/Users/Admin/Downloads/Practice/images/Blank-Playing-Card.png';

const number = 8;
const gameboard = document.getElementById("game-board");
console.log(gameboard.children);
// This just runs for the number implied when the user chooses the level.
for (var i = 0; i < number; i++) {
    // we have to make the back of the card in JS instead of using CSS.
    const flipcard = document.createElement("div");
    flipcard.classList.add("flipcard"); //This adds a class for the div element.


    const flipcardInner = document.createElement("div");
    flipcardInner.classList.add("flipcard-inner");


    const flipcardFront = document.createElement("div");
    flipcardFront.classList.add("flipcard-front");
    flipcardFront.style.backgroundImage = "url('${cardFrontImages[generateRandomNumber(number)]}')";

    const flipcardBack = document.createElement("div");
    flipcardBack.classList.add("flipcard-back");
    flipcardBack.style.backgroundImage = "url('${cardBackImages}')";

    flipcardInner.appendChild(flipcardFront); //We then have to add the front and back to flipcardInner
    flipcardInner.appendChild(flipcardBack);

    flipcard.appendChild(flipcardInner); //We also need to add the inner flipcard to its parent, flipcard.

    // I had to look this one up, idk what's happening here but I guess it should just be an event listener that checks if the user is clicking
    flipcard.addEventListener('click', () =>{
        flipcard.classList.toggle('flipped');
    });

    gameboard.appendChild(flipcard);

}

var inc = []; //Stores all the random values generated
function generateRandomNumber(max){
    var rand = Number(Math.floor(Math.random() * max)); //This generates a number between 0 and the number you specified
    if(!(inc.includes(rand))){
        inc.push(rand); //Adds the value to the array only if it wasn't there before
        
    }else{
        if(inc.length < max){
            return generateRandomNumber(max); //Recursively generates a random number
        }
        else{
            console.log("There are no numbers available, sorry. :("); //This means that all the numbers between 0 and the maximum number has been specified already
            return false;
        }
    }

    var duplicate = inc.concat(inc);
    for(var i = 0; duplicate.length){}
    
}