let correctAnswers = {
    room1: "SMART",  // The correct answer for the unscrambled word
    room2: 2,        // Correct answer for the measurement mystery (Standardized Test)
    room3: "Emily will improve her math fluency by solving 20 addition problems in 2 minutes by the end of the semester."
  };
  
  let timer;
  let timeLeft = 4500; // 75 minutes = 4500 seconds
  
  function startTimer() {
    timer = setInterval(function() {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById("time-left").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up! The game is over.");
        endGame();
      }
    }, 1000);
  }
  
  function endGame() {
    // Hide all rooms
    document.querySelectorAll('.room').forEach(room => room.classList.add('hidden'));
    document.getElementById('final-message').classList.remove('hidden');
  }
  
  function randomizeWord(word) {
    let shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
    return shuffled;
  }
  
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
      document
  