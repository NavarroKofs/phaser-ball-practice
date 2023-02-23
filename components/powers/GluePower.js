import { Power } from "./power.js";

export class GluePower extends Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, "greenDiamond");
  }

  givePower() {
    this.relatedScene.setGluePower();
  }
}
