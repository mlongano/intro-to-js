// Debounce function to prevent multiple calls to a function.
// Accept: the function to be debounced, the wait time and a boolean to execute the function immediately.
// If the boolean is true, the function will be executed immediately and the next call will be debounced.
// If the function is called again within the wait time, the timer will be reset and the function will be called again
// with the timer set to initial value.
// The context of the function will be the same as the context of the original function
// preserved using the closure on context=this and the apply method
//
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    // If there's an existing timeout, clear it and log this event.
    if (timer !== null) {
      console.log("Clearing existing timer");
      clearTimeout(timer);
    }

    // Determine if the function should be called immediately.
    const callNow = immediate && timer === null;
    console.log(
      `Debounced function invoked with args: ${JSON.stringify(
        args
      )}, context: ${context}, immediate: ${immediate}, callNow: ${callNow}.`
    );
    console.log(`Setting timer for ${delay}ms`);

    // Set a new timer that will execute after the delay.
    timer = setTimeout(() => {
      console.log("Timeout expired; running delayed callback.");
      timer = null;
      if (!immediate) {
        console.log("Immediate is false; executing function after delay with args:", args);
        func.apply(context, args);
      }
    }, delay);

    // If immediate mode and there's no active timer, execute the function immediately.
    if (callNow) {
      console.log("Immediate is true and no active timer; executing function immediately with args:", args);
      func.apply(context, args);
    }
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
