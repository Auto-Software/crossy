import { Text } from "./text.js";

export class Template {
    constructor(parent = null) {
        this.parent = parent || document.body;
        this.children = [];
    }

    add(...children) {
        children.forEach(child => {
            let el = child;

            // strings viram Text
            if (typeof child === "string") {
                el = new Text(child);
            }

            // se for outro Template, adiciona os filhos
            if (child instanceof Template) {
                child.children.forEach(c => {
                    this._appendClone(c);
                });
                return;
            }

            this._appendClone(el);
        });
        return this; // encadeamento
    }

    // Função que clona o elemento e seus eventos
    _cloneElement(el) {
        const clone = new el.constructor(el.el.textContent);

        // Clona os atributos do elemento original
        [...el.el.attributes].forEach(attr => {
            clone.el.setAttribute(attr.name, attr.value);
        });

        // Reaplica os eventos do elemento original
        if (el._events) {
            el._events.forEach(({ type, callback }) => {
                clone.el.addEventListener(type, callback);
            });
        }

        return clone;
    }

    _appendClone(el) {
        this.children.push(el);

        const parentNode = this.parent.el ? this.parent.el : this.parent;

        if (el.el) {
            // Se o elemento já está no DOM, faz o clone
            const clone = this._cloneElement(el);
            parentNode.appendChild(clone.el);
        } else {
            // Se for um Node simples, apenas adiciona
            parentNode.appendChild(el);
        }
    }

    render() {
        this.children.forEach(child => {
            const parentNode = this.parent.el ? this.parent.el : this.parent;

            if (!child.el.parentNode) {
                const clone = this._cloneElement(child);
                parentNode.appendChild(clone.el);
            }
        });
        return this;
    }
}
