import { Phase } from "./phase.js";

export class Phase3 extends Phase {
  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup();

    this.bricks.create(110, 270, "orangeBrick");
    this.bricks.create(170, 225, "blueBrick");
    this.bricks.create(230, 180, "yellowBrick");
    this.bricks.create(290, 135, "blackBrick");
    this.bricks.create(350, 90, "greenBrick");

    this.bricks.create(680, 270, "orangeBrick");
    this.bricks.create(620, 225, "blueBrick");
    this.bricks.create(560, 180, "yellowBrick");
    this.bricks.create(500, 135, "blackBrick");
    this.bricks.create(440, 90, "greenBrick");

    this.configureColisions();
  }
}
