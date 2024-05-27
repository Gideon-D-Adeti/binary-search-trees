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

Tree.prototype.levelOrder = function (callback) {
  const result = [];
  if (this.root === null) return result;

  const queue = [this.root];
  while (queue.length > 0) {
    const current = queue.shift();
    if (callback) {
      callback(current);
    } else {
      result.push(current.data);
    }
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return result;
};

Tree.prototype.inOrder = function (callback) {
  const result = [];
  const _inOrder = (node, callback, result) => {
    if (node) {
      _inOrder(node.left, callback, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      _inOrder(node.right, callback, result);
    }
  };
  _inOrder(this.root, callback, result);
  return result;
};

Tree.prototype.preOrder = function (callback) {
  const result = [];
  const _preOrder = (node, callback, result) => {
    if (node) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      _preOrder(node.left, callback, result);
      _preOrder(node.right, callback, result);
    }
  };
  _preOrder(this.root, callback, result);
  return result;
};

Tree.prototype.postOrder = function (callback) {
  const result = [];
  const _postOrder = (node, callback, result) => {
    if (node) {
      _postOrder(node.left, callback, result);
      _postOrder(node.right, callback, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }
  };
  _postOrder(this.root, callback, result);
  return result;
};

Tree.prototype.height = function (node) {
  if (node === null) return -1;
  return Math.max(this.height(node.left), this.height(node.right)) + 1;
};

Tree.prototype.depth = function (node) {
  const _depth = (root, node, depth) => {
    if (root === null) return 0;
    if (root === node) return depth;

    if (node.data < root.data) {
      return _depth(root.left, node, depth + 1);
    }

    return _depth(root.right, node, depth + 1);
  };

  return _depth(this.root, node, 0);
};

Tree.prototype.isBalanced = function () {
  const _isBalanced = (node) => {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return _isBalanced(node.left) && _isBalanced(node.right);
  };

  return _isBalanced(this.root);
};

Tree.prototype.rebalance = function () {
  const nodes = this.inOrder();
  this.root = this.buildTree(nodes);
};
