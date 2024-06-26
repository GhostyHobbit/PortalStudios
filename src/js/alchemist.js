
import { Actor, Engine, Vector, Input, Keys, Camera, ScreenElement, BoundingBox, CollisionType, Label } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { SceneTransition } from "./sceneTransition.js"
import { Dialogue } from "./dialogue.js"
import { Letter } from "./letter.js"

export class Alchemist extends Actor {

    speed = 0
    existingDialogue = false
    dialogueCount = 0
    dialogue = new Dialogue()
    levelEnded = false
    dialogueText = ['cracked', 'chickens', 'definitely', 'say', 'wac']

    constructor() {
        super({width: Resources.Alchemist.width, height: Resources.Alchemist.height})
        this.body.collisionType = CollisionType.Active
    }

    onInitialize(engine) {
        this.game = engine

        this.on('precollision', (event) => this.interact(event))

        this.scene.camera.strategy.lockToActor(this)
        this.scene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3780, 720))
        this.on('collisionend', (event) => this.sceneTransition(event))
    }

    onPreUpdate(engine) {
        if (this.existingDialogue === true){
            this.vel = new Vector(0, 0)
        } else if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            this.speed = 200
            this.vel = new Vector(this.speed, 0)
            this.graphics.flipHorizontal = false
        } else if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            this.speed = -200
            this.vel = new Vector(this.speed, 0)
            this.graphics.flipHorizontal = true 
        } else if (engine.mygamepad) {
            const x = engine.mygamepad.getAxes(Axes.LeftStickX)
            this.vel = new Vector(x * 10, 0)
        } else {
            this.vel = new Vector(0, 0) 
        }
    }

    interact(event) {
        if(event.other instanceof Letter) {
            if (this.game.input.keyboard.wasPressed(Input.Keys.E)) {
                if (this.existingDialogue === false) {
                    this.existingDialogue = true
                    this.scene.add(this.dialogue)
                    // this.scene.actors[6].dialogueFlow(`I am the Master Alchemist. You, my apprentice, have to find your way through these tests. These are tests of faith, \ncreativity and exploration. Every choice you make will influence your future.`)
                    this.scene.sceneDialogue(0)
                } else if (this.existingDialogue === true) {
                    this.dialogueCount++
                    console.log(this.dialogueCount)
                    if (this.dialogueCount >= this.dialogueText.length) {
                        console.log(this.scene.actors)
                        this.scene.actors[6].kill()
                        this.existingDialogue = false
                        this.dialogueCount = 0
                    } else {
                        //you can reuse this in every scene (needs to be finetuned but works for now) to run dialogue
                        //for questions --> ask Lucas
                        this.scene.sceneDialogue(this.dialogueCount)
                    }
                }
            }
        }
    }
    sceneTransition(event) {
        console.log('collision')
        if(event.other instanceof SceneTransition && this.levelEnded === false) {
            this.levelEnded = true
            //you can reuse this function in every scene, makes for less code here
            this.scene.changeScene()
        }
    }
}