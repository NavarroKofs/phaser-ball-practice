import { LiveCounter } from "../components/LiveCounter";
import { PhaseConstructor } from "../components/PhaseConstructor";
import { Scoreboard } from "../components/Scoreboard";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init() {
    this.phaseConstructor = new PhaseConstructor(this);
    this.scoreboard = new Scoreboard(this);
    this.counter = new LiveCounter(this, 3);
  }

  preload() {
    this.load.image("background", "images/background.png");
    this.load.image("platform", "images/platform.png");
    this.load.image("ball", "images/ball.png");
    this.load.image("blueBrick", "images/brickBlue.png");
    this.load.image("blackBrick", "images/brickBlack.png");
    this.load.image("greenBrick", "images/brickGreen.png");
    this.load.image("orangeBrick", "images/brickOrange.png");
    this.load.image("greyBrick", "images/brickGrey.png");
    this.load.image("yellowBrick", "images/brickYellow.png");
    this.load.image("whiteBrick", "images/brickWhite.png");
    this.load.spritesheet("blueDiamond", "images/blue_diamond-sprites.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("greenDiamond", "images/green_diamond-sprites.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("redDiamond", "images/red_diamond-sprites.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.audio(
      "platformimpactsample",
      "sounds/sounds_platform-impact.ogg"
    );
    this.load.audio("brickimpactsample", "sounds/sounds_brick-impact.ogg");
    this.load.audio("gameoversample", "sounds/sounds_gameover.ogg");
    this.load.audio("winsample", "sounds/sounds_you_win.ogg");
    this.load.audio("startgamesample", "sounds/sounds_start-game.ogg");
    this.load.audio("livelostsample", "sounds/sounds_live-lost.ogg");
    this.load.audio("phasechange", "sounds/sounds_phasechange.ogg");
    this.counter.preload();
  }

  create() {
    this.platformImpactSample = this.sound.add("platformimpactsample");
    this.brickImpactSample = this.sound.add("brickimpactsample");
    this.gameOverSample = this.sound.add("gameoversample");
    this.winSample = this.sound.add("winsample");
    this.startGameSample = this.sound.add("startgamesample");
    this.liveLostSample = this.sound.add("livelostsample");
    this.phaseChangeSample = this.sound.add("phasechange");

    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(410, 250, "background");
    this.scoreboard.create();
    this.counter.create();

    this.platform = this.physics.add.image(400, 460, "platform").setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);

    this.ball = this.physics.add.image(400, 440, "ball");
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.ball.setData("glue", true);

    this.physics.add.collider(
      this.ball,
      this.platform,
      this.platformImpact,
      null,
      this
    );

    this.phaseConstructor.create();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  platformImpact(ball, platform) {
    if (!this.ball.getData("glue")) {
      this.platformImpactSample.play();
      this.scoreboard.incrementPoints(1);
      let relativeImpact = ball.x - platform.x;
      if (relativeImpact < 0.1 && relativeImpact > -0.1) {
        ball.setVelocityX(Phaser.Math.Between(-10, 10));
      } else {
        ball.setVelocityX(10 * relativeImpact);
      }
    }
  }

  brickImpact(ball, brick) {
    this.brickImpactSample.play();
    brick.disableBody(true, true);
    this.scoreboard.incrementPoints(10);
    if (this.phaseConstructor.isPhaseFinished()) {
      this.phaseChangeSample.play();
      this.phaseConstructor.nextLevel();
      this.setInitialPlatformState();
    }
  }

  showGameOver() {
    this.gameOverSample.play();
    this.scene.start("gameOver");
  }

  showCongratulations() {
    this.winSample.play();
    this.scene.start("congratulations");
  }

  setInitialPlatformState() {
    this.liveLostSample.play();
    this.platform.x = 400;
    this.platform.y = 460;
    this.ball.setVelocity(0, 0);
    this.ball.x = 400;
    this.ball.y = 440;
    this.ball.setData("glue", true);
  }

  update() {
    if (this.keyA.isDown) {
      this.platform.setVelocityX(-500);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(-500);
      }
    } else if (this.keyD.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(500);
      }
    } else {
      this.platform.setVelocityX(0);
      if (this.ball.getData("glue")) {
        this.ball.setVelocityX(0);
      }
    }
    if (this.ball.y > 500 && this.ball.active) {
      let gameFinished = this.counter.liveLost();
      if (!gameFinished) {
        this.setInitialPlatformState();
      }
    }
    if (this.keySpace.isDown && this.ball.getData("glue")) {
      this.startGameSample.play();
      this.ball.setVelocity(-75, -300);
      this.ball.setData("glue", false);
    }
  }
}
