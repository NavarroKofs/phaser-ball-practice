import { Ball } from "../components/Ball";
import { LiveCounter } from "../components/LiveCounter";
import { PhaseConstructor } from "../components/phases/PhaseConstructor";
import { Platform } from "../components/Platform";
import { Scoreboard } from "../components/Scoreboard";

const INITIAL_LIVES = 3;
const INITIAL_VELOCITY_X = -60;

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init() {
    this.phaseConstructor = new PhaseConstructor(this);
    this.platform = new Platform(this);
    this.ball = new Ball(this);
    this.scoreboard = new Scoreboard(this);
    this.counter = new LiveCounter(this, INITIAL_LIVES);
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
    this.platform.create();
    this.ball.create();

    this.physics.add.collider(
      this.ball.get(),
      this.platform.get(),
      this.platformImpact,
      null,
      this
    );

    this.phaseConstructor.create();
    this.createAnimations();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  createAnimations() {
    this.anims.create({
      key: "blueDiamondAnimation",
      frames: this.anims.generateFrameNumbers("blueDiamond", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: "redDiamondAnimation",
      frames: this.anims.generateFrameNumbers("redDiamond", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: "greenDiamondAnimation",
      frames: this.anims.generateFrameNumbers("greenDiamond", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  platformImpact(ball, platform) {
    this.platformImpactSample.play();
    this.scoreboard.incrementPoints(1);
    let relativeImpact = ball.x - platform.x;
    if (this.platform.hasGluePower()) {
      ball.setVelocityY(0);
      ball.setVelocityX(0);
      this.glueRecordVelocityX = this.calculateVelocity(relativeImpact);
      this.platform.hasBallGlued = true;
    } else {
      ball.setVelocityX(this.calculateVelocity(relativeImpact));
    }
  }

  calculateVelocity(relativeImpact) {
    if (relativeImpact > 50) {
      relativeImpact = 50;
    }
    if (relativeImpact > 0) {
      return 8 * relativeImpact;
    } else if (relativeImpact < 0) {
      return 8 * relativeImpact;
    } else {
      return Phaser.Math.Between(-10, 10);
    }
  }

  brickImpact(ball, brick) {
    this.brickImpactSample.play();
    brick.disableBody(true, true);
    this.scoreboard.incrementPoints(10);
    if (this.phaseConstructor.isPhaseFinished()) {
      this.phaseChangeSample.play();
      this.phaseConstructor.nextLevel();
      this.platform.setInitialState(this.ball);
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

  increaseLives() {
    this.counter.increase();
  }

  removeGlueFromBall() {
    this.ball.removeGlue();
  }

  setGluePower() {
    this.platform.setGluePower();
  }

  setPlatformBig() {
    this.platform.setBigSize();
  }

  update() {
    this.platform.updatePosition(this.ball, this.keyA, this.keyD);
    if (this.ball.isLost()) {
      let gameFinished = this.counter.liveLost();
      if (!gameFinished) {
        this.liveLostSample.play();
        this.platform.setInitialState(this.ball);
        this.platform.setInitialSize();
        this.platform.removeGlue();
        this.glueRecordVelocityX = INITIAL_VELOCITY_X;
      }
    }
    if (this.keySpace.isDown) {
      if (this.ball.isGlued) {
        this.startGameSample.play();
        this.ball.throw(INITIAL_VELOCITY_X);
      } else if (this.platform.isGluedBecausePower()) {
        this.ball.throw(this.glueRecordVelocityX);
        this.platform.hasBallGlued = false;
      }
    }
  }
}
