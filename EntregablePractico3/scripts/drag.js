
//let size=(width/(15));
let figuras = [];
let rows = 7;
let columns = 8;
let isMouseDown = false;
let lastClickedFigure = null;
let oldX = 0;
let oldY = 0;

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false); 

class Circle {                          //Esta clase representa la ficha que se arrastra
    constructor (posX, posY, radius, fillStyle, context, img, player) {
        //super(posX, posY, fill, context);
        this.posX = posX;
        this.posY = posY;
        this.fillStyle = fillStyle;
        this.context = context;
        this.radius = radius;
        this.player = player; 
        this.img = img;
    }

    draw(){                             //Dibuja la  ficha
        //clearCanvas();
        ctx.fillStyle=this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.posX,this.posY, this.radius, 0,2*Math.PI);
        //ctx.fill();
        //ctx.closePath(); 
        
        let posX = this.posX;
        let posY = this.posY;
        let size = this.radius * 2;               
        ctx.drawImage(this.img, posX-(size/2), posY-(size/2), size, size);               
        ctx.closePath();   
    };

    setPosition(newX, newY){                 // Setea la figura (Circulo) seleccionada, con las nuevas coordenadas pasadas como parámetro
        this.posX = newX;
        this.posY = newY;
    }

    getRadius(){                            // devuelve el radio de la figura (Circulo) seleccionada.
        return this.radius();
    };

    isPointInside(x, y){                     // retorna un boolean que indica si un punto de coordenadas ingresado como parametro
        let X = this.posX - x;                   // se encuentra dentro de la figura (Circulo) seleccionada.
        let Y = this.posY - y;
        return (Math.sqrt(X*X + Y*Y)< this.radius);
    }

}

function clearCanvas(){
    ctx.clearRect(0,0,width,height);
    //game.buildBoard()
}

function findClickedFigure(x,y){                // Chequea todas las fichas (que se encuentran en el arreglo figuras), 
                                                //  chequeando si alguna contiene las coordenadas ingresadas,
                                                // y en caso afirmativo, retorna la ficha (objeto) que se encuentra en esa ubicacion.
    for (let i = 0; i < figuras.length; i++) {
        const element = figuras[i];
        if (element.isPointInside(x, y)){
           return element;
           } 
        }
    return null;
}

function onMouseDown(e){                        // controla si se clickeó sobre una ficha con findClickedFigure, si es asi, guarda en
                                                // oldX y oldY la posicion de la ficha (Objeto) seleccionado.
    isMouseDown = true;
    // console.log("inMouseDown", isMouseDown);
    let clickFig = findClickedFigure(e.offsetX,e.offsetY);
    if ((clickFig != null) && (clickFig.player == player)){
        lastClickedFigure = clickFig; // guardo en   lastClickedFigure la ficha seleccionada
        oldX = clickFig.posX;
        oldY = clickFig.posY;
        //console.log("lastclk",lastClickedFigure,"coordenadas",e.layerX,e.layerY);
    }

}

function onMouseMove(e){                        // Si se cleckeó sobre una ficha, posiciona la ficha seleccionada sobre el puntero del mouse.
    if (isMouseDown && lastClickedFigure != null){
        //console.log("setposition",e.layerX,e.layerY,"lastClickedFigure...", lastClickedFigure);
        //lastClickedFigure.limpiar();  // aca borro la imagen anterior, para no volver a cargar el canvas
        lastClickedFigure.setPosition(e.offsetX,e.offsetY);
        //lastClickedFigure.draw();
        drawFig();
    };
}

function onMouseUp(e){                          //Verifica si cuando se suelta la ficha esta se encuentra dentro del dropbox,
                                                //de no ser asi, se devuelve la ficha al monton. En caso de que se encuentre 
                                                //dentro del dropbox y haya lugar donde quiere insertarse, se realiza el movimiento
    isMouseDown=false;
    //console.log(game.isInDropbox(e.layerX,e.layerY));
    if  (game.isInDropbox(e.offsetX, e.offsetY) && (lastClickedFigure != null)){
        let pos=game.dropboxMove(player, e.offsetX);        
        if (pos == -1) {
            lastClickedFigure.setPosition(oldX, oldY)
            drawFig();
        }
        else if(game.verifyLine(pos, game.getLastMoveY(pos))){
            game.win();
        }
        else{
            game.changeTurn();
            deleteFig(lastClickedFigure);
            game.checkTie();
        }
        game.drawTokens();
        drawFig();
        //console.log(player);
    }
    else if((!game.isInDropbox(e.offsetX, e.offsetY)) && (lastClickedFigure != null)) {
        lastClickedFigure.setPosition(oldX,oldY)
        drawFig();
        //console.log(turn)
    }
    lastClickedFigure = null;
}

function deleteFig(figure) {                // Elimina una ficha del arreglo figuras
    for ( let i = 0; i < figuras.length; i++ ) {
        const element = figuras[i];
        if (element === figure){
            figuras.splice(i, 1);
            //figuras[i]=null;
            break;
           } 
        }
}



function drawFig(){                         // limpia el canvas, dibuja el tablero , y las fichas en posicion de inicio.
    clearCanvas();
    game.drawBoard();
    game.drawTokens();
    for (let i = 0; i < figuras.length; i++) {
        const element = figuras[i];
        //console.log (element);
        //if(element!=null){
        element.draw();
        //}
      }
    
};

function piecesGamer(player, posY, posX, img, size){             // genera un objeto ficha, le asigna la posicion de inicio
    let color = "#00FFFF";                                       // del juego, jugador, y la guarda en un arreglo figuras.
    let posYInic = posY;
    let posXInic = posX;
    let cont = 1;
    
    for (let i = 0; i<((rows * columns)/2); i++){
   
        let ficha = new Circle(posXInic, posYInic, size, color, ctx, img, player);
        posXInic = posXInic + 70;
     
        if ((cont%3) == 0){
            posYInic = posYInic - 65;
            posXInic = posX;
        }
        figuras.push(ficha);
        cont++;
    }
// console.log(figuras);
}
