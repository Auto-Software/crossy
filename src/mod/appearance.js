








export function appearance(element, styles = {}) {
    for (const [key, value] of Object.entries(styles)) {
        element.el.style[key] = value; 
    }
    return element; 
}
