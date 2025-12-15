
export class Element {
    constructor(tag = "div") {

        this.el = document.createElement(tag);
    }

    attribute(name, value) {
        this.el.setAttribute(name, value);
        return this;
    }

    seletor(name) {
        this.el.classList.add(name);
        return this;
    }

    append(child) {
        this.el.appendChild(child.el);
        return this;
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
