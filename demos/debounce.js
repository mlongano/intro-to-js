// Debounce function to prevent multiple calls to a function.
// Accept: the function to be debounced, the wait time and a boolean to execute the function immediately.
// If the boolean is true, the function will be executed immediately and the next call will be debounced.
// If the function is called again within the wait time, the timer will be reset and the function will be called again
// with the timer set to initial value.
// The context of the function will be the same as the context of the original function
// preserved using the closure on context=this and the apply method
//
function debounce(func, wait, immediate) {
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

// Usage examples:
// const debouncedFunction = debounce(function() {
//   console.log('Function called');
// }, 1000, true); // true for immediate execution

const log = debounce(
  function (message) {
    console.log(message);
  },
  1000,
  true,
);

log("Hello");
setTimeout(() => log("World"), 1001);
setTimeout(() => log("Hello 1"), 1001);
setTimeout(() => log("World 1"), 1001);
setTimeout(() => log("Hello 3"), 2002);
setTimeout(() => log("World 3"), 2002);
log("Hello 2");
log("World 2");
