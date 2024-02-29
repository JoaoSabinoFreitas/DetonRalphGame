const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#lives"),
        button: document.getElementById("btn")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        countLives: 3
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};


state.view.button.addEventListener("click", () => {
        console.log("clickou!");
        location.reload();
        
        
    })

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        playSound("final")
        alert(`O tempo acabou! Sua pontuação foi: ${state.values.result}`);
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("coin");
            }else{
                state.values.countLives--;
                state.view.live.textContent = state.values.countLives;
                playSound("errou")
                if(state.values.countLives <= 0){
                    playSound("final")
                    clearInterval(state.actions.countDownTimerId)
                    clearInterval(state.actions.timerId)
                    state.values.countLives = 1
                    alert(`Game Over! Sua pontuação foi: ${state.values.result}`)
                }
            }
        })
    }))
}


function init() {
    addListenerHitBox();
}

init();
