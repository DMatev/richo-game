import GameObject from "/components/gameObject.js";

class Lea extends GameObject {
    constructor(gamesettings) {
        let image = document.createElement('img');
        image.setAttribute('src', '/assets/img/lea.png');
        super();
        this.width = 75;
        this.height = 50;
        this.left = Math.floor((Math.random() * (gamesettings.mainScreenWidth - this.width)) + 1);
        this.top = 0;
        this.img = image;
    }
}

export default Lea;