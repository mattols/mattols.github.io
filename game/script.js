const scrambledWord = "TAC"; // The scrambled word
const correctWord = "CAT"; // The correct word

function checkAnswer() {
  const guess = document.getElementById("guess").value;
  const messageElement = document.getElementById("message");

  if (guess.toUpperCase() === correctWord) {
    messageElement.textContent = "Correct! You unscrambled the word!";
    messageElement.style.color = "green";
  } else {
    messageElement.textContent = "Try again!";
    messageElement.style.color = "red";
  }
}
