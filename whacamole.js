const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft = document.querySelector("#time-left")
const score = document.querySelector("#score")
const playButton = document.querySelector("#playButton")
const audio = new Audio("boing.mp3")

let result = 0
let hitPosition
let currentTime = 10
let timerId = null



playButton.addEventListener('click', () => {
    result = 0
    score.textContent = result
    currentTime = 10

    startGame()

  });

function startGame(){
    
    playButton.style.visibility = "hidden"
    let countDownTimerId = setInterval(countDown, 1000)
    
    
    function randomSquare(){
        //clears mole from squares
        squares.forEach(square => {
            square.classList.remove("mole")
        })
    
        //chooses a random square
        let randomSquare = squares[Math.floor(Math.random() * 9)]
        randomSquare.classList.add("mole")
    
        hitPosition = randomSquare.id
    }
    
    //listens for a "hit" on the mole and updates result
    squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if(square.id == hitPosition ){
                audio.play()
                result++
                score.textContent = result
                hitPosition = null
            }
        })
    })
    
    //moves mole to random square
    function moveMole(){
        timerId = setInterval(randomSquare, 500)
    }
    
    moveMole()
    
    //decrements time to 0
    function countDown(){
        currentTime--
        timeLeft.textContent = currentTime
        if(currentTime == 0){
            clearInterval(countDownTimerId)
            clearInterval(timerId)
            alert("Game Over! Final score: " + result)
            playButton.style.visibility = ""
        }
    }
}

