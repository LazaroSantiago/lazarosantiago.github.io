"use strict"
class gamePiece{
    constructor (posX, posY, size){
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.player = 0;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getContext(){
        return this.context;
    }

    getPlayer(){
        return this.player;
    }

    setPlayer(player){
        this.player = player;
    }

    isSet(){                    //verifica si tiene un jugador asignado 
        if(this.player != 0)
            return true;
        
        return false;
    }

    draw() {            //Carga y dibuja todas las imagenes en la matriz
        let posX = this.getPosX() - 2;
        let posY = this.getPosY();
        let tokenWidth = 40;
        let tokenHeight = 40;

        switch (this.getPlayer()) {
            case 1:     
                ctx.drawImage(token1, posX, posY, tokenWidth, tokenHeight);             
                break;
            case 2:
                ctx.drawImage(token2, posX, posY, tokenWidth, tokenHeight);                
                break;
            default:
                break;
        }
    }
}