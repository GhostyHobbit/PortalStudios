import { Actor, Scene, Vector } from "excalibur"
import { Resources } from './resources'
import { Alchemist } from './alchemist.js'
import { Letter } from './letter.js'
import { InvisibleFloor } from './invisiblefloor.js'
import { Door } from './door.js'
//import { LevelOneScreenTwo } from "./levelonescenetwo.js"

export class LevelOne extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {

    }
    onActivate(ctx) {
        console.log(this.engine)
        const levelonescreenone = new Actor()
        levelonescreenone.pos = new Vector(1900, 360)
        levelonescreenone.graphics.use(Resources.LevelOneScreenOne.toSprite())
        this.add(levelonescreenone)

        const invisfloor = new InvisibleFloor()
        invisfloor.pos = new Vector(1900, 700)
        this.add(invisfloor)

        const door = new Door()
        door.pos = new Vector(2720,437)
        this.add(door)

        const alchemist = new Alchemist()
        alchemist.pos = new Vector(0, 600)
        alchemist.graphics.use(Resources.Alchemist.toSprite())
        this.add(alchemist)
        // Resources.LevelOneMusic.play(0.8);
    }

    changeScene() {
        this.engine.goToScene('levelonescenetwo')
    }

    onDeactivate() {
        this.clear()
    }
}