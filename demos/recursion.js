// Basic recursion example
// Recursion is a common way to traverse a tree structure or other recursive data structures 😁
//

function countDown(num) {
  console.log(num);

  if (num == 0) {
    console.log("All done!");
    return;
  }
  num = num - 1;
  countDown(num);
}

countDown(5);
