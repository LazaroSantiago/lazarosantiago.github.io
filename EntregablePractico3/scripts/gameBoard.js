"use strict";

//let juego =[];
class gameBoard {
    constructor(x,y) {
        this.maxX = x;
        this.maxY = y;
        this.board = [ ];
        this.size=40;
        this.dropboxX=block;
        this.dropboxMaxX=block+(this.size*x);
        this.dropboxY=this.size;
        this.dropboxMaxY=this.size*2;
    }

    win(){                              //Cuando un jugador gana se borran los montones de fichas
                                        //y se muestra en pantalla un mensaje
        clearInterval(timer);
        figuras = [];
        drawFig();
        document.getElementById("info").innerHTML = "<h1>WINNER: PLAYER "+ player +"!</h1>" +"<button id='restart' type='button' onclick='reloadPage()' class='start-button'><h2>Restart</h2></button>"
        // console.log("gano")
    }

    finish(){
        clearInterval(timer);
        figuras= [];
        drawFig();
    }

    checkTie(){                         //Verifica si quedan todavia fichas para jugar
                                        // de no ser asi es un empate
        if (figuras.length==0)
            document.getElementById("info").innerHTML = "<h1>DRAW, EVERYBODY WINS!</h1>"
    }

    isInDropbox(x,y){                   //Verifica si las coordenadas recibidas por parametro
                                        //se encuentran en la zona de jugada
        if ((x > this.dropboxX && x < this.dropboxMaxX) && 
            (y > this.dropboxY && y < this.dropboxMaxY))
            return true;
        return false;
    }

    dropboxMove(player,x){              //Lleva a cabo la jugada en base a la posicion recibida
                                        //y devuelve la posicion en la que se coloco la ficha
                                        //o -1 si no habia lugar para colocar una ficha
        let aux = x - this.dropboxX;
        let pos = Math.floor(aux/this.size);
        let isMove = this.move(player, pos);
        if (isMove)
            return pos;
        else
            return -1;
    }

    getSize(){
        return this.size;
    }
        
    buildBoard(){                      //Carga la matriz del tablero
        for (let i=0; i < this.maxX; i++ ) {
            this.board[i] = [];
            for (let j = 0; j < this.maxY; j++){
                this.board[i][j] = new box (((i*this.size)+block),j*this.size,this.size)
                //this.board[i][j].draw();
            }
        }
    }

    drawBoard(){                       //Dibuja el tablero en el canvas
        for ( let i=0; i< this.maxX; i++ ) {
          //  this.board[i] = [];
            for ( let j=0; j<this.maxY; j++){
                const thisbox=this.board[i][j]
                   this.board[i][j].draw();
            }
        }
        
    }

    drawTokens() {                     //Dibuja las fichas en el tablero
        for (let i = 0; i < this.maxX; i++ ) {    
            for ( let j = 0; j < this.maxY; j++){
                this.board[i][j].token.draw();
            }
        }
    }

    move(player, lastmoveX){            //Coloca las fichas en base al
                                        //movimiento elegido por el jugador
        let place = 0;
        for(let i = 0;i < this.maxY; i++){
            let set = false;
            set = this.board[lastmoveX][i].token.isSet();
            if(set && i==0){
                return false;
            }
            else if(set){
                place=i-1;
                break;
            }
            else if(i==this.maxY-1){
                place=i;
            }
        }
        this.board[lastmoveX][place].token.setPlayer(player);
        return true;
    }

    getLastMoveY(lastmoveX){                //Devuelve la fila en la que ya se encuentra una ficha
        let place = 0;
        let set = false;

        for(let i=0;i<this.maxY;i++){
            set = this.board[lastmoveX][i].token.isSet();
             if(set){
                place=i;
                break;
            }
            else if(i==this.maxY-1){
                place=i;
            }
        }
        return place;
    }

    changeTurn(){                   //Cambia el turno de jugador
        turn++;
        player=(turn%2)+1;
        document.getElementById("turn").innerHTML= "<h2>Turn: player " + player + "</h2>";
    }

    //verify
    verifyLine(lastMoveX, lastMoveY){               //Verifica si hay o no linea vertical,horizontal o diagonal
        let vertical = false;
        let horizontal = false;
        let diagonal = false;
        vertical = this.verifyVertical(lastMoveX);
        horizontal = this.verifyHorizontal(lastMoveY);
        diagonal = this.verifyDiagonal(lastMoveX, lastMoveY);
    
        if (vertical==true || horizontal==true || diagonal==true)
            return true;

        return false;
    }
    
    verifyVertical(lastMoveX){                      //Carga un arreglo con la columna 
                                                    //en la que se coloco la ficha y verifica
                                                    //si hay una linea en ese arreglo
        let x = lastMoveX;
        let line = [];
        let isLine = false
        for (let y = 0; y < this.maxY; y++) {
            line.push(this.board[x][y]);
        }
        isLine = this.isLine(line);
        return isLine;
    }
    
    verifyHorizontal(lastMoveY){                    //Carga un arreglo con la fila 
                                                    //en la que se coloco la ficha y verifica
                                                    //si hay una linea en ese arreglo
        let y = lastMoveY;
        let line = [];
        let isLine = false
        for (let x = 0; x < this.maxX; x++) {
            line.push(this.board[x][y]);
        }

        isLine = this.isLine(line);        
        return isLine;
    }
    
    verifyDiagonal(lastMoveX, lastMoveY) {          //Carga un arreglo con la diagonal descendente 
                                                    //en la que se coloco la ficha y verifica
                                                    //si hay una linea en ese arreglo, de no ser asi
                                                    //Carga un arreglo con la diagonal ascendente y
                                                    //verifica si hay una linea en ese arreglo 
        let x = 0;
        let y = 0;
        let line = [];
    
        if (lastMoveX < lastMoveY) 
            y = lastMoveY - lastMoveX;
        else if (lastMoveX > lastMoveY)
            x = lastMoveX - lastMoveY;
        

        for (let i = 0; (x+i < this.maxX) && (y+i < this.maxY); i++)
            line.push(this.board[x+i][y+i]);
        
        // console.log(line,lastMoveX,lastMoveY);
        
        if (this.isLine(line)) 
            return true;
        else 
            line = [];

        // console.log(line,lastMoveX,lastMoveY);
        if ((lastMoveX + lastMoveY) >= this.maxX) {
            x = this.maxX - 1;
            y = (lastMoveX + lastMoveY) - (this.maxX-1);
        }
        else{
            x = lastMoveX + lastMoveY;
            y = 0;
        }
        
        for (let i = 0; (x - i >= 0) && (y + i < this.maxY); i++) {
            line.push(this.board[x-i][y+i]);
            // console.log(line,x,y)
        }
    
        if (this.isLine(line))           
            return true;
        else
            return false;
    }
    
    isLine(line) {                                  //Recibe un arreglo y lo recorre verificando si hay una secuencia
                                                    //de fichas del mismo jugador igual a las necesarias para 
                                                    //ganar en el modo elegido
        let samePieces = 0;
        for (let i = 0; i < line.length-1; i++) {
            if(line[i].token.player ==0){
                samePieces=0;
            } else {
                if(line[i].token.player == line[i+1].token.player){
                    samePieces++;
                } else {
                    samePieces = 0;
                }

                if (samePieces == mode-1)
                    return true;
            }
        }
        
        return false;
    }
    
}