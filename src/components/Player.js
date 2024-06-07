import { Attacking, Idle, Moving } from "./States.js";

export class Player{
    constructor(game, JsonData, walkingFrames, attackingFrames, x, y, dir){
        this.game = game;
        this.walkFrames = Object.values(JsonData.Walk);
        this.attackFrames = Object.values(JsonData.Attack);
        this.frame = this.walkFrames[18];
        this.width = this.frame.width; //En el archivo JSON es el valor de width
        this.height = this.frame.height; //En el archivo JSON es el valor de width
        this.x = x;
        this.y = y;
        this.image = walkingFrames;
        this.imageWalk = walkingFrames;
        this.imageAttack = attackingFrames;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.maxSpeed = 3;
        this.states = [new Idle(this), new Moving(this), new Attacking(this)];
        this.directions = ["up","left","down","rigth"];
        this.keys = dir;
        this.currentDirection = this.directions[2];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.lastFrame = this.frame;
    }
    update(input){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(input.includes(this.keys.up) && !input.includes(this.keys.down)){
            this.currentDirection = this.directions[0];
            if(this.ySpeed > -this.maxSpeed){
                this.ySpeed--;
            }
        }
        if(input.includes(this.keys.down) && !input.includes(this.keys.up)){
            this.currentDirection = this.directions[2];
            if(this.ySpeed < this.maxSpeed){
                this.ySpeed++;
            }
        }
        if(input.includes(this.keys.left) && !input.includes(this.keys.rigth)){
            this.currentDirection = this.directions[1];
            if(this.xSpeed > -this.maxSpeed){
                this.xSpeed--;
            }
        }
        if(input.includes(this.keys.rigth) && !input.includes(this.keys.left)){
            this.currentDirection = this.directions[3];
            if (this.xSpeed < this.maxSpeed) {
                this.xSpeed++;
            }
        }
        if(((!input.includes(this.keys.up) && !input.includes(this.keys.down)) || (input.includes(this.keys.up) && input.includes(this.keys.down))) && this.ySpeed != 0){
            if (this.ySpeed < 0) {
                this.ySpeed++;
            }else{
                this.ySpeed--;
            }
        }
        if(((!input.includes(this.keys.left) && !input.includes(this.keys.rigth)) || (input.includes(this.keys.left) && input.includes(this.keys.rigth))) && this.xSpeed != 0){
            if (this.xSpeed < 0) {
                this.xSpeed++;
            }else{
                this.xSpeed--;
            }
        }
        if(this.x < 0){this.x = 0;}
        if(this.x > this.game.width - this.width){this.x = this.game.width-this.width;}
        if(this.y < 0){this.y = 0;}
        if(this.y > this.game.height-this.height){this.y = this.game.height-this.height;}
        this.currentState.handleInput(input, this.keys);
        this.updateSize();
    }
    draw(context){
        const sizeDifferenceX = this.frame.width - this.lastFrame.width;
        const sizeDifferenceY = this.frame.height - this.lastFrame.height;

        let drawX = this.x;
        let drawY = this.y;

        // Ajustar la posición de dibujo en función de la dirección y el tamaño del sprite
        if (this.currentDirection === "left") {
            drawX -= sizeDifferenceX;
            if (drawX < 0) {
                drawX = 0; // No permitir que se salga del borde izquierdo
            }
        } else if (this.currentDirection === "right") {
            if (drawX + this.width + sizeDifferenceX > this.game.width) {
                drawX = this.game.width - this.width - sizeDifferenceX; // No permitir que se salga del borde derecho
            }
        }

        this.drawCanvas(context, drawX, drawY);
    }
    drawCanvas(context, X, Y){
        context.fillStyle = 'red';
        context.fillRect(X,Y, this.width, this.height);
        context.drawImage(this.image,
            this.frame.x, //En el archivo JSON es el valor de X
            this.frame.y, //En el archivo JSON es el valor de Y
            this.frame.width,
            this.frame.height,
            X,Y,
            this.width,
            this.height);

    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    updateSize(){
        this.width = this.frame.width;
        this.height = this.frame.height;
    }
}