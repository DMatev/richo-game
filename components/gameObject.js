class GameObject {
    left;
    top;
    width;
    height;
    img;

    updatePosition(left, top) {
        this.left = left;
        this.top = top;
    }
}

export default GameObject;