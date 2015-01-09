import { isTag, isUUIDTag/*, isSymbol, Symbol_keyFor, Symbol_for*/ } from "./Tag";
import { isObject, destructure_pair } from "./util";
import { each } from "./iter";
import { tag_toJSON, tag_toJSON_type, fromJSON_registry } from "./static";

/*fromJSON_registry["Symbol.for"] = function (x) {
  if (Symbol_for !== null) {
    return Symbol_for(x.value);
  } else {
    throw new Error("Cannot convert Symbol from JSON: Symbol.for is not defined");
  }
};*/

export function fromJSON(x) {
  if (isObject(x)) {
    var type = x[tag_toJSON_type];
    if (type != null) {
      var register = fromJSON_registry[type];
      if (register != null) {
        return register(x);
      } else {
        throw new Error("Cannot handle type " + type);
      }
    } else {
      return x;
    }
  } else if (isTag(x)) {
    if (isUUIDTag(x)) {
      return x;
    } else {
      throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
    }
  } else {
    return x;
  }
}

export function toJSON(x) {
  if (isObject(x)) {
    var fn = x[tag_toJSON];
    if (fn != null) {
      return fn(x);
    } else {
      return x;
    }
  } else if (isTag(x)) {
    if (isUUIDTag(x)) {
      return x;
    } else {
      throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
    }
  /*} else if (isSymbol(x)) {
    var key;
    if (Symbol_keyFor !== null && (key = Symbol_keyFor(x)) != null) {
      var o = {};
      o[tag_toJSON_type] = "Symbol.for";
      o.key = key;
      return o;
    } else {
      throw new Error("Cannot convert Symbol to JSON, use Symbol.for or UUIDTag instead");
    }*/
  } else {
    return x;
  }
}

export function toJSON_object(type, x) {
  var o = {};

  o[tag_toJSON_type] = type;

  o.keys   = [];
  o.values = [];

  each(x, function (_array) {
    destructure_pair(_array, function (key, value) {
      o.keys.push(toJSON(key));
      o.values.push(toJSON(value));
    });
  });

  return o;
}

export function toJSON_array(type, x) {
  var o = {};

  o[tag_toJSON_type] = type;

  o.values = [];

  each(x, function (value) {
    o.values.push(toJSON(value));
  });

  return o;
}

export function fromJSON_object(x) {
  var keys   = x.keys;
  var values = x.values;

  var l = keys.length;
  var out = new Array(l);

  for (var i = 0; i < l; ++i) {
    out[i] = [fromJSON(keys[i]), fromJSON(values[i])];
  }

  return out;
}

export function fromJSON_array(x) {
  var values = x.values;

  var l = values.length;
  var out = new Array(l);

  for (var i = 0; i < l; ++i) {
    out[i] = fromJSON(values[i]);
  }

  return out;
}
