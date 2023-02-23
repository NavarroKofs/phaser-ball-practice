import { Power } from "./power.js";

export class LargePlatformPower extends Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, "redDiamond");
  }

  givePower() {
    this.relatedScene.setPlatformBig();
  }
}
