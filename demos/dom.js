// Crea un sottoalbero DOM in modo imperativo e dichiarativo
/* for (const key in document) {
  console.log(key);
} */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//console.log(JSON.stringify($$("*"), null, 2)); //console.log($$("*"));
//console.log(JSON.stringify(document, null, 2)); / / console.log($$("li"));

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

// root.appendChild(div);

// Crea un sottoalbero DOM in modo dichiarativo
let markup = {
  type: "div",
  children: [
    {
      type: "h1",
      attributes: [
        { name: "id", value: "title" },
        { name: "class", value: "text-3xl font-bold mb-4" },
      ],
      children: [
        { type: "span", children: [{ type: "text", value: "Hello" }] },
        { type: "text", value: " World" },
      ],
    },
    { type: "p", children: [{ type: "text", value: "This is a paragraph" }] },
  ],
};

// Funzione di libreria che fa il render di un sottoalbero DOM (ricorsiva)
// mi permette di costruire un sottoalbero DOM in modo dichiarativonewDOMNode.setAttribute(attr.name, attr.value);      subtree.attributes.forEach((attr) => {    if (Array.isArray(subtree.attributes && subtree.type !== "text"))
//  subtree.attributes.forEach((attr) => {    if (Array.isArray(subtree.attributes && subtree.type !== "text"))
const render = (subtree, container) => {
  console.log("Rendering subtree: ", subtree.type);
  const newDOMNode =
    subtree.type === "text"
      ? document.createTextNode(subtree.value)
      : document.createElement(subtree.type);

  // Se ci sono attributi vengono aggiunti al nuovo elemento DOM.
  if (Array.isArray(subtree.attributes) && subtree.type !== "text") {
    subtree.attributes.forEach((attr) => {
      console.log("Adding attribute: ", attr.name, "=", attr.value);
      newDOMNode.setAttribute(attr.name, attr.value);
    });
  }

  if (Array.isArray(subtree.children)) {
    subtree.children.forEach((child) => render(child, newDOMNode));
  }
  // console.log(container.type);
  container.appendChild(newDOMNode);
};

// uso la funzione di libreria per costruire il mio sottoalbero DOM
// "dichiarato" precedentemente
render(markup, root);
// Demo sul corso Understanding React (Tony Alicea)
markup = {
  type: "article",
  children: [
    {
      type: "h2",
      children: [{ type: "text", value: "Counter" }],
    },
    {
      type: "p",
      children: [
        { type: "text", value: "Counter " },
        {
          type: "strong",
          children: [{ type: "em", children: [{ type: "text", value: "1" }] }],
        },
        {
          type: "text",
          value: " times",
        },
      ],
    },
    {
      type: "button",
      children: [{ type: "text", value: "Click me" }],
    },
  ],
};

function addElement(subtree, parentDOMNode) {
  let newDOMNode =
    subtree.type === "text"
      ? document.createTextNode(subtree.value)
      : document.createElement(subtree.type);
  if (Array.isArray(subtree.children)) {
    subtree.children.forEach((child) => addElement(child, newDOMNode));
  }
  console.log(parentDOMNode);
  parentDOMNode.appendChild(newDOMNode);
}
//addElement(markup, root);

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
