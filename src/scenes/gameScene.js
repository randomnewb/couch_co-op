export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("player_character", "./assets/player_character.png");
  }

  create() {
    this.player = this.physics.add.sprite(100, 100, "player_character");
    this.player.setCollideWorldBounds(true);
  }

  update() {}
}
