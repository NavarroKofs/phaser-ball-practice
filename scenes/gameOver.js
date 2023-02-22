import { RestartButton } from "../components/restartButton";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameOver" });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image("gameOver", "images/gameover.png");
    this.restartButton.preload();
  }

  create() {
    this.add.image(410, 250, 'background');
    this.restartButton.create();
    this.gameOverImage = this.add.image(400, 90, 'gameOver')
  }
}
