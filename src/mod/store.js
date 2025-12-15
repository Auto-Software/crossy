












export function store(initial = {}) {
    let state = initial;
    const subs = new Set();

    const proxy = new Proxy(state, {
        set(target, key, value) {
            target[key] = value;
            subs.forEach(fn => fn(proxy));
            return true;
        }
    });

    return {
        state: proxy,
        watch(fn) {
            subs.add(fn);
            fn(proxy); // inicial
            return () => subs.delete(fn);
        }
    };
}
