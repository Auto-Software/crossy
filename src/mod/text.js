
import { Element } from "./element.js";

export class Text extends Element {
    constructor(content = "") {
        super("span");
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
}
