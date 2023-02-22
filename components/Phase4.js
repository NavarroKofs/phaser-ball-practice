import { Phase } from "./phase.js";

export class Phase4 extends Phase {
  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ["blueBrick", "greenBrick", "orangeBrick", "blackBrick"],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 67,
        cellHeight: 34,
        x: 100,
        y: 100,
      },
    });
    this.configureColisions();
  }
}
