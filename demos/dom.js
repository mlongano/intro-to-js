// Crea un sottoalbero DOM in modo imperativo e dichiarativo
/* for (const key in document) {
  console.log(key);
} */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

console.log(JSON.stringify($$("*"), null, 2)); //console.log($$("*"));
/console.log(JSON.stringify(document, null, 2)); / / console.log($$("li"));

const root = $("#root");

// Crea un sottoalbero DOM in modo imperativo
const div = document.createElement("div");
const h1 = document.createElement("h1");
const span = document.createElement("span");
span.textContent = "Hello";
const world = document.createTextNode(" World");
h1.appendChild(span);
h1.appendChild(world);
const p = document.createElement("p");
p.textContent = "This is a paragraph";
div.appendChild(h1);
div.appendChild(p);

root.appendChild(div);

// Crea un sottoalbero DOM in modo dichiarativo
const myDom = {
  type: "div",
  children: [
    {
      type: "h1",
      children: [
        { type: "span", children: [{ type: "text", value: "Hello" }] },
        { type: "text", value: " World" },
      ],
    },
    { type: "p", children: [{ type: "text", value: "This is a paragraph" }] },
  ],
};

// Funzione di libreria che fa il render di un sottoalbero DOM (ricorsiva)
// mi permette di costruire un sottoalbero DOM in modo dichiarativo
const render = (dom, container) => {
  if (dom.type === "text") {
    container.appendChild(document.createTextNode(dom.value));
  } else {
    const el = document.createElement(dom.type);
    dom.children.forEach((child) => render(child, el));
    container.appendChild(el);
  }
};

// uso la funzione di libreria per costruire il mio sottoalbero DOM
// "dichiarato" precedentemente
render(myDom, root);

// OTHER STUFF DON'T BOTHER

/* const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.innerHTML = `
  <style>
    h1 {
      color: red;
    }
  </style>
  <h1>Shadow DOM</h1>
`;

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        p { color: blue; }
      </style>
      <p>Shadow DOM Component</p>
    `;
  }
}

customElements.define("my-element", MyElement);

root.appendChild(new MyElement()); */
