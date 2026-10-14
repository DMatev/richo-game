import GameObject from "/components/gameObject.js";

class Bone extends GameObject {
    constructor(gamesettings) {
        let image = document.createElement('img');
        image.setAttribute('src', '/assets/img/bone.png');
        super();
        this.width = 25;
        this.height = 12;
        this.left = Math.floor((Math.random() * (gamesettings.mainScreenWidth - this.width)) + 1);
        this.top = 0;
        this.img = image;
    }
}

export default Bone;