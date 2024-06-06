<template>
    <div class="container">
        <div class="canvas-container">
            <canvas id="canvas1" ref="canvas"></canvas>
        </div>
        <div class="button-container">
            <button>Jugar</button>
            <button>Musica</button>
            <button>Volver A Jugar</button>
        </div>
    </div>
</template>
<script>
import { Player } from './Player';
import { InputHandler } from './InputHandler';
import walkImg from '@/assets/Mage/Walk.png';
import attackImg from '@/assets/Mage/Attack.png';
import mageData from '@/assets/Mage/Mage.json';

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
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = 500;
    canvas.height = 250;
    this.ctx = canvas.getContext('2d');

    this.walkingFrames.src = walkImg;
    this.attackingFrames.src = attackImg;

    this.walkingFrames.onload = this.onImageLoad;
    this.attackingFrames.onload = this.onImageLoad;
  },
  methods: {
    onImageLoad() {
      this.imagesLoaded++;
      if (this.imagesLoaded === 2) {
        this.startGame();
      }
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
    }
  }
};
</script>
<style scoped>
#canvas1 {
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