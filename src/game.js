import Phaser from "phaser";
import GameScene from "./scenes/gameScene.js";

const config = {
  backgroundColor: "#000000",
  type: Phaser.AUTO,
  parent: "root",
  dom: {
    createContainer: true,
  },
  input: {
    mouse: {
      target: "root",
    },
    touch: {
      target: "root",
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
    pixelArt: true,
    zoom: 2,
  },
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  input: {
    activePointers: 3,
  },
};

const game = new Phaser.Game(config);
