class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }
}

Tree.prototype.insert = function (value) {
  const _insert = (node, value) => {
    if (node === null) return new Node(value); // Base case: found an empty spot

    if (value < node.data) {
      node.left = _insert(node.left, value); // Recur to the left subtree
    } else if (value > node.data) {
      node.right = _insert(node.right, value); // Recur to the right subtree
    }

    return node; // Return the unchanged node pointer
  };

  this.root = _insert(this.root, value); // Start at the root
};
