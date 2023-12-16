export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.add.text(100, 100, "Hello World", { fill: "#0f0" });
  }

  update() {}
}
