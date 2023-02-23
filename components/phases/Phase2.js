import { Phase } from "./phase.js";

export class Phase2 extends Phase {
  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup();

    this.bricks.create(400, 270, "orangeBrick");
    this.bricks.create(360, 225, "orangeBrick");
    this.bricks.create(440, 225, "orangeBrick");
    this.bricks.create(480, 180, "orangeBrick");
    this.bricks.create(400, 180, "orangeBrick");
    this.bricks.create(320, 180, "orangeBrick");
    this.bricks.create(280, 135, "orangeBrick");
    this.bricks.create(360, 135, "orangeBrick");
    this.bricks.create(440, 135, "orangeBrick");
    this.bricks.create(520, 135, "orangeBrick");
    this.bricks.create(330, 90, "orangeBrick");
    this.bricks.create(470, 90, "orangeBrick");

    this.configureColisions();
  }
}
