const { Tree, prettyPrint } = require("./balancedBST");

function randomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const array = randomArray(15, 100);
const tree = new Tree(array);

console.log("Initial tree:");
prettyPrint(tree.root);

console.log(`\nIs the tree balanced? ${tree.isBalanced()}`);

console.log("\nLevel order:", tree.levelOrder());
console.log("In-order:", tree.inOrder());
console.log("Pre-order:", tree.preOrder());
console.log("Post-order:", tree.postOrder());

randomArray(5, 100).forEach((value) => tree.insert(value + 100));

console.log("\nUnbalanced tree:");
prettyPrint(tree.root);

console.log(`\nIs the tree balanced? ${tree.isBalanced()}`);

tree.rebalance();

console.log("\nRebalanced tree:");
prettyPrint(tree.root);

console.log(`\nIs the tree balanced? ${tree.isBalanced()}`);

console.log("\nLevel order:", tree.levelOrder());
console.log("In-order:", tree.inOrder());
console.log("Pre-order:", tree.preOrder());
console.log("Post-order:", tree.postOrder());
