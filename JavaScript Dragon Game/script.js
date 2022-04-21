let score = 0;
let highestScore = 0;
highestScore = localStorage.getItem("highscore");
cross = true;
let dino = document.querySelector('.dino');
let dinoAni = document.querySelector('.animateDino');
let gameOver = document.querySelector('.gameOver');
let obstacle = document.querySelector('.obstacle');
let obstacleAni = document.querySelector('.obstacleAni');
let btn = document.getElementById('btn');

audio = new Audio('music.mp3');
audioGO = new Audio('gameover.mp3');
audio.volume = 0.2;
audioGO.volume = 0.2;

let btnfunc = ()=>{
    if (btn.innerHTML == 'Play'){
        audio.play();
        btn.innerHTML = 'Pause';
        obstacleAni.style.animationPlayState = 'running';  
        dino.style.animationPlayState = 'running';
    }
    else if(btn.innerHTML == 'Pause'){
        audio.pause();
        btn.innerHTML = 'Play';
        obstacleAni.style.animationPlayState = 'paused';   
        dino.style.animationPlayState = 'paused';   
    }
    else if(btn.innerHTML == 'Play Again'){
       window.location.reload();   
    }
}


document.onkeydown = function(e){
    // console.log(e.keyCode)
    if(e.keyCode ==38){
        // let dino = document.querySelector('.dino');
        dino.classList.add('animateDino') 
        setTimeout(()=>{
        dino.classList.remove('animateDino')
        },1100)
    }
    if(e.keyCode == 39){  
        // let dino = document.querySelector('.dino');
        let dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinox + 75 + "px";
    }
    if(e.keyCode == 37){ 
        // let dino = document.querySelector('.dino');
        let dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinox - 75) + "px";
    }

    
}
setInterval(()=>{
   
    // let dino = document.querySelector('.dino');
    let dinox = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    let dinoy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('bottom'));

    // let gameOver = document.querySelector('.gameOver');
    // let obstacle = document.querySelector('.obstacle');
    let obstaclex = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    let obstacley = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('bottom'));

    offsetX = Math.abs(dinox-obstaclex);
    offsetY = Math.abs(dinoy-obstacley);

//  175
    if(offsetX < 150 && offsetY<52){
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni') ; 
        cross = false;
        btn.innerHTML = 'Play Again';
        audioGO.play();
        audio.pause()
        setTimeout(() => {
            audioGO.pause();
            
        }, 1000);
    }
    else if(offsetX < 145 && cross){
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            if(aniDur > 3.0){
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + "s";
            }   
        }, 500);
    }

},10);

let updateScore = (score)=>{
    if(highestScore < score){
        highestScore = score;
        localStorage.setItem("highscore", highestScore);
    };
    scoreCont.innerHTML = `High Score: ${highestScore}\nYour Score:${score}`;
}