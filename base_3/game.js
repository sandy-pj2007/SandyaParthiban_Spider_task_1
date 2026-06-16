const players = [
    {
        name: "You",
        lives: 3,
        isHuman: true
    },
    {
        name: "Bot 1",
        lives: 3,
        isHuman: false
    },
    {
        name: "Bot 2",
        lives: 3,
        isHuman: false
    },
    {
        name: "Bot 3",
        lives: 3,
        isHuman: false
    }
];

const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");
const livesBoard = document.getElementById("livesBoard");
const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", restartGame);
updateLivesBoard();

submitBtn.addEventListener("click", playRound);

function playRound() {

    const userInput = document.getElementById("userNumber");

    const userNumber = Number(userInput.value);

    if (
        isNaN(userNumber) ||
        userNumber < 0 ||
        userNumber > 100
    ) {
        alert("Enter a number between 0 and 100");
        return;
    }

    const activePlayers = players.filter(
        player => player.lives > 0
    );

    let choices = {};

    choices["You"] = userNumber;

    activePlayers.forEach(player => {

        if (!player.isHuman) {
            choices[player.name] =
                Math.floor(Math.random() * 101);
        }

    });

    const nums = Object.values(choices);

    const average =
        nums.reduce((a, b) => a + b, 0) / nums.length;

    const target = average * 0.8;

    let winner = null;
    let minDiff = Infinity;

    activePlayers.forEach(player => {

        const diff =
            Math.abs(choices[player.name] - target);

        if (diff < minDiff) {
            minDiff = diff;
            winner = player;
        }

    });

    activePlayers.forEach(player => {

        if (player.name !== winner.name) {
            player.lives--;
        }

    });

    let html = `
        <h2>Round Result</h2>
    `;

    activePlayers.forEach(player => {

        html += `
            <div class="player-card">
                ${player.name}: ${choices[player.name]}
            </div>
        `;

    });

    html += `
        <p><strong>Average:</strong> ${average.toFixed(2)}</p>
        <p><strong>Target Number:</strong> ${target.toFixed(2)}</p>
        <p class="winner">Winner: ${winner.name}</p>
    `;

    const alivePlayers =
        players.filter(player => player.lives > 0);

    const userAlive =
        players[0].lives > 0;

    if (!userAlive) {

        html += `
            <div class="game-end">
                💀 GAME OVER
            </div>
        `;

        submitBtn.disabled = true;
        restartBtn.style.display = "inline-block";
    }
    else if (
        alivePlayers.length === 1 &&
        alivePlayers[0].name === "You"
    ) {

        html += `
            <div class="game-end">
                🏆 VICTORY!
            </div>
        `;

        submitBtn.disabled = true;
        restartBtn.style.display = "inline-block";
    }

    resultDiv.innerHTML = html;

    updateLivesBoard();

    userInput.value = "";
}

function updateLivesBoard() {

    let html = "<h3>Lives</h3>";

    players.forEach(player => {

        html += `
            <div class="player-card ${
                player.lives <= 0 ? "dead" : ""
            }">
                ${player.name}: ${Math.max(player.lives, 0)}
                ${player.lives <= 0 ? "(ELIMINATED)" : ""}
            </div>
        `;
    });
   
    livesBoard.innerHTML = html;
}
function restartGame() {

    players.forEach(player => {
        player.lives = 3;
    });

    resultDiv.innerHTML = "";

    document.getElementById("userNumber").value = "";

    submitBtn.disabled = false;
    restartBtn.style.display = "none";
    updateLivesBoard();
}
