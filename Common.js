// http://arclanguage.org/item?id=14181
// http://arclanguage.org/item?id=18936

// Faster than using Math.max
function max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}


var nil        = {};
nil.depth      = 0;
nil.size       = 0;
nil.forEach    = function (f) {};
nil.forEachRev = function (f) {};


function balanced_node(node, left, right) {
  var l_depth = left.depth;
  var r_depth = right.depth;

  // Left side is deeper
  if (l_depth > r_depth + 1) {
    var lleft  = left.left;
    var lright = left.right;

    // Right side is deeper
    if (lright.depth > lleft.depth) {
      // Left rotate -> Right rotate
      return lright.copy(left.copy(lleft, lright.left),
                         node.copy(lright.right, right));

    // Left side is deeper
    } else {
      // Right rotate
      return left.copy(lleft, node.copy(lright, right));
    }

  // Right side is deeper
  } else if (r_depth > l_depth + 1) {
    var rright = right.right;
    var rleft  = right.left;

    // Left side is deeper
    if (rleft.depth > rright.depth) {
      // Right rotate -> Left rotate
      return rleft.copy(node.copy(left, rleft.left),
                        right.copy(rleft.right, rright));


    // Right side is deeper
    } else {
      // Left rotate
      return right.copy(node.copy(left, rleft), rright);
    }

  // No balancing needed
  } else {
    return node.copy(left, right);
  }
}

function concat(x, y) {
  if (x === nil) {
    return y;

  } else if (y === nil) {
    return x;

  // TODO what if the depths are the same?
  } else if (x.depth < y.depth) {
    var left = concat(x, y.left);
    //@assert.isNot(left, y.left); // TODO get rid of this?
    return balanced_node(y, left, y.right);

  } else {
    var right = concat(x.right, y);
    //@assert.isNot(right, x.right); // TODO get rid of this?
    return balanced_node(x, x.left, right);
  }
}

function insert_min(node, new_node) {
  if (node === nil) {
    return new_node;
  } else {
    // TODO do we need to use balanced_node ?
    return balanced_node(node, insert_min(node.left, new_node), node.right);
  }
}

function insert_max(node, new_node) {
  if (node === nil) {
    return new_node;
  } else {
    // TODO do we need to use balanced_node ?
    return balanced_node(node, node.left, insert_max(node.right, new_node));
  }
}


/**
 * Converts a List into a JavaScript array.
 */
function toJS(x) {
  if (x instanceof ImmutableList) {
    return x.toJS();
  } else {
    return x;
  }
}

exports.toJS = toJS;
