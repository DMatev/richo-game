class Drawer {
    #canvas;
    #context;
    #gameSettings;

    constructor(gameSettings) {
        const canvas = document.getElementById('game');
        this.#canvas = canvas;
        this.#context = canvas.getContext("2d");
        this.#gameSettings = gameSettings;
    }

    clearScreen() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawGameObject(gameObject) {
        this.#context.save();
        this.#context.drawImage(gameObject.img, gameObject.left, gameObject.top, gameObject.width, gameObject.height);
        this.#context.restore();
    }

    drawGameOver(score) {
        this.#context.save();
        this.clearScreen();
        this.#context.font = "32px Georgia";
        this.#context.fillStyle = "black";
        this.#context.fillText("Game Over", 120, 100);
        this.#context.fillText("Score: " + score, 120, 120);
        this.#context.restore();
    }

    drawTimer(timer) {
        let minutes = Math.floor(parseInt((timer.time / 1000).toString()) / 60);
        let seconds = parseInt((timer.time / 1000).toString()) - minutes * 60;

        this.#context.save();
        this.#context.translate(this.#gameSettings.scoreScreenWidth, this.#gameSettings.mainScreenHeight);
        this.#context.font = "20px Georgia";
        this.#context.fillStyle = "red";
        this.#context.fillText("Time: " + minutes + ":" + seconds, 50, 30);
        this.#context.restore();
    }

    drawScore(score) {
        this.#context.save();
        this.#context.translate(0, this.#gameSettings.mainScreenHeight);
        this.#context.font = "20px Georgia";
        this.#context.fillStyle = "red";
        this.#context.fillText("Score: " + score, 10, 30);
        this.#context.restore();
    }

    drawHealthBar(player) {
        let healthBarHeight = 20;
        let healthBarWidth = this.#gameSettings.healthScreenWidth / (player.maxHealth + 2);
        
        this.#context.save();
        this.#context.translate((this.#gameSettings.scoreScreenWidth + this.#gameSettings.timerScreenWidth), this.#gameSettings.mainScreenHeight);

        this.#context.beginPath();
        this.#context.strokeStyle = "red";
        this.#context.fillStyle = "red";
        for (let i = 0; i < player.maxHealth; i++) {
            this.#context.rect(i * healthBarWidth + 20, 10, healthBarWidth, healthBarHeight);
            this.#context.stroke();
        }
        for (let i = 0; i < player.currentHealth; i++) {
            this.#context.fillRect(i * healthBarWidth + 20, 10, healthBarWidth, healthBarHeight);
            this.#context.stroke();
        }
        this.#context.restore();
    }
}

export default Drawer;