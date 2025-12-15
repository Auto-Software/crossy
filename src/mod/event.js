








export function event(element, type, callback) {
    if (!element._events) {
        element._events = [];
    }

    element._events.push({ type, callback });
    element.el.addEventListener(type, callback);

    return element;
}
