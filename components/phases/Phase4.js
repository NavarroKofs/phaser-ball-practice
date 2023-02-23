import { Phase } from "./phase.js";
import { Diamonds } from '../Diamonds';
import { LivePower } from "../powers/LivePower.js";
import { LargePlatformPower } from "../powers/LargePlatformPower.js";
import { GluePower } from "../powers/GluePower.js";

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

    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[35] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[1] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[24] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[16] = new GluePower(this.relatedScene, this.diamonds);
    this.powers[29] = new GluePower(this.relatedScene, this.diamonds);
  }
}
