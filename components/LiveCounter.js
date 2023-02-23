export class LiveCounter {
  constructor(scene, initialLives) {
    this.relatedScene = scene;
    this.initialLives = initialLives;
    this.lives = initialLives;
  }

  preload() {
    this.relatedScene.load.spritesheet("lives", "images/hearts.png", {
      frameWidth: 256,
      frameHeight: 1024,
    });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(765, 30, "lives");
    this.startButton.setScale(0.15);
    this.startButton.setFrame(0);
  }

  increase() {
    this.lives++;
    return this.updateCounter();
  }

  liveLost() {
    this.lives--;
    return this.updateCounter();
  }

  updateCounter() {
    if (this.lives === 0) {
      this.startButton.setFrame(3);
      setTimeout(() => {
        this.relatedScene.showGameOver();
      }, 500);
      return true;
    }
    if (this.lives === 1) {
      this.startButton.setFrame(2);
    }
    if (this.lives === 2) {
      this.startButton.setFrame(1);
    }
    if (this.lives > 2) {
      this.startButton.setFrame(0);
    }
    return false;
  }
}
