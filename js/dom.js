/* for (const key in document) {
  console.log(key);
} */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

console.log($$("*"));
console.log($$("li"));

const root = $("#root");

const lista = $("ul");

const li = document.createElement("li");
li.textContent = "Tre";
lista.appendChild(li);

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

const render = (dom, container) => {
  if (dom.type === "text") {
    container.appendChild(document.createTextNode(dom.value));
  } else {
    const el = document.createElement(dom.type);
    dom.children.forEach((child) => render(child, el));
    container.appendChild(el);
  }
};

render(myDom, root);

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
