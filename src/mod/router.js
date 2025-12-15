// router.js

import { Element } from "./element.js";

export class Router extends Element {
    constructor(path = "/") {
        super("div");
        this.path = path;

        this._check(); 
        window.addEventListener("popstate", () => this._check());
    }

    _check() {
        const current = window.location.pathname;

        if (current === this.path) {
            if (!this.el.parentNode) {
                document.body.appendChild(this.el);
            }
        } else {
            if (this.el.parentNode) {
                this.el.remove();
            }
        }
    }

    append(...children) {
        children.forEach(child => {
            if (child?.el) {
                this.el.appendChild(child.el);
            }
        });
        return this;
    }

    navigate(path) {
        history.pushState({}, "", path);
        this._check();
        return this;
    }

    prev() {
        history.back();
        return this;
    }

    next() {
        history.forward();
        return this;
    }
}
