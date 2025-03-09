// Debounce function to prevent multiple calls to a function.
// Accept: the function to be debounced, the wait time and a boolean to execute the function immediately.
// If the boolean is true, the function will be executed immediately and the next call will be debounced.
// If the function is called again within the wait time, the timer will be reset and the function will be called again
// with the timer set to initial value.
// The context of the function will be the same as the context of the original function
// preserved using the closure on context=this and the apply method
//
/* eslint-disable no-unused-vars */
function debounceOLD(func, wait, immediate) {
  let timeout; // Crea una closure su timeout
  return function () {
    var context = this, // Cattura il contesto corrente (this)
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// More modern simplified version
function debounce(func, delay, immediate = false) {
  let timer = null; // Crea una closure su timeout
  // Funzione ritornata da usare al posto della funzione originale
  return function (...args) {
    const context = this; // Cattura il contesto al momento della chiamata (this) per usarlo per la funzione originle
    if (timer !== null) {
      console.log(`Clearing existing timer  args: ${JSON.stringify(args)}`);
      clearTimeout(timer); // Se il timer esiste vuol dire che la funzione è stata richiamata prima che il delay fosse scaduto
    }
    const callNow = immediate && !timer; // Nel caso voglia chiamare subito la funzione originale determino se non sia già stato chiamata
    console.log(
      `Debounced function invoked with args: ${JSON.stringify(
        args,
      )}, context: ${JSON.stringify(context)}, immediate: ${immediate}, callNow: ${callNow} timer: ${timer}.`,
    );
    console.log(`Setting timer for ${delay}ms`);
    timer = setTimeout(() => {
      console.log("Timeout expired; running delayed callback.");
      timer = null;
      // Nel caso non sia immedite allo scadere del delay eseguo la funzione originale
      // Il context viene catturato dalla closure al momento della chiamata ed è quello che avrebbe avuto la funzione originale
      if (!immediate) {
        console.log(
          "Immediate is false; executing function after delay with args:",
          args,
        );
        func.apply(context, args);
      }
    }, delay); // Imposto faccio partire il timer che eseguirà la funzione originale dopo il delay nel caso immediate sia false
    if (callNow) {
      console.log(
        "Immediate is true and no active timer; executing function immediately with args:",
        args,
      );
      func.apply(context, args); // Se voglio chiamare subito la funzione originale la eseguo (il timer adesso esiste)
    }
  };
}

function myDebounce(funcToBeCalled, delay) {
  // Creo la closure per il timer
  let timer = null;
  // creo e ritorno la funzione che verrà usata al posto dell'originale (che e' funcToBeCalled)
  return function (...args) {
    // catturo il contesto di chiamata per poterlo usare nella funzione originale quando sarà chimata
    const context = this;
    // Controllo che non ci sia un'altra chiamata in attesa e nel caso la cancello
    if (timer !== null) {
      clearTimeout(timer);
    }
    // creo un nuovo timer per chiamare la funzione originale dopo il delay
    timer = setTimeout(() => {
      // alla scadenza del timer chiamo (eseguo) la funzione originale
      // usando il contesto ed i parametri catturati alla chiamata della funzione proxy
      funcToBeCalled.apply(context, args);
    }, delay);
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
