// Store file contents for later execution
const fileContents = {};

// Array to store filter regexps
let filterRegexps = [];

// Array to store all console messages for refiltering
let consoleMessages = [];

// Redirect console output to our output div
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
};

const outputDiv = document.getElementById("output");

// Function to check if a message should be filtered out
function shouldFilterMessage(message) {
  if (filterRegexps.length === 0) return false;

  const messageStr =
    typeof message === "object" ? JSON.stringify(message) : String(message);
  return filterRegexps.some((regex) => regex.test(messageStr));
}

// Function to reapply filters to all stored messages
function reapplyFilters() {
  outputDiv.innerHTML = ""; // Clear output

  // Reapply each message with current filters
  consoleMessages.forEach((msg) => {
    if (!shouldFilterMessage(msg.text)) {
      outputDiv.innerHTML += `<div style="color: ${msg.color}">${msg.text}</div>`;
    }
  });
}

// Override console methods with filtering
console.log = function (...args) {
  originalConsole.log(...args);
  const message = args.join(" ");
  // Store message
  consoleMessages.push({ text: message, color: "inherit" });
  if (!shouldFilterMessage(message)) {
    outputDiv.innerHTML += `<div>${message}</div>`;
  }
};

console.error = function (...args) {
  originalConsole.error(...args);
  const message = args.join(" ");
  // Store message
  consoleMessages.push({ text: message, color: "red" });
  if (!shouldFilterMessage(message)) {
    outputDiv.innerHTML += `<div style="color: red">${message}</div>`;
  }
};

console.warn = function (...args) {
  originalConsole.warn(...args);
  const message = args.join(" ");
  // Store message
  consoleMessages.push({ text: message, color: "orange" });
  if (!shouldFilterMessage(message)) {
    outputDiv.innerHTML += `<div style="color: orange">${message}</div>`;
  }
};

console.info = function (...args) {
  originalConsole.info(...args);
  const message = args.join(" ");
  // Store message
  consoleMessages.push({ text: message, color: "blue" });
  if (!shouldFilterMessage(message)) {
    outputDiv.innerHTML += `<div style="color: blue">${message}</div>`;
  }
};

// Handle directory selection
document
  .getElementById("directory-input")
  .addEventListener("change", function (event) {
    const files = event.target.files;
    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "";

    // Filter for JavaScript files
    Array.from(files)
      .filter((file) => file.name.endsWith(".js"))
      .forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target.result;
          fileContents[file.name] = content;

          // Extract first comment (if any)
          let description = "No description available";
          const commentMatch = content.match(/\/\/\s*(.*)/);
          if (commentMatch && commentMatch[1]) {
            description = commentMatch[1].trim();
          }

          // Create list item
          const listItem = document.createElement("li");
          listItem.className = "js-file  pointer ";
          listItem.innerHTML = `
                        <div class="file-name">${file.name}</div>
                        <div class="file-description">${description}</div>
                    `;

          // Add click handler
          listItem.addEventListener("click", function () {
            loadAndExecuteScript(file.name);
          });

          fileList.appendChild(listItem);
        };

        reader.readAsText(file);
      });
  });

// Function to load and execute a script
function loadAndExecuteScript(fileName) {
  const content = fileContents[fileName];
  document.getElementById("current-script").textContent = fileName;

  // Clear previous output and stored messages
  consoleMessages = []; // Reset stored messages
  outputDiv.innerHTML = ""; // Clear previous output

  try {
    // Create a new Function from the content and execute it
    const scriptFunction = new Function(content);
    scriptFunction();
  } catch (error) {
    console.error(`Error executing ${fileName}:`, error.message);
  }
}

// Filter management
const filtersListDiv = document.getElementById("filters-list");
const addFilterBtn = document.getElementById("add-filter-btn");

// Function to add a new filter input
function addFilterInput(value = "") {
  const filterItem = document.createElement("div");
  filterItem.className = "filter-item";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter regex pattern to filter";
  input.value = value;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    filterItem.remove();
    updateFilters();
  });

  filterItem.appendChild(input);
  filterItem.appendChild(removeBtn);
  filtersListDiv.appendChild(filterItem);

  updateFilters();
}

// Function to update the filter regexps array
function updateFilters() {
  filterRegexps = [];
  const filterInputs = filtersListDiv.querySelectorAll("input");

  filterInputs.forEach((input) => {
    const pattern = input.value.trim();
    if (pattern) {
      try {
        const regex = new RegExp(pattern);
        filterRegexps.push(regex);
      } catch (e) {
        // Invalid regex, ignore
        console.warn(`Invalid regex pattern: ${pattern} - ${e.message}`);
      }
    }
  });

  // Always reapply filters to existing messages, even when filters are empty
  reapplyFilters();
}

// Add filter button event listener
addFilterBtn.addEventListener("click", function () {
  addFilterInput();
});

// Add event listener to the filters-list div to handle input events
filtersListDiv.addEventListener(
  "input",
  debounce(function (event) {
    if (event.target.tagName === "INPUT") {
      updateFilters();
    }
  }, 500),
);

// Add one empty filter input by default
setTimeout(addFilterInput, 100);

// LIBRARY
//
// Debounce function to prevent multiple calls to a function.
// Accept: the function to be debounced, the wait time and a boolean to execute the function immediately.
// If the boolean is true, the function will be executed immediately and the next call will be debounced.
// If the function is called again within the wait time, the timer will be reset and the function will be called again
// with the timer set to initial value.
// The context of the function will be the same as the context of the original function
// preserved using the closure on context=this and the apply method
//
function debounce(func, wait, immediate = false) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
