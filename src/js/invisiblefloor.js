import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources';

export class InvisibleFloor extends Actor {
  constructor() {
    super({
      width: 4000,
      height: 100,
    });
    this.body.collisionType = CollisionType.Fixed;
  }
}