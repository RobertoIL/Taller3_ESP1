import soundEffect from '@/assets/attackSound.wav';

const states ={
    IDLE: 0,
    MOVING: 1,
    ATTACKING: 2
}
const directions={
    UP:0,
    LEFT:1,
    DOWN:2,
    RIGTH:3
}
class State{
    constructor(state){
        this.state = state;
        this.soundEffect = new Audio();
        this.soundEffect.src = soundEffect;
    }
}
export class Idle extends State{
    constructor(player){
        super("IDLE");
        this.player = player;
        this.fila = 0;
        this.columna = 0;
        this.lastDirection = this.player.currentDirection;
        this.gameFrame = 0;
        this.staggerFrame = 25;
    }
    enter(){
        if (this.lastDirection != this.player.currentDirection){
            this.actualizarDireccion();
        }
        this.player.image = this.player.imageWalk;
    }
    handleInput(input, teclas){
        let mov = [teclas.up, teclas.left, teclas.down, teclas.rigth];
        if(mov.some(t=> input.includes(t))){
            this.player.setState(states.MOVING);
        }else if(input.includes(teclas.attack)){
            this.player.setState(states.ATTACKING)
        }else{
            if (this.gameFrame % this.staggerFrame == 0) {
                if (this.fila != 8){
                    this.fila = 8;
                }else{
                    this.fila = 0;
                }
            }
            this.gameFrame++;
            if (this.gameFrame === Number.MAX_VALUE-100) {
                this.gameFrame = 0;
            }
            this.player.frame = this.player.walkFrames[this.fila + this.columna*9];
        }
    }
    actualizarDireccion(){
        switch (this.player.currentDirection) {
            case this.player.directions[0]:
                this.columna = 0;
                break;
            case this.player.directions[1]:
                this.columna = 1;
                break;
            case this.player.directions[2]:
                this.columna = 2;
                break;
            case this.player.directions[3]:
                this.columna = 3;
                break;
            default:
                break;
        }
        this.fila = 0;
        this.lastDirection = this.player.currentDirection;
    }

}
export class Moving extends State{
    constructor(player){
        super("MOVING");
        this.player = player;
        this.maxFila = 8;
        this.fila = 0;
        this.columna = 0;
        this.lastDirection = this.player.currentDirection;
        this.gameFrame = 0;
        this.staggerFrame = 10;
    }
    enter(){
        if (this.lastDirection != this.player.currentDirection) {
            this.actualizarDireccion();
        }
        this.player.image = this.player.imageWalk;
    }
    handleInput(input, teclas){
        if (this.lastDirection != this.player.currentDirection){
            this.actualizarDireccion();
        }
        let mov = [teclas.up, teclas.left, teclas.down, teclas.rigth];
        if(!mov.some(t=> input.includes(t)) && !input.includes(teclas.attack)){
            this.player.setState(states.IDLE);
        }else if(input.includes(teclas.attack)){
            this.player.setState(states.ATTACKING)
        }else{
            if (this.gameFrame % this.staggerFrame == 0) {
                if (this.fila < this.maxFila){
                    this.fila++;
                }else{
                    this.fila = 0;
                }
            }
            this.gameFrame++;
            if (this.gameFrame === Number.MAX_VALUE-100) {
                this.gameFrame = 0;
            }
            this.player.frame = this.player.walkFrames[this.fila + this.columna*9];
        }
    }
    actualizarDireccion(){
        switch (this.player.currentDirection) {
            case this.player.directions[0]:
                this.columna = 0;
                break;
            case this.player.directions[1]:
                this.columna = 1;
                break;
            case this.player.directions[2]:
                this.columna = 2;
                break;
            case this.player.directions[3]:
                this.columna = 3;
                break;
            default:
                break;
        }
        this.fila = 0;
        this.lastDirection = this.player.currentDirection;
    }
}
export class Attacking extends State{
    constructor(player){
        super("ATTACKING");
        this.player = player;
        this.maxFila = (this.player.attackFrames.length/4)-1;
        this.fila = 0;
        this.columna = 0;
        this.lastDirection = this.player.currentDirection;
        this.gameFrame = 0;
        this.staggerFrame = 15;
        this.counter = 0;
        this.atacando = false;
    }
    enter(){
        this.actualizarDireccion();
        this.player.image = this.player.imageAttack;
        this.atacando = true;
    }
    handleInput(input, teclas){
        let mov = [teclas.up, teclas.left, teclas.down, teclas.rigth];
        if(mov.some(t=> input.includes(t)) && !this.atacando){
            this.player.setState(states.MOVING);
        }else if(!input.includes(teclas.attack) && !this.atacando){
            this.player.setState(states.IDLE);
        }else if(input.includes(teclas.attack) && !this.atacando){
            this.actualizarDireccion();
        }else{
            if (this.gameFrame % this.staggerFrame == 0 && this.gameFrame != 0) {
                if (this.fila < this.maxFila){
                    this.fila++;
                }else{
                    this.atacando = false;
                }
                //Condicional para ejecutar el sonido, en este caso seria cuando la  animacion este 3 frames antes del final.
                if(this.fila == this.maxFila-3){
                    this.soundEffect.play();
                }
            }
            this.gameFrame++;
            if (this.gameFrame === Number.MAX_VALUE-100) {
                this.gameFrame = 0;
            }
            this.player.frame = this.player.attackFrames[this.fila + this.columna*8];
        }
    }
    actualizarDireccion(){
        switch (this.player.currentDirection) {
            case this.player.directions[0]:
                this.columna = 0;
                break;
            case this.player.directions[1]:
                this.columna = 1;
                break;
            case this.player.directions[2]:
                this.columna = 2;
                break;
            case this.player.directions[3]:
                this.columna = 3;
                break;
            default:
                break;
        }
        this.fila = 0;
        this.lastDirection = this.player.currentDirection;
    }
}