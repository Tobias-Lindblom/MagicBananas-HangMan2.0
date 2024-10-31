// Lista med ord
const wordList = ["fisk", "potatis", "htmlcss", "hangman", "Magicbananas"];

// Välj ett slumpmässigt ord från listan och gör det till versaler
let chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

// En array för att ha koll på rätt gissningar (initierad med "_")
let correctGuesses = Array(chosenWord.length).fill("_");

// En array för att ha koll på felgissningar
let wrongGuesses = [];

// Max antal tillåtna felgissningar
const maxWrongGuesses = 4;

// DOM-element för att visa ord, felaktiga bokstäver, resultat och modalen
const wordDisplay = document.querySelector("#word-display");
const wrongLetters = document.querySelector("#wrong-letters");
const result = document.querySelector("#result");
const gameModal = document.querySelector(".game-modal");

// Lista med gubbens delar i rätt ordning (för hänga gubbe)
const hangmanParts = [
    document.querySelector("#head"),
    document.querySelector("#body"),
    document.querySelector("#arms"),
    document.querySelector("#legs"),
];

// Funktion för att uppdatera visningen av det valda ordet
function updateWordDisplay() {
    wordDisplay.textContent = correctGuesses.join(" ");
}

// Funktion för att visa resultatet och modalen för vinst/förlust
function showResult(message) {
    result.textContent = message; 
    gameModal.querySelector("h4").innerText = message;
    gameModal.classList.add("show");
}

// Funktion för att återställa spelet till sina ursprungliga värden
function resetGame() {
    // Välj ett nytt slumpmässigt ord
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

    // Återställ gissningarna
    correctGuesses = Array(chosenWord.length).fill("_");
    wrongGuesses = [];

    // Rensa resultat och dölja modalen
    result.textContent = "";
    gameModal.classList.remove("show");

    // Dölj gubbens delar
    hangmanParts.forEach(part => part.style.display = "none");

    updateWordDisplay();

    // Rensa fel bokstäver
    wrongLetters.textContent = "";
}

// Funktion för att hantera gissningar
function handleGuess(letter) {
    if (chosenWord.includes(letter)) {
        // Om bokstaven finns i det valda ordet (rätt gissning)
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                correctGuesses[i] = letter;
            }
        }
        updateWordDisplay();

        // Kolla om spelaren har vunnit (inga "_" kvar)
        if (!correctGuesses.includes("_")) {
            gameModal.querySelector("h4").innerText =("Du vann, Grattis!😆");
            gameModal.classList.add("show")
        }
    } else {
        // Om bokstaven inte finns i ordet (fel gissning)
        wrongGuesses.push(letter);
        wrongLetters.textContent = wrongGuesses.join(", ");

        // Visa en ny del av gubben vid varje felgissning
        if (wrongGuesses.length <= hangmanParts.length) {
            hangmanParts[wrongGuesses.length - 1].style.display = "block";
        }

        // Kolla om spelaren har förlorat (max antal fel gissningar uppnått)
        if (wrongGuesses.length === maxWrongGuesses) {
            gameModal.querySelector("h4").innerText =(`Du förlorade!🙁 Ordet var: ${chosenWord}`);
            gameModal.classList.add("show")
        }
    }
}

// Lyssna på tangenttryckningar
window.addEventListener("keydown", (event) => {
    const letter = event.key.toUpperCase();
    const isLetter = letter.match(/[A-Z]/);
    const isNotAlreadyGuessed = !correctGuesses.includes(letter) && !wrongGuesses.includes(letter);
    const hasNotLost = wrongGuesses.length < maxWrongGuesses;

    // Om allt är sant, hantera gissningen
    if (isLetter && hasNotLost && isNotAlreadyGuessed) {
        handleGuess(letter);
    }
});

// Starta spelet genom att initiera uppdatering av ord och återställning
resetGame();
updateWordDisplay();