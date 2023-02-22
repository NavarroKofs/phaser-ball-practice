export class Phase {
  constructor(scene) {
    this.relatedScene = scene;
  }

  configureColisions() {
    this.relatedScene.physics.add.collider(
      this.relatedScene.ball,
      this.bricks,
      this.relatedScene.brickImpact,
      null,
      this.relatedScene
    );
  }

  configureColisionsFixed() {
    this.relatedScene.physics.add.collider(
      this.relatedScene.ball,
      this.fixedBricks,
      this.relatedScene.fixedBrickImpact,
      null,
      this.relatedScene
    );
  }

  deleteFixedBricks() {
    if (this.fixedBricks) {
      // this.fixedBricks.getChildren().forEach((item) => {
      //   item.disableBody(true, true);
      // });
      //I prefer this solution because we don't have any item stored in memory
      this.fixedBricks.clear(true);
    }
  }

  isPhaseFinished() {
    return this.bricks.countActive() === 0;
  }
}
