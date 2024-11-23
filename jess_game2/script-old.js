let correctAnswers = {
    room1: ["SPECIFIC", "MEASURABLE", "ACHIEVABLE", "RELEVANT", "TIMEBOUND"], // SMART goal components
    room2: 2, // Correct answer for measurement mystery (Standardized Test)
    room3: /.*(solve|answer).*20.*questions.*in.*2.*weeks.*to.*meet.*her.*goal.*/i // SMART goal regex
  };
  
  let timer;
  let timeLeft = 300; // 5 minutes = 300 seconds
  
  // Start timer automatically when the game begins
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
  
  // End the game and show the final message
  function endGame() {
    document.querySelectorAll('.room').forEach(room => room.classList.add('hidden'));
    document.getElementById('final-message').classList.remove('hidden');
  }
  
  // Randomize question selection for Room 1 (Components Check)
  function randomizeRoom1() {
    const components = ["SPECIFIC", "MEASURABLE", "ACHIEVABLE", "RELEVANT", "TIMEBOUND"];
    const randomComponent = components[Math.floor(Math.random() * components.length)];
    const scrambledWord = scrambleWord(randomComponent);
    document.getElementById('scrambled-word').textContent = scrambledWord;
    document.getElementById('room1').dataset.correctAnswer = randomComponent; // store correct answer in data attribute
  }
  
  function scrambleWord(word) {
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    return scrambled;
  }
  
  function checkRoom1Answer() {
    const guess = document.getElementById('guess').value.toUpperCase();
    const correctAnswer = document.getElementById('room1').dataset.correctAnswer;
    const message = document.getElementById('room1-message');
    
    if (guess === correctAnswer) {
      message.textContent = "Correct! You've unlocked the next room!";
      message.style.color = "green";
      document.getElementById('room1').classList.add('hidden');
      document.getElementById('room2').classList.remove('hidden');
    } else {
      message.textContent = "Try again! Unscramble the word correctly.";
      message.style.color = "red";
    }
  }
  
  // Randomize choices for Room 2 (Measurement Mystery)
  function randomizeRoom2() {
    const choices = [
      { question: "Standardized Test", correct: 2 },
      { question: "Observation", correct: 1 },
      { question: "Teacher Assessment", correct: 3 }
    ];
    const randomized = choices.sort(() => Math.random() - 0.5);
    
    document.getElementById('measurement-choice').innerHTML = randomized.map((choice, index) => 
      `<option value="${index + 1}">${choice.question}</option>`
    ).join('');
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
  
  // Check SMART goal answer in Room 3 with pattern matching using regex
  function checkRoom3Answer() {
    const smartGoal = document.getElementById('smart-goal').value.trim();
    const message = document.getElementById('room3-message');
    
    // Match SMART goal with a regex for flexibility
    if (correctAnswers.room3.test(smartGoal)) {
      message.textContent = "Correct! You've successfully written the SMART goal!";
      message.style.color = "green";
      document.getElementById('room3').classList.add('hidden');
      document.getElementById('final-message').classList.remove('hidden');
    } else {
      message.textContent = "Try again! Ensure your goal is specific, measurable, and time-bound.";
      message.style.color = "red";
    }
  }
  
  // Initialize game
  startTimer();
  randomizeRoom1();
  randomizeRoom2();
  