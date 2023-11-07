"use strict";
let info = document.getElementById('info');
let menu = document.getElementById('menu');

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let block = width/4;
let seconds = 300;
let game = null;
let timer = null;
let win = false;
let turn = 0;
let player = (turn%2)+1;
let mode = 4;
let token1 = document.getElementById("FichaAzul");
let token2 = document.getElementById("FichaRoja");
let clock = document.getElementById("time");
let btnStart = document.getElementById("start");
let btnRestart = document.getElementById("restart");
let infoMode = document.getElementById("infoMode");
let btnMode4 = document.getElementById("mode4");
let btnMode5 = document.getElementById("mode5");
let btnMode6 = document.getElementById("mode6");
let slcGreen = document.getElementById("selectGreen");
let slcBlue = document.getElementById("selectBlue");
let slcRed = document.getElementById("selectRed");
let slcYellow = document.getElementById("selectYellow");
let tokens = document.getElementsByClassName("token");

function start(){
    btnMode4.classList.toggle("nonClickable");
    btnMode5.classList.toggle("nonClickable");
    btnMode6.classList.toggle("nonClickable");
    slcGreen.classList.toggle("nonClickable");
    slcBlue.classList.toggle("nonClickable");
    slcYellow.classList.toggle("nonClickable");
    slcRed.classList.toggle("nonClickable");
    canvas.classList.toggle("nonClickable");

    let player1 = 1;
    let player2 = 2;
    let tokenSize = 20;
    let posY = 45;
    let posX = 500;

    switch (mode) {  //genera las fichas en base al modo de juego
        case 6:
            columns = 9;
            rows = 8;

            piecesGamer(player1, posX, posY, token1, tokenSize); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(player2, posX, 650, token2, tokenSize); // cargo en un arreglo las fichas del jugador 2
            break;
        case 5:
            columns = 8;
            rows = 7;

            piecesGamer(player1, posX, posY, token1, tokenSize);
            piecesGamer(player2, posX, 620, token2, tokenSize); 
            break;
        default:
            columns = 7;
            rows = 6;
            let a = piecesGamer(player1, posX, posY, token1, tokenSize);
            piecesGamer(player2, posX, 600, token2, tokenSize);   
        break;
    }


    
    changeMenues(); 
    game = new gameBoard(columns, rows);    //Instancia un tablero
    game.buildBoard();                   //Arma el tablero
    drawFig();                           //Dibuja en pantalla las fichas
    btnStart.className = "hidden";
    btnRestart.classList.remove("hidden");
    document.getElementById("turn").toggleAttribute("class");
    document.getElementById("timer").toggleAttribute("class");
    timer = setInterval(updateTime, 1000);  //Inicia el temporizador

}

function changeMenues() {
    info.style.display = 'flex';
    menu.style.display = 'none';
}

function reloadPage() {                  //Reinicia el juego recargando la pagina
    location.reload();
}

function updateTime() {                  //Actualiza el temporizador y verifica si se termino el tiempo
    seconds--;

    if (seconds == 0){
        info.innerHTML = "<h1>EMPATE TODOS GANAN!</h1>"
        game.finish();
    }
    if((seconds % 60) < 10){
        clock.innerHTML = Math.floor(seconds / 60) + ":0" + seconds % 60;
    }
    else{
        clock.innerHTML = Math.floor(seconds / 60) + ":" + seconds % 60;
    }
}

function updateInfoMode(){
    infoMode.innerHTML= "Modo "+ mode  +" en linea:"
}

btnStart.addEventListener("click", start);
btnRestart.addEventListener("click", reloadPage);
btnMode4.addEventListener("click", function () {        //Cambia el modo de juego a 4 en linea
    mode = 4;
    updateInfoMode();
    toggleButtons(true, false, false);
});

btnMode5.addEventListener("click", function () {        //Cambia el modo de juego a 5 en linea
    mode = 5;
    updateInfoMode();
    toggleButtons(false, true, false);
});

btnMode6.addEventListener("click", function () {        //Cambia el modo de juego a 6 en linea
    mode = 6;
    updateInfoMode();
    toggleButtons(false, false, true);
});

function toggleButtons(btn4, btn5, btn6) {
    btnMode4.classList.toggle("selected", btn4);
    btnMode5.classList.toggle("selected", btn5);
    btnMode6.classList.toggle("selected", btn6);
}

slcGreen.addEventListener("click", function () {        //Selecciona la  ficha verde para el  jugador 1
    token1 = document.getElementById("FichaVerde");
    tokens[1].classList.toggle("selected", true);
    tokens[0].classList.toggle("selected", false);
});

slcBlue.addEventListener("click", function () {         //Selecciona la  ficha blue para el  jugador 1
    token1=document.getElementById("FichaAzul");
    tokens[0].classList.toggle("selected", true);
    tokens[1].classList.toggle("selected", false);
});

slcRed.addEventListener("click", function () {          //Selecciona la  ficha red para el  jugador 2
    token2=document.getElementById("FichaRoja");
    tokens[2].classList.toggle("selected", true);
    tokens[3].classList.toggle("selected", false);
});

slcYellow.addEventListener("click", function () {       //Selecciona la  ficha amarilla para el  jugador 2
    token2=document.getElementById("FichaAmarilla");
    tokens[3].classList.toggle("selected", true);
    tokens[2].classList.toggle("selected", false);
});