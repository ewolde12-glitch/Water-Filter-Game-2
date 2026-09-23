// Game variables
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer;

// Winning score
const winningScore = 300;

// Get HTML elements
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("water-progress");

const startButton = document.getElementById("start-button");
const playAgainButton = document.getElementById("play-again");

const message = document.getElementById("message");

const gameIcons = document.querySelectorAll(".game-icon");


// ==============================
// START GAME
// ==============================

startButton.addEventListener("click", startGame);

function startGame() {

    // Reset game values
    score = 0;
    timeLeft = 30;

    gameRunning = true;

    // Update screen
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    progressBar.style.width = "0%";

    message.textContent = "";

    startButton.classList.add("hidden");
    playAgainButton.classList.add("hidden");

    // Start timer
    timer = setInterval(updateTimer, 1000);

}


// ==============================
// TIMER
// ==============================

function updateTimer() {

    timeLeft--;

    timerDisplay.textContent = timeLeft;

    // Check if time is finished
    if (timeLeft <= 0) {

        clearInterval(timer);

        gameRunning = false;

        // Check if player reached 300 points
        if (score >= winningScore) {
            winGame();
        } else {
            loseGame("⏰ Time is up!");
        }
    }
}


// ==============================
// ICON CLICKING
// ==============================

gameIcons.forEach(function(icon) {

    icon.addEventListener("click", function() {

        // Don't allow clicking after game ends
        if (!gameRunning) {
            return;
        }

        const type = icon.dataset.type;

        // WATER
        if (type === "water") {

            score += 10;

            updateScore();

            // Move water icon
            moveIcon(icon);

            // Check win
            if (score >= winningScore) {
                winGame();
            }
        }


        // GERM
        else if (type === "germ") {

            score -= 10;

            // Don't allow negative score
            if (score < 0) {
                score = 0;
            }

            updateScore();

            // Move germ icon
            moveIcon(icon);
        }


        // TRASH
        else if (type === "trash") {

            loseGame("🗑️ You clicked the trash!");
        }

    });

});


// ==============================
// UPDATE SCORE
// ==============================

function updateScore() {

    scoreDisplay.textContent = score;

    // Convert score to percentage
    let percentage = (score / winningScore) * 100;

    // Maximum progress is 100%
    if (percentage > 100) {
        percentage = 100;
    }

    progressBar.style.width = percentage + "%";
}


// ==============================
// MOVE ICON
// ==============================

function moveIcon(icon) {

    const gameArea = document.getElementById("game-area");

    const maxX = gameArea.clientWidth - 80;
    const maxY = gameArea.clientHeight - 80;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    icon.style.left = randomX + "px";
    icon.style.top = randomY + "px";
}


// ==============================
// WIN GAME
// ==============================

function winGame() {

    clearInterval(timer);

    gameRunning = false;

    message.innerHTML = `
        🎉 YOU WIN! 🎉
        <br>
        You filtered enough water!
        <br>
        Score: ${score}
    `;

    message.style.color = "green";

    playAgainButton.classList.remove("hidden");
}


// ==============================
// LOSE GAME
// ==============================

function loseGame(reason) {

    clearInterval(timer);

    gameRunning = false;

    message.innerHTML = `
        💦 GAME OVER 💦
        <br>
        ${reason}
        <br>
        Score: ${score}
    `;

    message.style.color = "red";

    playAgainButton.classList.remove("hidden");
}


// ==============================
// PLAY AGAIN
// ==============================

playAgainButton.addEventListener("click", function() {

    // Reset values
    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    progressBar.style.width = "0%";

    message.textContent = "";

    // Move icons back to starting positions
    resetIcons();

    // Start new game
    startGame();

});


// ==============================
// RESET ICONS
// ==============================

function resetIcons() {

    const water = document.querySelector(".water");
    const germ = document.querySelector(".germ");
    const trash = document.querySelector(".trash");

    water.style.left = "20%";
    water.style.top = "30%";

    germ.style.left = "50%";
    germ.style.top = "20%";

    trash.style.left = "75%";
    trash.style.top = "60%";
}