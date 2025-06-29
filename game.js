class RockPaperScissorsGame {
  constructor() {
    // Game state
    this.playerScore = 0;
    this.computerScore = 0;
    this.WIN_SCORE = 4;

    this.choices = ["Rock", "Paper", "Scissors"];

    // DOM elements
    this.computerChoiceEls = {
      Rock: document.getElementById("Rock"),
      Paper: document.getElementById("Paper"),
      Scissors: document.getElementById("Scissors")
    };
    this.playerScoreText = document.getElementById("PlayerScore");
    this.computerScoreText = document.getElementById("ComputerScore");
    this.messageLose = document.getElementById("messageLose");
    this.messageWin = document.getElementById("messageWin");
    this.resetBt = document.getElementById("resetBt");
    this.con = document.querySelector(".con");

    this.setupEventListeners();
    this.hideAllComputerChoices();
  }

  setupEventListeners() {
    document.getElementById("rock").addEventListener("click", () => this.playRound("Rock"));
    document.getElementById("paper").addEventListener("click", () => this.playRound("Paper"));
    document.getElementById("scissors").addEventListener("click", () => this.playRound("Scissors"));
    this.resetBt.addEventListener("click", () => this.resetGame());
  }

  getComputerChoice() {
    const index = Math.floor(Math.random() * this.choices.length);
    return this.choices[index];
  }

  playRound(playerChoice) {
    if (this.playerScore >= this.WIN_SCORE || this.computerScore >= this.WIN_SCORE) return;

    const computerChoice = this.getComputerChoice();
    this.displayComputerChoice(computerChoice);

    if (playerChoice === computerChoice) {
      // thsi si for the tie — do nothing
    } else if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
      this.playerScore++;
    } else {
      this.computerScore++;
    }

    this.updateScores();
    this.checkGameOver();
  }

  updateScores() {
    this.playerScoreText.textContent = this.playerScore;
    this.computerScoreText.textContent = this.computerScore;
  }

  displayComputerChoice(choice) {
    this.hideAllComputerChoices();
    const el = this.computerChoiceEls[choice];
    el.style.display = "block";
    el.style.boxShadow = "0 0 40px var(--computer-color)";
  }

  hideAllComputerChoices() {
    Object.values(this.computerChoiceEls).forEach(el => {
      el.style.display = "none";
      el.style.boxShadow = "none";
    });
  }

  checkGameOver() {
    if (this.playerScore >= this.WIN_SCORE || this.computerScore >= this.WIN_SCORE) {
      if (this.playerScore >= this.WIN_SCORE) {
        this.messageWin.style.display = "block";
      } else {
        this.messageLose.style.display = "block";
      }
      this.con.style.display = "none";
      this.resetBt.style.display = "block";
    }
  }

  resetGame() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.updateScores();
    this.hideAllComputerChoices();
    this.messageWin.style.display = "none";
    this.messageLose.style.display = "none";
    this.con.style.display = "block";
    this.resetBt.style.display = "none";
  }
}

// when the DOM is ready the game will start
document.addEventListener("DOMContentLoaded", () => {
  new RockPaperScissorsGame();
});
