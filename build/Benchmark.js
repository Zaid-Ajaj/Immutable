/**
 * @license
 *
 * Version 6.5.0
 *
 * (c) 2014, 2015 Oni Labs, http://onilabs.com
 *
 * This file is licensed under the terms of the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function() {
    "use strict";
    var $$Benchmark$util$$Benchmark = require("benchmark");

    var $$Benchmark$util$$suite = new $$Benchmark$util$$Benchmark.Suite({
      // TODO is this correct ?
      onComplete: function () {
        $$Benchmark$util$$display_messages($$Benchmark$util$$messages);
      },
      onCycle: function (event) {
        var s = "" + event.target;
        s = s.replace(/^(.+) x ([0-9,\.]+) ops\/sec ±\d+\.\d+% \(\d+ runs sampled\)$/g, function (_, text, num) {
          if (/\./.test(num)) {
            num = "" + Math.round(+num);
          }
          return $$Benchmark$util$$rpad(text, 49) + $$Benchmark$util$$lpad(" " + $$Benchmark$util$$lpad(num, 13) + " ops/sec", 21);
        });
        console.log(s);
      }
    });

    function $$Benchmark$util$$repeat(i, x) {
      return new Array(i + 1).join(x);
    }

    function $$Benchmark$util$$rpad(x, i) {
      return (x + $$Benchmark$util$$repeat(i, " ")).slice(0, i);
    }

    function $$Benchmark$util$$lpad(x, i) {
      return ($$Benchmark$util$$repeat(i, " ") + x).slice(-i);
    }


    var $$Benchmark$util$$indent = 0;
    var $$Benchmark$util$$timers = [];
    var $$Benchmark$util$$messages = [];

    function $$Benchmark$util$$display_messages(a) {
      a.forEach(function (x) {
        console.log(x);
      });
    }

    function $$Benchmark$util$$add_timers() {
      var max = 0;

      $$Benchmark$util$$timers.forEach(function (x) {
        max = Math.max(max, x.name.length);
      });

      $$Benchmark$util$$timers.forEach(function (x) {
        $$Benchmark$util$$suite.add($$Benchmark$util$$repeat($$Benchmark$util$$indent, " ") + $$Benchmark$util$$rpad(x.name, max), x.fn, {
          onStart: function () {
            $$Benchmark$util$$display_messages(x.messages);
          }
        });
      });
    }

    function $$Benchmark$util$$group(name, f) {
      $$Benchmark$util$$message($$Benchmark$util$$repeat(70 - $$Benchmark$util$$indent, "-"));
      $$Benchmark$util$$message(name + ":");

      var old_indent = $$Benchmark$util$$indent;
      var old_timers = $$Benchmark$util$$timers;

      $$Benchmark$util$$indent += 2;
      $$Benchmark$util$$timers = [];

      try {
        f();
      } finally {
        $$Benchmark$util$$add_timers();
        $$Benchmark$util$$indent = old_indent;
        $$Benchmark$util$$timers = old_timers;
      }
    }

    function $$Benchmark$util$$message(x) {
      if (arguments.length !== 1) {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }
      $$Benchmark$util$$messages.push($$Benchmark$util$$repeat($$Benchmark$util$$indent, " ") + x);
    }

    function $$Benchmark$util$$time(s, f) {
      // This is to make sure that the function doesn't
      // have any errors before benchmarking it
      f();

      var a = $$Benchmark$util$$messages;
      $$Benchmark$util$$messages = [];

      $$Benchmark$util$$timers.push({
        name: s,
        fn: f,
        messages: a
      });
    }

    function $$Benchmark$util$$run() {
      $$Benchmark$util$$add_timers();
      $$Benchmark$util$$suite.run();
    }
    var $$Tag$$tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
    var $$Tag$$tag_id = 0;

    var $$Tag$$uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    var $$Tag$$uuid_regexp = new RegExp("^" + $$Tag$$uuid + "$");

    var $$Tag$$is_tag_regexp = new RegExp("^\\(Tag " + $$Tag$$tag_uuid + " [0-9]+\\)$");

    var $$Tag$$is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + $$Tag$$uuid + "\\)$");

    var $$Tag$$Symbol_iterator = (typeof Symbol !== "undefined" && typeof Symbol.iterator !== "undefined"
                                   ? Symbol.iterator
                                   : null);

    var $$Tag$$Symbol_keyFor = (typeof Symbol !== "undefined" && typeof Symbol.keyFor !== "undefined"
                                 ? Symbol.keyFor
                                 : null);

    function $$Tag$$isUUID(x) {
      return typeof x === "string" && $$Tag$$uuid_regexp.test(x);
    }

    function $$Tag$$isTag(x) {
      return typeof x === "string" &&
             ($$Tag$$is_tag_regexp.test(x) ||
              $$Tag$$is_uuid_tag_regexp.test(x));
    }

    function $$Tag$$isUUIDTag(x) {
      return typeof x === "string" && $$Tag$$is_uuid_tag_regexp.test(x);
    }

    function $$Tag$$Tag() {
      var arg_len = arguments.length;
      if (arg_len === 0) {
        return "(Tag " + $$Tag$$tag_uuid + " " + (++$$Tag$$tag_id) + ")";
      } else {
        throw new Error("Expected 0 arguments but got " + arg_len);
      }
    }

    function $$Tag$$UUIDTag(id) {
      var arg_len = arguments.length;
      if (arg_len === 1) {
        if ($$Tag$$isUUID(id)) {
          return "(UUIDTag " + id + ")";
        } else {
          throw new Error("Expected a lower-case UUID, but got: " + id);
        }

      } else {
        throw new Error("Expected 1 argument but got " + arg_len);
      }
    }
    var $$$Immutable$static$$tag_hash        = $$Tag$$UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");
    var $$$Immutable$static$$tag_iter        = $$Tag$$UUIDTag("6199065c-b518-4cb3-8b41-ab70a9769ec3");
    var $$$Immutable$static$$tag_toJS        = $$Tag$$UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");
    var $$$Immutable$static$$tag_toJSON_type = $$Tag$$UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
    var $$$Immutable$static$$tag_toJSON      = $$Tag$$UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

    var $$$Immutable$static$$fromJSON_registry = {};

    var $$$Immutable$static$$nil = {};
    $$$Immutable$static$$nil.depth      = 0;
    $$$Immutable$static$$nil.size       = 0;
    function $$$Immutable$Cons$$Cons(car, cdr) {
      this.car = car;
      this.cdr = cdr;
    }

    function $$$Immutable$Cons$$iter_cons(x) {
      return {
        next: function () {
          if (x === $$$Immutable$static$$nil) {
            return { done: true };
          } else {
            var value = x.car;
            x = x.cdr;
            return { value: value };
          }
        }
      };
    }

    function $$$Immutable$Cons$$each_cons(x, f) {
      while (x !== $$$Immutable$static$$nil) {
        f(x.car);
        x = x.cdr;
      }
    }
    function $$$Immutable$Array$$copy(array) {
      var len = array.length;
      var out = new Array(len);

      for (var i = 0; i < len; ++i) {
        out[i] = array[i];
      }

      return out;
    }

    function $$$Immutable$Array$$insert(array, index, value) {
      var len = array.length + 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      out[i] = value;
      ++i;

      while (i < len) {
        out[i] = array[i - 1];
        ++i;
      }

      return out;
    }

    function $$$Immutable$Array$$modify(array, index, f) {
      var old_value = array[index];
      var new_value = f(old_value);

      if (old_value === new_value) {
        return array;

      } else {
        var new_array = $$$Immutable$Array$$copy(array);
        new_array[index] = new_value;
        return new_array;
      }
    }

    function $$$Immutable$Array$$remove(array, index) {
      var len = array.length - 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      while (i < len) {
        out[i] = array[i + 1];
        ++i;
      }

      return out;
    }
    function $$$Immutable$Ordered$$nth_has(index, len) {
      return index >= 0 && index < len;
    }

    function $$$Immutable$Ordered$$nth_has_end(index, len) {
      return index >= 0 && index <= len;
    }

    function $$$Immutable$Ordered$$ordered_has(index) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      return $$$Immutable$Ordered$$nth_has(index, len);
    }
    function $$Array$$array_get(array, i, def) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if ($$$Immutable$Ordered$$nth_has(i, len)) {
        return array[i];
      } else if (arguments.length === 3) {
        return def;
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_insert(array, i, value) {
      var len = array.length;

      if (i < 0) {
        i += (len + 1);
      }

      if ($$$Immutable$Ordered$$nth_has_end(i, len)) {
        return $$$Immutable$Array$$insert(array, i, value);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_modify(array, i, f) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if ($$$Immutable$Ordered$$nth_has(i, len)) {
        return $$$Immutable$Array$$modify(array, i, f);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_remove(array, i) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if ($$$Immutable$Ordered$$nth_has(i, len)) {
        return $$$Immutable$Array$$remove(array, i);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_slice(array, from, to) {
      var len = array.length;

      if (arguments.length < 2) {
        from = 0;
      }
      if (arguments.length < 3) {
        to = len;
      }

      if (from < 0) {
        from += len;
      }
      if (to < 0) {
        to += len;
      }

      if (from === 0 && to === len) {
        return array;

      } else if (from > to) {
        throw new Error("Index " + from + " is greater than index " + to);

      } else if ($$$Immutable$Ordered$$nth_has_end(from, len)) {
        if (from === to) {
          return [];

        } else if ($$$Immutable$Ordered$$nth_has_end(to, len)) {
          return array.slice(from, to);

        } else {
          throw new Error("Index " + to + " is not valid");
        }

      } else {
        throw new Error("Index " + from + " is not valid");
      }
    }

    function $$Array$$array_concat(array, other) {
      if (array.length === 0) {
        return other;
      } else if (other.length === 0) {
        return array;
      } else {
        return array.concat(other);
      }
    }
    var $$Benchmark$List$$immutablejs = require("immutable");
    var $$Benchmark$List$$mori        = require("mori");
    var $$Benchmark$List$$immutable   = require("./Immutable.min.js");

    function $$Benchmark$List$$cons_push(x, i) {
      return new $$$Immutable$Cons$$Cons(i, x);
    }


    function $$Benchmark$List$$list(counter) {
      $$Benchmark$util$$group("List with " + counter + " values", function () {
        $$Benchmark$util$$group("Inserting at the end", function () {
          $$Benchmark$util$$time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }
          });

          $$Benchmark$util$$time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }
          });

          $$Benchmark$util$$time("Immutable-js List", function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$util$$time("Immutable-js List Transient", function () {
            var a = $$Benchmark$List$$immutablejs.List();

            a.withMutations(function (a) {
              for (var i = 0; i < counter; ++i) {
                a.push(i);
              }
            });
          });

          $$Benchmark$util$$time("Mori Vector", function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }
          });

          $$Benchmark$util$$time("Mori Vector Transient", function () {
            var a = $$Benchmark$List$$mori.mutable.thaw($$Benchmark$List$$mori.vector());

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.mutable.conj.f2(a, i);
            }

            $$Benchmark$List$$mori.mutable.freeze(a);
          });

          /*time("Immutable List (insert)", function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }
          });*/

          $$Benchmark$util$$time("Immutable List", function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$util$$time("Immutable Queue", function () {
            var a = $$Benchmark$List$$immutable.Queue();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$util$$time("Immutable Stack", function () {
            var a = $$Benchmark$List$$immutable.Stack();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$util$$time("Cons", function () {
            var a = $$$Immutable$static$$nil;

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$cons_push(a, i);
            }
          });

          /*time("Elm Array", function () {
            elm.insert(counter);
          });

          time("Elm Array (initialize)", function () {
            elm.insertInit(counter);
          });*/
        });


        $$Benchmark$util$$group("Inserting at the start", function () {
          $$Benchmark$util$$time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.unshift(i);
            }
          });

          $$Benchmark$util$$time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, 0, i);
            }
          });

          $$Benchmark$util$$time("Immutable-js List", function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.unshift(i);
            }
          });

          $$Benchmark$util$$time("Immutable-js List Transient", function () {
            var a = $$Benchmark$List$$immutablejs.List();

            a.withMutations(function (a) {
              for (var i = 0; i < counter; ++i) {
                a.unshift(i);
              }
            });
          });

          $$Benchmark$util$$message("Mori Vector");
          $$Benchmark$util$$message("Mori Vector Transient");

          /*time("Mori List", function () {
            var a = mori.list();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj(a, i);
            }
          });*/

          $$Benchmark$util$$time("Immutable List", function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(0, i);
            }
          });

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Inserting at random", function () {
          $$Benchmark$util$$time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.length);
              a.splice(pivot, 0, i);
            }
          });

          $$Benchmark$util$$time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.length);
              a = $$Array$$array_insert(a, pivot, i);
            }
          });

          $$Benchmark$util$$time("Immutable-js List", function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.size);
              a = a.splice(pivot, 0, i);
            }
          });

          // splice can't be used inside withMutations
          // https://github.com/facebook/immutable-js/issues/196
          $$Benchmark$util$$message("Immutable-js List Transient");

          $$Benchmark$util$$message("Mori Vector");
          $$Benchmark$util$$message("Mori Vector Transient");

          $$Benchmark$util$$time("Immutable List", function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.size());
              a = a.insert(pivot, i);
            }
          });

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Retrieving at the end", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              a[a.length - 1];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(a, -1);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.get(-1);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              // `mori.last` is O(n)
              $$Benchmark$List$$mori.nth.f2(a, $$Benchmark$List$$mori.count(a) - 1);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.get(-1);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.get(-1);
            });
          })();

          //var elm_array = elm.makeList(counter);

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Retrieving at the start", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              a[0];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(a, 0);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              $$Benchmark$List$$mori.nth.f2(a, 0);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.get(0);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.get(0);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Retrieving at random", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              var pivot = Math.floor(Math.random() * a.length);
              a[pivot];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              var pivot = Math.floor(Math.random() * a.length);
              $$Array$$array_get(a, pivot);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              var pivot = Math.floor(Math.random() * a.size);
              a.get(pivot);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              var pivot = Math.floor(Math.random() * $$Benchmark$List$$mori.count(a));
              $$Benchmark$List$$mori.nth.f2(a, pivot);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.get(pivot);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.get(pivot);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Removing at the end", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$Array$$array_remove(b, -1);
              }
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.pop();
              }
            });

            $$Benchmark$util$$time("Immutable-js List Transient", function () {
              a.withMutations(function (b) {
                for (var i = 0; i < counter; ++i) {
                  b.pop();
                }
              });
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$Benchmark$List$$mori.pop(b);
              }
            });

            $$Benchmark$util$$time("Mori Vector Transient", function () {
              var b = $$Benchmark$List$$mori.mutable.thaw(a);
              for (var i = 0; i < counter; ++i) {
                b = $$Benchmark$List$$mori.mutable.pop(b);
              }
              $$Benchmark$List$$mori.mutable.freeze(b);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(-1);
              }
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(-1);
              }
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Removing at the start", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$Array$$array_remove(b, 0);
              }
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.shift();
              }
            });

            $$Benchmark$util$$time("Immutable-js List Transient", function () {
              a.withMutations(function (b) {
                for (var i = 0; i < counter; ++i) {
                  b.shift();
                }
              });
            });
          })();

          $$Benchmark$util$$message("Mori Vector");
          $$Benchmark$util$$message("Mori Vector Transient");

          /*;(function () {
            var a = mori.list();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj(a, i);
            }

            time("Mori List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = mori.pop(b);
              }
            });
          })();*/

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(0);
              }
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(0);
              }
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Removing at random", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.length);
                b = $$Array$$array_remove(b, pivot);
              }
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size);
                b = b.splice(pivot, 1);
              }
            });

            // splice can't be used inside withMutations
            // https://github.com/facebook/immutable-js/issues/196
            $$Benchmark$util$$message("Immutable-js List Transient");
          })();

          $$Benchmark$util$$message("Mori Vector");
          $$Benchmark$util$$message("Mori Vector Transient");

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size());
                b = b.remove(pivot);
              }
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size());
                b = b.remove(pivot);
              }
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Modifying at the end", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              $$Array$$array_modify(a, -1, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.set(-1, -50);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              $$Benchmark$List$$mori.assoc.f3(a, $$Benchmark$List$$mori.count(a) - 1, -50);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.set(-1, -50);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.set(-1, -50);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Modifying at the start", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              $$Array$$array_modify(a, 0, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.set(0, -50);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              $$Benchmark$List$$mori.assoc.f3(a, 0, -50);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.set(0, -50);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.set(0, -50);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Modifying at random", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              var pivot = Math.floor(Math.random() * a.length);
              $$Array$$array_modify(a, pivot, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              var pivot = Math.floor(Math.random() * a.size);
              a.set(pivot, -50);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$List$$mori.conj.f2(a, i);
            }

            $$Benchmark$util$$time("Mori Vector", function () {
              var pivot = Math.floor(Math.random() * $$Benchmark$List$$mori.count(a));
              $$Benchmark$List$$mori.assoc.f3(a, pivot, -50);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.set(pivot, -50);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.set(pivot, -50);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Concatenating", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              a.concat(a);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_concat(a, a);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.concat(a);
            });
          })();

          $$Benchmark$util$$message("Mori Vector");

          /*;(function () {
            var a = mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj.f2(a, i);
            }

            time("Mori Vector", function () {
              mori.vector.apply(null, mori.concat.f2(a, a));
            });
          })();*/

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.concat(a);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.concat(a);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Slicing small", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              a.slice(1, 2);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_slice(a, 1, 2);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.slice(1, 2);
            });
          })();

          $$Benchmark$util$$message("Mori Vector");

          /*;(function () {
            var a = mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj.f2(a, i);
            }

            time("Mori Vector", function () {
              mori.vector.apply(null, mori.subvec.f3(a, 1, 2));
            });
          })();*/

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.slice(1, 2);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.slice(1, 2);
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Slicing medium", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              a.slice(1, Math.floor(a.length / 2));
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_slice(a, 1, Math.floor(a.length / 2));
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.slice(1, Math.floor(a.size / 2));
            });
          })();

          $$Benchmark$util$$message("Mori Vector");

          /*;(function () {
            var a = mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj.f2(a, i);
            }

            time("Mori Vector", function () {
              mori.vector.apply(null, mori.subvec.f3(a, 1, Math.floor(mori.count(a) / 2)));
            });
          })();*/

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.slice(1, Math.floor(a.size() / 2));
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.slice(1, Math.floor(a.size() / 2));
            });
          })();

          //message("Elm Array");
        });


        $$Benchmark$util$$group("Slicing large", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$util$$time("JavaScript Array", function () {
              a.slice(1);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_slice(a, 1);
            });
          })();

          ;(function () {
            var a = $$Benchmark$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.slice(1);
            });
          })();

          $$Benchmark$util$$message("Mori Vector");

          /*;(function () {
            var a = mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj.f2(a, i);
            }

            time("Mori Vector", function () {
              mori.vector.apply(null, mori.subvec.f2(a, 1));
            });
          })();*/

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            time("Immutable List (insert)", function () {
              a.slice(1);
            });
          })();*/

          ;(function () {
            var a = $$Benchmark$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$util$$time("Immutable List", function () {
              a.slice(1);
            });
          })();

          //message("Elm Array");
        });
      });
    }
    var $$Benchmark$Record$$immutablejs = require("immutable");
    var $$Benchmark$Record$$mori        = require("mori");
    var $$Benchmark$Record$$immutable   = require("./Immutable.min.js");

    function $$Benchmark$Record$$copy(input) {
      var output = {};

      var a = Object.keys(input);
      for (var i = 0, l = a.length; i < l; ++i) {
        var key = a[i];
        output[key] = input[key];
      }

      return output;
    }

    function $$Benchmark$Record$$random(input) {
      return input[Math.floor(Math.random() * input.length)];
    }

    function $$Benchmark$Record$$record(counter) {
      var only_keys = [];
      var object_keys = {};
      var record_keys = [];
      var mori_keys = [];

      for (var i = 0; i < counter; ++i) {
        only_keys.push("foo" + i);
        object_keys["foo" + i] = i;
        record_keys.push(["foo" + i, i]);
        mori_keys.push("foo" + i, i);
      }

      var eval_copy = new Function("obj", "return{" + only_keys.map(function (key) {
        return key + ":obj." + key;
      }).join(",") + "};");

      var constructor = new Function("obj", only_keys.map(function (key) {
        return "this." + key + "=obj." + key + ";";
      }).join(""));

      var ImmutableJSRecord = $$Benchmark$Record$$immutablejs.Record(object_keys);

      $$Benchmark$util$$group("Record with " + counter + " keys", function () {
        $$Benchmark$util$$group("Creating", function () {
          $$Benchmark$util$$time("JavaScript Object", function () {
            var o = {};

            for (var i = 0; i < counter; ++i) {
              o["foo" + i] = i;
            }
          });

          $$Benchmark$util$$time("JavaScript Object Copying", function () {
            $$Benchmark$Record$$copy(object_keys);
          });

          $$Benchmark$util$$time("JavaScript Object Copying (eval)", function () {
            eval_copy(object_keys);
          });

          $$Benchmark$util$$time("JavaScript Object Copying (constructor)", function () {
            new constructor(object_keys);
          });

          $$Benchmark$util$$time("Immutable-js Map", function () {
            $$Benchmark$Record$$immutablejs.Map(record_keys);
          });

          $$Benchmark$util$$time("Immutable-js Record", function () {
            new ImmutableJSRecord(record_keys);
          });

          $$Benchmark$util$$time("Mori Hash Map", function () {
            $$Benchmark$Record$$mori.hashMap.apply(null, mori_keys);
          });

          $$Benchmark$util$$time("Mori Sorted Map", function () {
            $$Benchmark$Record$$mori.sortedMap.apply(null, mori_keys);
          });

          $$Benchmark$util$$time("Immutable Dict", function () {
            $$Benchmark$Record$$immutable.Dict(record_keys);
          });

          $$Benchmark$util$$time("Immutable SortedDict", function () {
            $$Benchmark$Record$$immutable.SortedDict($$Benchmark$Record$$immutable.simpleSort, record_keys);
          });

          $$Benchmark$util$$time("Immutable Record", function () {
            $$Benchmark$Record$$immutable.Record(record_keys);
          });
        });


        $$Benchmark$util$$group("Retrieving at random", function () {
          $$Benchmark$util$$message("JavaScript Object");

          ;(function () {
            var o = object_keys;

            var o_eval = eval_copy(o);

            var o_cons = new constructor(o);

            $$Benchmark$util$$time("JavaScript Object Copying", function () {
              o[$$Benchmark$Record$$random(only_keys)];
            });

            $$Benchmark$util$$time("JavaScript Object Copying (eval)", function () {
              o_eval[$$Benchmark$Record$$random(only_keys)];
            });

            $$Benchmark$util$$time("JavaScript Object Copying (constructor)", function () {
              o_cons[$$Benchmark$Record$$random(only_keys)];
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutablejs.Map(record_keys);

            $$Benchmark$util$$time("Immutable-js Map", function () {
              o.get($$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$util$$time("Immutable-js Record", function () {
              o.get($$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$mori.hashMap.apply(null, mori_keys);

            $$Benchmark$util$$time("Mori Hash Map", function () {
              $$Benchmark$Record$$mori.get.f2(o, $$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$mori.sortedMap.apply(null, mori_keys);

            $$Benchmark$util$$time("Mori Sorted Map", function () {
              $$Benchmark$Record$$mori.get.f2(o, $$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutable.Dict(record_keys);

            $$Benchmark$util$$time("Immutable Dict", function () {
              o.get($$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutable.SortedDict($$Benchmark$Record$$immutable.simpleSort, record_keys);

            $$Benchmark$util$$time("Immutable SortedDict", function () {
              o.get($$Benchmark$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutable.Record(record_keys);

            $$Benchmark$util$$time("Immutable Record", function () {
              o.get($$Benchmark$Record$$random(only_keys));
            });
          })();
        });


        $$Benchmark$util$$group("Setting at random", function () {
          ;(function () {
            var o = $$Benchmark$Record$$copy(object_keys);

            $$Benchmark$util$$time("JavaScript Object", function () {
              o[$$Benchmark$Record$$random(only_keys)] = -1;
            });
          })();

          ;(function () {
            var o = object_keys;

            var o_eval = eval_copy(o);

            var o_cons = new constructor(o);

            $$Benchmark$util$$time("JavaScript Object Copying", function () {
              var x = $$Benchmark$Record$$copy(o);
              x[$$Benchmark$Record$$random(only_keys)] = -1;
            });

            $$Benchmark$util$$time("JavaScript Object Copying (eval)", function () {
              var x = eval_copy(o_eval);
              x[$$Benchmark$Record$$random(only_keys)] = -1;
            });

            $$Benchmark$util$$time("JavaScript Object Copying (constructor)", function () {
              var x = new constructor(o_cons);
              x[$$Benchmark$Record$$random(only_keys)] = -1;
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutablejs.Map(record_keys);

            $$Benchmark$util$$time("Immutable-js Map", function () {
              o.set($$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$util$$time("Immutable-js Record", function () {
              o.set($$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$mori.hashMap.apply(null, mori_keys);

            $$Benchmark$util$$time("Mori Hash Map", function () {
              $$Benchmark$Record$$mori.assoc.f3(o, $$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$mori.sortedMap.apply(null, mori_keys);

            $$Benchmark$util$$time("Mori Sorted Map", function () {
              $$Benchmark$Record$$mori.assoc.f3(o, $$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutable.Dict(record_keys);

            $$Benchmark$util$$time("Immutable Dict", function () {
              o.set($$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutable.SortedDict($$Benchmark$Record$$immutable.simpleSort, record_keys);

            $$Benchmark$util$$time("Immutable SortedDict", function () {
              o.set($$Benchmark$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Benchmark$Record$$immutable.Record(record_keys);

            $$Benchmark$util$$time("Immutable Record", function () {
              o.set($$Benchmark$Record$$random(only_keys), -1);
            });
          })();
        });
      });
    }
    var $$Benchmark$Queue$$immutablejs = require("immutable");
    var $$Benchmark$Queue$$mori        = require("mori");
    var $$Benchmark$Queue$$immutable   = require("./Immutable.min.js");

    function $$Benchmark$Queue$$array_get(array, i) {
      return array[i];
    }

    function $$Benchmark$Queue$$queue(counter) {
      var values = [];

      for (var i = 0; i < counter; ++i) {
        values.push(i);
      }

      $$Benchmark$util$$group("Queue with " + counter + " values", function () {
        $$Benchmark$util$$group("Creating", function () {
          $$Benchmark$util$$time("JavaScript Array", function () {
            var values = [];

            for (var i = 0; i < counter; ++i) {
              values.push(i);
            }
          });

          $$Benchmark$util$$time("JavaScript Array Copying", function () {
            $$$Immutable$Array$$copy(values);
          });

          $$Benchmark$util$$time("Immutable-js List", function () {
            $$Benchmark$Queue$$immutablejs.List(values);
          });

          $$Benchmark$util$$time("Mori Queue", function () {
            $$Benchmark$Queue$$mori.queue.apply(null, values);
          });

          $$Benchmark$util$$time("Immutable List", function () {
            $$Benchmark$Queue$$immutable.List(values);
          });

          $$Benchmark$util$$time("Immutable Queue", function () {
            $$Benchmark$Queue$$immutable.Queue(values);
          });
        });


        $$Benchmark$util$$group("Drain", function () {
          $$Benchmark$util$$message("JavaScript Array");

          $$Benchmark$util$$time("JavaScript Array Copying", function () {
            var b = values;
            while (b.length) {
              $$Benchmark$Queue$$array_get(b, 0);
              b = $$$Immutable$Array$$remove(b, 0);
            }
          });

          ;(function () {
            var a = $$Benchmark$Queue$$immutablejs.List(values);

            $$Benchmark$util$$time("Immutable-js List", function () {
              var b = a;
              while (b.size) {
                b.get(0);
                b = b.shift();
              }
            });
          })();

          ;(function () {
            var a = $$Benchmark$Queue$$mori.queue.apply(null, values);

            $$Benchmark$util$$time("Mori Queue", function () {
              var b = a;
              while (!$$Benchmark$Queue$$mori.isEmpty(b)) {
                $$Benchmark$Queue$$mori.peek(b);
                b = $$Benchmark$Queue$$mori.pop(b);
              }
            });
          })();

          ;(function () {
            var a = $$Benchmark$Queue$$immutable.List(values);

            $$Benchmark$util$$time("Immutable List", function () {
              var b = a;
              while (!b.isEmpty()) {
                b.get(0);
                b = b.remove(0);
              }
            });
          })();

          ;(function () {
            var a = $$Benchmark$Queue$$immutable.Queue(values);

            $$Benchmark$util$$time("Immutable Queue", function () {
              var b = a;
              while (!b.isEmpty()) {
                b.peek();
                b = b.pop();
              }
            });
          })();
        });


        /*group("Peek left", function () {
          ;(function () {
            var a = values;

            time("JavaScript Array", function () {
              a[0];
            });

            time("JavaScript Array Copying", function () {
              array_get(a, 0);
            });
          })();

          ;(function () {
            var a = immutablejs.List(values);

            time("Immutable-js List (first)", function () {
              a.first();
            });

            time("Immutable-js List (get)", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = mori.queue.apply(null, values);

            time("Mori Queue", function () {
              mori.peek(a);
            });
          })();

          ;(function () {
            var a = immutable.List(values);

            time("Immutable List", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = immutable.Queue(values);

            time("Immutable Queue", function () {
              a.peek();
            });
          })();
        });


        group("Pop left", function () {
          ;(function () {
            var a = values;

            message("JavaScript Array");

            time("JavaScript Array Copying", function () {
              array_remove(a, 0);
            });
          })();

          ;(function () {
            var a = immutablejs.List(values);

            time("Immutable-js List (shift)", function () {
              a.shift();
            });

            time("Immutable-js List (delete)", function () {
              a.delete(0);
            });

            time("Immutable-js List (rest)", function () {
              a.rest();
            });
          })();

          ;(function () {
            var a = mori.queue.apply(null, values);

            time("Mori Queue (pop)", function () {
              mori.pop(a);
            });

            time("Mori Queue (rest)", function () {
              mori.rest(a);
            });
          })();

          ;(function () {
            var a = immutable.List(values);

            time("Immutable List", function () {
              a.remove(0);
            });
          })();

          ;(function () {
            var a = immutable.Queue(values);

            time("Immutable Queue", function () {
              a.pop();
            });
          })();
        });


        group("Pop left all", function () {
          ;(function () {
            var a = values;

            message("JavaScript Array");

            time("JavaScript Array Copying", function () {
              var b = a;
              while (b.length) {
                b = array_remove(b, 0);
              }
            });
          })();

          ;(function () {
            var a = immutablejs.List(values);

            time("Immutable-js List (shift)", function () {
              var b = a;
              while (b.size) {
                b = b.shift();
              }
            });

            time("Immutable-js List (delete)", function () {
              var b = a;
              while (b.size) {
                b = b.delete(0);
              }
            });

            time("Immutable-js List (rest)", function () {
              var b = a;
              while (b.size) {
                b = b.rest();
              }
            });
          })();

          ;(function () {
            var a = mori.queue.apply(null, values);

            time("Mori Queue (pop)", function () {
              var b = a;
              while (!mori.isEmpty(b)) {
                b = mori.pop(b);
              }
            });

            time("Mori Queue (rest)", function () {
              var b = a;
              while (!mori.isEmpty(b)) {
                b = mori.rest(b);
              }
            });
          })();

          ;(function () {
            var a = immutable.List(values);

            time("Immutable List", function () {
              var b = a;
              while (!b.isEmpty()) {
                b = b.remove(0);
              }
            });
          })();

          ;(function () {
            var a = immutable.Queue(values);

            time("Immutable Queue", function () {
              var b = a;
              while (!b.isEmpty()) {
                b = b.pop();
              }
            });
          })();
        });


        group("Push right", function () {
          ;(function () {
            var a = values;

            message("JavaScript Array");

            time("JavaScript Array Copying", function () {
              array_insert(a, a.length, 50);
            });
          })();

          ;(function () {
            var a = immutablejs.List(values);

            time("Immutable-js List (push)", function () {
              a.push(50);
            });

            time("Immutable-js List (set)", function () {
              a.set(a.size, 50);
            });
          })();

          ;(function () {
            var a = mori.queue.apply(null, values);

            time("Mori Queue", function () {
              mori.conj.f2(a, 50);
            });
          })();

          ;(function () {
            var a = immutable.List(values);

            time("Immutable List", function () {
              a.push(50);
            });
          })();

          ;(function () {
            var a = immutable.Queue(values);

            time("Immutable Queue", function () {
              a.push(50);
            });
          })();
        });


        group("Push right all", function () {
          ;(function () {
            var a = [];

            message("JavaScript Array");

            time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = array_insert(b, b.length, i);
              }
            });
          })();

          ;(function () {
            var a = immutablejs.List();

            time("Immutable-js List (push)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.push(i);
              }
            });

            time("Immutable-js List (set)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.set(b.size, i);
              }
            });
          })();

          ;(function () {
            var a = mori.queue();

            time("Mori Queue", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = mori.conj.f2(b, i);
              }
            });
          })();

          ;(function () {
            var a = immutable.List();

            time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.push(i);
              }
            });
          })();

          ;(function () {
            var a = immutable.Queue();

            time("Immutable Queue", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.push(i);
              }
            });
          })();
        });*/
      });
    }
    var $$Benchmark$Tuple$$immutablejs = require("immutable");
    var $$Benchmark$Tuple$$mori        = require("mori");
    var $$Benchmark$Tuple$$immutable   = require("./Immutable.min.js");

    function $$Benchmark$Tuple$$cons_push(x, i) {
      return new $$$Immutable$Cons$$Cons(i, x);
    }

    function $$Benchmark$Tuple$$random(max) {
      return Math.floor(Math.random() * max);
    }

    function $$Benchmark$Tuple$$tuple(counter) {
      var values = [];

      for (var i = 0; i < counter; ++i) {
        values.push(i);
      }

      $$Benchmark$util$$group("Tuple with " + counter + " values", function () {
        $$Benchmark$util$$group("Creating", function () {
          $$Benchmark$util$$time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }
          });

          $$Benchmark$util$$time("JavaScript Array Copying", function () {
            $$$Immutable$Array$$copy(values);
          });

          $$Benchmark$util$$time("Immutable-js List", function () {
            $$Benchmark$Tuple$$immutablejs.List(values);
          });

          $$Benchmark$util$$time("Mori Vector", function () {
            $$Benchmark$Tuple$$mori.vector.apply(null, values);
          });

          $$Benchmark$util$$time("Mori Vector (into)", function () {
            $$Benchmark$Tuple$$mori.into.f2($$Benchmark$Tuple$$mori.vector(), values);
          });

          /*time("Mori List", function () {
            mori.list.apply(null, values);
          });

          time("Mori Queue", function () {
            mori.queue.apply(null, values);
          });*/

          $$Benchmark$util$$time("Immutable List", function () {
            $$Benchmark$Tuple$$immutable.List(values);
          });

          $$Benchmark$util$$time("Immutable Tuple", function () {
            $$Benchmark$Tuple$$immutable.Tuple(values);
          });

          /*time("Immutable Queue", function () {
            immutable.Queue(values);
          });*/

          $$Benchmark$util$$time("Immutable Stack", function () {
            $$Benchmark$Tuple$$immutable.Stack(values);
          });

          $$Benchmark$util$$time("Cons", function () {
            var a = $$$Immutable$static$$nil;

            for (var i = 0; i < counter; ++i) {
              a = $$Benchmark$Tuple$$cons_push(a, i);
            }
          });
        });


        $$Benchmark$util$$group("Retrieving at random", function () {
          ;(function () {
            var size = values.length;

            $$Benchmark$util$$time("JavaScript Array", function () {
              values[$$Benchmark$Tuple$$random(size)];
            });

            $$Benchmark$util$$time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(values, $$Benchmark$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$immutablejs.List(values);

            var size = a.size;

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.get($$Benchmark$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$mori.vector.apply(null, values);

            var size = $$Benchmark$Tuple$$mori.count(a);

            $$Benchmark$util$$time("Mori Vector", function () {
              $$Benchmark$Tuple$$mori.nth.f2(a, $$Benchmark$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$immutable.List(values);

            var size = a.size();

            $$Benchmark$util$$time("Immutable List", function () {
              a.get($$Benchmark$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$immutable.Tuple(values);

            var size = a.size();

            $$Benchmark$util$$time("Immutable Tuple", function () {
              a.get($$Benchmark$Tuple$$random(size));
            });
          })();
        });


        $$Benchmark$util$$group("Setting at random", function () {
          $$Benchmark$util$$message("JavaScript Array");

          ;(function () {
            var size = values.length;

            $$Benchmark$util$$time("JavaScript Array Copying", function () {
              $$Array$$array_modify(values, $$Benchmark$Tuple$$random(size), function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$immutablejs.List(values);

            var size = a.size;

            $$Benchmark$util$$time("Immutable-js List", function () {
              a.set($$Benchmark$Tuple$$random(size), -50);
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$mori.vector.apply(null, values);

            var size = $$Benchmark$Tuple$$mori.count(a);

            $$Benchmark$util$$time("Mori Vector", function () {
              $$Benchmark$Tuple$$mori.assoc.f3(a, $$Benchmark$Tuple$$random(size), -50);
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$immutable.List(values);

            var size = a.size();

            $$Benchmark$util$$time("Immutable List", function () {
              a.set($$Benchmark$Tuple$$random(size), -50);
            });
          })();

          ;(function () {
            var a = $$Benchmark$Tuple$$immutable.Tuple(values);

            var size = a.size();

            $$Benchmark$util$$time("Immutable Tuple", function () {
              a.set($$Benchmark$Tuple$$random(size), -50);
            });
          })();
        });
      });
    }

    var $$src$Benchmark$$package = require("../package.json");

    var $$src$Benchmark$$dependencies = $$src$Benchmark$$package.devDependencies;

    function $$src$Benchmark$$header() {
      $$Benchmark$util$$group("Information", function () {
        $$Benchmark$util$$group("Node.js", function () {
          $$Benchmark$util$$message("URL: http://nodejs.org/");
          $$Benchmark$util$$message("Version: " + process.version);
        });
        $$Benchmark$util$$group("Benchmark.js", function () {
          $$Benchmark$util$$message("URL: https://github.com/bestiejs/benchmark.js");
          $$Benchmark$util$$message("Version: " + $$src$Benchmark$$dependencies.benchmark);
        });
        $$Benchmark$util$$group("Immutable-js", function () {
          $$Benchmark$util$$message("URL: https://github.com/facebook/immutable-js");
          $$Benchmark$util$$message("Version: " + $$src$Benchmark$$dependencies.immutable);
        });
        $$Benchmark$util$$group("Mori", function () {
          $$Benchmark$util$$message("URL: https://github.com/swannodette/mori");
          $$Benchmark$util$$message("Version: " + $$src$Benchmark$$dependencies.mori);
        });
        $$Benchmark$util$$group("Immutable", function () {
          $$Benchmark$util$$message("URL: https://github.com/Pauan/Immutable");
          $$Benchmark$util$$message("Version: " + $$src$Benchmark$$package.version);
        });
        /*group("Elm", function () {
          message("URL: http://elm-lang.org/");
          message("Version: 0.13");
        });*/
      });
    }


    /*header();
    list(5);
    list(10);
    list(100);
    list(1000);*/

    $$src$Benchmark$$header();
    $$Benchmark$Record$$record(5);
    $$Benchmark$Record$$record(10);
    $$Benchmark$Record$$record(100);
    $$Benchmark$Record$$record(1000);
    $$Benchmark$Record$$record(10000);

    /*header();
    queue(1);
    queue(10);
    queue(100);
    queue(1000);
    queue(10000);*/

    /*header();
    tuple(5);
    tuple(10);
    tuple(100);
    tuple(1000);
    tuple(10000);*/

    $$Benchmark$util$$run();
}).call(this);

//# sourceMappingURL=Benchmark.js.map