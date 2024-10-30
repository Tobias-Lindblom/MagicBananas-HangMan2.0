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