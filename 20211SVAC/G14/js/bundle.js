(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
var Nodo_1 = require("../../InterpreteXPath/AST/Nodo");
var NodoAST_1 = __importDefault(require("../../InterpreteXPath/AST/NodoAST"));
var Atributo = /** @class */ (function (_super) {
    __extends(Atributo, _super);
    function Atributo(id, valor, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.identificador = id;
        _this.valor = valor;
        _this.fila = fila;
        _this.columna = columna;
        return _this;
    }
    Atributo.prototype.obtenerNodos = function () {
        var nodo = new NodoAST_1.default("ATRIBUTO");
        nodo.addHijoSimple(this.identificador);
        nodo.addHijoSimple("=");
        nodo.addHijoSimple(this.valor);
        return [nodo, nodo];
    };
    return Atributo;
}(Nodo_1.Nodo));
exports.Atributo = Atributo;

},{"../../InterpreteXPath/AST/Nodo":11,"../../InterpreteXPath/AST/NodoAST":12}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
var Nodo_1 = require("../../InterpreteXPath/AST/Nodo");
var NodoAST_1 = __importDefault(require("../../InterpreteXPath/AST/NodoAST"));
var Objeto = /** @class */ (function (_super) {
    __extends(Objeto, _super);
    function Objeto(id, texto, fila, columna, listaAtributos, listaO, cierre) {
        var _this = _super.call(this, fila, columna) || this;
        _this.identificador = id;
        _this.texto = texto;
        _this.fila = fila;
        _this.columna = columna;
        _this.lista = listaAtributos;
        _this.listaObjetos = listaO;
        _this.cierre = cierre;
        return _this;
    }
    Objeto.prototype.getValor = function () {
        return this.identificador;
    };
    Objeto.prototype.obtenerNodos = function () {
        var cst = new NodoAST_1.default("OBJETO");
        var ast = new NodoAST_1.default("");
        cst.addHijoSimple("<");
        if (this.identificador == "xml") {
            cst.valor = "PROLOG";
            cst.addHijoSimple("xml");
            var atr = this.lista.obtenerNodos()[0];
            cst.addHijo(atr);
            cst.addHijoSimple("?>");
        }
        else {
            cst.addHijoSimple(this.identificador);
            ast.addHijoSimple(this.identificador);
            // console.log(this.lista)
            if (this.lista != null) {
                var atr2 = this.lista.obtenerNodos()[0];
                cst.addHijo(atr2);
                ast.addHijo(atr2);
            }
            if (this.listaObjetos != null) {
                cst.addHijoSimple("> <");
                var obj = this.listaObjetos.obtenerNodos()[0];
                cst.addHijo(obj);
                cst.addHijoSimple("/");
                cst.addHijoSimple(this.identificador);
                cst.addHijoSimple(this.cierre);
            }
            else if (this.texto != "") {
                cst.addHijoSimple(this.texto);
                cst.addHijoSimple("/");
                cst.addHijoSimple(this.identificador);
                cst.addHijoSimple(this.cierre);
            }
            else {
                cst.addHijoSimple("/>");
            }
        }
        return [cst, ast];
    };
    return Objeto;
}(Nodo_1.Nodo));
exports.Objeto = Objeto;

},{"../../InterpreteXPath/AST/Nodo":11,"../../InterpreteXPath/AST/NodoAST":12}],6:[function(require,module,exports){
(function (process){(function (){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var AscGrammer = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,11],$V1=[1,11],$V2=[1,13],$V3=[12,13,14,18,19],$V4=[5,13,16],$V5=[13,16],$V6=[1,31],$V7=[1,30];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"START":4,"EOF":5,"PROLOG":6,"RAIZ":7,"open":8,"OBJETO":9,"xml_open":10,"LATRIBUTOS":11,"special_close":12,"identifier":13,"open_close":14,"OBJETOS":15,"slash":16,"CERRAR":17,"text":18,"slash_close":19,"close":20,"ATRIBUTOS":21,"ATRIBUTO":22,"equal":23,"string":24,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"open",10:"xml_open",12:"special_close",13:"identifier",14:"open_close",16:"slash",18:"text",19:"slash_close",20:"close",23:"equal",24:"string"},
productions_: [0,[3,2],[4,2],[7,2],[6,3],[9,7],[9,6],[9,3],[17,1],[17,1],[11,1],[11,0],[21,2],[21,1],[22,3],[15,2],[15,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 2:
 $$[$0].unshift($$[$0-1]); this.$ = $$[$0]; 
break;
case 3:
 this.$ = [$$[$0]]; 
break;
case 4:
 this.$ = new Objeto('xml', '', _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-1], []); 
break;
case 5:
 if($$[$0-6] === $$[$0-1]) {
                                                                                            this.$ = new Objeto($$[$0-6], '', _$[$0-6].first_line, _$[$0-6].first_column, $$[$0-5], $$[$0-3], $$[$0]);
                                                                                        } else {
                                                                                            /* error semántico */
                                                                                            this.$ = null;
                                                                                        }
                                                                                    
break;
case 6:
 if($$[$0-5] === $$[$0-1]){
                                                                                            $$[$0-3] = $$[$0-3].replace("<", ""); 
                                                                                            $$[$0-3] = $$[$0-3].replace(">", "");
                                                                                            this.$ = new Objeto($$[$0-5], $$[$0-3], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0-4], null, $$[$0]);
                                                                                        } else {
                                                                                            /* error semántico */
                                                                                            this.$ = null;
                                                                                        }
                                                                                    
break;
case 7:
 this.$ = new Objeto($$[$0-2], '', _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-1], null, $$[$0]); 
break;
case 8: case 9:
this.$ = $$[$0]
break;
case 10:
 this.$ =$$[$0] 
break;
case 11:
 this.$ = null; 
break;
case 12:
  this.$ = new Etiqueta("atributo",0,0,$$[$0-1],$$[$0]);  
break;
case 13:
  this.$ = new Etiqueta("atributo",0,0,null,$$[$0]); 
break;
case 14:
 this.$ = new Atributo($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 15:
   if($$[$0] !== null ){
                                                                                             this.$ = new Etiqueta("objeto",0,0,$$[$0-1],$$[$0]);  
                                                                                        } else { 
                                                                                            this.$ =  new Etiqueta("objeto",0,0,$$[$0-1],null); ; 
                                                                                        }
                                                                                    
break;
case 16:
   if($$[$0] !== null ){
                                                                                           this.$ = new Etiqueta("objeto",0,0,null,$$[$0]); 
                                                                                        } else { 
                                                                                            this.$ = new Etiqueta("objeto",0,0,null,null); ; 
                                                                                        }
                                                                                    
break;
}
},
table: [{3:1,4:2,6:3,10:[1,4]},{1:[3]},{5:[1,5]},{7:6,8:[1,7]},{11:8,12:$V0,13:$V1,21:9,22:10},{1:[2,1]},{5:[2,2]},{9:12,13:$V2},{12:[1,14]},o([12,14,18,19],[2,10],{22:15,13:$V1}),o($V3,[2,13]),{23:[1,16]},{5:[2,3]},o([14,18,19],$V0,{21:9,22:10,11:17,13:$V1}),{8:[2,4]},o($V3,[2,12]),{24:[1,18]},{14:[1,19],18:[1,20],19:[1,21]},o($V3,[2,14]),{9:23,13:$V2,15:22},{16:[1,24]},o($V4,[2,7]),{9:26,13:$V2,16:[1,25]},o($V5,[2,16]),{13:[1,27]},{13:[1,28]},o($V5,[2,15]),{14:$V6,17:29,20:$V7},{14:$V6,17:32,20:$V7},o($V4,[2,6]),o($V4,[2,8]),o($V4,[2,9]),o($V4,[2,5])],
defaultActions: {5:[2,1],6:[2,2],12:[2,3],14:[2,4]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const { Objeto }    = require('../Expresion/Objeto');
    const { Atributo }  = require('../Expresion/Atributo');
    const { Etiqueta }  = require('../../InterpreteXPath/AST/Etiqueta');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip whitespace */
break;
case 2:return 10;
break;
case 3: const re = /[\s\t\n]+/
                                              var aux = yy_.yytext.replace('<', ''); 
                                              aux = aux.replace('>', '');
                                              aux = aux.replace(re, '');
                                              if(aux.length > 0) {
                                                  return 18
                                              } else {
                                                  return 14
                                              }
                                            
break;
case 4:return 12;
break;
case 5:return 19;
break;
case 6:return 20;
break;
case 7:return 8;
break;
case 8:return 16;
break;
case 9:return 23;
break;
case 10:return 24;
break;
case 11:return 13;
break;
case 12:return 5
break;
case 13: 
        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
    
break;
}
},
rules: [/^(?:\s+)/i,/^(?:<!.*?>)/i,/^(?:<\?xml\b)/i,/^(?:>([^<]|\n)*<)/i,/^(?:\?>)/i,/^(?:\/>)/i,/^(?:>)/i,/^(?:<)/i,/^(?:\/)/i,/^(?:=)/i,/^(?:("[^"]*"))/i,/^(?:[a-zA-Zá-úÁ-Úä-üÄ-Ü_][a-zA-Z0-9_\-ñÑá-úÁ-Úä-üÄ-Ü]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = AscGrammer;
exports.Parser = AscGrammer.Parser;
exports.parse = function () { return AscGrammer.parse.apply(AscGrammer, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this)}).call(this,require('_process'))
},{"../../InterpreteXPath/AST/Etiqueta":10,"../Expresion/Atributo":4,"../Expresion/Objeto":5,"_process":3,"fs":1,"path":2}],7:[function(require,module,exports){
(function (process){(function (){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var DescGrammer = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,11],$V1=[1,11],$V2=[1,13],$V3=[12,14,18,19],$V4=[2,14],$V5=[5,13,16],$V6=[2,18],$V7=[1,35],$V8=[1,34];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"START":4,"EOF":5,"PROLOG":6,"RAIZ":7,"open":8,"OBJETO":9,"xml_open":10,"LATRIBUTOS":11,"special_close":12,"identifier":13,"open_close":14,"OBJETOS":15,"slash":16,"CERRAR":17,"text":18,"slash_close":19,"close":20,"ATRIBUTOS":21,"ATRIBUTO":22,"ATRIBUTOS_P":23,"equal":24,"string":25,"OBJETOS_P":26,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"open",10:"xml_open",12:"special_close",13:"identifier",14:"open_close",16:"slash",18:"text",19:"slash_close",20:"close",24:"equal",25:"string"},
productions_: [0,[3,2],[4,2],[7,2],[6,3],[9,7],[9,6],[9,3],[17,1],[17,1],[11,1],[11,0],[21,2],[23,2],[23,0],[22,3],[15,2],[26,2],[26,0]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 2:
 $$[$0].unshift($$[$0-1]); this.$ = $$[$0]; 
break;
case 3:
 this.$ = [$$[$0]]; 
break;
case 4:
 this.$ = new Objeto('xml', '', _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-1], []); 
break;
case 5:
 if($$[$0-6] === $$[$0-1]) {
                                                                                            this.$ = new Objeto($$[$0-6], '', _$[$0-6].first_line, _$[$0-6].first_column, $$[$0-5], $$[$0-3],$$[$0]);
                                                                                        } else {
                                                                                            /* error semántico */
                                                                                            this.$ = null;
                                                                                        }
                                                                                    
break;
case 6:
 if($$[$0-5] === $$[$0-1]){
                                                                                            $$[$0-3] = $$[$0-3].replace("<", ""); 
                                                                                            $$[$0-3] = $$[$0-3].replace(">", "");
                                                                                            this.$ = new Objeto($$[$0-5], $$[$0-3], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0-4], null,$$[$0]);
                                                                                        } else {
                                                                                            /* error semántico */
                                                                                            this.$ = null;
                                                                                        }
                                                                                    
break;
case 7:
 this.$ = new Objeto($$[$0-2], '', _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-1], null,$$[$0]); 
break;
case 8: case 9:
this.$ = $$[$0]
break;
case 10:
 this.$ = $$[$0]; 
break;
case 11: case 14: case 18:
 this.$ = null; 
break;
case 12: case 13:
 this.$ = new Etiqueta("atributo",0,0,$$[$0-1],$$[$0]); 
break;
case 15:
 this.$ = new Atributo($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 16:
 if($$[$0-1] !== null ){
                                                                                             this.$ = new Etiqueta("objeto",0,0,$$[$0-1],$$[$0]);
                                                                                        } else { 
                                                                                           this.$ = new Etiqueta("objeto",0,0,$$[$0-1],$$[$0]);
                                                                                        } 
                                                                                    
break;
case 17:
 if($$[$0-1] !== null ){
                                                                                            this.$ = new Etiqueta("objeto",0,0,$$[$0-1],$$[$0]);
                                                                                        } else { 
                                                                                             this.$ = new Etiqueta("objeto",0,0,$$[$0-1],$$[$0]);
                                                                                        }
                                                                                    
break;
}
},
table: [{3:1,4:2,6:3,10:[1,4]},{1:[3]},{5:[1,5]},{7:6,8:[1,7]},{11:8,12:$V0,13:$V1,21:9,22:10},{1:[2,1]},{5:[2,2]},{9:12,13:$V2},{12:[1,14]},o($V3,[2,10]),o($V3,$V4,{23:15,22:16,13:$V1}),{24:[1,17]},{5:[2,3]},o([14,18,19],$V0,{21:9,22:10,11:18,13:$V1}),{8:[2,4]},o($V3,[2,12]),o($V3,$V4,{22:16,23:19,13:$V1}),{25:[1,20]},{14:[1,21],18:[1,22],19:[1,23]},o($V3,[2,13]),o([12,13,14,18,19],[2,15]),{9:25,13:$V2,15:24},{16:[1,26]},o($V5,[2,7]),{16:[1,27]},{9:29,13:$V2,16:$V6,26:28},{13:[1,30]},{13:[1,31]},{16:[2,16]},{9:29,13:$V2,16:$V6,26:32},{14:$V7,17:33,20:$V8},{14:$V7,17:36,20:$V8},{16:[2,17]},o($V5,[2,6]),o($V5,[2,8]),o($V5,[2,9]),o($V5,[2,5])],
defaultActions: {5:[2,1],6:[2,2],12:[2,3],14:[2,4],28:[2,16],32:[2,17]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const { Objeto }    = require('../Expresion/Objeto');
    const { Atributo }  = require('../Expresion/Atributo');
    const { Etiqueta }  = require('../../InterpreteXPath/AST/Etiqueta');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip whitespace */
break;
case 2:return 10;
break;
case 3: const re = /[\s\t\n]+/
                                              var aux = yy_.yytext.replace('<', ''); 
                                              aux = aux.replace('>', '');
                                              aux = aux.replace(re, '');
                                              if(aux.length > 0) {
                                                  return 18
                                              } else {
                                                  return 14
                                              }
                                            
break;
case 4:return 12;
break;
case 5:return 19;
break;
case 6:return 20;
break;
case 7:return 8;
break;
case 8:return 16;
break;
case 9:return 24;
break;
case 10:return 25;
break;
case 11:return 13;
break;
case 12:return 5
break;
case 13: 
        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
    
break;
}
},
rules: [/^(?:\s+)/i,/^(?:<!.*?>)/i,/^(?:<\?xml\b)/i,/^(?:>([^<]|\n)*<)/i,/^(?:\?>)/i,/^(?:\/>)/i,/^(?:>)/i,/^(?:<)/i,/^(?:\/)/i,/^(?:=)/i,/^(?:("[^"]*"))/i,/^(?:[a-zA-Zá-úÁ-Úä-üÄ-Ü_][a-zA-Z0-9_\-ñÑá-úÁ-Úä-üÄ-Ü]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = DescGrammer;
exports.Parser = DescGrammer.Parser;
exports.parse = function () { return DescGrammer.parse.apply(DescGrammer, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this)}).call(this,require('_process'))
},{"../../InterpreteXPath/AST/Etiqueta":10,"../Expresion/Atributo":4,"../Expresion/Objeto":5,"_process":3,"fs":1,"path":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(id, tipo, valor, fila, columna, indice) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
        this.entorno = [];
        if ('undefined' === typeof indice) {
            this.indice = '';
        }
        else {
            this.indice = indice.toString();
        }
    }
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.getValorImplicito = function () {
        return this.valor;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDato = void 0;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["STRING"] = 0] = "STRING";
    TipoDato[TipoDato["INT"] = 1] = "INT";
    TipoDato[TipoDato["DOUBLE"] = 2] = "DOUBLE";
    TipoDato[TipoDato["BOOL"] = 3] = "BOOL";
    TipoDato[TipoDato["VOID"] = 4] = "VOID";
    TipoDato[TipoDato["STRUCT"] = 5] = "STRUCT";
    TipoDato[TipoDato["ARRAY"] = 6] = "ARRAY";
    TipoDato[TipoDato["ATRIBUTO"] = 7] = "ATRIBUTO";
    TipoDato[TipoDato["ETIQUETA"] = 8] = "ETIQUETA";
})(TipoDato = exports.TipoDato || (exports.TipoDato = {}));

},{}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etiqueta = void 0;
var Nodo_1 = require("./Nodo");
var NodoAST_1 = __importDefault(require("./NodoAST"));
var Etiqueta = /** @class */ (function (_super) {
    __extends(Etiqueta, _super);
    function Etiqueta(id, fila, columna, etiqueta, valor) {
        var _this = _super.call(this, fila, columna) || this;
        _this.identificador = id;
        _this.fila = fila;
        _this.columna = columna;
        _this.etiqueta = etiqueta;
        _this.valor = valor;
        return _this;
    }
    Etiqueta.prototype.obtenerNodos = function () {
        var nodo;
        if (this.identificador == "atributo") {
            nodo = new NodoAST_1.default("LISTA_ATRIBUTOS");
        }
        else {
            nodo = new NodoAST_1.default("LISTA_OBJETOS");
        }
        if (this.etiqueta != null) {
            var eti = this.etiqueta.obtenerNodos()[0];
            nodo.addHijo(eti);
        }
        if (this.valor != null) {
            nodo.addHijo(this.valor.obtenerNodos()[0]);
        }
        return [nodo, nodo];
    };
    return Etiqueta;
}(Nodo_1.Nodo));
exports.Etiqueta = Etiqueta;

},{"./Nodo":11,"./NodoAST":12}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
var Nodo = /** @class */ (function () {
    function Nodo(line, column) {
        this.line = line;
        this.column = column;
    }
    return Nodo;
}());
exports.Nodo = Nodo;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodoAST = /** @class */ (function () {
    function NodoAST(valor) {
        this.hijos = new Array();
        this.valor = valor;
    }
    NodoAST.prototype.addHijos = function (hijos) {
        this.hijos = hijos;
    };
    NodoAST.prototype.addHijo = function (hijo) {
        this.hijos.push(hijo);
    };
    NodoAST.prototype.addHijoSimple = function (hijo) {
        this.hijos.push(new NodoAST(hijo));
    };
    NodoAST.prototype.getValor = function () {
        return this.valor;
    };
    NodoAST.prototype.setValor = function (cad) {
        this.valor = cad;
    };
    NodoAST.prototype.getHijos = function () {
        return this.hijos;
    };
    return NodoAST;
}());
exports.default = NodoAST;

},{}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = exports.TipoA = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var TipoDato_1 = require("../../InterpreteXML/TablaSimbolo/TipoDato");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Error_1 = require("./Error");
var TipoA;
(function (TipoA) {
    TipoA["SUMA"] = "+";
    TipoA["RESTA"] = "-";
    TipoA["MULTI"] = "*";
    TipoA["DIV"] = "/";
    TipoA["MOD"] = "%";
})(TipoA = exports.TipoA || (exports.TipoA = {}));
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(fila, columna, left, right, tipo) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipoA = tipo;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Aritmetica.prototype.evaluar = function () {
        var res_left = this.left.evaluar();
        var res_right = this.right.evaluar();
        if (res_left.getTipo() != TipoDato_1.TipoDato.INT || res_right.getTipo() != TipoDato_1.TipoDato.INT) {
            console.log(new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
            throw new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        }
        switch (this.tipoA) {
            case TipoA.SUMA:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) + Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case TipoA.RESTA:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) - Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case TipoA.DIV:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) / Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case TipoA.MULTI:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) * Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            default:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) % Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
        }
    };
    Aritmetica.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.tipoA);
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    };
    Aritmetica.prototype.concatenar = function () {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    Aritmetica.prototype.buscar = function (lista, isFinal) {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    return Aritmetica;
}(Expresion_1.Expresion));
exports.Aritmetica = Aritmetica;

},{"../../InterpreteXML/TablaSimbolo/Simbolo":8,"../../InterpreteXML/TablaSimbolo/TipoDato":9,"../AST/NodoAST":12,"../Interface/Expresion":25,"./Error":14}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(linea, columna, mensaje, tipo) {
        this.linea = linea;
        this.columna = columna;
        this.mensaje = mensaje;
        this.tipo = tipo;
    }
    Error.prototype.ToString = function () {
        return "";
    };
    return Error;
}());
exports.Error = Error;

},{}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = exports.TipoL = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Error_1 = require("./Error");
var TipoL;
(function (TipoL) {
    TipoL["AND"] = "and";
    TipoL["OR"] = "or";
})(TipoL = exports.TipoL || (exports.TipoL = {}));
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(fila, columna, left, right, tipo) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipoA = tipo;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Logica.prototype.evaluar = function () {
        var res_left = this.left.evaluar();
        var res_right = this.right.evaluar();
        // console.log(typeof res_left.getTipo() + "   der: "+res_right.getTipo())
        // if(res_left.getTipo() != TipoDato.BOOL || res_right.getTipo() != TipoDato.BOOL){
        //    console.log(new Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
        //    throw new Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        // }
        switch (this.tipoA) {
            case TipoL.OR:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Boolean(res_left.getValorImplicito()) && Boolean(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            default:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Boolean(res_left.getValorImplicito()) || Boolean(res_right.getValorImplicito()), res_right.fila, res_right.columna);
        }
    };
    Logica.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.tipoA);
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    };
    Logica.prototype.concatenar = function () {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    Logica.prototype.buscar = function (lista, isFinal) {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    return Logica;
}(Expresion_1.Expresion));
exports.Logica = Logica;

},{"../../InterpreteXML/TablaSimbolo/Simbolo":8,"../AST/NodoAST":12,"../Interface/Expresion":25,"./Error":14}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Primitivo = /** @class */ (function (_super) {
    __extends(Primitivo, _super);
    function Primitivo(fila, col, tipo, valor) {
        var _this = _super.call(this, fila, col) || this;
        _this.tipo = tipo;
        _this.valor = valor;
        _this.fila = fila;
        _this.col = col;
        return _this;
    }
    Primitivo.prototype.evaluar = function () {
        return new Simbolo_1.Simbolo("", this.tipo, this.valor, this.fila, this.col);
    };
    Primitivo.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.valor);
        return nodo;
    };
    Primitivo.prototype.concatenar = function () {
        throw new Error("Method not implemented.");
    };
    Primitivo.prototype.buscar = function (lista, isFinal) {
        throw new Error("Method not implemented.");
    };
    return Primitivo;
}(Expresion_1.Expresion));
exports.Primitivo = Primitivo;

},{"../../InterpreteXML/TablaSimbolo/Simbolo":8,"../AST/NodoAST":12,"../Interface/Expresion":25}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = exports.TipoR = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Error_1 = require("./Error");
var TipoR;
(function (TipoR) {
    TipoR[TipoR["MENOR"] = 0] = "MENOR";
    TipoR[TipoR["MAYOR"] = 1] = "MAYOR";
    TipoR[TipoR["MAYORIGUAL"] = 2] = "MAYORIGUAL";
    TipoR[TipoR["MENORIGUAL"] = 3] = "MENORIGUAL";
    TipoR[TipoR["IGUAL"] = 4] = "IGUAL";
    TipoR[TipoR["DISTINTO"] = 5] = "DISTINTO";
})(TipoR = exports.TipoR || (exports.TipoR = {}));
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(fila, columna, left, right, tipo) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipoA = tipo;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Relacional.prototype.evaluar = function () {
        var res_left = this.left.evaluar();
        var res_right = this.right.evaluar();
        if (res_left.getTipo() !== res_right.getTipo()) {
            console.log(new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico")); // Aqui se debe agregar a una lista
            throw new Error_1.Error(this.left.fila, this.left.columna, "Tipos de dato Incorrectos", "Error Semantico");
        }
        switch (this.tipoA) {
            case ">":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) > Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case "<":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) < Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case ">=":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) >= Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case "<=":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) <= Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            case "=":
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) === Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
            default:
                return new Simbolo_1.Simbolo("", res_left.getTipo(), Number(res_left.getValorImplicito()) !== Number(res_right.getValorImplicito()), res_right.fila, res_right.columna);
        }
    };
    Relacional.prototype.ast = function () {
        var nodo = new NodoAST_1.default(this.tipoA);
        nodo.addHijo(this.left.ast());
        nodo.addHijo(this.right.ast());
        return nodo;
    };
    Relacional.prototype.concatenar = function () {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    Relacional.prototype.buscar = function (lista, isFinal) {
        throw new Error_1.Error(0, 0, "", "Method not implemented.");
    };
    return Relacional;
}(Expresion_1.Expresion));
exports.Relacional = Relacional;

},{"../../InterpreteXML/TablaSimbolo/Simbolo":8,"../AST/NodoAST":12,"../Interface/Expresion":25,"./Error":14}],18:[function(require,module,exports){
(function (process){(function (){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var xpathAsc = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,15],$V1=[1,14],$V2=[1,58],$V3=[1,11],$V4=[1,12],$V5=[1,27],$V6=[1,28],$V7=[1,29],$V8=[1,30],$V9=[1,31],$Va=[1,32],$Vb=[1,33],$Vc=[1,34],$Vd=[1,35],$Ve=[1,37],$Vf=[1,38],$Vg=[1,39],$Vh=[1,40],$Vi=[1,41],$Vj=[1,42],$Vk=[1,64],$Vl=[1,62],$Vm=[1,45],$Vn=[1,59],$Vo=[1,61],$Vp=[1,60],$Vq=[1,44],$Vr=[1,48],$Vs=[1,49],$Vt=[1,66],$Vu=[5,7,40,77],$Vv=[1,67],$Vw=[5,7,9,40,77],$Vx=[1,69],$Vy=[1,70],$Vz=[5,7,9,12,13,14,15,16,17,19,20,40,77],$VA=[1,77],$VB=[1,78],$VC=[1,79],$VD=[5,7,9,12,13,14,15,16,17,19,20,22,23,24,40,77],$VE=[1,80],$VF=[5,7,9,12,13,14,15,16,17,19,20,22,23,24,26,40,77],$VG=[1,82],$VH=[1,81],$VI=[5,7,9,12,13,14,15,16,17,19,20,22,23,24,26,29,31,40,77],$VJ=[19,20,22,29,31,44,46,47,48,49,50,51,52,53,56,57,58,59,60,61,70,75,76,78,79,80,85,86,87],$VK=[2,39],$VL=[1,91],$VM=[5,7,9,12,13,14,15,16,17,19,20,22,23,24,26,29,31,39,40,77],$VN=[22,70,75,78,79,80];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"EXPRESION_SIMPLE":4,"EOF":5,"EXPRESION_AND":6,"R_OR":7,"EXPRESION_COMPARAC":8,"R_AND":9,"EXPRESION_ADICION":10,"OPERADORES_LOGICOS":11,"E":12,"NE":13,"LT":14,"LE":15,"GT":16,"GE":17,"EXPRESION_MULTI":18,"RESTA":19,"SUMA":20,"EXPRESION_UNION":21,"MULTIPLICACION":22,"R_DIV":23,"R_MOD":24,"EXPRESION_UNARIA":25,"UNION":26,"RUTA_RELATIVA":27,"SIMBOLO":28,"DBARRA":29,"PASO":30,"BARRA":31,"PASO_EJE":32,"POSTFIX":33,"PASO_ADELANTE":34,"LISTA_PREDICADOS_AUX":35,"PASO_ATRAS":36,"LISTA_PREDICADOS":37,"PREDICADO":38,"CORCHETE_ABRE":39,"CORCHETE_CIERRA":40,"EJE_ADELANTE":41,"PRUEBA_NODO":42,"PASO_ADELANTE_ABREV":43,"R_CHILD":44,"ACCESO":45,"R_DESCENDANT":46,"R_ATTRIBUTE":47,"R_SELF":48,"R_DESCENDANT_OR_SELF":49,"R_FOLLOWING_SIBLING":50,"R_FOLLOWING":51,"R_NAMESPACE":52,"ARROBA":53,"EJE_ATRAS":54,"PASO_ATRAS_ABREV":55,"R_PARENT":56,"R_ANCESTOR":57,"R_PRECEDING_SIBLING":58,"R_PRECEDING":59,"R_ANCESTOR_OR_SELF":60,"DPUNTO":61,"NOMBRE_PRUEBA":62,"TIPO_PRUEBA":63,"Q_NAME":64,"WILDCARD":65,"NOMBRE_PREFIJO":66,"NOMBRE_SIN_PREFIJO":67,"NCNAME":68,"SEPARADOR":69,"IDENTIFICADOR":70,"PRUEBA_TEXTO":71,"PRUEBA_NODE":72,"PRUEBA_POSICION":73,"PRUEBA_ULTIMO":74,"R_LAST":75,"PARENTESIS_ABRE":76,"PARENTESIS_CIERRA":77,"R_TEXT":78,"R_POSITION":79,"R_NODE":80,"EXPRESION_PRIMARIA":81,"LITERAL":82,"EXPRESION_PARENTESIS":83,"LITERAL_NUMERO":84,"CADENA":85,"ENTERO":86,"DECIMAL":87,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"R_OR",9:"R_AND",12:"E",13:"NE",14:"LT",15:"LE",16:"GT",17:"GE",19:"RESTA",20:"SUMA",22:"MULTIPLICACION",23:"R_DIV",24:"R_MOD",26:"UNION",29:"DBARRA",31:"BARRA",39:"CORCHETE_ABRE",40:"CORCHETE_CIERRA",44:"R_CHILD",45:"ACCESO",46:"R_DESCENDANT",47:"R_ATTRIBUTE",48:"R_SELF",49:"R_DESCENDANT_OR_SELF",50:"R_FOLLOWING_SIBLING",51:"R_FOLLOWING",52:"R_NAMESPACE",53:"ARROBA",56:"R_PARENT",57:"R_ANCESTOR",58:"R_PRECEDING_SIBLING",59:"R_PRECEDING",60:"R_ANCESTOR_OR_SELF",61:"DPUNTO",69:"SEPARADOR",70:"IDENTIFICADOR",75:"R_LAST",76:"PARENTESIS_ABRE",77:"PARENTESIS_CIERRA",78:"R_TEXT",79:"R_POSITION",80:"R_NODE",85:"CADENA",86:"ENTERO",87:"DECIMAL"},
productions_: [0,[3,2],[4,1],[4,3],[6,1],[6,3],[8,1],[8,3],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[10,1],[10,3],[10,3],[18,1],[18,3],[18,3],[18,3],[21,1],[21,3],[25,1],[25,2],[28,1],[28,1],[28,2],[28,2],[27,2],[27,2],[27,1],[27,3],[27,3],[30,1],[30,1],[32,2],[32,2],[35,1],[35,0],[37,1],[37,2],[38,3],[34,2],[34,1],[41,2],[41,2],[41,2],[41,2],[41,2],[41,2],[41,2],[41,2],[43,2],[43,1],[36,2],[36,1],[54,2],[54,2],[54,2],[54,2],[54,2],[55,1],[42,1],[42,1],[62,1],[62,1],[65,1],[64,1],[64,1],[66,3],[67,1],[68,1],[63,1],[63,1],[63,1],[63,1],[74,3],[71,3],[73,3],[72,3],[33,1],[33,2],[81,1],[81,1],[83,2],[83,3],[82,1],[82,1],[84,1],[84,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return [$$[$0-1]]; 
break;
case 2: case 4: case 6: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 17: case 21: case 25: case 26: case 35: case 38: case 40: case 44: case 62: case 63: case 64: case 65: case 66: case 68: case 69: case 71: case 73: case 74: case 75: case 76: case 83: case 84: case 87: case 88:
 this.$ = $$[$0] 
break;
case 3:
 this.$ = new Logica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoL.OR) 
break;
case 5:
 this.$ = new Logica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoL.AND) 
break;
case 7:
 this.$ = new Relacional(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],$$[$0-1]) 
break;
case 15:
 this.$ = new Aritmetica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoA.RESTA) 
break;
case 16:
 this.$ = new Aritmetica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoA.SUMA) 
break;
case 18:
 this.$ =new Aritmetica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoA.MULTI) 
break;
case 19:
 this.$ =new Aritmetica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoA.DIV) 
break;
case 20:
 this.$ = new Aritmetica(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0],TipoA.MOD) 
break;
case 22:
 this.$ = $$[$0-2] + " " + $$[$0-1] + " " + $$[$0] 
break;
case 23:
 this.$ = $$[$0] ; 
break;
case 24: case 85:
 this.$ = $$[$0-1] + $$[$0] 
break;
case 27: case 28: case 45: case 46: case 47: case 48: case 49: case 50: case 51: case 52:
 this.$ = $$[$0-1]  +  $$[$0] 
break;
case 29: case 30:
  this.$ = new Consulta(_$[$0-1].first_column,$$[$0-1],$$[$0],null) 
break;
case 31:
  this.$ = $$[$0]  
break;
case 32:
  this.$ = new Consulta(_$[$0-2].first_column,$$[$0-1],$$[$0],$$[$0-2]) 
break;
case 33:
  this.$ = new Consulta(_$[$0-2].first_column,$$[$0-1],$$[$0],$$[$0-2])
break;
case 34:
 this.$ = $$[$0] ; 
                                                                                
break;
case 36:
 
                                                                                        $$[$0-1].predicado = $$[$0]; this.$ = $$[$0-1] // cuerpo
                                                                                
break;
case 37:

                                                                                        $$[$0-1].predicado = $$[$0]; this.$=$$[$0-1]
                                                                                
break;
case 39:
 this.$ = null 
break;
case 41:
 this.$ = $$[$0-1].push($$[$0]) 
break;
case 42:
  this.$=new Predicado(_$[$0-2].first_column,$$[$0-1]) 
break;
case 43:
this.$ = new Cuerpo(_$[$0-1].first_column,
                                                                                                new Funcion(_$[$0-1].first_column,$$[$0-1],TipoF.ACCESO, $$[$0]),
                                                                                                ); 
break;
case 53:
  
                                                                                        this.$ = new Cuerpo(_$[$0-1].first_column,null,$$[$0-1],$$[$0],null);
                                                                                        // @ // id:id   or  id   or  * or funcion() 
                                                                                
break;
case 54:

                                                                                        this.$ = new Cuerpo(_$[$0].first_column,null,null,$$[$0],null);
                                                                                
break;
case 55:
 
                                                                                this.$ = new Cuerpo(_$[$0-1].first_column,
                                                                                                new Funcion(_$[$0-1].first_column,$$[$0-1],TipoF.ACCESO, $$[$0]),
                                                                                                );
                                                                                
                                                                                 /* ancestor::  position() 
                                                                                    ancestor:: id:id
                                                                                    ancestor:: id
                                                                                    ancestor:: *        */ 
break;
case 56:
 
                                                                                  this.$ = new Cuerpo(_$[$0].first_column,null,null,$$[$0],null);
                                                                                
break;
case 57:
 this.$ = $$[$0-1]  +  $$[$0]; this.$ = $$[$0-1] 
break;
case 58: case 59: case 60: case 61:
 this.$ = $$[$0-1]  +  $$[$0];this.$ = $$[$0-1] 
break;
case 67:
  this.$ = new Primitivo(0, _$[$0].first_column, TipoDato.FILTRO, $$[$0]) 
break;
case 70:
 this.$ = new Primitivo(0, _$[$0-2].first_column, TipoDato.VARIABLE, [$$[$0-2],$$[$0-1],$$[$0]])  
break;
case 72:
 this.$ = new Primitivo(0, _$[$0].first_column, TipoDato.VARIABLE, $$[$0])  
break;
case 77:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0]; this.$ = new Funcion(1,$$[$0-2],TipoF.FUNCION) 
break;
case 78: case 79:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0];this.$ = new Funcion(1,$$[$0-2],TipoF.FUNCION) 
break;
case 80:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0] ;this.$ = new Funcion(1,$$[$0-2],TipoF.FUNCION) 
break;
case 81:
 this.$ = new Cuerpo(_$[$0].first_column,null,null,$$[$0],null); 
break;
case 82:
 this.$ =  new Cuerpo(_$[$0-1].first_column,null,null,$$[$0-1],$$[$0]); 
break;
case 86:
 this.$ =$$[$0-1] 
break;
case 89:
 this.$ = new Primitivo(0, 0, TipoDato.INT, $$[$0]) 
break;
case 90:
 this.$ = new Primitivo(0,_$[$0].first_column, TipoDato.DOUBLE, $$[$0]) 
break;
}
},
table: [{3:1,4:2,6:3,8:4,10:5,18:6,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{1:[3]},{5:[1,65],7:$Vt},o($Vu,[2,2],{9:$Vv}),o($Vw,[2,4]),o($Vw,[2,6],{11:68,12:[1,71],13:[1,72],14:[1,73],15:[1,74],16:[1,75],17:[1,76],19:$Vx,20:$Vy}),o($Vz,[2,14],{22:$VA,23:$VB,24:$VC}),o($VD,[2,17],{26:$VE}),o($VF,[2,21]),o($VF,[2,23],{29:$VG,31:$VH}),{19:[1,85],20:[1,84],22:$V2,27:83,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{22:$V2,30:86,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{22:$V2,30:87,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},o($VI,[2,31]),o($VJ,[2,25]),o($VJ,[2,26]),o($VI,[2,34]),o($VI,[2,35]),o($VI,$VK,{35:88,37:89,38:90,39:$VL}),o($VI,$VK,{37:89,38:90,35:92,39:$VL}),o($VI,[2,81],{38:90,37:93,39:$VL}),{22:$V2,42:94,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,78:$Vn,79:$Vo,80:$Vp},o($VM,[2,44]),{22:$V2,42:95,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,78:$Vn,79:$Vo,80:$Vp},o($VM,[2,56]),o($VM,[2,83]),o($VM,[2,84]),{45:[1,96]},{45:[1,97]},{45:[1,98]},{45:[1,99]},{45:[1,100]},{45:[1,101]},{45:[1,102]},{45:[1,103]},{22:$V2,42:104,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,78:$Vn,79:$Vo,80:$Vp},o($VM,[2,54]),{45:[1,105]},{45:[1,106]},{45:[1,107]},{45:[1,108]},{45:[1,109]},o($VM,[2,62]),o($VM,[2,87]),o($VM,[2,88]),{4:111,6:3,8:4,10:5,18:6,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,77:[1,110],78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},o($VM,[2,63]),o($VM,[2,64]),o($VM,[2,89]),o($VM,[2,90]),o($VM,[2,65]),o($VM,[2,66]),o($VM,[2,73]),o($VM,[2,74]),o($VM,[2,75]),o($VM,[2,76]),o($VM,[2,68]),o($VM,[2,69]),o($VM,[2,67]),{76:[1,112]},{76:[1,113]},{76:[1,114]},{76:[1,115]},o($VM,[2,71],{69:[1,116]}),o([5,7,9,12,13,14,15,16,17,19,20,22,23,24,26,29,31,39,40,69,77],[2,72]),{1:[2,1]},{6:117,8:4,10:5,18:6,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{8:118,10:5,18:6,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{10:119,18:6,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{18:120,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{18:121,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},o($VJ,[2,8]),o($VJ,[2,9]),o($VJ,[2,10]),o($VJ,[2,11]),o($VJ,[2,12]),o($VJ,[2,13]),{19:$V0,20:$V1,21:122,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{19:$V0,20:$V1,21:123,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{19:$V0,20:$V1,21:124,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{19:$V0,20:$V1,22:$V2,25:125,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{22:$V2,30:126,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},{22:$V2,30:127,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},o($VF,[2,24],{29:$VG,31:$VH}),o($VJ,[2,27]),o($VJ,[2,28]),o($VI,[2,29]),o($VI,[2,30]),o($VI,[2,36]),o($VI,[2,38],{38:128,39:$VL}),o($VM,[2,40]),{4:129,6:3,8:4,10:5,18:6,19:$V0,20:$V1,21:7,22:$V2,25:8,27:9,28:10,29:$V3,30:13,31:$V4,32:16,33:17,34:18,36:19,41:21,42:36,43:22,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:23,55:24,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,61:$Vj,62:46,63:47,64:50,65:51,66:56,67:57,68:63,70:$Vk,71:52,72:53,73:54,74:55,75:$Vl,76:$Vm,78:$Vn,79:$Vo,80:$Vp,81:20,82:25,83:26,84:43,85:$Vq,86:$Vr,87:$Vs},o($VI,[2,37]),o($VI,[2,82],{38:128,39:$VL}),o($VM,[2,43]),o($VM,[2,55]),o($VN,[2,45]),o($VN,[2,46]),o($VN,[2,47]),o($VN,[2,48]),o($VN,[2,49]),o($VN,[2,50]),o($VN,[2,51]),o($VN,[2,52]),o($VM,[2,53]),o($VN,[2,57]),o($VN,[2,58]),o($VN,[2,59]),o($VN,[2,60]),o($VN,[2,61]),o($VM,[2,85]),{7:$Vt,77:[1,130]},{77:[1,131]},{77:[1,132]},{77:[1,133]},{77:[1,134]},{68:135,70:$Vk},o($Vu,[2,3],{9:$Vv}),o($Vw,[2,5]),o($Vw,[2,7],{19:$Vx,20:$Vy}),o($Vz,[2,15],{22:$VA,23:$VB,24:$VC}),o($Vz,[2,16],{22:$VA,23:$VB,24:$VC}),o($VD,[2,18],{26:$VE}),o($VD,[2,19],{26:$VE}),o($VD,[2,20],{26:$VE}),o($VF,[2,22]),o($VI,[2,32]),o($VI,[2,33]),o($VM,[2,41]),{7:$Vt,40:[1,136]},o($VM,[2,86]),o($VM,[2,78]),o($VM,[2,80]),o($VM,[2,79]),o($VM,[2,77]),o($VM,[2,70]),o($VM,[2,42])],
defaultActions: {65:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const { Valor }  = require('../Instrucciones/Valor');
    const { Aritmetica, TipoA} = require('../Expresiones/Aritmetica')
    const { Primitivo } = require('../Expresiones/Primitivo')
    const { TipoDato } = require ('../../InterpreteXML/TablaSimbolo/TipoDato')
    const { Relacional } = require ('../Expresiones/Relacional')
    const { Logica, TipoL} = require('../Expresiones/Logica')
    const { Funcion, TipoF } = require ('../Instrucciones/Funcion')
    const { Ruta } = require ('../Instrucciones/Ruta')

    const { Consulta } = require('../Instrucciones/Consulta')
    const { Cuerpo } = require('../Instrucciones/Cuerpo')
    const { Predicado } = require('../Instrucciones/Predicado')

    var Auxi = []; 
    var instr = ""
    var Tokens =[]
    var cvivar = ""
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 78; 
break;
case 2: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 80; 
break;
case 3: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 75; 
break;
case 4: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 79; 
break;
case 5: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 7; 
break;
case 6: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 9; 
break;
case 7: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 23; 
break;
case 8: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 24; 
break;
case 9: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 'R_EQ'; 
break;
case 10: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 'R_NE'; 
break;
case 11: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 'R_LT'; 
break;
case 12: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 'R_LE'; 
break;
case 13: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 'R_GT'; 
break;
case 14: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 'R_GE'; 
break;
case 15: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 44; 
break;
case 16: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 49; 
break;
case 17: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 46; 
break;
case 18: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 47; 
break;
case 19: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 48; 
break;
case 20: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 50; 
break;
case 21: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 52; 
break;
case 22: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 51; 
break;
case 23: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 56; 
break;
case 24: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 60; 
break;
case 25: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 57; 
break;
case 26: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 58; 
break;
case 27: Tokens.push(['reservada',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 59; 
break;
case 28: Tokens.push(['paren. a.',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 76; 
break;
case 29: Tokens.push(['paren. c.',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 77; 
break;
case 30: Tokens.push(['corch. a.',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 39; 
break;
case 31: Tokens.push(['corch. c.',     yy_.yytext, (yy_.yylineno + 1).toString()]); return 40; 
break;
case 32: Tokens.push(['menor igual',   yy_.yytext, (yy_.yylineno + 1).toString()]); return 15; 
break;
case 33: Tokens.push(['mayor igual',   yy_.yytext, (yy_.yylineno + 1).toString()]); return 17; 
break;
case 34: Tokens.push(['menor',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 14; 
break;
case 35: Tokens.push(['mayor',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 16; 
break;
case 36: Tokens.push(['igual',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 12; 
break;
case 37: Tokens.push(['distinto',      yy_.yytext, (yy_.yylineno + 1).toString()]); return 13; 
break;
case 38: Tokens.push(['acceso',        yy_.yytext, (yy_.yylineno + 1).toString()]); return 45; 
break;
case 39: Tokens.push(['acceso',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 69; 
break;
case 40: Tokens.push(['arroba',        yy_.yytext, (yy_.yylineno + 1).toString()]); return 53; 
break;
case 41: Tokens.push(['doble_punto',   yy_.yytext, (yy_.yylineno + 1).toString()]); return 61; 
break;
case 42: Tokens.push(['punto',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 'PUNTO'; 
break;
case 43: Tokens.push(['union',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 26; 
break;
case 44: Tokens.push(['multi',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 22; 
break;
case 45: Tokens.push(['doble barra',   yy_.yytext, (yy_.yylineno + 1).toString()]); return 29; 
break;
case 46: Tokens.push(['barra',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 31; 
break;
case 47: Tokens.push(['menos',         yy_.yytext, (yy_.yylineno + 1).toString()]); return 19; 
break;
case 48: Tokens.push(['mas',           yy_.yytext, (yy_.yylineno + 1).toString()]); return 20; 
break;
case 49: Tokens.push(['cadena',        yy_.yytext, (yy_.yylineno + 1).toString()]); return 85; 
break;
case 50: Tokens.push(['caracter',      yy_.yytext, (yy_.yylineno + 1).toString()]); return 'CARACTER'; 
break;
case 51: Tokens.push(['decimal',       yy_.yytext, (yy_.yylineno + 1).toString()]); return 87; 
break;
case 52: Tokens.push(['entero',        yy_.yytext, (yy_.yylineno + 1).toString()]); return 86; 
break;
case 53: Tokens.push(['identificador', yy_.yytext, (yy_.yylineno + 1).toString()]); return 70; 
break;
case 54:return 5;
break;
}
},
rules: [/^(?:\s+)/i,/^(?:text\b)/i,/^(?:node\b)/i,/^(?:last\b)/i,/^(?:position\b)/i,/^(?:or\b)/i,/^(?:and\b)/i,/^(?:div\b)/i,/^(?:mod\b)/i,/^(?:eq\b)/i,/^(?:ne\b)/i,/^(?:lt\b)/i,/^(?:le\b)/i,/^(?:gt\b)/i,/^(?:ge\b)/i,/^(?:child\b)/i,/^(?:descendant-or-self\b)/i,/^(?:descendant\b)/i,/^(?:attribute\b)/i,/^(?:self\b)/i,/^(?:following-sibling\b)/i,/^(?:namespace\b)/i,/^(?:following\b)/i,/^(?:parent\b)/i,/^(?:ancestor-or-self\b)/i,/^(?:ancestor\b)/i,/^(?:preceding-sibling\b)/i,/^(?:preceding\b)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:::)/i,/^(?::)/i,/^(?:@)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:\|)/i,/^(?:\*)/i,/^(?:\/\/)/i,/^(?:\/)/i,/^(?:-)/i,/^(?:\+)/i,/^(?:("[^"]*"))/i,/^(?:[\'][^\'\n][\'])/i,/^(?:[0-9]+(\.[0-9]+))/i,/^(?:[0-9]+)/i,/^(?:[A-Za-z][A-Za-z0-9_]*)/i,/^(?:$)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = xpathAsc;
exports.Parser = xpathAsc.Parser;
exports.parse = function () { return xpathAsc.parse.apply(xpathAsc, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this)}).call(this,require('_process'))
},{"../../InterpreteXML/TablaSimbolo/TipoDato":9,"../Expresiones/Aritmetica":13,"../Expresiones/Logica":15,"../Expresiones/Primitivo":16,"../Expresiones/Relacional":17,"../Instrucciones/Consulta":19,"../Instrucciones/Cuerpo":20,"../Instrucciones/Funcion":21,"../Instrucciones/Predicado":22,"../Instrucciones/Ruta":23,"../Instrucciones/Valor":24,"_process":3,"fs":1,"path":2}],19:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consulta = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Consulta = /** @class */ (function (_super) {
    __extends(Consulta, _super);
    function Consulta(col, typeBarra, cuerpo, next) {
        var _this = _super.call(this, 0, col) || this;
        _this.typeBarra = typeBarra;
        _this.cuerpo = cuerpo;
        _this.next = next;
        return _this;
    }
    Consulta.prototype.evaluar = function () {
        var lista;
        if (this.typeBarra === "//") {
            var cuerpo = this.cuerpo.evaluar();
            lista = cuerpo;
            //lista = this.predicado.evaluar(); // se le mandaria por parametro la lista que retorna el cuerpo.
        }
        else {
            var cuerpo = this.cuerpo.evaluar();
            lista = cuerpo;
            // lista = this.predicado.evaluar(); // se le mandaria por parametro la lista que retorna el cuerpo.
            // Metodologia para / barra simple
        }
        return lista;
    };
    Consulta.prototype.concatenar = function () {
        var cadena = "";
        if (this.next != null) {
            cadena += this.next.concatenar();
        }
        cadena += this.typeBarra;
        if (this.cuerpo != null) {
            cadena += this.cuerpo.concatenar();
        }
        return cadena;
    };
    Consulta.prototype.ast = function () {
        var consulta = new NodoAST_1.default("CONSULTA");
        if (this.next != null) {
            consulta.addHijo(this.next.ast());
        }
        consulta.addHijoSimple(this.typeBarra);
        if (this.cuerpo != null) {
            consulta.addHijo(this.cuerpo.ast());
        }
        return consulta;
    };
    Consulta.prototype.buscar = function (lista) {
        var entorno = lista;
        var aux = [];
        if (this.typeBarra === '/') {
            if (this.next !== null) {
                entorno = this.next.buscar(entorno);
                console.log(entorno);
                entorno.forEach(function (element) {
                    element.entorno.forEach(function (hijo) {
                        aux.push(hijo);
                    });
                });
                entorno = this.cuerpo.buscar(aux, true);
            }
            else {
                entorno = this.cuerpo.buscar(entorno, true);
            }
        }
        else {
        }
        return entorno;
    };
    return Consulta;
}(Expresion_1.Expresion));
exports.Consulta = Consulta;

},{"../AST/NodoAST":12,"../Interface/Expresion":25}],20:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuerpo = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Cuerpo = /** @class */ (function (_super) {
    __extends(Cuerpo, _super);
    function Cuerpo(col, axis, filtro, node, predicado) {
        var _this = _super.call(this, 0, col) || this;
        _this.axisOrFunction = axis;
        _this.filtro = filtro;
        _this.node = node;
        _this.predicado = predicado;
        return _this;
    }
    Cuerpo.prototype.evaluar = function () {
        throw new Error("Method not implemented.");
    };
    Cuerpo.prototype.concatenar = function () {
        var cadena = "";
        if (this.axisOrFunction != null) {
            cadena += this.axisOrFunction.concatenar();
        }
        else {
            if (this.filtro != null) {
                cadena += this.filtro;
            }
            if (this.node != null) {
                if (typeof this.node == "object") {
                    cadena += this.node.concatenar();
                }
                else {
                    cadena += this.node;
                }
            }
            if (this.predicado != null) {
                cadena += this.predicado.concatenar();
            }
        }
        return cadena;
    };
    Cuerpo.prototype.ast = function () {
        var cuerpo = new NodoAST_1.default("CUERPO");
        if (this.axisOrFunction != null) {
            cuerpo.addHijo(this.axisOrFunction.ast());
        }
        else {
            if (this.filtro != null) {
                cuerpo.addHijoSimple(this.filtro);
            }
            if (this.node != null) {
                if (typeof this.node == "object") {
                    var hola = this.node;
                    cuerpo.addHijo(hola.ast());
                }
                else {
                    cuerpo.addHijoSimple(this.node);
                }
            }
            if (this.predicado != null) {
                cuerpo.addHijo(this.predicado.ast());
            }
        }
        return cuerpo;
    };
    Cuerpo.prototype.buscar = function (lista, isFinal) {
        var entorno = lista;
        //      /id
        if (this.node != null) {
            var aux = this.node;
            entorno = this.BuscarEntorno(entorno, aux.valor, isFinal, 0);
        }
        return entorno;
    };
    return Cuerpo;
}(Expresion_1.Expresion));
exports.Cuerpo = Cuerpo;

},{"../AST/NodoAST":12,"../Interface/Expresion":25}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = exports.TipoF = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var TipoF;
(function (TipoF) {
    TipoF[TipoF["ACCESO"] = 0] = "ACCESO";
    TipoF[TipoF["FUNCION"] = 1] = "FUNCION"; //     ()
})(TipoF = exports.TipoF || (exports.TipoF = {}));
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(col, id, tipo, nodetest) {
        var _this = _super.call(this, 0, col) || this;
        _this.id = id;
        _this.tipo = tipo;
        _this.nodetest = nodetest;
        return _this;
    }
    Funcion.prototype.evaluar = function () {
        throw new Error("Method not implemented.");
    };
    Funcion.prototype.concatenar = function () {
        var cadena = "";
        if (this.tipo == TipoF.ACCESO) {
            cadena += this.id + "::";
        }
        else {
            cadena += this.id + "()";
        }
        if (this.nodetest != null) {
            cadena += this.nodetest.concatenar();
        }
        return cadena;
    };
    Funcion.prototype.ast = function () {
        var nodo = new NodoAST_1.default("FUNCION");
        if (this.tipo == TipoF.FUNCION) {
            nodo.addHijoSimple(this.id);
            nodo.addHijoSimple("(");
            nodo.addHijoSimple(")");
        }
        else {
            nodo.addHijoSimple(this.id);
            nodo.addHijoSimple("::");
        }
        if (this.nodetest != null) {
            nodo.addHijo(this.nodetest.ast());
        }
        return nodo;
    };
    Funcion.prototype.buscar = function (lista) {
        throw new Error("Method not implemented.");
    };
    return Funcion;
}(Expresion_1.Expresion));
exports.Funcion = Funcion;

},{"../AST/NodoAST":12,"../Interface/Expresion":25}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predicado = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Predicado = /** @class */ (function (_super) {
    __extends(Predicado, _super);
    function Predicado(col, exp) {
        var _this = _super.call(this, 0, col) || this;
        _this.exp = exp;
        return _this;
    }
    Predicado.prototype.evaluar = function () {
        var res = this.exp.evaluar();
        return res; // Deberia retornar la lista
    };
    Predicado.prototype.concatenar = function () {
        var cadena = "";
        cadena += this.exp.concatenar();
        return cadena;
    };
    Predicado.prototype.ast = function () {
        var predicado = new NodoAST_1.default("PREDICADO");
        predicado.addHijo(this.exp.ast());
        return predicado;
    };
    Predicado.prototype.buscar = function (lista, isFinal) {
        throw new Error("Method not implemented.");
    };
    return Predicado;
}(Expresion_1.Expresion));
exports.Predicado = Predicado;

},{"../AST/NodoAST":12,"../Interface/Expresion":25}],23:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruta = void 0;
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Instruction_1 = require("../Interface/Instruction");
var Ruta = /** @class */ (function (_super) {
    __extends(Ruta, _super);
    function Ruta(col, typeBarra, expresion) {
        var _this = _super.call(this, col) || this;
        _this.typeBarra = typeBarra;
        _this.expresion = expresion;
        return _this;
    }
    Ruta.prototype.evaluar = function () {
        throw new Error("Method not implemented.");
    };
    Ruta.prototype.concatenar = function () {
        var cadena = "";
        cadena += this.typeBarra + this.expresion.concatenar();
        return cadena;
    };
    Ruta.prototype.ast = function () {
        var ruta = new NodoAST_1.default("Ruta");
        ruta.addHijoSimple(this.typeBarra);
        ruta.addHijo(this.expresion.ast());
        return ruta;
    };
    return Ruta;
}(Instruction_1.Instruccion));
exports.Ruta = Ruta;

},{"../AST/NodoAST":12,"../Interface/Instruction":26}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valor = void 0;
var Simbolo_1 = require("../../InterpreteXML/TablaSimbolo/Simbolo");
var TipoDato_1 = require("../../InterpreteXML/TablaSimbolo/TipoDato");
var NodoAST_1 = __importDefault(require("../AST/NodoAST"));
var Expresion_1 = require("../Interface/Expresion");
var Valor = /** @class */ (function (_super) {
    __extends(Valor, _super);
    function Valor(col, id, left, right) {
        var _this = _super.call(this, 1, col) || this;
        _this.id = id;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Valor.prototype.buscar = function (lista) {
        throw new Error("Method not implemented.");
    };
    Valor.prototype.evaluar = function () {
        return new Simbolo_1.Simbolo("", TipoDato_1.TipoDato.INT, 1, 0, 0, 0);
    };
    Valor.prototype.concatenar = function () {
        var cadena = "";
        if (this.left != null) {
            cadena += this.left.concatenar();
        }
        if (this.right != null) {
            cadena += this.left.concatenar();
        }
        return cadena;
    };
    Valor.prototype.ast = function () {
        var nodo = new NodoAST_1.default("nodo");
        if (this.left != null) {
            nodo.addHijo(this.left.ast());
        }
        if (this.right != null) {
            if (this.id == "P") {
                nodo.addHijoSimple("[");
            }
            nodo.addHijo(this.right.ast());
            if (this.id == "P") {
                nodo.addHijoSimple("]");
            }
        }
        return nodo;
    };
    return Valor;
}(Expresion_1.Expresion));
exports.Valor = Valor;

},{"../../InterpreteXML/TablaSimbolo/Simbolo":8,"../../InterpreteXML/TablaSimbolo/TipoDato":9,"../AST/NodoAST":12,"../Interface/Expresion":25}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
var TipoDato_1 = require("../../InterpreteXML/TablaSimbolo/TipoDato");
var Expresion = /** @class */ (function () {
    function Expresion(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    Expresion.prototype.BuscarEntorno = function (datos, id, final, pos) {
        var entornos = datos;
        var aux = [];
        if (pos !== 0) {
            for (var j = 0; j < entornos.length; j++) {
                if (entornos[j].id === id) {
                    aux.push(entornos[j]);
                }
            }
            entornos = [];
            entornos.push(aux[pos - 1]);
            aux = [];
        }
        entornos.forEach(function (element) {
            if (element.id === id && element.getTipo() === TipoDato_1.TipoDato.ETIQUETA) {
                if (final) {
                    aux.push(element);
                }
                else {
                    element.entorno.forEach(function (hijo) {
                        aux.push(hijo);
                    });
                }
            }
        });
        entornos = aux;
        return entornos;
    };
    return Expresion;
}());
exports.Expresion = Expresion;

},{"../../InterpreteXML/TablaSimbolo/TipoDato":9}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
var Instruccion = /** @class */ (function () {
    function Instruccion(columna) {
        this.columna = columna;
    }
    Instruccion.prototype.setSalida = function (salida) {
        this.salida = salida;
    };
    Instruccion.prototype.getSalida = function () {
        return this.salida;
    };
    return Instruccion;
}());
exports.Instruccion = Instruccion;

},{}],27:[function(require,module,exports){
const Simbolo = require("../InterpreteXML/TablaSimbolo/Simbolo");
var scriptXML = require("./scriptXML");

document.getElementById("file").addEventListener("change", add, false);
document
  .getElementById("openBrowser")
  .addEventListener("click", openBrowser, false);
document.getElementById("Download").addEventListener("click", Download, false);
document.getElementById("Clean").addEventListener("click", Clean, false);
document.getElementById("Ejecutar").addEventListener("click", Ejecutar, false);

var editor = CodeMirror(document.getElementById("codemirror"), {
  mode: "xml",
  lineNumbers: true,
  theme: "dracula",
  autoRefresh: true,
});
editor.setSize("100%", "100%");

var xpath = CodeMirror(document.getElementById("xpath"), {
  mode: "text",
  theme: "dracula",
  //autoRefresh: true
});
xpath.setSize("100%", "100%");

var res = CodeMirror(document.getElementById("resultado"), {
  mode: "xml",
  lineNumbers: true,
  theme: "dracula",
  autoRefresh: true,
});
res.setSize("100%", "100%");

var container = document.getElementById("grafoXML");
var container2 = document.getElementById("grafoXPATH");

function openBrowser() {
  let fileinput = document.getElementById("file");
  fileinput.click();
}

function add(evt) {
  let fil = evt.target.files[0];
  if (!fil) {
    return;
  }

  if (fil.type == "text/xml") {
    let cuerpo = "";
    let lector = new FileReader();
    lector.onload = function (evt) {
      cuerpo = evt.target.result;
      editor.getDoc().setValue(cuerpo);
    };

    lector.readAsText(fil);
  } else {
    alert("Por favor seleccione un archivo XML.");
  }
}

function Download() {
  let content = editor.getDoc().getValue();
  let nombre = "archivo.xml"; //nombre del archivo
  let file = new Blob([content], { type: "xml" });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, nombre);
  } else {
    let a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function Clean() {
  editor.getDoc().setValue("");
}

function Ejecutar() {
  let objetos = "";
  let contentXML = editor.getDoc().getValue();
  let contentXPath = xpath.getDoc().getValue();
  let Tablasimbolos = "";
  let objetosxpath = "";
  if (document.getElementById("aXml").checked) {
    objetos = scriptXML.ParsearAsc(contentXML);
    Tablasimbolos = scriptXML.BuildSimbolTable(objetos[1]);
    objetosxpath = scriptXML.ParsearAscPath(contentXPath);
  } else {
    objetos = scriptXML.ParsearDesc(contentXML);
    Tablasimbolos = scriptXML.BuildSimbolTable(objetos[1]);
  }
  scriptXML.Graficar(objetos);
  $("#cst-xml").show();
  MostrarCST(scriptXML.dot, container);
  MostrarSimbolos(Tablasimbolos);
  $("#ast-xpath").show();
  scriptXML.GraficarAST(objetosxpath);
  MostrarCST(scriptXML.dot, container2);

  if (document.getElementById("aXPath").checked) {
    alert("Y analisis de XPath ascendente");
  } else {
    alert("Analisis de XML descendente");
  }
}

function MostrarCST(DOTstring, id_div) {
  var parsedData = vis.network.convertDot(DOTstring);
  var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges,
  };

  var options = {
    scale: 0.8,
    nodes: {
      shape: "box",
      size: 15,
      font: {
        color: "#282a36",
        face: "helvetica",
      },
      color: "#ffffff",
    },
    edges: {
      smooth: false,
      arrows: {
        to: true,
      },
    },
    layout: {
      //Clasificación
      hierarchical: {
        levelSeparation: 150, // La distancia entre diferentes niveles
        nodeSpacing: 200, // La distancia mínima entre nodos en el eje libre
        treeSpacing: 500, // La distancia entre diferentes árboles
        // dirección
        direction: "UD",
        sortMethod: "directed", // hubsize, directed
      },
    },
  };

  var network = new vis.Network(id_div, data, options);
}

var cont = 1;
function MostrarSimbolos(simbolos) {
  $("#simbolTable").show();
  let $cuerpo = document.getElementById("tbodyJS");
  cont = 1;
  $cuerpo.innerHTML = "";

  let $tr = document.createElement("tr");
  // Número
  let $conta = document.createElement("th");
  $conta.textContent = cont;
  $tr.appendChild($conta);
  cont = cont + 1;
  // ID
  let $id = document.createElement("td");
  $id.textContent = "Global";
  $tr.appendChild($id);
  // Valor
  let $valor = document.createElement("td");
  $valor.textContent = "";
  $tr.appendChild($valor);
  // Entorno
  let $Entorno = document.createElement("td");
  $Entorno.textContent = "";
  $tr.appendChild($Entorno);

  $cuerpo.appendChild($tr);
  MostrarFilasTabla(simbolos, $cuerpo);
}

function MostrarFilasTabla(simbolo, cuerpo) {
  simbolo.entorno.forEach((element) => {
    let $tr = document.createElement("tr");
    // Número
    let $conta = document.createElement("th");
    $conta.textContent = cont;
    $tr.appendChild($conta);
    cont = cont + 1;
    // ID
    let $id = document.createElement("td");
    $id.textContent = element.id + element.indice;
    $tr.appendChild($id);
    // Valor
    let $valor = document.createElement("td");
    $valor.textContent = element.getValorImplicito();
    $tr.appendChild($valor);
    // Entorno
    let $Entorno = document.createElement("td");
    $Entorno.textContent = simbolo.id + simbolo.indice;
    $tr.appendChild($Entorno);

    cuerpo.appendChild($tr);
    MostrarFilasTabla(element, cuerpo);
  });
}

},{"../InterpreteXML/TablaSimbolo/Simbolo":8,"./scriptXML":28}],28:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsearAscPath = exports.BuildSimbolTable = exports.ParsearDesc = exports.dot = exports.GraficarAST = exports.Graficar = exports.ParsearAsc = void 0;
var Simbolo_1 = require("../InterpreteXML/TablaSimbolo/Simbolo");
var TipoDato_1 = require("../InterpreteXML/TablaSimbolo/TipoDato");
var NodoAST_1 = __importDefault(require("../InterpreteXPath/AST/NodoAST"));
var gramaticaAsc = require("../InterpreteXML/GrammerXML/AscGrammer");
var gramaticaDesc = require("../InterpreteXML/GrammerXML/DescGrammer");
var gramaticaXpathAsc = require("../InterpreteXPath/GramaticaXPath/xpathAsc");
var dot = "";
exports.dot = dot;
var c = 0;
function ParsearAsc(entrada) {
    var objetos = gramaticaAsc.parse(entrada);
    //console.log(objetos);
    return objetos;
}
exports.ParsearAsc = ParsearAsc;
function ParsearDesc(entrada) {
    var objetos = gramaticaDesc.parse(entrada);
    //console.log(objetos);
    return objetos;
}
exports.ParsearDesc = ParsearDesc;
function ParsearAscPath(entrada) {
    var xpath = gramaticaXpathAsc.parse(entrada);
    return xpath;
}
exports.ParsearAscPath = ParsearAscPath;
function Graficar(datos) {
    var instr = new NodoAST_1.default("INICIO");
    datos.forEach(function (element) {
        instr.addHijo(element.obtenerNodos()[0]);
    });
    var grafo = "";
    grafo = getDot(instr);
}
exports.Graficar = Graficar;
function GraficarAST(datos) {
    var instr = new NodoAST_1.default("INICIO");
    datos.forEach(function (element) {
        instr.addHijo(element.ast());
    });
    var grafo = "";
    grafo = getDot(instr);
}
exports.GraficarAST = GraficarAST;
function getDot(raiz) {
    exports.dot = dot = "";
    exports.dot = dot += "digraph {\n";
    exports.dot = dot += 'n0[label="' + raiz.getValor().replace(/\"/g, "") + '"];\n';
    c = 1;
    recorrerAST("n0", raiz);
    exports.dot = dot += "}";
    return dot;
}
function recorrerAST(padre, nPadre) {
    for (var _i = 0, _a = nPadre.getHijos(); _i < _a.length; _i++) {
        var hijo = _a[_i];
        var nombreHijo = "n" + c;
        exports.dot = dot += nombreHijo + '[label="' + hijo.getValor().replace(/\"/g, "") + '"];\n';
        exports.dot = dot += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    }
}
function BuildSimbolTable(listado) {
    var global = new Simbolo_1.Simbolo("Global", TipoDato_1.TipoDato.ARRAY, "", 0, 0);
    var root = new Simbolo_1.Simbolo(listado.identificador, TipoDato_1.TipoDato.ETIQUETA, listado.texto, listado.linea, listado.columna);
    global.entorno.push(root);
    buildGlobal(root, listado);
    return global;
}
exports.BuildSimbolTable = BuildSimbolTable;
function buildGlobal(entorno, padre) {
    if (padre.lista != null) {
        getEtiqueta(entorno, padre.lista, TipoDato_1.TipoDato.ATRIBUTO);
    }
    if (padre.listaObjetos != null) {
        getEtiqueta(entorno, padre.listaObjetos, TipoDato_1.TipoDato.ETIQUETA);
    }
}
function getEtiqueta(entorno, padre, tipo) {
    if (padre.etiqueta != null) {
        if (padre.etiqueta.identificador == "objeto" || padre.etiqueta.identificador == "atributo") {
            getEtiqueta(entorno, padre.etiqueta, tipo);
        }
        else {
            if (tipo == TipoDato_1.TipoDato.ATRIBUTO) {
                getValorAtributo(entorno, padre.etiqueta);
            }
            else {
                getValorObjeto(entorno, padre.etiqueta);
            }
        }
    }
    if (padre.valor != null) {
        if (padre.valor.identificador === "objeto" || padre.valor.identificador === "atributo") {
            getEtiqueta(entorno, padre.valor, tipo);
        }
        else {
            if (tipo == TipoDato_1.TipoDato.ATRIBUTO) {
                getValorAtributo(entorno, padre.valor);
            }
            else {
                getValorObjeto(entorno, padre.valor);
            }
        }
    }
}
function getValorAtributo(entorno, padre) {
    var cont = BuscarRepetido(entorno, padre.identificador);
    var root;
    if (cont > 0) {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ATRIBUTO, padre.valor, padre.fila, padre.columna, cont);
    }
    else {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ATRIBUTO, padre.valor, padre.fila, padre.columna);
    }
    entorno.entorno.push(root);
}
function getValorObjeto(entorno, padre) {
    var cont = BuscarRepetido(entorno, padre.identificador);
    var root;
    if (cont > 0) {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ETIQUETA, padre.texto, padre.fila, padre.columna, cont);
    }
    else {
        root = new Simbolo_1.Simbolo(padre.identificador, TipoDato_1.TipoDato.ETIQUETA, padre.texto, padre.fila, padre.columna);
    }
    entorno.entorno.push(root);
    if (padre.lista != null || padre.listaObjetos != null) {
        buildGlobal(root, padre);
    }
}
function BuscarRepetido(entorno, identi) {
    var id = identi;
    var i = 0;
    var aux = 0;
    for (i; i < entorno.entorno.length; i++) {
        if (id === entorno.entorno[i].id) {
            aux++;
        }
    }
    return aux;
}

},{"../InterpreteXML/GrammerXML/AscGrammer":6,"../InterpreteXML/GrammerXML/DescGrammer":7,"../InterpreteXML/TablaSimbolo/Simbolo":8,"../InterpreteXML/TablaSimbolo/TipoDato":9,"../InterpreteXPath/AST/NodoAST":12,"../InterpreteXPath/GramaticaXPath/xpathAsc":18}]},{},[27]);
