// Lista med ord 
const wordList = ["fisk", "potatis", "htmlcss", "hangman", "Magicbananas"];

// Välj ett slumpmässigt ord från listan och gör det till versaler
let chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

// en array för att ha koll på rätt gissningar (initierad med "_")
let correctGuesses = Array(chosenWord.length).fill("_");

// en array för att ha koll på felgissningar
let wrongGuesses = [];

// antal gissningar spelaren har
const maxWrongGuesses = 4;

// DOM-element för att visa ord, felaktiga bokstäver, resultat och spela igen-knappen
const wordDisplay = document.querySelector("#word-display");
const wrongLetters = document.querySelector("#wrong-letters");
const result = document.querySelector("#result");
const playAgainButton = document.querySelector("#play-again");

// Lista med gubbens delar i rätt ordning (för hänga gubbe)
const hangmanParts = [
    document.querySelector("#head"),
    document.querySelector("#body"),
    document.querySelector("#arms"),
    document.querySelector("#legs")
];

// Funktion för att uppdatera visningen av det valda ordet
function updateWordDisplay() {
    wordDisplay.textContent = correctGuesses.join(" "); 
}

// Funktion för att visa resultatet och knappen för att spela igen
function showResult(message) {
    result.textContent = message; 
    playAgainButton.style.display = "block"; 
}

// Funktion för att återställa spelet till sina ursprungliga värden
function resetGame() {
    // Välj ett nytt slumpmässigt ord
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

    // Återställ gissningarna
    correctGuesses = Array(chosenWord.length).fill("_");
    wrongGuesses = [];

    // Rensa resultat och dölja knappen för att spela igen
    result.textContent = "";
    playAgainButton.style.display = "none";

    // Dölj gubbens delar
    hangmanParts.forEach(part => part.style.display = "none");


    updateWordDisplay();

    // Rensa fel  bokstäver
    wrongLetters.textContent = "";
}