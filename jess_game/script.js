let correctAnswers = {
  room1: "SMART",  // The correct answer for the unscrambled word
  room2: 2,        // Correct answer for the measurement mystery (Standardized Test)
  room3: "Emily will improve her math fluency by solving 20 addition problems in 2 minutes by the end of the semester."
};

function checkRoom1Answer() {
  const guess = document.getElementById('guess').value.toUpperCase();
  const message = document.getElementById('room1-message');
  if (guess === correctAnswers.room1) {
    message.textContent = "Correct! You've unlocked the next room!";
    message.style.color = "green";
    document.getElementById('room1').classList.add('hidden');
    document.getElementById('room2').classList.remove('hidden');
  } else {
    message.textContent = "Try again! Unscramble the word correctly.";
    message.style.color = "red";
  }
}

function checkRoom2Answer() {
  const measurementChoice = document.getElementById('measurement-choice').value;
  const message = document.getElementById('room2-message');
  if (parseInt(measurementChoice) === correctAnswers.room2) {
    message.textContent = "Correct! You've unlocked the next room!";
    message.style.color = "green";
    document.getElementById('room2').classList.add('hidden');
    document.getElementById('room3').classList.remove('hidden');
  } else {
    message.textContent = "Try again! Match the correct measurement method.";
    message.style.color = "red";
  }
}

function checkRoom3Answer() {
  const smartGoal = document.getElementById('smart-goal').value.trim();
  const message = document.getElementById('room3-message');
  if (smartGoal === correctAnswers.room3) {
    message.textContent = "Correct! You've successfully written the SMART goal!";
    message.style.color = "green";
    document.getElementById('room3').classList.add('hidden');
    document.getElementById('final-message').classList.remove('hidden');
  } else {
    message.textContent = "Try again! Ensure your goal is specific, measurable, achievable, relevant, and time-bound.";
    message.style.color = "red";
  }
}
