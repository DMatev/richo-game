import GameSettings from "/components/gameSettings.js";
import Richo from "/components/richo.js";
import Lea from "/components/lea.js";
import Bone from "/components/bone.js";
import InputHandler from "/components/inputHandler.js";
import Timer from "/components/timer.js";
import Drawer from "/components/drawer.js";

class GameEngine {
    #gameInterval;

    constructor() {
        this.gameSettings = new GameSettings();
        this.timer = new Timer(this.gameSettings);
        this.drawer = new Drawer(this.gameSettings);
        this.inputHandler = new InputHandler();
        this.inputHandler.init(this.turnRightHandler, this.turnLeftHandler, this);
        this.richo = new Richo(this.gameSettings);
        this.leas = [];
        this.bones = [];

        document.addEventListener("GameOver", this.#gameOver);
        document.addEventListener("GameStart", this.#gameStart);
        document.addEventListener("TurnLeft", this.turnLeftHandler.bind(this));
        document.addEventListener("TurnRight", this.turnRightHandler.bind(this));
    }

    #gameOver = (event) => {
        clearInterval(this.#gameInterval);
        this.inputHandler.removeListeners();
        this.drawer.drawGameOver(event.detail.score);
    }

    #gameStart = (event) => {
        const me = this;
        if (this.gameSettings.isGameOver) {
            this.gameSettings.isGameOver = false;
            this.inputHandler.assignListeners();
            this.#gameInterval = setInterval(() => {
                    me.mainLoop();
            }, this.gameSettings.refreshTimeMs);
        }
    }

    mainLoop() {
        console.log("main loop");
        this.timer.increment();
        this.spawnLea();
        this.spawnBone();
        this.updateScreen();
        this.updateScore();
        this.interactionManager();
    }

     updateScreen() {
        this.drawer.clearScreen();
        this.drawer.drawGameObject(this.richo);
        for (let i = 0; i < this.leas.length; i++) {
            this.drawer.drawGameObject(this.leas[i]);
        }
        for (let i = 0; i < this.bones.length; i++) {
            this.drawer.drawGameObject(this.bones[i]);
        }
        this.drawer.drawScore(this.richo.score);
        this.drawer.drawTimer(this.timer);
        this.drawer.drawHealthBar(this.richo);
    }

    updateScore() {
        this.richo.score += this.gameSettings.scoreScale;
    }

    interactionManager() {
        this.moveLeas();
        this.moveBones();
    }

    moveLeas(){
        for (let i = 0; i < this.leas.length; i++) {
            //moving leas
            if ((this.leas[i].top + this.gameSettings.leaSpeed) >= 0) {
                this.leas[i].updatePosition(this.leas[i].left, this.leas[i].top + this.gameSettings.leaSpeed);
            } else {
                this.leas.splice(i, 1);
                if (i > 0) {
                    i--;
                } else {
                    break;
                }
            }
            //detecting richo hit a lea
            if (this.detectCollision(this.richo, this.leas[i])) {
                this.leas.splice(i, 1);
                this.richo.takeDamage(1);
                if (i > 0) {
                    i--;
                } else {
                    break;
                }
            }
        }
    }

    moveBones(){
        for (let i = 0; i < this.bones.length; i++) {
            //moving bones
            if ((this.bones[i].top + this.gameSettings.boneSpeed) >= 0) {
                this.bones[i].updatePosition(this.bones[i].left, this.bones[i].top + this.gameSettings.boneSpeed);
            } else {
                this.bones.splice(i, 1);
                if (i > 0) {
                    i--;
                } else {
                    break;
                }
            }
            //detecting richo hit a bone
            if (this.detectCollision(this.richo, this.bones[i])) {
                this.bones.splice(i, 1);
                this.richo.heal(1);
                if (i > 0) {
                    i--;
                } else {
                    break;
                }
            }
        }
    }

    detectCollision(obj1, obj2) {
        const hit = (obj1.left < obj2.left + obj2.width &&
            obj1.left + obj1.width > obj2.left &&
            obj1.top < obj2.top + obj2.height &&
            obj1.height + obj1.top > obj2.top);
        return hit;
    }

    turnRightHandler() {
        if ((this.richo.left + this.richo.width + this.richo.speed) <= this.gameSettings.mainScreenWidth) {
            this.richo.updatePosition(this.richo.left + this.richo.speed, this.richo.top)
        }
    }

    turnLeftHandler() {
        if ((this.richo.left - this.richo.speed) >= 0) {
            this.richo.updatePosition(this.richo.left - this.richo.speed, this.richo.top);
        }
    }

    spawnLea() {
        this.timer.nowMs = Date.now();
        if (this.timer.nowMs - this.gameSettings.lastLeaSpawnTimestamp > this.gameSettings.leaSpawnFrequencyMs) {
            this.gameSettings.lastLeaSpawnTimestamp = this.timer.nowMs;
            this.leas.push(new Lea(this.gameSettings));
        }
    }

    spawnBone() {
        this.timer.nowMs = Date.now();
        if (this.timer.nowMs - this.gameSettings.lastBoneSpawnTimestamp > this.gameSettings.boneSpawnFrequencyMs) {
            this.gameSettings.lastBoneSpawnTimestamp = this.timer.nowMs;
            this.bones.push(new Bone(this.gameSettings));
        }
    }
}

export default GameEngine;