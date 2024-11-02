document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const winScreen = document.getElementById("win-screen");
    const loseScreen = document.getElementById("lose-screen");
    const cardValues = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥥", "🍒", "🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥥", "🍒"];
    let cardsFlipped = [];
    let matchedPairs = 0;
    let score = 0;
    let timeLeft = 60;  // Set timer to 60 seconds
    let timerInterval;
  
    // Shuffle cards
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    shuffle(cardValues);
  
    // Create cards
    function createBoard() {
      grid.innerHTML = ""; // Clear grid for restarting
      cardValues.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
      });
      matchedPairs = 0;
      score = 0;
      scoreDisplay.textContent = score;
      resetTimer();
    }
  
    // Reset and start the timer
    function resetTimer() {
      clearInterval(timerInterval);
      timeLeft = 60;  // Reset timer to 60 seconds
      timerDisplay.textContent = timeLeft;
      timerInterval = setInterval(countDown, 1000);
    }
  
    // Timer countdown
    function countDown() {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showLoseScreen();
      }
    }
  
    // Flip card
    function flipCard() {
      if (this.classList.contains("flipped") || cardsFlipped.length === 2) return;
      this.classList.add("flipped");
      this.textContent = this.dataset.value;
      cardsFlipped.push(this);
  
      if (cardsFlipped.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  
    // Check for match
    function checkForMatch() {
      const [card1, card2] = cardsFlipped;
  
      if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        updateScore();
  
        if (matchedPairs === cardValues.length / 2) {
          clearInterval(timerInterval);  // Stop timer
          showWinScreen();
        }
      } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
      }
      cardsFlipped = [];
    }
  
    // Update score with animation
    function updateScore() {
      score += 10;
      scoreDisplay.textContent = score;
      scoreDisplay.classList.add("score-flash");
      setTimeout(() => scoreDisplay.classList.remove("score-flash"), 300);
    }
  
    // Show win screen
    function showWinScreen() {
      winScreen.classList.remove("hidden");
    }
  
    // Show lose screen
    function showLoseScreen() {
      loseScreen.classList.remove("hidden");
    }
  
    // Restart the game
    function restartGame() {
      winScreen.classList.add("hidden");
      loseScreen.classList.add("hidden");
      createBoard();
    }
  
    createBoard();
  });
  