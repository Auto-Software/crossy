
import { element, button, text, template, router } from "../src/core/crossy.js";
import { appearance } from "../src/mod/appearance.js";
import { watch } from "../src/mod/watch.js";
import { event } from "../src/mod/event.js";
import { store } from "../src/mod/store.js";

const div1 = element("div");
const div2 = element("section");

const t1 = text("Olá, fofinho!");
const t2 = text("Hello!");

const b1 = button("Enviar");
const b2 = button("Cancelar");

t1.render();
t2.render();
b1.render();
b2.render();

setTimeout(() => {
    b1.unrender();
}, 2000);

// STYLE

appearance(t1,{
    color : "red",
    fontSize : "40px"
})

div2.render();

appearance(div2,{
    width: "300px",
    height: "400px",
    border: "1px solid red",
})

// TEMPLATE : 

const mybutton = button("TESTE DE BOTÃO");

const card2 = template(div2)
card2.add(t1,b2,mybutton)
card2.render();

const cardr2 = template(div2)
cardr2.add(t1,b2,mybutton)
cardr2.render();

// WATCH ( REACTIVE ): 

const nameLabel = text("gggggggggggggg");

let state = {
    name: "Clara",
    color: "Azul"
};

state = watch(nameLabel, state, (s) => `Ola eu sou a Clara ${s.name} gosto da cor ${s.color}`);

nameLabel.render();

let num = 1;
const add = button("Adicionar");

add.render();


event(add, "click", () => {
    num++;
    state.color = num;
});

template(div2).add(add)

// STORE : 


const app = store({
    name: "Clara",
    color: "Azul"
});

const label = text("");
label.render();

app.watch(s => {
    label.el.textContent = `Oi ${s.name} - ${s.color}`;
});

const btn = button("Mudar");
btn.render();

event(btn, "click", () => {
    app.state.color = "Vermelho";
});

// ROUTER

const download = router("/download")
    .append(
        text("Baixar app"),
        button("Download")
    );

event(button("Ir"), "click", () => {
    download.navigate("/download");
});


