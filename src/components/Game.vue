<template>
  <div class="container" ref="canvasContainer">
      <div class="canvas-container">
          <canvas id="canvas1" ref="canvas"></canvas>
      </div>
      <div class="music">
          <button v-if="!isPlaying" @click="playMusic">Play Music</button>
          <button v-else @click="stopMusic">Stop Music</button>
      </div>
  </div>
</template>
<script>
import { Player } from './Player';
import { InputHandler } from './InputHandler';
//import { useAuthStore } from '../stores/authStore.js';
//import { ref } from 'vue';

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
import music from '@/assets/music.mp3';
import soundEffect from '@/assets/attackSound.wav';

export default {
name: 'Game',
data() {
  return {
    game: null,
    ctx: null,
    JsonData: null,
    JsonDataP2: null,
    walkingFrames: null,
    attackingFrames: null,
    walkingFramesP2: null,
    attackingFramesP2: null,
    imagesLoaded: 0,
    gameStarted: false,
    gameStates: ["menu", "select", "game"],
    gameState: "menu",
    player2Logged: false,
    player1Logged: false,
    songPlay: new Audio(),
    soundEffect: new Audio(),
    isPlaying: false,
    startingImages: null,
    allJsonsDatas: null,
    //authStore: useAuthStore(),
    //isAuthenticated: ref(this.authStore.isAuthenticated),
    //nombreUser: ref(this.authStore.user?.username)
    nombreUser: "bastian"
  };
},
async mounted() {
  try {
    const { imagenes, jsons } = await this.cargarRecursos();
    this.startingImages = imagenes;
    this.allJsonsDatas = jsons;
    this.gameState = this.gameStates[0];
    this.dibujar();
    window.addEventListener('resize', this.dibujar);
    this.songPlay.src = music;
    this.soundEffect.src = soundEffect;
  } catch (error) {
    console.error('Error cargando recursos:', error);
  }
  
},
methods: {
  async cargarRecursos() {
      const imagenesA_cargar = [
        { src: archerWalkImg, key: 'archerWalk' },
        { src: mageWalkImg, key: 'mageWalk' },
        { src: saberWalkImg, key: 'saberWalk' },
        { src: lancerWalkImg, key: 'lancerWalk' },
        { src: archerAttackImg, key: 'archerAttack' },
        { src: mageAttackImg, key: 'mageAttack' },
        { src: saberAttackImg, key: 'saberAttack' },
        { src: lancerAttackImg, key: 'lancerAttack' }
      ];

      const jsonsA_cargar = [
        { src: archerData, key: 'archerJSON' },
        { src: mageData, key: 'mageJSON' },
        { src: saberData, key: 'saberJSON' },
        { src: lancerData, key: 'lancerJSON' }
      ];

      const promesasImagenes = imagenesA_cargar.map(imgInfo =>
        this.cargarImagen(imgInfo.src).then(img => ({ key: imgInfo.key, img }))
      );

      const promesasJSON = jsonsA_cargar.map(jsonInfo =>
        this.cargarJSON(jsonInfo.src).then(json => ({ key: jsonInfo.key, json }))
      );

      const imagenes = await Promise.all(promesasImagenes);
      const jsons = await Promise.all(promesasJSON);

      const resultadoImagenes = {};
      const resultadoJSON = {};

      imagenes.forEach(imagen => {
        resultadoImagenes[imagen.key] = imagen.img;
      });

      jsons.forEach(json => {
        resultadoJSON[json.key] = json.json;
      });

      return { imagenes: resultadoImagenes, jsons: resultadoJSON };
    },
    cargarImagen(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    },
    async cargarJSON(url) {
      // Since you're using imported JSON data, you don't need to fetch them
      return url;
    },
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
          this.$refs.canvas.removeEventListener('click', handleClick);
          this.gameState = this.gameStates[1];
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
    let characters = ["saberWalk", "archerWalk", "lancerWalk", "mageWalk"];
    let selectedC1 = 0; // Índice de personaje para el jugador 1
    let selectedC2 = 0; // Índice de personaje para el jugador 2
    let listo1 = false;
    let listo2 = false;
    const buttons = [
      { text: 'anterior', player: 1, x: this.$refs.canvas.width/2/4, y: this.$refs.canvas.height/2, width: 75, height: 25 },
      { text: 'siguiente', player: 1, x: this.$refs.canvas.width/2/4*3, y: this.$refs.canvas.height/2, width: 75, height: 25 },
      { text: 'anterior', player: 2, x:this.$refs.canvas.width/2/4+this.$refs.canvas.width/2, y: this.$refs.canvas.height/2,width: 75, height: 25  },
      { text: 'siguiente', player: 2, x:this.$refs.canvas.width*3/2/4+this.$refs.canvas.width/2, y: this.$refs.canvas.height/2,width: 75, height: 25  },
      { text: 'Listo', player: 1, x: this.$refs.canvas.width/4, y: this.$refs.canvas.height*3/4, width: 100, height: 50 , color: "red"},
      { text: 'Listo', player: 2, x: this.$refs.canvas.width*3/4, y: this.$refs.canvas.height*3/4, width: 100, height: 50 , color: "red"}
    ];

    const drawButton = (button) => {
      this.ctx.fillStyle = 'black';
      if (button.color) {
        this.ctx.fillStyle=button.color;
      } 
      this.ctx.fillRect(button.x-button.width/2, button.y, button.width, button.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '15px Arial';
      this.ctx.textAlign = "center";
      this.ctx.fillText(button.text, button.x, button.y+button.height-6.5);
      
    };

    const drawMenu = () => {
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.ctx.stroke();
      drawCharacters();
      buttons.forEach(drawButton);
    };

    const handleClick = (event) => {
      const rect = this.$refs.canvas.getBoundingClientRect();
      const scaleX = this.$refs.canvas.width / rect.width;
      const scaleY = this.$refs.canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      buttons.forEach(button => {
          if (x > button.x-button.width/2 && x < button.x + button.width/2 && 
              y > button.y && y < button.y + button.height) {
              handleButtonClick(button.text, button.player);
          }
      });
    };
    const drawCharacters =()=>{
      let c1ToDraw = {x: 0, y: 0, width: 0, height:0};
      let c2ToDraw = {x: 0, y: 0, width: 0, height: 0};
      switch (characters[selectedC1]) {
        case "saberWalk":
          c1ToDraw.x = this.allJsonsDatas.saberJSON.Walk.sprite19.x;
          c1ToDraw.y = this.allJsonsDatas.saberJSON.Walk.sprite19.y;
          c1ToDraw.width = this.allJsonsDatas.saberJSON.Walk.sprite19.width;
          c1ToDraw.height = this.allJsonsDatas.saberJSON.Walk.sprite19.height;
          break;
        case "lancerWalk":
          c1ToDraw.x = this.allJsonsDatas.lancerJSON.Walk.sprite19.x;
          c1ToDraw.y = this.allJsonsDatas.lancerJSON.Walk.sprite19.y;
          c1ToDraw.width = this.allJsonsDatas.lancerJSON.Walk.sprite19.width;
          c1ToDraw.height = this.allJsonsDatas.lancerJSON.Walk.sprite19.height;
          break;
        case "archerWalk":
          c1ToDraw.x = this.allJsonsDatas.archerJSON.Walk.sprite19.x;
          c1ToDraw.y = this.allJsonsDatas.archerJSON.Walk.sprite19.y;
          c1ToDraw.width = this.allJsonsDatas.archerJSON.Walk.sprite19.width;
          c1ToDraw.height = this.allJsonsDatas.archerJSON.Walk.sprite19.height;
          break;
        case "mageWalk":
          c1ToDraw.x = this.allJsonsDatas.mageJSON.Walk.sprite19.x;
          c1ToDraw.y = this.allJsonsDatas.mageJSON.Walk.sprite19.y;
          c1ToDraw.width = this.allJsonsDatas.mageJSON.Walk.sprite19.width;
          c1ToDraw.height = this.allJsonsDatas.mageJSON.Walk.sprite19.height;
          break;
        default:
          break;
      }
      switch (characters[selectedC2]) {
        case "saberWalk":
          c2ToDraw.x = this.allJsonsDatas.saberJSON.Walk.sprite19.x;
          c2ToDraw.y = this.allJsonsDatas.saberJSON.Walk.sprite19.y;
          c2ToDraw.width = this.allJsonsDatas.saberJSON.Walk.sprite19.width;
          c2ToDraw.height = this.allJsonsDatas.saberJSON.Walk.sprite19.height;
          break;
          case "lancerWalk":
          c2ToDraw.x = this.allJsonsDatas.lancerJSON.Walk.sprite19.x;
          c2ToDraw.y = this.allJsonsDatas.lancerJSON.Walk.sprite19.y;
          c2ToDraw.width = this.allJsonsDatas.lancerJSON.Walk.sprite19.width;
          c2ToDraw.height = this.allJsonsDatas.lancerJSON.Walk.sprite19.height;
          break;
        case "archerWalk":
          c2ToDraw.x = this.allJsonsDatas.archerJSON.Walk.sprite19.x;
          c2ToDraw.y = this.allJsonsDatas.archerJSON.Walk.sprite19.y;
          c2ToDraw.width = this.allJsonsDatas.archerJSON.Walk.sprite19.width;
          c2ToDraw.height = this.allJsonsDatas.archerJSON.Walk.sprite19.height;
          break;
        case "mageWalk":
          c2ToDraw.x = this.allJsonsDatas.mageJSON.Walk.sprite19.x;
          c2ToDraw.y = this.allJsonsDatas.mageJSON.Walk.sprite19.y;
          c2ToDraw.width = this.allJsonsDatas.mageJSON.Walk.sprite19.width;
          c2ToDraw.height = this.allJsonsDatas.mageJSON.Walk.sprite19.height;
          break;
        default:
          break;
      }
      this.ctx.drawImage(this.startingImages[characters[selectedC1]], 
      c1ToDraw.x, 
      c1ToDraw.y, 
      c1ToDraw.width, 
      c1ToDraw.height, 
      this.$refs.canvas.width*2/2/4 - c1ToDraw.width*4/2, // Posicion X en el canvas
      this.$refs.canvas.height/2 - c1ToDraw.height*4/2, // Posicion Y en el canvas
      c1ToDraw.width*4,
      c1ToDraw.height*4);

      this.ctx.drawImage(this.startingImages[characters[selectedC2]], 
      c2ToDraw.x, 
      c2ToDraw.y, 
      c2ToDraw.width, 
      c2ToDraw.height, 
      this.$refs.canvas.width*3/4 - c2ToDraw.width*4/2, // Posicion X en el canvas
      this.$refs.canvas.height/2 - c2ToDraw.height*4/2, // Posicion Y en el canvas
      c2ToDraw.width*4,
      c2ToDraw.height*4);

    };

    const handleButtonClick = (buttonText, buttonPlayer) => {
      switch(buttonText) {
        case 'siguiente':
          if (buttonPlayer == 1) {
            if (selectedC1 == characters.length-1) {
              selectedC1=0;
            }else{
              selectedC1++;
            }
          }else{
            if (selectedC2 == characters.length-1) {
              selectedC2=0;
            }else{
              selectedC2++;
            }
          }
          break;
        case 'anterior':
        if (buttonPlayer == 1) {
            if (selectedC1 == 0) {
              selectedC1=3;
            }else{
              selectedC1--;
            }
          }else{
            if (selectedC2 == 0) {
              selectedC2=3;
            }else{
              selectedC2--;
            }
          }
          break;
        case 'Listo':
          if(buttonPlayer == 1){
            listo1 = !listo1;
          }else{
            listo2 = !listo2;
          }
          const buttonToUpdate = buttons.find(button => button.text === buttonText && button.player === buttonPlayer);
          if (buttonToUpdate.color === "green") {
            buttonToUpdate.color = "red";
          } else {
            buttonToUpdate.color = "green";
          }
          if (listo1 && listo2) {
            this.walkingFrames = this.startingImages[characters[selectedC1]];
            this.walkingFramesP2 = this.startingImages[characters[selectedC2]];
            this.attackingFrames = this.startingImages[characters[selectedC1].replace("Walk", "Attack")];
            this.attackingFramesP2 = this.startingImages[characters[selectedC2].replace("Walk", "Attack")];
            this.JsonData = this.allJsonsDatas[characters[selectedC1].replace("Walk","JSON")];
            this.JsonDataP2 = this.allJsonsDatas[characters[selectedC2].replace("Walk","JSON")];
            this.gameState="game";
            this.dibujar();
          }
          break;
        default:
          break;
      }
      drawMenu();
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
  Game: class {
    constructor(width, height, JsonData, walkingFrames, attackingFrames, JsonDataP2, walkingFramesP2, attackingFramesP2) {
      this.width = width;
      this.height = height;
      this.player = new Player(this, JsonData, walkingFrames, attackingFrames, 0, 125, {"up":"w","left":"a","down":"s","rigth":"d","attack":"q"});
      this.player2 = new Player(this, JsonDataP2, walkingFramesP2, attackingFramesP2, 500, 125, {"up":"i","left":"j","down":"k","rigth":"l","attack":"u"});
      if (this.nombreUser ==="bastian") {
        this.player.setName(this.nombreUser);
        this.player2.setName("roberto");
      }else{
        this.player2.setName(this.nombreUser);
        this.player.setName("roberto");
      }
      this.player.setPlayerN(1);
      this.player2.setPlayerN(2);
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
  },

  //Metodos para parar o continuar la musica
  playMusic(){
    this.songPlay.play();
    this.isPlaying = true;
  },
  stopMusic(){
    this.songPlay.pause();
    this.isPlaying = false;
  }
}
};
</script>
<style scoped>
#canvas1 {
  margin-top: 5px;
  width: 100%;
}
.container{
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.canvas-container{
  width: 80%;
  background-image: url('@/assets/piso.png');
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