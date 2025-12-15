export function watch(element, state, render) {

    const el = element.el;

    const proxy = new Proxy(state, {
        set(target, prop, value) {
            target[prop] = value;

            if (el.isConnected) {
                element.el.textContent = render(proxy);
            }

            return true;
        }
    });

    element.el.textContent = render(proxy);

    const observer = new MutationObserver(() => {
        if (!el.isConnected) {
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return proxy;
}
