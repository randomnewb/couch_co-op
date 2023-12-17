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
    this.scoreTexts = [];
  }

  preload() {
    this.load.image("player_character", "./assets/player_character.png");
    this.load.image("jewel", "./assets/jewel.png");
  }

  create() {
    this.add.text(20, 20, "Press 1 to create a new player. Collect jewels!", {
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
          200,
          "player_character"
        );
        player.setCollideWorldBounds(true);
        player.setScale(2);
        player.cursors = this.input.keyboard.addKeys({
          up: this.keyCodes[this.keySets[this.players.length].up],
          down: this.keyCodes[this.keySets[this.players.length].down],
          left: this.keyCodes[this.keySets[this.players.length].left],
          right: this.keyCodes[this.keySets[this.players.length].right],
        });
        player.score = 0;
        player.setTint(
          Phaser.Display.Color.GetColor(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
          )
        );
        this.players.push(player);

        const playerIndex = this.players.length;

        const scoreText = this.add.text(
          20 + 200 * (playerIndex - 1),
          100,
          `Player ${playerIndex}: ${player.score}`,
          {
            font: "25px Arial",
            fill: "yellow",
          }
        );
        this.scoreTexts.push(scoreText);

        this.physics.add.overlap(
          player,
          this.jewel,
          () => {
            player.score++;
            scoreText.setText(`Player ${playerIndex}: ${player.score}`);

            this.jewel.x = Phaser.Math.Between(100, 700);
            this.jewel.y = Phaser.Math.Between(100, 500);

            this.jewel.setTint(
              Phaser.Display.Color.GetColor(
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
              )
            );

            console.log(`Player ${playerIndex} grabbed the jewel`);
          },
          null,
          this
        );
      }
    });

    this.jewel = this.physics.add.sprite(
      Phaser.Math.Between(100, 700),
      Phaser.Math.Between(100, 500),
      "jewel"
    );

    this.jewel.setScale(2);

    this.jewel.setTint(
      Phaser.Display.Color.GetColor(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      )
    );

    this.players.forEach(player => {
      player.score = 0;
    });

    this.players.forEach((player, index) => {
      const scoreText = this.add.text(
        20 + 200 * index,
        100,
        `Player ${index + 1}: ${player.score}`,
        {
          font: "25px Arial",
          fill: "yellow",
        }
      );
      this.scoreTexts.push(scoreText);
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

const SPEED = 2;

const MoveLeftCommand = {
  execute: player => (player.x -= SPEED),
};

const MoveRightCommand = {
  execute: player => (player.x += SPEED),
};

const MoveUpCommand = {
  execute: player => (player.y -= SPEED),
};

const MoveDownCommand = {
  execute: player => (player.y += SPEED),
};
