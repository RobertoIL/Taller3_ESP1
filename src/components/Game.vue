<template>
    <div class="container" ref="canvasContainer">
        <div class="canvas-container">
            <canvas id="canvas1" ref="canvas"></canvas>
        </div>
    </div>
</template>
<script>
import { Player } from './Player';
import { InputHandler } from './InputHandler';
import mageWalkImg from '@/assets/Lancer/Walk.png';
import mageAttackImg from '@/assets/Lancer/Attack.png';
import mageData from '@/assets/Lancer/Lancer.json';
import saberWalkImg from '@/assets/Saber/Walk.png';


export default {
  name: 'Game',
  data() {
    return {
      game: null,
      ctx: null,
      JsonData: mageData,
      walkingFrames: new Image(),
      attackingFrames: new Image(),
      imagesLoaded: 0,
      gameStarted: false,
      gameStates: ["menu", "select", "game"],
      gameState: "menu",
      player2Logged: false,
      player1Logged: false,
      sprites: []
    };
  },
  mounted() {
    this.checkAndUpdateLogP1();
    this.gameState = this.gameStates[0];
    this.dibujar();
    window.addEventListener('resize', this.dibujar);
    this.walkingFrames.src = mageWalkImg;
    this.attackingFrames.src = mageAttackImg;
    this.walkingFrames.onload = ()=>{
      this.imagesLoaded++;
      this.sprites.push(this.walkingFrames)
    };

  },
  methods: {
    dibujar() {
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      const container = this.$refs.canvasContainer;
      const rect = container.getBoundingClientRect();
      const proporcionX = 1000 / rect.width;
      const proporcionY = 500 / rect.height;
      
      canvas.width = rect.width;
      canvas.height = rect.height;

      const x = 1000 / proporcionX;
      const y = 500 / proporcionY;
      switch (this.gameState) {
        case "menu":
          this.startGameMenu();
          break;
        case "select":
          this.startSelectMenu();
          break;
        case "game":
          if(this.gameStarted){
            this.resizeGame();
          }else{
            this.startGame();
          }
          break;
        default:
          break;
      }
    },
    startGameMenu(){
      const buttons = [
        { text: 'Jugar', x: this.$refs.canvas.width/2, y: this.$refs.canvas.height/6, width: 100, height: 20 },
        { text: 'Opciones', x: this.$refs.canvas.width/2, y: this.$refs.canvas.height*3/6, width: 100, height: 20 },
        { text: 'Salir', x: this.$refs.canvas.width/2, y: this.$refs.canvas.height*5/6, width: 100, height: 20 }
      ];

      const drawButton = (button) => {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(button.x-button.width/2, button.y, button.width, button.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = "center";
        this.ctx.fillText(button.text, button.x, button.y+button.height-6.5);
      };

      const drawMenu = () => {
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.ctx.stroke();
        buttons.forEach(drawButton);
      };

      const handleClick = (event) => {
        const rect = this.$refs.canvas.getBoundingClientRect();
        const scaleX = this.$refs.canvas.width / rect.width;
        const scaleY = this.$refs.canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        buttons.forEach(button => {
            if (x > button.x-button.width && x < button.x + button.width/2 && 
                y > button.y && y < button.y + button.height) {
                handleButtonClick(button.text);
            }
        });
    };
      const handleButtonClick = (buttonText) => {
        switch(buttonText) {
          case 'Jugar':
            if (this.player1Logged) {
              console.log("Salir");
              this.$refs.canvas.removeEventListener('click', handleClick);
              this.gameState = this.gameStates[2];
              this.dibujar();
            }else{
              //Agregar metodo para mandar al usuario al login
              console.log("falta logear");
            }
            
            break;
          case 'Opciones':
            alert('Abriendo opciones...');
            break;
          case 'Salir':
            alert('Saliendo del juego...');
            break;
          default:
            break;
        }
      };

      this.$refs.canvas.addEventListener('click', handleClick);
      drawMenu();
    },
    startSelectMenu(){
      let selectedC1 = "Saber";
      let selectedC2 = "Saber";

      const buttons = [
        { text: 'imagen'},
        { text: 'anterior', player: 1, x: 10, y: 50+12.5, width: 10, height: 25 },
        { text: 'siguiente', player: 1, x: 90, y: 50+12.5, width: 10, height: 25 },
        { text: 'anterior', player: 2, x: 490, y: 50+12.5, width: 10, height: 25 },
        { text: 'siguiente', player: 2, x: 510, y: 50+12.5, width: 10, height: 25  }
      ];

      const drawButton = (button) => {
        this.ctx.fillStyle = 'gray';
        this.ctx.fillRect(button.x-button.width/2, button.y, button.width, button.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = "center";
        this.ctx.fillText(button.text, button.x, button.y+button.height-6.5);
      };

      const drawMenu = () => {
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.ctx.stroke();
        drawCharacters;
        buttons.forEach(drawButton);
      };

      const handleClick = (event) => {
        const rect = this.$refs.canvas.getBoundingClientRect();
        const scaleX = this.$refs.canvas.width / rect.width;
        const scaleY = this.$refs.canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        buttons.forEach(button => {
            if (x > button.x-button.width && x < button.x + button.width/2 && 
                y > button.y && y < button.y + button.height) {
                handleButtonClick(button.text);
            }
        });
      };
      const drawCharacters =()=>{
        this.ctx.draw
      };

      const handleButtonClick = (buttonText) => {
        switch(buttonText) {
          case 'Jugar':
            this.gameState = this.gameStates[1];
            this.$refs.canvas.removeEventListener('click', handleClick);
            break;
          case 'Opciones':
            alert('Abriendo opciones...');
            break;
          case 'Salir':
            alert('Saliendo del juego...');
            break;
          default:
            break;
        }
      };

      this.$refs.canvas.addEventListener('click', handleClick);
      drawMenu();
    },
    startGame() {
      this.game = new this.Game(this.$refs.canvas.width, this.$refs.canvas.height, this.JsonData, this.walkingFrames, this.attackingFrames);
      let lastTime = performance.now();
      let frameCount = 0;
      let fps = 0;

      const animate = (time) => {
        frameCount++;
        const deltaTime = time - lastTime;

        if (deltaTime >= 1000) {
          fps = (frameCount / deltaTime) * 1000;
          frameCount = 0;
          lastTime = time;
        }

        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.game.update(deltaTime);
        this.game.draw(this.ctx);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    },
    Game: class {
      constructor(width, height, JsonData, walkingFrames, attackingFrames) {
        this.width = width;
        this.height = height;
        this.player = new Player(this, JsonData, walkingFrames, attackingFrames);
        this.input = new InputHandler();
      }
      update(fps) {
        this.player.update(this.input.keys, fps);
      }
      draw(context) {
        this.player.draw(context);
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.dibujar);
    },
    checkAndUpdateLogP1(){
      this.player1Logged = true;
    }
  }
};
</script>
<style scoped>
#canvas1 {
    margin-top: 5px;
    width: 100%;
    border: 1px solid gray;
}
.container{
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.canvas-container{
    width: 80%;
}
.button-container{
    display: flex;

}
button{
    padding: 5%;
    background-color: gray;
    border: 1px solid black;
}
</style>