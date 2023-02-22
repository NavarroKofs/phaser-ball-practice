import { Phase } from "./phase.js";

export class Phase1 extends Phase {
  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: [
        "blueBrick",
        "orangeBrick",
        "greenBrick",
        "blackBrick",
        "yellowBrick",
        "blackBrick",
        "yellowBrick",
        "blueBrick",
        "orangeBrick",
        "greenBrick",
      ],
      frameQuantity: 1,
      gridAlign: {
        width: 5,
        height: 4,
        cellWidth: 150,
        cellHeight: 100,
        x: 135,
        y: 150,
      },
    });

    this.fixedBricks = this.relatedScene.physics.add.staticGroup();
    this.fixedBricks.create(316, 165, "greyBrick");
    this.fixedBricks.create(466, 165, "greyBrick");

    this.configureColisions();
    this.configureColisionsFixed();
  }
}
