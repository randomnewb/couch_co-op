export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.players = [];
    this.keySets = [
      { up: "W", down: "S", left: "A", right: "D" },
      { up: "Y", down: "H", left: "G", right: "J" },
      { up: "P", down: "SEMICOLON", left: "L", right: "QUOTES" },
      { up: "UP", down: "DOWN", left: "LEFT", right: "RIGHT" },
    ];
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
  }

  preload() {
    this.load.image("player_character", "./assets/player_character.png");
  }

  create() {
    this.add.text(20, 20, "Press 1 to create a new player", {
      font: "25px Arial",
      fill: "yellow",
    });

    this.add.text(
      20,
      60,
      "Controls are: 'WASD', 'YGHJ', 'PL;'', and 'Arrow Keys'",
      {
        font: "25px Arial",
        fill: "yellow",
      }
    );

    this.input.keyboard.on("keydown-ONE", () => {
      if (this.players.length < this.keySets.length) {
        const player = this.physics.add.sprite(
          100 * (this.players.length + 1),
          100,
          "player_character"
        );
        player.setCollideWorldBounds(true);
        player.cursors = this.input.keyboard.addKeys({
          up: this.keyCodes[this.keySets[this.players.length].up],
          down: this.keyCodes[this.keySets[this.players.length].down],
          left: this.keyCodes[this.keySets[this.players.length].left],
          right: this.keyCodes[this.keySets[this.players.length].right],
        });
        this.players.push(player);
      }
    });
  }

  update() {
    this.players.forEach(player => {
      if (player.cursors.left.isDown) {
        MoveLeftCommand.execute(player);
      }
      if (player.cursors.right.isDown) {
        MoveRightCommand.execute(player);
      }
      if (player.cursors.up.isDown) {
        MoveUpCommand.execute(player);
      }
      if (player.cursors.down.isDown) {
        MoveDownCommand.execute(player);
      }
    });
  }
}

const MoveLeftCommand = {
  execute: player => (player.x -= 5),
};

const MoveRightCommand = {
  execute: player => (player.x += 5),
};

const MoveUpCommand = {
  execute: player => (player.y -= 5),
};

const MoveDownCommand = {
  execute: player => (player.y += 5),
};
