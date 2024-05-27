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

Tree.prototype.deleteItem = function (value) {
  const _delete = (node, value) => {
    if (node === null) return node; // Base case: the node is not found

    if (value < node.data) {
      node.left = _delete(node.left, value); // Recur to the left subtree
    } else if (value > node.data) {
      node.right = _delete(node.right, value); // Recur to the right subtree
    } else {
      // Node to be deleted is found
      if (node.left === null) return node.right; // Node with only right child or no child
      if (node.right === null) return node.left; // Node with only left child

      // Node with two children: get the in-order successor (smallest in the right subtree)
      const temp = this._minValueNode(node.right);
      node.data = temp.data; // Copy the in-order successor's value to this node
      node.right = _delete(node.right, temp.data); // Delete the in-order successor
    }

    return node; // Return the (possibly) new root pointer
  };

  this.root = _delete(this.root, value); // Start at the root
};

Tree.prototype._minValueNode = function (node) {
  let current = node;
  while (current.left !== null) {
    current = current.left; // Keep going to the left to find the smallest node
  }
  return current;
};

Tree.prototype.find = function (value) {
  const _find = (node, value) => {
    if (node === null || node.data === value) return node;

    if (value < node.data) return _find(node.left, value);

    return _find(node.right, value);
  };

  return _find(this.root, value);
};
