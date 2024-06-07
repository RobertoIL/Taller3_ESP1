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
import mageWalkImg from '@/assets/Mage/Walk.png';
import mageAttackImg from '@/assets/Mage/Attack.png';
import mageData from '@/assets/Mage/Mage.json';
import saberWalkImg from '@/assets/Saber/Walk.png';
import saberAttackImg from '@/assets/Saber/Attack.png';
import saberData from '@/assets/Saber/Saber.json';
import lancerWalkImg from '@/assets/Lancer/Walk.png';
import lancerAttackImg from '@/assets/Lancer/Attack.png';
import lancerData from '@/assets/Lancer/Lancer.json';
import archerWalkImg from '@/assets/Archer/Walk.png';
import archerAttackImg from '@/assets/Archer/Attack.png';
import archerData from '@/assets/Archer/Archer.json';

export default {
  name: 'Game',
  data() {
    return {
      game: null,
      ctx: null,
      JsonData: mageData,
      JsonDataP2: mageData,
      walkingFrames: new Image(),
      attackingFrames: new Image(),
      walkingFramesP2: new Image(),
      attackingFramesP2: new Image(),
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
    this.gameState = this.gameStates[0];
    this.dibujar();
    window.addEventListener('resize', this.dibujar);
    this.walkingFrames.src = mageWalkImg;
    this.attackingFrames.src = mageAttackImg;
    this.walkingFramesP2.src = mageWalkImg;
    this.attackingFramesP2.src = mageAttackImg;
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

    //Dibujo en el canvas del primer menu del juego.
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
            console.log("Salir");
            this.$refs.canvas.removeEventListener('click', handleClick);
            this.gameState = this.gameStates[2];
            this.dibujar();
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
    //Dibujo en el canvas del menu de seleccion de personaje
    startSelectMenu(){
      let characters = ["Saber", "Archer", "Lancer", "Mage"];
      let selectedC1 = 0; // Índice de personaje para el jugador 1
      let selectedC2 = 0; // Índice de personaje para el jugador 2

      const buttons = [
        { text: 'anterior', player: 1, x: 10, y: 50+12.5, width: 10, height: 25 },
        { text: 'siguiente', player: 1, x: 90, y: 50+12.5, width: 10, height: 25 },
        { text: 'anterior', player: 2, x: 430, y: 50+12.5, width: 10, height: 25 },
        { text: 'siguiente', player: 2, x: 510, y: 50+12.5, width: 10, height: 25  },
        { text: 'Listo', player: 1, x: 40, y: 50+25, width: 10, height: 25 },
        { text: 'Listo', player: 2, x: 460, y: 50+25, width: 10, height: 25 },
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
        this.ctx.drawImage()
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
    // Loop del juego, aqui es donde el juego inicia y se ve la interaccion con los input.
    startGame() {
      this.game = new this.Game(this.$refs.canvas.width, this.$refs.canvas.height, this.JsonData, this.walkingFrames, this.attackingFrames, this.JsonDataP2, this.walkingFramesP2, this.attackingFramesP2);
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
        this.game.update();
        this.game.draw(this.ctx);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    },
    // Clase encargada de 
    Game: class {
      constructor(width, height, JsonData, walkingFrames, attackingFrames, JsonDataP2, walkingFramesP2, attackingFramesP2) {
        this.width = width;
        this.height = height;
        this.player = new Player(this, JsonData, walkingFrames, attackingFrames, 0, 125, {"up":"w","left":"a","down":"s","rigth":"d","attack":"q"});
        this.player2 = new Player(this, JsonDataP2, walkingFramesP2, attackingFramesP2, 500, 125, {"up":"i","left":"j","down":"k","rigth":"l","attack":"u"});
        this.input = new InputHandler();
      }
      update() {
        this.player.update(this.input.keys);
        this.player2.update(this.input.keys);
      }
      draw(context) {
        this.player.draw(context);
        this.player2.draw(context);
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.dibujar);
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