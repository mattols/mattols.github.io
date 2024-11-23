let correctAnswers = {
    room1: ["SPECIFIC", "MEASURABLE", "ACHIEVABLE", "RELEVANT", "TIMEBOUND"], // SMART goal components
    room2: null, // Correct answer will be dynamically set for Room 2
    room3: /\b(1[1-5]|[1-9])\b.*(two\s?weeks|2\s?weeks)/i // SMART goal regex: number 11-15 and "two weeks" or "2 weeks"
  };
  
  let timer;
  let timeLeft = 120; // 2 minutes = 120 seconds
  
  // Start timer automatically when the game begins
  function startTimer() {
    // Reset the timer to 120 seconds
    timeLeft = 120;
  
    // Start the countdown
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
    const guess = document.getElementById('guess').value.trim().toUpperCase(); // Ignore spaces and case
    const correctAnswer = document.getElementById('room1').dataset.correctAnswer;
    const message = document.getElementById('room1-message');
    
    if (guess === correctAnswer) {
      message.textContent = "Correct! You've unlocked the next room!";
      message.style.color = "green";
      document.getElementById('room1').classList.add('hidden');
      document.getElementById('room2').classList.remove('hidden');
      randomizeRoom2(); // Ensure questions are randomized when entering Room 2
    } else {
      message.textContent = "Try again! Unscramble the word correctly.";
      message.style.color = "red";
    }
  }
  
  // Function to shuffle Room 2's questions
  function randomizeRoom2() {
    const questions = [
      { question: "Emily's reading score is 20 words per minute. What is the best way to measure progress?", correct: 2 }, // Standardized Test
      { question: "How would you measure a student's progress in reading fluency?", correct: 2 }, // Standardized Test
      { question: "A student has completed a series of assignments. Which assessment is best for tracking their progress?", correct: 1 }, // Observation
      { question: "Which method would you use to track how much a student has learned over time?", correct: 3 }, // Teacher Assessment
    ];
  
    // Shuffle questions randomly using Fisher-Yates shuffle
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap elements
    }
  
    // Clear any old questions before appending new shuffled ones
    const questionContainer = document.getElementById('measurement-question-container');
    questionContainer.innerHTML = ''; // Clear previous questions
  
    // Display shuffled questions
    questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = `
        <p>${q.question}</p>
        <select id="measurement-choice-${index}">
          <option value="1">Observation</option>
          <option value="2">Standardized Test</option>
          <option value="3">Teacher Assessment</option>
        </select>
      `;
      questionContainer.appendChild(questionDiv);
  
      // Store the correct answer for this question in a data attribute
      questionDiv.dataset.correctAnswer = q.correct;
    });
  }
  
  function checkRoom2Answer() {
    const message = document.getElementById('room2-message');
    let allCorrect = true;
  
    // Check all answers
    const questionContainers = document.querySelectorAll('.question');
    questionContainers.forEach((container, index) => {
      const selectedChoice = parseInt(document.getElementById(`measurement-choice-${index}`).value);
      const correctAnswer = parseInt(container.dataset.correctAnswer);
  
      // If any answer is wrong, mark allCorrect as false
      if (selectedChoice !== correctAnswer) {
        allCorrect = false;
      }
    });
  
    if (allCorrect) {
      message.textContent = "Correct! You've unlocked the next room!";
      message.style.color = "green";
      document.getElementById('room2').classList.add('hidden');
      document.getElementById('room3').classList.remove('hidden');
    } else {
      message.textContent = "Try again! Make sure all questions are answered correctly.";
      message.style.color = "red";
    }
  }
  
  // Check SMART goal answer in Room 3 with pattern matching using regex
  function checkRoom3Answer() {
    const smartGoal = document.getElementById('smart-goal').value.trim(); // Trim spaces
    const message = document.getElementById('room3-message');
    
    // Match SMART goal with a regex for number between 11-15 and "two weeks" or "2 weeks"
    if (correctAnswers.room3.test(smartGoal)) {
      message.textContent = "Correct! You've successfully written the SMART goal!";
      message.style.color = "green";
      document.getElementById('room3').classList.add('hidden');
      document.getElementById('final-message').classList.remove('hidden');
    } else {
      message.textContent = "Try again! Make sure your goal includes a number between 11-15 and 'two weeks' or '2 weeks'.";
      message.style.color = "red";
    }
  }
  
  // Initialize game
  window.onload = function() {
    startTimer();
    randomizeRoom1();
  };
  