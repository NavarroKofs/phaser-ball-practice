import { Power } from "./power.js";

export class LivePower extends Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, "blueDiamond");
  }

  givePower() {
    this.relatedScene.increaseLives();
  }
}
