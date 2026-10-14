class InputHandler {

    init(turnRight, turnLeft, scope) {
        this.turnRight = turnRight;
        this.turnLeft = turnLeft;
        this.gameEngineScope = scope;
        this.eventListener = this.processInput.bind(this);
    }

    assignListeners() {
        window.addEventListener('keydown', this.eventListener, false);
    }
    
    removeListeners() {
        window.removeEventListener('keydown', this.eventListener, false);
    }

    processInput(e) {
        if (e.keyCode == 39) { //right
            this.turnRight.apply(this.gameEngineScope);
        }
        if (e.keyCode == 37) { //left
            this.turnLeft.apply(this.gameEngineScope);;
        }
    }
}

export default InputHandler;