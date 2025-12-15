import { Element } from "./element.js";

export class Button extends Element {
    constructor(content = "") {
        super("button");
        this.el.textContent = content;
    }

    render(target = document.body) {
        target.appendChild(this.el); 
        return this;
    }

    unrender() {
        this.el.remove(); 
        return this;
    }
};
