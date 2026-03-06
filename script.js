const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const score = document.getElementById("score")
const startButton = document.getElementById("startButton")
const gameOverButton = document.getElementById("gameOverButton")

let gameStarted = false
let gameOver = false
let scoreInterval

score.innerText = 0
startButton.style.display = "block"
gameOverButton.style.display = "none"

function jump() {
  if (!gameStarted || gameOver) return

  if (!dino.classList.contains("jump-animation")) {
    dino.classList.add("jump-animation")
    setTimeout(() => dino.classList.remove("jump-animation"), 1000)
  }
}

document.addEventListener("keypress", () => {
  jump()
})

function startGame() {
  if (gameStarted) return

  console.log("Start Button geklickt")

  gameStarted = true
  gameOver = false
  score.innerText = 0

  startButton.style.display = "none"
  gameOverButton.style.display = "none"

  rock.classList.remove("rock-animation")
  void rock.offsetWidth
  rock.classList.add("rock-animation")

  scoreInterval = setInterval(() => {
    const dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    )
    const rockLeft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    )

    score.innerText = Number(score.innerText) + 1

    if (rockLeft < 90 && rockLeft > 0 && dinoTop > 150) {
      clearInterval(scoreInterval)
      rock.classList.remove("rock-animation")
      gameStarted = false
      gameOver = true

      gameOverButton.style.display = "block"
    }
  }, 50)
}

function hideGameOver() {
  gameOverButton.style.display = "none"
  startButton.style.display = "block"
}

startButton.addEventListener("click", startGame)
gameOverButton.addEventListener("click", hideGameOver)
