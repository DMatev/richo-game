class GameMenu extends HTMLElement {
    constructor(...args) {
        super(...args);

        this.shadow = this.attachShadow({ mode: "open" });
    }
    render() {
        this.shadow.innerHTML = /*html*/ `
        <style>
            button {
                border-radius: 1rem;
                border-width: 0px;
                padding: 0.5rem;
                touch-action: manipulation;
            }
            div {
                display: grid;
                width: 380px;
                grid-template-columns: 1fr 1fr;
            }
        </style>
        <button id='start'>Start</button>
        <div>
            <button id='left'><-</button>
            <button id='right'>-></button>
        </div>`;
    }

    connectedCallback() {
        this.render();

        const left = this.shadowRoot.querySelector("#left");
        left.hidden = true;
        const right = this.shadowRoot.querySelector("#right");
        right.hidden = true;

        this.shadowRoot.querySelector("#start").addEventListener("click", (e) => {
            e.target.hidden = true;
            left.hidden = false;
            right.hidden = false;
            document.dispatchEvent(new CustomEvent("GameStart"));
        });

        left.addEventListener("click", (e) => {
            document.dispatchEvent(new CustomEvent("TurnLeft"));
        });

        right.addEventListener("click", (e) => {
            document.dispatchEvent(new CustomEvent("TurnRight"));
        });

        document.addEventListener("GameOver", this.#gameOver);
    }

     #gameOver = (event) => {
        this.shadowRoot.querySelector("#left").hidden = true;
        this.shadowRoot.querySelector("#right").hidden = true;
    }
}

customElements.define("game-menu", GameMenu);

export default GameMenu;
