import { max } from "./AVL";
import { simpleSort, key_get, key_set, key_remove } from "./Sorted";
import { hash, tag_hash } from "./hash";
import { join_lines, identity } from "./util";
import { toJSON_array, fromJSON_array, tag_toJSON, fromJSON_registry } from "./toJSON";
import { toJS_array, tag_toJS } from "./toJS";
import { nil } from "./nil";
import { ImmutableBase } from "./Base";

function SetNode(left, right, hash, key) {
  this.left  = left;
  this.right = right;
  this.hash  = hash;
  this.key   = key;
  this.depth = max(left.depth, right.depth) + 1;
}

SetNode.prototype.copy = function (left, right) {
  return new SetNode(left, right, this.hash, this.key);
};

SetNode.prototype.modify = function (info) {
  var hash = info.hash;
  var key  = info.key;
  // We don't use equal, for increased speed
  if (this.hash === hash && this.key === key) {
    return this;
  } else {
    return new SetNode(this.left, this.right, hash, key);
  }
};

SetNode.prototype.forEach = function (f) {
  this.left.forEach(f);
  f(this.key);
  this.right.forEach(f);
};


export function ImmutableSet(root, sort, hash_fn) {
  this.root = root;
  this.sort = sort;
  this.hash_fn = hash_fn;
  this.hash = null;
}

ImmutableSet.prototype = Object.create(ImmutableBase);

fromJSON_registry["Set"] = function (x) {
  return Set(fromJSON_array(x));
};

ImmutableSet.prototype[tag_toJSON] = function (x) {
  if (isSet(x) && !isSortedSet(x)) {
    return toJSON_array("Set", x);
  } else {
    throw new Error("Cannot convert SortedSet to JSON");
  }
};

ImmutableSet.prototype[tag_hash] = function (x) {
  if (x.hash === null) {
    var a = [];

    x.forEach(function (value) {
      a.push(hash(value));
    });

    var spaces = "  ";

    if (isSet(x) && !isSortedSet(x)) {
      x.hash = "(Set" + join_lines(a, spaces) + ")";
    } else {
      x.hash = "(SortedSet " + hash(x.sort) + join_lines(a, spaces) + ")";
    }
  }

  return x.hash;
};

ImmutableSet.prototype[tag_toJS] = toJS_array;

// TODO code duplication with ImmutableDict
// TODO Symbol.iterator
ImmutableSet.prototype.forEach = function (f) {
  this.root.forEach(f);
};

// TODO code duplication with ImmutableDict
ImmutableSet.prototype.isEmpty = function () {
  return this.root === nil;
};

// TODO code duplication with ImmutableDict
// TODO what if `sort` suspends ?
ImmutableSet.prototype.has = function (key) {
  return key_get(this.root, this.sort, this.hash_fn(key)) !== nil;
};

// TODO what if `sort` suspends ?
ImmutableSet.prototype.add = function (key) {
  var root = this.root;
  var sort = this.sort;
  var hash_fn = this.hash_fn;
  var hash = hash_fn(key);
  var node = key_set(root, sort, hash, new SetNode(nil, nil, hash, key));
  if (node === root) {
    return this;
  } else {
    return new ImmutableSet(node, sort, hash_fn);
  }
};

// TODO what if `sort` suspends ?
ImmutableSet.prototype.remove = function (key) {
  var root = this.root;
  var sort = this.sort;
  var hash_fn = this.hash_fn;
  var node = key_remove(root, sort, hash_fn(key));
  if (node === root) {
    return this;
  } else {
    return new ImmutableSet(node, sort, hash_fn);
  }
};

ImmutableSet.prototype.union = function (other) {
  var self = this;

  // TODO iterator
  other.forEach(function (value) {
    self = self.add(value);
  });

  return self;
};

ImmutableSet.prototype.intersect = function (other) {
  var self = this;

  if (self.isEmpty()) {
    return self;

  } else {
    var out = new ImmutableSet(nil, self.sort, self.hash_fn);

    // TODO iterator
    other.forEach(function (value) {
      if (self.has(value)) {
        out = out.add(value);
      }
    });

    return out;
  }
};

ImmutableSet.prototype.disjoint = function (other) {
  var self = this;

  // TODO iterator
  other.forEach(function (value) {
    if (self.has(value)) {
      self = self.remove(value);
    } else {
      self = self.add(value);
    }
  });

  return self;
};

// TODO what about the empty set ?
ImmutableSet.prototype.subtract = function (other) {
  var self = this;

  if (!self.isEmpty()) {
    // TODO iterator
    other.forEach(function (value) {
      self = self.remove(value);
    });
  }

  return self;
};


export function isSet(x) {
  return x instanceof ImmutableSet;
}

export function isSortedSet(x) {
  return isSet(x) && x.hash_fn === identity;
}

export function SortedSet(sort, array) {
  if (array != null) {
    // We don't use equal, for increased speed
    if (isSortedSet(array) && array.sort === sort) {
      return array;
    } else {
      return new ImmutableSet(nil, sort, identity).union(array);
    }
  } else {
    return new ImmutableSet(nil, sort, identity);
  }
}

export function Set(array) {
  if (array != null) {
    if (isSet(array) && !isSortedSet(array)) {
      return array;
    } else {
      return new ImmutableSet(nil, simpleSort, hash).union(array);
    }
  } else {
    return new ImmutableSet(nil, simpleSort, hash);
  }
}
