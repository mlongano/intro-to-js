// Include all include tags.
// This is used to laod the header and footer dynamically.
// It fetches the content of the file specified in the src attribute
// and inserts it into the DOM.
// This function returns a promise that resolves when all includes are loaded
// and the DOM relative to the includes is loaded and ready.
function includeHTML() {
  const includes = document.getElementsByTagName("include");
  const promises = [];

  for (let i = 0; i < includes.length; i++) {
    const element = includes[i];
    const file = element.getAttribute("src");

    const promise = fetch(file)
      .then((response) => response.text())
      .then((data) => {
        element.insertAdjacentHTML("afterend", data);
        element.remove();
      });

    promises.push(promise);
  }

  // Return a promise that resolves when all includes are loaded
  return Promise.all(promises);
}

// Load header and footer on page load
document.addEventListener("DOMContentLoaded", () => {
  includeHTML().then(() => {
    // Header and footer are loaded, you can perform additional actions here
    console.log("includes loaded");
  });
});
