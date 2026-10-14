import GameObject from "/components/gameObject.js";

class Richo extends GameObject {
    speed;
    maxHealth;
    currentHealth;
    score;

    constructor(gamesettings) {
        let image = document.createElement('img');
        image.setAttribute('src', '/assets/img/richo.png');
        super();

        this.maxHealth = 5;
        this.currentHealth = this.maxHealth;
        this.width = 35;
        this.height = 70;
        this.left = gamesettings.mainScreenWidth / 2 - this.width / 2;
        this.top = gamesettings.mainScreenHeight - this.height;
        this.speed = 15;
        this.score = 0;
        this.img = image;
    }

    heal(healingPoint) {
        if ((this.currentHealth + healingPoint) <= this.maxHealth) {
            this.currentHealth += healingPoint;
        }
    }

    takeDamage(damage) {
        const me = this;
        this.img.src = 'assets/img/richo-bandage.png';
        setTimeout(() => {
            me.img.src = 'assets/img/richo.png';
        }, 1000);
        if ((this.currentHealth - damage) > 0) {
            this.currentHealth -= damage;
        } else {
            this.#gameOver();
        }
    }

    #gameOver() {
        document.dispatchEvent(new CustomEvent("GameOver", { detail: { score: this.score } }));
    }
    
}

export default Richo;