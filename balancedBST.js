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

  insert(value) {
    const _insert = (node, value) => {
      if (node === null) return new Node(value);

      if (value < node.data) {
        node.left = _insert(node.left, value);
      } else if (value > node.data) {
        node.right = _insert(node.right, value);
      }

      return node;
    };

    this.root = _insert(this.root, value);
  }

  deleteItem(value) {
    const _delete = (node, value) => {
      if (node === null) return node;

      if (value < node.data) {
        node.left = _delete(node.left, value);
      } else if (value > node.data) {
        node.right = _delete(node.right, value);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const temp = this._minValueNode(node.right);
        node.data = temp.data;
        node.right = _delete(node.right, temp.data);
      }

      return node;
    };

    this.root = _delete(this.root, value);
  }

  _minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value) {
    const _find = (node, value) => {
      if (node === null || node.data === value) return node;

      if (value < node.data) return _find(node.left, value);

      return _find(node.right, value);
    };

    return _find(this.root, value);
  }

  levelOrder(callback) {
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
  }

  inOrder(callback) {
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
  }

  preOrder(callback) {
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
  }

  postOrder(callback) {
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
  }

  height(node) {
    if (node === null) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    const _depth = (root, node, depth) => {
      if (root === null) return 0;
      if (root === node) return depth;

      if (node.data < root.data) {
        return _depth(root.left, node, depth + 1);
      }

      return _depth(root.right, node, depth + 1);
    };

    return _depth(this.root, node, 0);
  }

  isBalanced() {
    const _isBalanced = (node) => {
      if (node === null) return true;

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) return false;

      return _isBalanced(node.left) && _isBalanced(node.right);
    };

    return _isBalanced(this.root);
  }

  rebalance() {
    const nodes = this.inOrder();
    this.root = this.buildTree(nodes);
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) return;

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

// Export the classes and function
export default { Node, Tree, prettyPrint };
