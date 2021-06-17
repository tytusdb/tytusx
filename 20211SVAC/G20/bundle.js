(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.load = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
class Nodo {
    constructor(nombre, hijos) {
        this.hijos = [];
        this.nombre = nombre;
        this.hijos = hijos;
    }
}
exports.Nodo = Nodo;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(descripcion, line = 0, column = 0, type = '') {
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
        this.type = type;
    }
}
exports.Error = Error;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = exports.Comilla = void 0;
var Comilla;
(function (Comilla) {
    Comilla[Comilla["SIMPLE"] = 0] = "SIMPLE";
    Comilla[Comilla["DOBLE"] = 1] = "DOBLE";
})(Comilla = exports.Comilla || (exports.Comilla = {}));
class Atributo {
    constructor(id, valor, linea, columna, comilla) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.comilla = comilla;
        this.textWithoutSpecial = this.setCaracteresEspeciales(valor);
    }
    setCaracteresEspeciales(valor) {
        let value = valor.split("&lt;").join("<");
        value = value.split("&gt;").join(">");
        value = value.split("&amp;").join("&");
        value = value.split("&apos;").join("'");
        value = value.split("&quot;").join('"');
        return value;
    }
}
exports.Atributo = Atributo;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = exports.Etiqueta = void 0;
var Etiqueta;
(function (Etiqueta) {
    Etiqueta[Etiqueta["UNICA"] = 0] = "UNICA";
    Etiqueta[Etiqueta["DOBLE"] = 1] = "DOBLE";
    Etiqueta[Etiqueta["HEADER"] = 2] = "HEADER";
})(Etiqueta = exports.Etiqueta || (exports.Etiqueta = {}));
class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaO, etiqueta) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.etiqueta = etiqueta;
        this.textWithoutSpecial = this.setCaracteresEspeciales(texto);
    }
    setCaracteresEspeciales(valor) {
        let value = valor.split("&lt;").join("<");
        value = value.split("&gt;").join(">");
        value = value.split("&amp;").join("&");
        value = value.split("&apos;").join("'");
        value = value.split("&quot;").join('"');
        return value;
    }
}
exports.Objeto = Objeto;

},{}],8:[function(require,module,exports){
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
var gramatica_XML_ASC = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,9],$V2=[1,13],$V3=[1,16],$V4=[1,17],$V5=[12,15],$V6=[2,40],$V7=[1,22],$V8=[2,9,12,13,15],$V9=[1,33],$Va=[1,32],$Vb=[2,9],$Vc=[1,47],$Vd=[1,59],$Ve=[1,60],$Vf=[1,55],$Vg=[1,52],$Vh=[1,54],$Vi=[1,56],$Vj=[1,50],$Vk=[1,51],$Vl=[1,53],$Vm=[1,57],$Vn=[1,58],$Vo=[1,61],$Vp=[1,62],$Vq=[1,67],$Vr=[1,65],$Vs=[1,66],$Vt=[2,8],$Vu=[8,9,10,12,13,15,19,21,23,31,32,33,34,35],$Vv=[2,8,9,10,12,13,15,19,21,23,31,32,33,34,35],$Vw=[2,5,8],$Vx=[2,21],$Vy=[2,56],$Vz=[1,95],$VA=[1,96],$VB=[2,23],$VC=[1,101],$VD=[1,102];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"RAIZ":4,"EOF":5,"HEAD":6,"OBJETO":7,"lt":8,"qst":9,"xml":10,"LATRIBUTOS":11,"gt":12,"identifier":13,"OBJETOS":14,"div":15,"CONTENIDO_OBJ":16,"ATRIBUTOS":17,"ATRIBUTO":18,"asig":19,"FIN_ATRIBUTO":20,"qmrk":21,"CONTENIDO_ATRB":22,"apost":23,"CONTENIDO_ATRB_SMPL":24,"VALUES_CONT_OBJ":25,"VALUE":26,"LISTA_CONT_ATRB":27,"VALUES_CONT_ATRB":28,"LISTA_CONT_ATRB_SMPL":29,"VALUES_CONT_ATRB_SMPL":30,"contentH":31,"double":32,"integer":33,"minus":34,"Escape":35,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"lt",9:"qst",10:"xml",12:"gt",13:"identifier",15:"div",19:"asig",21:"qmrk",23:"apost",31:"contentH",32:"double",33:"integer",34:"minus",35:"Escape"},
productions_: [0,[3,2],[4,2],[4,1],[4,2],[6,6],[6,6],[6,6],[6,6],[6,6],[6,6],[7,9],[7,8],[7,9],[7,5],[7,9],[7,9],[7,9],[7,9],[7,9],[7,9],[7,8],[7,8],[7,8],[7,8],[7,8],[7,8],[7,9],[7,9],[7,9],[7,9],[7,9],[7,9],[7,5],[7,5],[7,5],[14,2],[14,1],[14,1],[11,1],[11,0],[17,2],[17,1],[18,3],[18,3],[20,3],[20,3],[20,3],[20,3],[20,3],[16,2],[16,1],[25,1],[25,1],[25,1],[22,1],[22,0],[27,2],[27,1],[28,1],[28,1],[28,1],[24,1],[24,0],[29,2],[29,1],[30,1],[30,1],[30,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
                                                                                    reporteGramatical.push('<tr> <td>START</td> <td>RAIZ</td> </tr>');
                                                                                    this.$ = { objeto: $$[$0-1].objeto,
                                                                                        nodos: $$[$0-1].nodo,
                                                                                        erroresSemanticos: erroresSemanticos,
                                                                                        erroresLexicos: erroresLexicos,
                                                                                        erroresSintacticos: erroresSintacticos,
                                                                                        reporteGramatical: reporteGramatical
                                                                                        };
                                                                                    erroresLexicos = [];
                                                                                    erroresSintacticos = [];
                                                                                    erroresSemanticos = [];
                                                                                    reporteGramatical = [];
                                                                                    return this.$;
                                                                               
break;
case 2:

                                                                                    this.$ = { nodo: new Nodo('RAIZ',[$$[$0-1].nodo,$$[$0].nodo]), objeto: [$$[$0-1].objeto,$$[$0].objeto]};
                                                                                    reporteGramatical.push('<tr> <td>RAIZ</td> <td>HEAD OBJETO</td> </tr>');
                                                                               
break;
case 3:

                                                                                    this.$ = { nodo: new Nodo('RAIZ',[$$[$0].nodo]), objeto: [$$[$0].objeto]};
                                                                                    reporteGramatical.push('<tr> <td>RAIZ</td> <td>OBJETO</td> </tr>');
                                                                               
break;
case 4:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-1].first_line + ' y columna: ' + _$[$0-1].first_column + ': No se pudo recuperar el encabezado'));
                                                                                    this.$ = { nodo: new Nodo('RAIZ',[$$[$0].nodo]), objeto: [$$[$0].objeto]};
                                                                                    reporteGramatical.push('<tr> <td>RAIZ</td> <td>ERROR OBJETO</td> </tr>');
                                                                               
break;
case 5:

                                                                                    this.$ = { nodo: new Nodo('HEAD',[new Nodo('lt',[]),new Nodo('qst',[]),new Nodo('xml',[]),$$[$0-2].nodo,new Nodo('qst',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-2].objeto,[],Etiqueta.HEADER)};
                                                                                    reporteGramatical.push('<tr> <td>HEAD</td> <td>lt qst xml LATRIBUTOS qst gt</td> </tr>');
                                                                               
break;
case 6:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-5].first_line + ' y columna: ' + _$[$0-5].first_column + ': Falta < del head'));
                                                                                    this.$ = { nodo: new Nodo('HEAD',[new Nodo('ERROR',[]),new Nodo('qst',[]),new Nodo('xml',[]),$$[$0-2].nodo,new Nodo('qst',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-2].objeto,[],Etiqueta.HEADER)};
                                                                                    reporteGramatical.push('<tr> <td>HEAD</td> <td>ERROR qst xml LATRIBUTOS qst gt</td> </tr>');
                                                                               
break;
case 7:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-5].first_line + ' y columna: ' + _$[$0-5].first_column + ': Falta ? inicial del head'));
                                                                                    this.$ = { nodo: new Nodo('HEAD',[new Nodo('lt',[]),new Nodo('ERROR',[]),new Nodo('xml',[]),$$[$0-2].nodo,new Nodo('qst',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-2].objeto,[],Etiqueta.HEADER)};
                                                                                    reporteGramatical.push('<tr> <td>HEAD</td> <td>lt ERROR xml LATRIBUTOS qst gt</td> </tr>');
                                                                               
break;
case 8:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-5].first_line + ' y columna: ' + _$[$0-5].first_column + ': Falta id xml del head'));
                                                                                    this.$ = { nodo: new Nodo('HEAD',[new Nodo('lt',[]),new Nodo('qst',[]),new Nodo('ERROR',[]),$$[$0-2].nodo,new Nodo('qst',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-2].objeto,[],Etiqueta.HEADER)};
                                                                                    reporteGramatical.push('<tr> <td>HEAD</td> <td>lt qst ERROR LATRIBUTOS qst gt</td> </tr>');
                                                                               
break;
case 9:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-5].first_line + ' y columna: ' + _$[$0-5].first_column + ': Falta ? final del head'));
                                                                                    this.$ = { nodo: new Nodo('HEAD',[new Nodo('lt',[]),new Nodo('qst',[]),new Nodo('xml',[]),$$[$0-2].nodo,new Nodo('ERROR',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-2].objeto,[],Etiqueta.HEADER)};
                                                                                    reporteGramatical.push('<tr> <td>HEAD</td> <td>lt qst xml LATRIBUTOS ERROR gt</td> </tr>');
                                                                               
break;
case 10:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-5].first_line + ' y columna: ' + _$[$0-5].first_column + ': Falta > final del head'));
                                                                                    this.$ = { nodo: new Nodo('HEAD',[new Nodo('lt',[]),new Nodo('qst',[]),new Nodo('xml',[]),$$[$0-2].nodo,new Nodo('qst',[]),new Nodo('ERROR',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-2].objeto,[],Etiqueta.HEADER)};
                                                                                    reporteGramatical.push('<tr> <td>HEAD</td> <td>lt qst xml LATRIBUTOS qst ERROR</td> </tr>');
                                                                               
break;
case 11:

                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt OBJETOS lt div identifier gt</td> </tr>');
                                                                               
break;
case 12:
 
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-5].nodo,new Nodo('gt',[]),new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-6],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-6] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-6] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt lt div identifier gt</td> </tr>');
                                                                               
break;
case 13:
 
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt CONTENIDO_OBJ lt div identifier gt</td> </tr>');
                                                                               
break;
case 14:

                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-2].nodo,new Nodo('div',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-2].objeto,[],Etiqueta.UNICA)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS div gt</td> </tr>');
                                                                               
break;
case 15:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta < etiqueta de inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('ERROR',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>ERROR identifier LATRIBUTOS gt OBJETOS lt div identifier gt</td> </tr>');
                                                                               
break;
case 16:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta id de inicio de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('ERROR',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-1],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt ERROR LATRIBUTOS gt OBJETOS lt div identifier gt</td> </tr>');
                                                                               
break;
case 17:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta > etiqueta de inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('ERROR',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS ERROR OBJETOS lt div identifier gt</td> </tr>');
                                                                               
break;
case 18:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta / cierre de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('ERROR',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt OBJETOS lt ERROR identifier gt</td> </tr>');
                                                                               
break;
case 19:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta id cierre de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('ERROR',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt OBJETOS lt div ERROR gt</td> </tr>');
                                                                               
break;
case 20:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta > cierre de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('ERROR',[]) ]), objeto: new Objeto($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6].objeto,$$[$0-4].objeto,Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt OBJETOS lt div identifier ERROR</td> </tr>');
                                                                               
break;
case 21:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ': Falta etiqueta < de inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('ERROR',[]),new Nodo('identifier',[]),$$[$0-5].nodo,new Nodo('gt',[]),new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-6],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-6] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-6] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>ERROR identifier LATRIBUTOS gt lt div identifier gt</td> </tr>');
                                                                               
break;
case 22:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ': Falta id de inicio de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('ERROR',[]),$$[$0-5].nodo,new Nodo('gt',[]),new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-1],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt ERROR LATRIBUTOS gt lt div identifier gt</td> </tr>');
                                                                               
break;
case 23:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ': Falta > etiqueta inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-5].nodo,new Nodo('ERROR',[]),new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-6],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-6] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-6] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS ERROR lt div identifier gt</td> </tr>');
                                                                               
break;
case 24:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ': Falta / fin de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-5].nodo,new Nodo('gt',[]),new Nodo('lt',[]),new Nodo('ERROR',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-6],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-6] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-6] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt lt ERROR identifier gt</td> </tr>');
                                                                               
break;
case 25:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ': Falta id fin de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-5].nodo,new Nodo('gt',[]),new Nodo('lt',[]),new Nodo('div',[]),new Nodo('ERROR',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-6],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt lt div ERROR gt</td> </tr>');
                                                                               
break;
case 26:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ': Falta > fin de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-5].nodo,new Nodo('gt',[]),new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('ERROR',[]) ]), objeto: new Objeto($$[$0-6],'',_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-5].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-6] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-7].first_line + ' y columna: ' + _$[$0-7].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-6] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt lt div identifier ERROR</td> </tr>');
                                                                               
break;
case 27:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta etiqueta < de inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('ERROR',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>ERROR identifier LATRIBUTOS gt CONTENIDO_OBJ lt div identifier gt</td> </tr>');
                                                                               
break;
case 28:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta id de inicio de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('ERROR',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-1],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt ERROR LATRIBUTOS gt CONTENIDO_OBJ lt div identifier gt</td> </tr>');
                                                                               
break;
case 29:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta > etiqueta de inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('ERROR',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS ERROR CONTENIDO_OBJ lt div identifier gt</td> </tr>');
                                                                               
break;
case 30:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta / etiqueta fin'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('ERROR',[]),new Nodo('identifier',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt CONTENIDO_OBJ lt ERROR identifier gt</td> </tr>');
                                                                               
break;
case 31:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta id etiqueta fin'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('ERROR',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-7],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt CONTENIDO_OBJ lt div ERROR gt</td> </tr>');
                                                                               
break;
case 32:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ': Falta > etiqueta fin'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-6].nodo,new Nodo('gt',[]),$$[$0-4].nodo,new Nodo('lt',[]),new Nodo('div',[]),new Nodo('identifier',[]),new Nodo('ERROR',[]) ]), objeto: new Objeto($$[$0-7],$$[$0-4].objeto,_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-6].objeto,[],Etiqueta.DOBLE)};
                                                                                    if($$[$0-7] !== $$[$0-1]){
                                                                                        erroresSemanticos.push(new Error('Error Semantico en linea ' + _$[$0-8].first_line + ' y columna: ' + _$[$0-8].first_column + ':  No coinciden las etiquetas de apertura y final. ' + $$[$0-7] + ' y ' + $$[$0-1] ));
                                                                                    }
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS gt CONTENIDO_OBJ lt div identifier ERROR</td> </tr>');
                                                                               
break;
case 33:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-4].first_line + ' y columna: ' + _$[$0-4].first_column + ': Falta etiqueta < de inicio'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('ERROR',[]),new Nodo('identifier',[]),$$[$0-2].nodo,new Nodo('div',[]),new Nodo('gt',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-2].objeto,[],Etiqueta.UNICA)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>ERROR identifier LATRIBUTOS div gt</td> </tr>');
                                                                               
break;
case 34:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-4].first_line + ' y columna: ' + _$[$0-4].first_column + ': Falta id de inicio de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('ERROR',[]),$$[$0-2].nodo,new Nodo('div',[]),new Nodo('gt',[]) ]), objeto: new Objeto('ERROR','',_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-2].objeto,[],Etiqueta.UNICA)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt ERROR LATRIBUTOS div gt</td> </tr>');
                                                                               
break;
case 35:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-4].first_line + ' y columna: ' + _$[$0-4].first_column + ': Falta > de cierre de etiqueta'));
                                                                                    this.$ = { nodo: new Nodo('OBJETO',[new Nodo('lt',[]),new Nodo('identifier',[]),$$[$0-2].nodo,new Nodo('div',[]),new Nodo('ERROR',[]) ]), objeto: new Objeto($$[$0-3],'',_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-2].objeto,[],Etiqueta.UNICA)};
                                                                                    reporteGramatical.push('<tr style="background:' + getClr() + ';"> <td>OBJETO</td> <td>lt identifier LATRIBUTOS div ERROR</td> </tr>');
                                                                               
break;
case 36:

                                                                                    $$[$0-1].objeto.push($$[$0].objeto);
                                                                                    this.$ = { nodo: new Nodo('OBJETOS',[$$[$0-1].nodo,$$[$0].nodo]), objeto: $$[$0-1].objeto};
                                                                                    reporteGramatical.push('<tr> <td>OBJETOS</td> <td>OBJETOS OBJETO</td> </tr>');
                                                                               
break;
case 37:

                                                                                    this.$ = { nodo: new Nodo('OBJETOS',[$$[$0].nodo]), objeto: [$$[$0].objeto]};
                                                                                    reporteGramatical.push('<tr> <td>OBJETOS</td> <td>OBJETO</td> </tr>');
                                                                               
break;
case 38:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0].first_line + ' y columna: ' + _$[$0].first_column + ': No se pudo recuperar el objeto'));
                                                                                    this.$ = { nodo: new Nodo('ERROR',[]), objeto: undefined};
                                                                               
break;
case 39:

                                                                                    this.$ = { nodo: new Nodo('LATRIBUTOS',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>LATRIBUTOS</td> <td>ATRIBUTOS</td> </tr>');
                                                                               
break;
case 40:

                                                                                    this.$ = { nodo: new Nodo('LATRIBUTOS',[new Nodo('EpSiLoN',[])]), objeto: []};
                                                                                    reporteGramatical.push('<tr> <td>LATRIBUTOS</td> <td>Epsilon</td> </tr>');
                                                                               
break;
case 41:

                                                                                    $$[$0-1].objeto.push($$[$0].objeto);
                                                                                    this.$ = { nodo: new Nodo('ATRIBUTOS',[$$[$0-1].nodo,$$[$0].nodo]), objeto: $$[$0-1].objeto};
                                                                                    reporteGramatical.push('<tr> <td>ATRIBUTOS</td> <td>ATRIBUTOS ATRIBUTO</td> </tr>');
                                                                               
break;
case 42:

                                                                                    this.$ = { nodo: new Nodo('ATRIBUTOS',[$$[$0].nodo]), objeto: [$$[$0].objeto]};
                                                                                    reporteGramatical.push('<tr> <td>ATRIBUTOS</td> <td>ATRIBUTO</td> </tr>');
                                                                               
break;
case 43:

                                                                                    this.$ = { nodo: new Nodo('ATRIBUTO',[new Nodo('identifier',[]),new Nodo('asig',[]),$$[$0].nodo]), objeto: new Atributo($$[$0-2], $$[$0].objeto.valor, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0].objeto.comilla)};
                                                                                    reporteGramatical.push('<tr> <td>ATRIBUTO</td> <td>identifier asig FIN_ATRIBUTO</td> </tr>');
                                                                               
break;
case 44:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-2].first_line + ' y columna: ' + _$[$0-2].first_column + ': El atributo falta ='));
                                                                                    this.$ = { nodo: new Nodo('ATRIBUTO',[new Nodo('identifier',[]),new Nodo('ERROR',[]),$$[$0].nodo]), objeto: new Atributo($$[$0-2], $$[$0].objeto.valor, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0].objeto.comilla)};
                                                                                    reporteGramatical.push('<tr> <td>ATRIBUTO</td> <td>identifier ERROR FIN_ATRIBUTO</td> </tr>');
                                                                               
break;
case 45:

                                                                                    this.$ = { nodo: new Nodo('FIN_ATRIBUTO',[new Nodo('qmrk',[]),$$[$0-1].nodo,new Nodo('qmrk',[])]), objeto: new Atributo('', $$[$0-1].objeto, _$[$0-2].first_line, _$[$0-2].first_column, Comilla.DOBLE)};
                                                                                    reporteGramatical.push('<tr> <td>FIN_ATRIBUTO</td> <td>qmrk CONTENIDO_ATRB qmrk</td> </tr>');
                                                                               
break;
case 46:
 
                                                                                    this.$ = { nodo: new Nodo('FIN_ATRIBUTO',[new Nodo('apost',[]),$$[$0-1].nodo,new Nodo('apost',[])]), objeto: new Atributo('', $$[$0-1].objeto, _$[$0-2].first_line, _$[$0-2].first_column, Comilla.SIMPLE)};
                                                                                    reporteGramatical.push('<tr> <td>FIN_ATRIBUTO</td> <td>apost CONTENIDO_ATRB_SMPL apost</td> </tr>');
                                                                               
break;
case 47:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-2].first_line + ' y columna: ' + _$[$0-2].first_column + ': El atributo falta doble comilla inicial'));
                                                                                    this.$ = { nodo: new Nodo('FIN_ATRIBUTO',[new Nodo('ERROR',[]),$$[$0-1].nodo,new Nodo('qmrk',[])]), objeto: new Atributo('', $$[$0-1].objeto, _$[$0-2].first_line, _$[$0-2].first_column, Comilla.DOBLE)};
                                                                                    reporteGramatical.push('<tr> <td>FIN_ATRIBUTO</td> <td>ERROR CONTENIDO_ATRB qmrk</td> </tr>');
                                                                               
break;
case 48:

                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-2].first_line + ' y columna: ' + _$[$0-2].first_column + ': El atributo falta doble comilla final'));
                                                                                    this.$ = { nodo: new Nodo('FIN_ATRIBUTO',[new Nodo('qmrk',[]),$$[$0-1].nodo,new Nodo('ERROR',[])]), objeto: new Atributo('', $$[$0-1].objeto, _$[$0-2].first_line, _$[$0-2].first_column, Comilla.DOBLE)};
                                                                                    reporteGramatical.push('<tr> <td>FIN_ATRIBUTO</td> <td>qmrk CONTENIDO_ATRB ERROR</td> </tr>');
                                                                               
break;
case 49:
 
                                                                                    erroresSintacticos.push(new Error('Error Sintactico en linea ' + _$[$0-2].first_line + ' y columna: ' + _$[$0-2].first_column + ': El atributo falta comilla simple final'));
                                                                                    this.$ = { nodo: new Nodo('FIN_ATRIBUTO',[new Nodo('apost',[]),$$[$0-1].nodo,new Nodo('ERROR',[])]), objeto: new Atributo('', $$[$0-1].objeto, _$[$0-2].first_line, _$[$0-2].first_column, Comilla.SIMPLE)};
                                                                                    reporteGramatical.push('<tr> <td>FIN_ATRIBUTO</td> <td>apost CONTENIDO_ATRB_SMPL ERROR</td> </tr>');
                                                                               
break;
case 50:

                                                                                    if(_$[$0-1].last_line == _$[$0].first_line){ 
                                                                                        if(_$[$0-1].last_column < _$[$0].first_column ){
                                                                                            for(let i = 0, size = _$[$0].first_column - _$[$0-1].last_column; i < size; i++ ){
                                                                                                $$[$0-1].objeto = $$[$0-1].objeto + ' ';
                                                                                            }
                                                                                        }
                                                                                    } else {
                                                                                        for(let i = 0, size = _$[$0].first_line - _$[$0-1].last_line; i < size; i++ ){
                                                                                            $$[$0-1].objeto = $$[$0-1].objeto + '\n';
                                                                                        }
                                                                                    }
                                                                                    $$[$0-1].objeto = $$[$0-1].objeto + $$[$0].objeto;
                                                                                    this.$ = { nodo: new Nodo('CONTENIDO_OBJ',[$$[$0-1].nodo,$$[$0].nodo]), objeto: $$[$0-1].objeto};
                                                                                    reporteGramatical.push('<tr> <td>CONTENIDO_OBJ</td> <td>CONTENIDO_OBJ VALUES_CONT_OBJ</td> </tr>');
                                                                               
break;
case 51:

                                                                                    this.$ = { nodo: new Nodo('CONTENIDO_OBJ',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>CONTENIDO_OBJ</td> <td>VALUES_CONT_OBJ</td> </tr>');
                                                                               
break;
case 52:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_OBJ',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_OBJ</td> <td>VALUE</td> </tr>');
                                                                               
break;
case 53:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_OBJ',[new Nodo('qmrk',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_OBJ</td> <td>qmrk</td> </tr>');
                                                                               
break;
case 54:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_OBJ',[new Nodo('apost',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_OBJ</td> <td>apost</td> </tr>');
                                                                               
break;
case 55:

                                                                                    this.$ = { nodo: new Nodo('CONTENIDO_ATRB',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>CONTENIDO_ATRB</td> <td>LISTA_CONT_ATRB</td> </tr>');
                                                                               
break;
case 56:

                                                                                    this.$ = { nodo: new Nodo('CONTENIDO_ATRB',[new Nodo('EpSiLoN',[])]), objeto: ''};
                                                                                    reporteGramatical.push('<tr> <td>CONTENIDO_ATRB</td> <td>Epsilon</td> </tr>');
                                                                               
break;
case 57:

                                                                                    if(_$[$0-1].last_line == _$[$0].first_line){ 
                                                                                        if(_$[$0-1].last_column < _$[$0].first_column ){
                                                                                            for(let i = 0, size = _$[$0].first_column - _$[$0-1].last_column; i < size; i++ ){
                                                                                                $$[$0-1].objeto = $$[$0-1].objeto + ' ';
                                                                                            }
                                                                                        }
                                                                                    } else {
                                                                                        for(let i = 0, size = _$[$0].first_line - _$[$0-1].last_line; i < size; i++ ){
                                                                                            $$[$0-1].objeto = $$[$0-1].objeto + '\n';
                                                                                        }
                                                                                    }
                                                                                    $$[$0-1].objeto = $$[$0-1].objeto + $$[$0].objeto;
                                                                                    this.$ = { nodo: new Nodo('LISTA_CONT_ATRB',[$$[$0-1].nodo,$$[$0].nodo]), objeto: $$[$0-1].objeto};
                                                                                    reporteGramatical.push('<tr> <td>LISTA_CONT_ATRB</td> <td>LISTA_CONT_ATRB VALUES_CONT_ATRB</td> </tr>');
                                                                               
break;
case 58:

                                                                                    this.$ = { nodo: new Nodo('LISTA_CONT_ATRB',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>LISTA_CONT_ATRB</td> <td>VALUES_CONT_ATRB</td> </tr>');
                                                                               
break;
case 59:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_ATRB',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_ATRB</td> <td>VALUE</td> </tr>');
                                                                               
break;
case 60:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_ATRB',[new Nodo('lt',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_ATRB</td> <td>lt</td> </tr>');
                                                                               
break;
case 61:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_ATRB',[new Nodo('apost',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_ATRB</td> <td>apost</td> </tr>');
                                                                               
break;
case 62:

                                                                                    this.$ = { nodo: new Nodo('CONTENIDO_ATRB_SMPL',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>CONTENIDO_ATRB_SMPL</td> <td>LISTA_CONT_ATRB_SMPL</td> </tr>');
                                                                               
break;
case 63:

                                                                                    this.$ = { nodo: new Nodo('CONTENIDO_ATRB_SMPL',[new Nodo('EpSiLoN',[])]), objeto: ''};
                                                                                    reporteGramatical.push('<tr> <td>CONTENIDO_ATRB_SMPL</td> <td>Epsilon</td> </tr>');
                                                                               
break;
case 64:

                                                                                    if(_$[$0-1].last_line == _$[$0].first_line){ 
                                                                                        if(_$[$0-1].last_column < _$[$0].first_column ){
                                                                                            for(let i = 0, size = _$[$0].first_column - _$[$0-1].last_column; i < size; i++ ){
                                                                                                $$[$0-1].objeto = $$[$0-1].objeto + ' ';
                                                                                            }
                                                                                        }
                                                                                    } else {
                                                                                        for(let i = 0, size = _$[$0].first_line - _$[$0-1].last_line; i < size; i++ ){
                                                                                            $$[$0-1].objeto = $$[$0-1].objeto + '\n';
                                                                                        }
                                                                                    }
                                                                                    $$[$0-1].objeto = $$[$0-1].objeto + $$[$0].objeto;
                                                                                    this.$ = { nodo: new Nodo('LISTA_CONT_ATRB_SMPL',[$$[$0-1].nodo,$$[$0].nodo]), objeto: $$[$0-1].objeto};
                                                                                    reporteGramatical.push('<tr> <td>LISTA_CONT_ATRB_SMPL</td> <td>LISTA_CONT_ATRB_SMPL VALUES_CONT_ATRB_SMPL</td> </tr>');
                                                                               
break;
case 65:

                                                                                    this.$ = { nodo: new Nodo('LISTA_CONT_ATRB_SMPL',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>LISTA_CONT_ATRB_SMPL</td> <td>VALUES_CONT_ATRB_SMPL</td> </tr>');
                                                                               
break;
case 66:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_ATRB_SMPL',[$$[$0].nodo]), objeto: $$[$0].objeto};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_ATRB_SMPL</td> <td>VALUE</td> </tr>');
                                                                               
break;
case 67:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_ATRB_SMPL',[new Nodo('lt',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_ATRB_SMPL</td> <td>lt</td> </tr>');
                                                                               
break;
case 68:

                                                                                    this.$ = { nodo: new Nodo('VALUES_CONT_ATRB_SMPL',[new Nodo('qmrk',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUES_CONT_ATRB_SMPL</td> <td>qmrk</td> </tr>');
                                                                               
break;
case 69:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('identifier',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>identifier</td> </tr>');
                                                                               
break;
case 70:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('contentH',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>contentH</td> </tr>');
                                                                               
break;
case 71:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('div',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>div</td> </tr>');
                                                                               
break;
case 72:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('gt',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>gt</td> </tr>');
                                                                               
break;
case 73:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('asig',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>asig</td> </tr>');
                                                                               
break;
case 74:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('double',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>double</td> </tr>');
                                                                               
break;
case 75:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('integer',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>integer</td> </tr>');
                                                                               
break;
case 76:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('qst',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>qst</td> </tr>');
                                                                               
break;
case 77:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('xml',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>xml</td> </tr>');
                                                                               
break;
case 78:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('minus',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>minus</td> </tr>');
                                                                               
break;
case 79:

                                                                                    this.$ = { nodo: new Nodo('VALUE',[new Nodo('Escape',[])]), objeto: $$[$0]};
                                                                                    reporteGramatical.push('<tr> <td>VALUE</td> <td>Escape</td> </tr>');
                                                                               
break;
}
},
table: [{2:[1,5],3:1,4:2,6:3,7:4,8:[1,6]},{1:[3]},{5:[1,7]},{2:$V0,7:8,8:$V1},{5:[2,3]},{2:$V0,7:11,8:$V1,9:[1,12],13:$V2},{2:[1,15],9:[1,14],13:$V3},{1:[2,1]},{5:[2,2]},{2:$V4,13:$V3},{13:$V2},{5:[2,4]},{10:[1,18]},o($V5,$V6,{11:19,17:20,18:21,13:$V7}),{2:[1,24],10:[1,23]},o($V5,$V6,{17:20,18:21,11:26,10:[1,25],13:$V7}),o([2,12,15],$V6,{17:20,18:21,11:27,13:$V7}),o($V5,$V6,{17:20,18:21,11:26,13:$V7}),{9:$V6,11:28,13:$V7,17:20,18:21},{12:[1,29],15:[1,30]},o([2,9,12,15],[2,39],{18:31,13:$V7}),o($V8,[2,42]),{2:$V9,19:$Va},o($Vb,$V6,{17:20,18:21,11:34,13:$V7}),{9:$V6,11:35,13:$V7,17:20,18:21},{9:$V6,11:36,13:$V7,17:20,18:21},{12:[1,37],15:[1,38]},{2:[1,41],12:[1,39],15:[1,40]},{9:[1,42]},{2:$Vc,7:46,8:[1,44],9:$Vd,10:$Ve,12:$Vf,13:$Vg,14:43,15:$Vh,16:45,19:$Vi,21:$Vj,23:$Vk,25:48,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},{12:[1,63]},o($V8,[2,41]),{2:$Vq,20:64,21:$Vr,23:$Vs},{2:$Vq,20:68,21:$Vr,23:$Vs},{2:[1,70],9:[1,69]},{9:[1,71]},{9:[1,72]},{2:$Vc,7:46,8:[1,74],9:$Vd,10:$Ve,12:$Vf,13:$Vg,14:73,15:$Vh,16:75,19:$Vi,21:$Vj,23:$Vk,25:48,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},{12:[1,76]},{2:$Vc,7:46,8:[1,78],9:$Vd,10:$Ve,12:$Vf,13:$Vg,14:77,15:$Vh,16:79,19:$Vi,21:$Vj,23:$Vk,25:48,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},{2:[1,81],12:[1,80]},{2:$Vc,7:46,8:[1,83],9:$Vd,10:$Ve,12:$Vf,13:$Vg,14:82,15:$Vh,16:84,19:$Vi,21:$Vj,23:$Vk,25:48,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},{12:[1,85]},{2:$V0,7:87,8:[1,86]},{2:$V4,13:$V3,15:[1,88]},{8:[1,89],9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$Vj,23:$Vk,25:90,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},o($Vt,[2,37]),o($Vt,[2,38],{13:$V2}),o($Vu,[2,51]),o($Vu,[2,52]),o($Vu,[2,53]),o($Vu,[2,54]),o($Vv,[2,69]),o($Vv,[2,70]),o($Vv,[2,71]),o($Vv,[2,72]),o($Vv,[2,73]),o($Vv,[2,74]),o($Vv,[2,75]),o($Vv,[2,76]),o($Vv,[2,77]),o($Vv,[2,78]),o($Vv,[2,79]),o($Vw,[2,33]),o($V8,[2,43]),o($Vx,$Vy,{22:91,27:92,28:93,26:94,8:$Vz,9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,23:$VA,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp}),o($VB,[2,63],{24:97,29:98,30:99,26:100,8:$VC,9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$VD,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp}),{8:$Vz,9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$Vy,22:103,23:$VA,26:94,27:92,28:93,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},o($V8,[2,44]),{2:[1,105],12:[1,104]},{12:[1,106]},{12:[1,107]},{12:[1,108]},{2:$V0,7:87,8:[1,109]},{2:$V4,13:$V3,15:[1,110]},{8:[1,111],9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$Vj,23:$Vk,25:90,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},o($Vw,[2,34]),{2:$V0,7:87,8:[1,112]},{2:[1,114],13:$V3,15:[1,113]},{8:[1,115],9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$Vj,23:$Vk,25:90,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},o($Vw,[2,14]),o($Vw,[2,35]),{2:$V0,7:87,8:[1,116]},{2:$V4,13:$V3,15:[1,117]},{8:[1,118],9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$Vj,23:$Vk,25:90,26:49,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp},o($Vt,[2,6]),{2:$V4,13:$V3,15:[1,119]},o($Vt,[2,36]),{13:[1,120]},{15:[1,121]},o($Vu,[2,50]),{2:[1,123],21:[1,122]},o($Vx,[2,55],{26:94,28:124,8:$Vz,9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,23:$VA,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp}),o($Vv,[2,58]),o($Vv,[2,59]),o($Vv,[2,60]),o($Vv,[2,61]),{2:[1,126],23:[1,125]},o($VB,[2,62],{26:100,30:127,8:$VC,9:$Vd,10:$Ve,12:$Vf,13:$Vg,15:$Vh,19:$Vi,21:$VD,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp}),o($Vv,[2,65]),o($Vv,[2,66]),o($Vv,[2,67]),o($Vv,[2,68]),{21:[1,128]},o($Vt,[2,5]),o($Vt,[2,10]),o($Vt,$Vb),o($Vt,$Vt),o($Vt,[2,7]),{2:$V4,13:$V3,15:[1,129]},{13:[1,130]},{15:[1,131]},{2:[1,133],13:$V3,15:[1,132]},{2:[1,135],13:[1,134]},o($V5,$V6,{17:20,18:21,11:26,13:[1,136]}),{2:[1,138],15:[1,137]},{2:$V4,13:$V3,15:[1,139]},{13:[1,140]},{15:[1,141]},{13:[1,142]},{12:[1,143]},{13:[1,144]},o($V8,[2,45]),o($V8,[2,48]),o($Vv,[2,57]),o($V8,[2,46]),o($V8,[2,49]),o($Vv,[2,64]),o($V8,[2,47]),{13:[1,145]},{12:[1,146]},{13:[1,147]},{2:[1,149],13:[1,148]},o($V5,$V6,{17:20,18:21,11:26,13:[1,150]}),{2:[1,152],12:[1,151]},{12:[1,153]},{2:$V9,12:[1,154],19:$Va},{2:[1,156],13:[1,155]},{13:[1,157]},{13:[1,158]},{12:[1,159]},{13:[1,160]},{12:[1,161]},o($Vw,$Vx),{12:[1,162]},{12:[1,163]},o($Vw,[2,22]),{12:[1,164]},{2:[1,166],12:[1,165]},{12:[1,167]},{2:$V9,12:[1,168],19:$Va},o($Vw,[2,12]),o($Vw,[2,26]),o($Vw,[2,25]),o($Vw,[2,24]),{2:[1,170],12:[1,169]},{12:[1,171]},{12:[1,172]},{12:[1,173]},o($Vw,$VB),{12:[1,174]},o($Vw,[2,15]),o($Vw,[2,27]),o($Vw,[2,16]),o($Vw,[2,28]),o($Vw,[2,11]),o($Vw,[2,20]),o($Vw,[2,19]),o($Vw,[2,18]),o($Vw,[2,13]),o($Vw,[2,32]),o($Vw,[2,31]),o($Vw,[2,30]),o($Vw,[2,17]),o($Vw,[2,29])],
defaultActions: {4:[2,3],7:[2,1],8:[2,2],11:[2,4]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
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

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    const {Nodo} = require("../AST/Nodo");
    const {Error} = require("../Errores/Error");
    const {Objeto, Etiqueta} = require("../Expresiones/Objeto");
    const {Atributo, Comilla} = require("../Expresiones/Atributo");

    var erroresSemanticos = [];
    var erroresSintacticos = [];
    var erroresLexicos = [];
    var reporteGramatical = [];

    function getClr(){
        return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    }
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
case 0:this.begin('comment');
break;
case 1:this.popState();
break;
case 2:/* skip comment content*/
break;
case 3:/* skip whitespace */
break;
case 4:return 15;
break;
case 5:return 8;
break;
case 6:return 12;
break;
case 7:return 19;
break;
case 8:return 9;
break;
case 9:return 34;
break;
case 10:return 10;
break;
case 11:return 21;
break;
case 12:return 23;
break;
case 13:return 31;
break;
case 14:return 13;
break;
case 15:return 32;
break;
case 16:return 33;
break;
case 17:return 35;
break;
case 18:
                                        erroresLexicos.push(new Error('Error Lexico en linea ' + yy_.yylloc.first_line + ' y columna: ' + yy_.yylloc.first_column + ': ' + yy_.yytext));
                                        //console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
case 19:return 5;
break;
}
},
rules: [/^(?:<!--)/i,/^(?:-->)/i,/^(?:.)/i,/^(?:\s+)/i,/^(?:\/)/i,/^(?:<)/i,/^(?:>)/i,/^(?:=)/i,/^(?:\?)/i,/^(?:-)/i,/^(?:xml\b)/i,/^(?:")/i,/^(?:')/i,/^(?:[^a-zA-Z_0-9ñÑ\-</>=\"?'~@#]+)/i,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ\-]*)/i,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i,/^(?:[0-9]+)/i,/^(?:(\\([\'\"\\bfnrtv])))/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"inclusive":true},"Etiqueta":{"rules":[],"inclusive":false},"INITIAL":{"rules":[0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"inclusive":true}}
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
exports.parser = gramatica_XML_ASC;
exports.Parser = gramatica_XML_ASC.Parser;
exports.parse = function () { return gramatica_XML_ASC.parse.apply(gramatica_XML_ASC, arguments); };
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
},{"../AST/Nodo":4,"../Errores/Error":5,"../Expresiones/Atributo":6,"../Expresiones/Objeto":7,"_process":3,"fs":1,"path":2}],9:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,12,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31],$V1=[2,9],$V2=[1,6],$V3=[5,6],$V4=[2,4],$V5=[1,28],$V6=[1,11],$V7=[1,12],$V8=[1,13],$V9=[1,14],$Va=[1,15],$Vb=[1,16],$Vc=[1,17],$Vd=[1,18],$Ve=[1,19],$Vf=[1,20],$Vg=[1,21],$Vh=[1,22],$Vi=[1,23],$Vj=[1,24],$Vk=[1,25],$Vl=[1,26],$Vm=[1,29],$Vn=[2,5,6,11,12,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31],$Vo=[1,55],$Vp=[1,51],$Vq=[1,52],$Vr=[1,53],$Vs=[1,54],$Vt=[1,56],$Vu=[1,57],$Vv=[1,58],$Vw=[1,59],$Vx=[2,5,6,11,12,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,35,36,37,38,39,40,41,42,43,44,45,46,47,49],$Vy=[1,76],$Vz=[1,74],$VA=[1,75],$VB=[1,77],$VC=[1,78],$VD=[1,79],$VE=[1,80],$VF=[1,81],$VG=[1,82],$VH=[1,83],$VI=[1,84],$VJ=[1,85],$VK=[1,86],$VL=[27,35,36,37,38,39,40,41,42,43,44,45,46,47,49],$VM=[35,36,37,39,40,41,42,43,44,45,46,49],$VN=[35,39,40,41,42,43,44,45,46,49];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"PATHS":4,"EOF":5,"|":6,"PATH":7,"NODES":8,"SLASH":9,"EL":10,"div":11,"id":12,"PRE":13,"resParent":14,"::":15,"resChild":16,"resSelf":17,"resPrec":18,"resPrecSibling":19,"resAttribute":20,"resDesc":21,"resDescSelf":22,"resAnc":23,"resAncSelf":24,"resFollow":25,"resFollowSibling":26,"*":27,"..":28,".":29,"ATTR":30,"@":31,"ATTR_P":32,"[":33,"E":34,"]":35,"+":36,"-":37,"opDiv":38,"=":39,"!=":40,"<":41,">":42,"<=":43,">=":44,"opOr":45,"opAnd":46,"opMod":47,"(":48,")":49,"double":50,"integer":51,"StringLiteral":52,"resLast":53,"resPosition":54,"resText":55,"resNode":56,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"|",11:"div",12:"id",14:"resParent",15:"::",16:"resChild",17:"resSelf",18:"resPrec",19:"resPrecSibling",20:"resAttribute",21:"resDesc",22:"resDescSelf",23:"resAnc",24:"resAncSelf",25:"resFollow",26:"resFollowSibling",27:"*",28:"..",29:".",31:"@",33:"[",35:"]",36:"+",37:"-",38:"opDiv",39:"=",40:"!=",41:"<",42:">",43:"<=",44:">=",45:"opOr",46:"opAnd",47:"opMod",48:"(",49:")",50:"double",51:"integer",52:"StringLiteral",53:"resLast",54:"resPosition",55:"resText",56:"resNode"},
productions_: [0,[3,2],[4,3],[4,1],[7,1],[8,3],[8,2],[9,2],[9,1],[9,0],[10,1],[10,2],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,3],[10,1],[10,1],[10,1],[10,1],[10,1],[30,2],[32,1],[32,1],[13,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,1],[34,1],[34,1],[34,1],[34,3],[34,3],[34,3],[34,3],[34,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

                                    this.$ =    { 
                                                XPath: $$[$0-1],
                                                SyntaxErrors: xPathAscSyntaxErrors,
                                                LexerErrors: xPathAscLexerErrors
                                            };

                                    var nodo = {
                                        name: 'START',
                                        val: 'START',
                                        children: [xPathAscAST_path]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}

                                    xPathAscLexerErrors = [];
                                    xPathAscSyntaxErrors = [];

                                    return this.$; 
                                
break;
case 2:
 
                                    $$[$0-2].push($$[$0]) 
                                    this.$ = $$[$0-2]
                                    var nodo = {
                                        name: 'PATHS', 
                                        val: 'PATHS', 
                                        children: [
                                            xPathAscAST_path,
                                            {name: '|', val: '|', children: []},
                                            xPathAscAST_pathAux
                                        ]
                                    }
                                    xPathAscAST_path = nodo
                                
break;
case 3:
 
                                    this.$ = [$$[$0]]
                                    var nodo = {name: 'PATHS', val: 'PATHS', children: [xPathAscAST_pathAux]}
                                    xPathAscAST_path = nodo
                                
break;
case 4:
 
                                    this.$ = $$[$0] 
                                    var nodo = {name: 'PATH', val: 'PATH', children: [xPathAscAST_nodes]}
                                    // this.$ = {...this.$, Nodo: nodo}
                                    xPathAscAST_pathAux = nodo
                                
break;
case 5:

                                    $$[$0].slashes = $$[$0-1].count
                                    $$[$0-2].push($$[$0])
                                    this.$ = $$[$0-2]
                                    var nodo = {
                                        name: 'NODES',
                                        val: 'NODES',
                                        children: [
                                            xPathAscAST_nodes,
                                            $$[$0].Nodo
                                        ]
                                    }
                                    xPathAscAST_nodes = nodo
                                
break;
case 6:

                                    $$[$0].slashes = $$[$0-1].count
                                    this.$ = [$$[$0]]
                                    var nodo = {
                                        name: 'NODES',
                                        val: 'NODES',
                                        children: [
                                            $$[$0-1].Nodo
                                        ]
                                    }
                                    xPathAscAST_nodes = nodo
                                
break;
case 7:
 
                                    this.$ = { count: 2 }
                                    var nodo = {
                                        name: 'SLASH',
                                        val: 'SLASH',
                                        children: [
                                            {name: 'div', val: '/', children: []},
                                            {name: 'div', val: '/', children: []},
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 8:
 
                                    this.$ = { count: 1 }
                                    var nodo = {
                                        name: 'SLASH',
                                        val: 'SLASH',
                                        children: [{name: 'div', val: '/', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 9:
 
                                    this.$ = { count: 0 }
                                    var nodo = {
                                        name: 'SLASH',
                                        val: 'SLASH',
                                        children: []
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 10:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: 'id', val: $$[$0], children: []},]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 11:
 
                                    this.$ = new Element($$[$0-1], TypeElement.NODO, $$[$0], 1, _$[$0-1].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: 'id', val: $$[$0-1], children: []},{name: 'PRE', val: $$[$0], children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 12:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resParent', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 13:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resChild', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 14:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resSelf', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 15:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resPrec', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 16:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resPrecSibling', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 17:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resAttribute', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 18:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resDesc', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 19:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resDescSelf', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 20:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resAnc', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 21:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resAncSelf', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 22:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resFollow', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 23:
 
                                    this.$ = new Element($$[$0], TypeElement.NODO, undefined, 1, _$[$0-2].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [
                                            {name: 'resFollowSibling', val: $$[$0-2], children: []}, 
                                            {name: 'id', val: $$[$0], children: []}
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 24:
 
                                    this.$ = new Element('', TypeElement.ALL, [], 1, _$[$0].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: '*', val: '*', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 25:
 
                                    this.$ = new Element('', TypeElement.PARENT, [], 1, _$[$0].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: '..', val: '..', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 26:
 
                                    this.$ = new Element('', TypeElement.CURRENT, [], 1, _$[$0].first_column) 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [{name: '.', val: '.', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 27:
 
                                    this.$ = $$[$0] 
                                    var nodo = {
                                        name: 'EL',
                                        val: 'EL',
                                        children: [$$[$0].Nodo]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 28:
 
                                    var xPathSyntaxAscError = new Error(
                                        yytext,
                                        this._$.first_line,
                                        this._$.first_column,
                                        'Error sintáctico'    
                                    )
                                    xPathAscSyntaxErrors.push(xPathSyntaxAscError) 
                                
break;
case 29:
 
                                    this.$ = $$[$0] 
                                    var nodo = {
                                        name: 'ATTR',
                                        val: 'ATTR',
                                        children: [
                                            {name: '@', val: '@', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 30:
 
                                    this.$ = new Element($$[$0], TypeElement.ATRIBUTO, [], 1, _$[$0].first_column)
                                    var nodo = {
                                        name: 'ATTR_P',
                                        val: 'ATTR_P',
                                        children: [{name: 'id', val: $$[$0], children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 31:
 
                                    this.$ = new Element($$[$0], TypeElement.ALL_ATRIBUTO, [], 1, _$[$0].first_column)
                                    var nodo = {
                                        name: 'ATTR_P',
                                        val: 'ATTR_P',
                                        children: [{name: '*', val: '*', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 32:
 
                                    this.$ = $$[$0-1] 
                                    var nodo = {
                                        name: 'PRE',
                                        val: 'PRE',
                                        children: [
                                            {name: '{', val: '{', children: []},
                                            $$[$0-1].Nodo,
                                            {name: '}', val: '}', children: []},
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 33:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.SUMA)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '+', val: '+', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 34:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.RESTA)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '-', val: '-', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 35:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.MULTIPLICACION)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '*', val: '*', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 36:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.DIVISION)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: 'div', val: 'div', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 37:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.IGUAL)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '=', val: '=', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 38:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.DIFERENTE)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '!=', val: '!=', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 39:
 
                                    console.log({E1: $$[$0-2], op: $$[$0-1], E2: $$[$0]})
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.MENOR)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '<', val: '<', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 40:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.MAYOR)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '>', val: '>', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 41:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.MENOR_IGUAL)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '<=', val: '<=', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 42:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.MAYOR_IGUAL)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: '>=', val: '>=', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 43:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.OR)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: 'or', val: 'or', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 44:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.AND)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: 'and', val: 'and', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 45:
 
                                    
                                    var op = new Operation(1, _$[$0-2].first_column, TypeOperation.MOD)
                                    op.saveBinaryOp($$[$0-2], $$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            $$[$0-2].Nodo,
                                            {name: 'mod', val: 'mod', children: []},
                                            $$[$0].Nodo
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 46:
 
                                    this.$ = $$[$0-1] 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [
                                            {name: '(', val: '(', children: []},
                                            $$[$0-1].Nodo,
                                            {name: ')', val: ')', children: []},
                                        ]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 47:
 
                                    var op = new Operation(1, _$[$0].first_column, TypeOperation.DOUBLE)
                                    op.savePrimitiveOp($$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'double', val: $$[$0], children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 48:
 
                                    var op = new Operation(1, _$[$0].first_column, TypeOperation.INTEGER)
                                    op.savePrimitiveOp($$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'integer', val: $$[$0], children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 49:
 
                                    var op = new Operation(1, _$[$0].first_column, TypeOperation.STRING)
                                    op.savePrimitiveOp($$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'string', val: $$[$0], children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 50:
 
                                    var op = new Operation(1, _$[$0].first_column, TypeOperation.ID)
                                    op.savePrimitiveOp($$[$0])
                                    this.$ = op
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'id', val: 'id', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 51:
 
                                    this.$ = new Operation('LAST'.first_line, _$[$0-2].first_column, TypeOperation.LAST) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'last()', val: 'last()', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 52:
 
                                    this.$ = new Operation('POSITION'.first_line, _$[$0-2].first_column, TypeOperation.POSITION) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'position()', val: 'position()', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 53:
 
                                    this.$ = new Operation('TEXT'.first_line, _$[$0-2].first_column, TypeOperation.TEXT) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'text()', val: 'text()', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 54:
 
                                    this.$ = new Operation('NODE'.first_line, _$[$0-2].first_column, TypeOperation.NODE) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [{name: 'node()', val: 'node()', children: []}]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
case 55:
 
                                    this.$ = new Operation($$[$0].name, $$[$0].linea, $$[$0].columna, TypeOperation.ATRIBUTO) 
                                    var nodo = {
                                        name: 'E',
                                        val: 'E',
                                        children: [$$[$0].Nodo]
                                    }
                                    this.$ = {...this.$, Nodo: nodo}
                                
break;
}
},
table: [o($V0,$V1,{3:1,4:2,7:3,8:4,9:5,11:$V2}),{1:[3]},{5:[1,7],6:[1,8]},o($V3,[2,3]),o($V0,$V1,{9:9,5:$V4,6:$V4,11:$V2}),{2:$V5,10:10,12:$V6,14:$V7,16:$V8,17:$V9,18:$Va,19:$Vb,20:$Vc,21:$Vd,22:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,28:$Vk,29:$Vl,30:27,31:$Vm},o($V0,[2,8],{11:[1,30]}),{1:[2,1]},o($V0,$V1,{8:4,9:5,7:31,11:$V2}),{2:$V5,10:32,12:$V6,14:$V7,16:$V8,17:$V9,18:$Va,19:$Vb,20:$Vc,21:$Vd,22:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,28:$Vk,29:$Vl,30:27,31:$Vm},o($Vn,[2,6]),o($Vn,[2,10],{13:33,33:[1,34]}),{15:[1,35]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{15:[1,39]},{15:[1,40]},{15:[1,41]},{15:[1,42]},{15:[1,43]},{15:[1,44]},{15:[1,45]},{15:[1,46]},o($Vn,[2,24]),o($Vn,[2,25]),o($Vn,[2,26]),o($Vn,[2,27]),o($Vn,[2,28]),{12:[1,48],27:[1,49],32:47},o($V0,[2,7]),o($V3,[2,2]),o($Vn,[2,5]),o($Vn,[2,11]),{12:$Vo,30:60,31:$Vm,34:50,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:[1,61]},{12:[1,62]},{12:[1,63]},{12:[1,64]},{12:[1,65]},{12:[1,66]},{12:[1,67]},{12:[1,68]},{12:[1,69]},{12:[1,70]},{12:[1,71]},{12:[1,72]},o($Vx,[2,29]),o($Vx,[2,30]),o($Vx,[2,31]),{27:$Vy,35:[1,73],36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{12:$Vo,30:60,31:$Vm,34:87,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},o($VL,[2,47]),o($VL,[2,48]),o($VL,[2,49]),o($VL,[2,50]),{48:[1,88]},{48:[1,89]},{48:[1,90]},{48:[1,91]},o($VL,[2,55]),o($Vn,[2,12]),o($Vn,[2,13]),o($Vn,[2,14]),o($Vn,[2,15]),o($Vn,[2,16]),o($Vn,[2,17]),o($Vn,[2,18]),o($Vn,[2,19]),o($Vn,[2,20]),o($Vn,[2,21]),o($Vn,[2,22]),o($Vn,[2,23]),o($Vn,[2,32]),{12:$Vo,30:60,31:$Vm,34:92,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:93,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:94,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:95,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:96,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:97,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:98,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:99,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:100,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:101,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:102,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:103,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{12:$Vo,30:60,31:$Vm,34:104,48:$Vp,50:$Vq,51:$Vr,52:$Vs,53:$Vt,54:$Vu,55:$Vv,56:$Vw},{27:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK,49:[1,105]},{49:[1,106]},{49:[1,107]},{49:[1,108]},{49:[1,109]},o($VM,[2,33],{27:$Vy,38:$VB,47:$VK}),o($VM,[2,34],{27:$Vy,38:$VB,47:$VK}),o($VL,[2,35]),o($VL,[2,36]),o($VN,[2,37],{27:$Vy,36:$Vz,37:$VA,38:$VB,47:$VK}),o($VN,[2,38],{27:$Vy,36:$Vz,37:$VA,38:$VB,47:$VK}),o($VN,[2,39],{27:$Vy,36:$Vz,37:$VA,38:$VB,47:$VK}),o($VN,[2,40],{27:$Vy,36:$Vz,37:$VA,38:$VB,47:$VK}),o($VN,[2,41],{27:$Vy,36:$Vz,37:$VA,38:$VB,47:$VK}),o($VN,[2,42],{27:$Vy,36:$Vz,37:$VA,38:$VB,47:$VK}),o([35,45,49],[2,43],{27:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,46:$VJ,47:$VK}),o([35,45,46,49],[2,44],{27:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,47:$VK}),o($VL,[2,45]),o($VL,[2,46]),o($VL,[2,51]),o($VL,[2,52]),o($VL,[2,53]),o($VL,[2,54])],
defaultActions: {7:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
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

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

        const { Error } = require('../Errores/Error')
        const { Element, Filter, Operation, TypeElement, TypeOperation } = require('../Instrucciones/Element/Element')

        var xPathAscSyntaxErrors = []
        var xPathAscLexerErrors = []
        var xPathAscAST_nodes
        var xPathAscAST_path
        var xPathAscAST_pathAux
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
case 1:return 53
break;
case 2:return 'resAttr'
break;
case 3:return 56
break;
case 4:return 55
break;
case 5:return 54
break;
case 6:return 14
break;
case 7:return 16
break;
case 8:return 17
break;
case 9:return 18
break;
case 10:return 19
break;
case 11:return 20
break;
case 12:return 21
break;
case 13:return 22
break;
case 14:return 23
break;
case 15:return 24
break;
case 16:return 25
break;
case 17:return 26
break;
case 18:return 38
break;
case 19:return 47
break;
case 20:return 'oPor'
break;
case 21:return 46
break;
case 22:return 36
break;
case 23:return 37
break;
case 24:return 27
break;
case 25:return 39
break;
case 26:return 40
break;
case 27:return 41
break;
case 28:return 42
break;
case 29:return 43
break;
case 30:return 44
break;
case 31:return 11
break;
case 32:return 6
break;
case 33:return 29
break;
case 34:return 28
break;
case 35:return 15
break;
case 36:return 31
break;
case 37:return 33
break;
case 38:return 35
break;
case 39:return 48
break;
case 40:return 49
break;
case 41:return 50;
break;
case 42:return 51;
break;
case 43:return 'string';
break;
case 44:return 12;
break;
case 45:return 52
break;
case 46:return 5
break;
case 47:
                                                            var lexerAscError = new Error(
                                                                yy_.yytext, 
                                                                yy_.yylloc.first_line, 
                                                                yy_.yylloc.first_column, 
                                                                'Error léxico'
                                                            );
                                                            xPathAscSyntaxErrors.push(lexerAscError)
                                                        
break;
}
},
rules: [/^(?:\s+)/i,/^(?:last\b)/i,/^(?:attr\b)/i,/^(?:node\b)/i,/^(?:text\b)/i,/^(?:position\b)/i,/^(?:parent\b)/i,/^(?:child\b)/i,/^(?:self\b)/i,/^(?:preceding\b)/i,/^(?:preceding-sibling\b)/i,/^(?:attribute\b)/i,/^(?:descendant\b)/i,/^(?:descendant-or-self\b)/i,/^(?:ancestor\b)/i,/^(?:ancestor-or-self\b)/i,/^(?:folowing\b)/i,/^(?:folowing-sibling\b)/i,/^(?:div\b)/i,/^(?:mod\b)/i,/^(?:or\b)/i,/^(?:and\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:\/)/i,/^(?:\|)/i,/^(?:\.)/i,/^(?:\.\.)/i,/^(?:::)/i,/^(?:@)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\()/i,/^(?:\))/i,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i,/^(?:[0-9]+)/i,/^(?:"[^\"]*")/i,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],"inclusive":true}}
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
},{"../Errores/Error":5,"../Instrucciones/Element/Element":10,"_process":3,"fs":1,"path":2}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = exports.Filter = exports.Operation = exports.TypeElement = exports.TypeOperation = void 0;
var TypeOperation;
(function (TypeOperation) {
    TypeOperation[TypeOperation["SUMA"] = 0] = "SUMA";
    TypeOperation[TypeOperation["RESTA"] = 1] = "RESTA";
    TypeOperation[TypeOperation["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TypeOperation[TypeOperation["DIVISION"] = 3] = "DIVISION";
    TypeOperation[TypeOperation["IGUAL"] = 4] = "IGUAL";
    TypeOperation[TypeOperation["DIFERENTE"] = 5] = "DIFERENTE";
    TypeOperation[TypeOperation["MENOR"] = 6] = "MENOR";
    TypeOperation[TypeOperation["MAYOR"] = 7] = "MAYOR";
    TypeOperation[TypeOperation["MENOR_IGUAL"] = 8] = "MENOR_IGUAL";
    TypeOperation[TypeOperation["MAYOR_IGUAL"] = 9] = "MAYOR_IGUAL";
    TypeOperation[TypeOperation["OR"] = 10] = "OR";
    TypeOperation[TypeOperation["AND"] = 11] = "AND";
    TypeOperation[TypeOperation["MOD"] = 12] = "MOD";
    TypeOperation[TypeOperation["DOUBLE"] = 13] = "DOUBLE";
    TypeOperation[TypeOperation["INTEGER"] = 14] = "INTEGER";
    TypeOperation[TypeOperation["STRING"] = 15] = "STRING";
    TypeOperation[TypeOperation["ID"] = 16] = "ID";
    TypeOperation[TypeOperation["LAST"] = 17] = "LAST";
    TypeOperation[TypeOperation["POSITION"] = 18] = "POSITION";
    TypeOperation[TypeOperation["TEXT"] = 19] = "TEXT";
    TypeOperation[TypeOperation["ATRIBUTO"] = 20] = "ATRIBUTO";
})(TypeOperation = exports.TypeOperation || (exports.TypeOperation = {}));
var TypeElement;
(function (TypeElement) {
    TypeElement[TypeElement["ATRIBUTO"] = 0] = "ATRIBUTO";
    TypeElement[TypeElement["NODO"] = 1] = "NODO";
    TypeElement[TypeElement["ALL"] = 2] = "ALL";
    TypeElement[TypeElement["CURRENT"] = 3] = "CURRENT";
    TypeElement[TypeElement["PARENT"] = 4] = "PARENT";
    TypeElement[TypeElement["ALL_ATRIBTO"] = 5] = "ALL_ATRIBTO";
})(TypeElement = exports.TypeElement || (exports.TypeElement = {}));
class Operation {
    constructor(line, column, type) {
        this.linea = line;
        this.columna = column;
        this.typeOp = type;
    }
    /* OPERACION BINARIA */
    saveBinaryOp(left, right) {
        this.leftOp = left;
        this.rightOp = right;
    }
    /* OPERACION UNARIA */
    saveUnaryOp(left) {
        this.leftOp = left;
    }
    /* OPERACION PRIMITIVA */
    savePrimitiveOp(value) {
        this.value = value;
    }
    ejecutar(ent, arbol) {
        throw new Error('Method not implemented.');
    }
}
exports.Operation = Operation;
class Filter {
    constructor(line, column, name, operation) {
        this.linea = line;
        this.columna = column;
        this.name = name;
        this.operation = operation;
    }
    ejecutar(ent, arbol) {
        throw new Error('Method not implemented.');
    }
}
exports.Filter = Filter;
class Element {
    constructor(name, type, filters, line, column) {
        this.linea = line;
        this.columna = column;
        this.name = name;
        this.type = type;
        this.slashes = 0;
        this.filters = filters;
    }
    ejecutar(ent, arbol) {
        throw new Error('Method not implemented.');
    }
}
exports.Element = Element;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Objeto_1 = require("./Expresiones/Objeto");
const Atributo_1 = require("./Expresiones/Atributo");
const Element_1 = require("./Instrucciones/Element/Element");
const xmlAsc = require('./Gramatica/gramatica_XML_ASC');
const xpathAsc = require('./Gramatica/xpathAsc');
class Main {
    constructor() {
        this.lexicos = [];
        this.lista_objetos = [];
        this.lista_objetos_xpath = [];
        this.listacst = [];
        this.nodos = [];
        this.edges = [];
        this.nodoscst = [];
        this.edgescst = [];
        this.nodoxpath = [];
        this.edgesxpath = [];
        this.tablaSimbolos = '';
        this.i = 1;
        this.j = 1;
    }
    ejecutarCodigoXmlAsc(entrada) {
        console.log('ejecutando xmlAsc ...');
        window.localStorage.setItem('reporteGramatical', '');
        const objetos = xmlAsc.parse(entrada);
        // console.log('**********');
        console.log(objetos);
        // console.log('**********');
        this.lista_objetos = objetos.objeto;
        this.listacst = objetos.nodos;
        console.log(this.listacst);
        if (this.lista_objetos.length > 1) {
            console.log(this.getXmlFormat(this.lista_objetos[1]));
        }
        else {
            console.log(this.getXmlFormat(this.lista_objetos[0]));
        }
        window.localStorage.setItem('lexicos', JSON.stringify(objetos.erroresLexicos));
        if (objetos !== undefined) {
            let reporteGramatical = '';
            for (let i = objetos.reporteGramatical.length - 1; i >= 0; i--) {
                reporteGramatical += objetos.reporteGramatical[i];
            }
            window.localStorage.setItem('reporteGramatical', reporteGramatical);
        }
    }
    ejecutarCodigoXpathAsc(entrada) {
        console.log('ejecutando xpathAsc ...');
        const objetos = xpathAsc.parse(entrada);
        console.log(objetos);
        this.lista_objetos_xpath = objetos.Nodo;
        // this.execPath_list(objetos.XPath);
    }
    getXmlFormat(objeto) {
        let contenido = '';
        let atributos = '';
        let etiqueta = '';
        for (let i = 0, size = objeto.listaAtributos.length; i < size; i++) {
            if (Atributo_1.Comilla.SIMPLE === objeto.listaAtributos[i].comilla) {
                atributos +=
                    objeto.listaAtributos[i].identificador +
                        "='" +
                        objeto.listaAtributos[i].textWithoutSpecial +
                        "'";
            }
            else {
                atributos +=
                    objeto.listaAtributos[i].identificador +
                        '="' +
                        objeto.listaAtributos[i].textWithoutSpecial +
                        '"';
            }
            if (i !== size - 1) {
                atributos += ' ';
            }
        }
        etiqueta += '\n<' + objeto.identificador;
        if (atributos !== '') {
            etiqueta += ' ' + atributos + ' ';
        }
        if (objeto.etiqueta === Objeto_1.Etiqueta.DOBLE) {
            etiqueta += '>';
            if (objeto.listaObjetos.length > 0) {
                for (let i = 0, size = objeto.listaObjetos.length; i < size; i++) {
                    let children = this.getXmlFormat(objeto.listaObjetos[i]);
                    contenido += children;
                }
            }
            else {
                contenido += objeto.textWithoutSpecial;
            }
            if (objeto.listaObjetos.length > 0) {
                etiqueta += '\t\t' + contenido;
                etiqueta += '\n';
            }
            else {
                etiqueta += contenido;
            }
            etiqueta += '</' + objeto.identificador + '>';
        }
        else if (objeto.etiqueta === Objeto_1.Etiqueta.UNICA) {
            etiqueta += '/>';
        }
        return etiqueta;
    }
    readFile(e) {
        console.log('read file ...');
        var file = e.target.files[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            let target = e.target;
            if (target !== undefined && target !== null) {
                console.log('load text ...');
                var contents = target.result;
                var element = document.getElementById('codeBlock');
                if (element !== undefined && element !== null) {
                    element.value = contents;
                }
                else {
                    console.log('Error set content');
                }
            }
            else {
                console.log('Error read file');
            }
        };
        reader.readAsText(file);
    }
    prueba() {
        console.log('hola mundo');
    }
    getErroresLexicos() {
        let lex = window.localStorage.getItem('lexicos');
        if (lex) {
            this.lexicos = JSON.parse(lex);
            console.log(this.lexicos);
            var tbodyRef = document.getElementById('keywords');
            this.lexicos.forEach((element) => {
                let newRow = tbodyRef.insertRow();
                let newCell = newRow.insertCell();
                let newText2 = document.createTextNode(element.descripcion);
                newCell.appendChild(newText2);
            });
        }
        //setup our table array
    }
    TablaSimbolos() {
        window.localStorage.setItem('TablaSimbolosXML', '');
        this.lista_objetos.forEach((element) => {
            // console.log(element.identificador);
            let aux = '<tr><td>' +
                element.identificador +
                '</td><td>Objeto</td><td>Global</td>' +
                '<td>' +
                element.linea +
                '</td><td>' +
                element.columna +
                '</td></tr>';
            this.tablaSimbolos = this.tablaSimbolos + aux;
            this.getObjetosTablaxml(element.listaObjetos, element.identificador);
            if (element.listaAtributos) {
                this.getAtributosTablaxml(element.listaAtributos, element.identificador);
            }
        });
        window.localStorage.setItem('TablaSimbolosXML', this.tablaSimbolos);
    }
    getObjetosTablaxml(listaObjeto, ambito) {
        listaObjeto.forEach((element) => {
            let aux = '<tr><td>' +
                element.identificador +
                '</td><td>Objeto</td><td>' +
                ambito +
                '</td>' +
                '<td>' +
                element.linea +
                '</td><td>' +
                element.columna +
                '</td></tr>';
            this.tablaSimbolos = this.tablaSimbolos + aux;
            this.getObjetosTablaxml(element.listaObjetos, element.identificador);
            if (element.listaAtributos) {
                this.getAtributosTablaxml(element.listaAtributos, element.identificador);
            }
        });
    }
    getAtributosTablaxml(listaObjeto, ambito) {
        listaObjeto.forEach((element) => {
            let aux = '<tr><td>' +
                element.identificador +
                '</td><td>Atributo</td><td>' +
                ambito +
                '</td>' +
                '<td>' +
                element.linea +
                '</td><td>' +
                element.columna +
                '</td></tr>';
            this.tablaSimbolos = this.tablaSimbolos + aux;
            if (element.textWithoutSpecial != '') {
                aux =
                    '<tr><td>' +
                        element.textWithoutSpecial +
                        '</td><td>Atributo</td><td>' +
                        element.identificador +
                        '</td>' +
                        '<td>' +
                        element.linea +
                        '</td><td>' +
                        element.columna +
                        '</td></tr>';
                this.tablaSimbolos = this.tablaSimbolos + aux;
            }
        });
    }
    graficar() {
        this.nodos = [];
        this.edges = [];
        let aux = {
            id: 1,
            label: 's',
        };
        this.nodos.push(aux);
        this.lista_objetos.forEach((element) => {
            // console.log(element.identificador);
            this.i++;
            let padre = this.i;
            let aux = {
                id: padre,
                label: element.identificador,
            };
            this.nodos.push(aux);
            let aux2 = {
                from: 1,
                to: this.i,
            };
            this.edges.push(aux2);
            this.getObjetos(element.listaObjetos, padre);
            if (element.listaAtributos) {
                this.getAtributos(element.listaAtributos, padre);
            }
        });
        window.localStorage.setItem('nodos', JSON.stringify(this.nodos));
        window.localStorage.setItem('edges', JSON.stringify(this.edges));
        //console.log(this.nodos);
        //console.log(this.edges);
    }
    getAtributos(listaObjeto, padre) {
        listaObjeto.forEach((element) => {
            this.i++;
            let hijo = this.i;
            let aux = {
                id: hijo,
                label: element.identificador,
            };
            let aux2 = {
                from: padre,
                to: hijo,
            };
            this.nodos.push(aux);
            this.edges.push(aux2);
            if (element.textWithoutSpecial != '') {
                this.i++;
                aux = {
                    id: this.i,
                    label: element.textWithoutSpecial,
                };
                aux2 = {
                    from: hijo,
                    to: this.i,
                };
                this.nodos.push(aux);
                this.edges.push(aux2);
            }
        });
    }
    getObjetos(listaObjeto, padre) {
        listaObjeto.forEach((element) => {
            this.i++;
            let hijo = this.i;
            let aux = {
                id: this.i,
                label: element.identificador,
            };
            let aux2 = {
                from: padre,
                to: this.i,
            };
            this.nodos.push(aux);
            this.edges.push(aux2);
            if (element.textWithoutSpecial != '') {
                this.i++;
                aux = {
                    id: this.i,
                    label: element.textWithoutSpecial,
                };
                aux2 = {
                    from: hijo,
                    to: this.i,
                };
                this.nodos.push(aux);
                this.edges.push(aux2);
            }
            this.getObjetos(element.listaObjetos, this.i);
            if (element.listaAtributos) {
                this.getAtributos(element.listaAtributos, hijo);
            }
        });
    }
    arbolXpath() {
        this.i = 1;
        this.nodoxpath = [];
        this.edgesxpath = [];
        let aux = {
            id: 1,
            label: 's',
        };
        this.nodoxpath.push(aux);
        let element = this.lista_objetos_xpath;
        console.log(element);
        console.log(element.val);
        this.i++;
        let padre = this.i;
        aux = {
            id: padre,
            label: element.val,
        };
        this.nodoxpath.push(aux);
        let aux2 = {
            from: 1,
            to: this.i,
        };
        this.edgesxpath.push(aux2);
        this.getObjetosXpath(element.children, padre);
        window.localStorage.setItem('nodosxpath', JSON.stringify(this.nodoxpath));
        window.localStorage.setItem('edgesxpath', JSON.stringify(this.edgesxpath));
        console.log(this.nodoxpath);
        console.log(this.edgesxpath);
    }
    graficarcst(nodos, padre) {
        console.log('entra?');
        this.getnodoscst(nodos, padre);
        window.localStorage.setItem('nodoscst', JSON.stringify(this.nodoscst));
        window.localStorage.setItem('edgescst', JSON.stringify(this.edgescst));
    }
    getnodoscst(nodos, papa) {
        let aux = nodos;
        let auxnodos = {
            id: papa,
            label: aux.nombre,
        };
        this.nodoscst.push(auxnodos);
        let nodohijo = aux.hijos;
        if (nodohijo && nodohijo.length > 0) {
            nodohijo.forEach((element) => {
                this.j++;
                let hijo = this.j;
                let auxedges = {
                    from: papa,
                    to: hijo,
                };
                this.edgescst.push(auxedges);
                this.getnodoscst(element, hijo);
            });
        }
    }
    getObjetosXpath(listaObjeto, padre) {
        listaObjeto.forEach((element) => {
            if (element != undefined) {
                this.i++;
                let aux = {
                    id: this.i,
                    label: element.val,
                };
                let aux2 = {
                    from: padre,
                    to: this.i,
                };
                this.nodoxpath.push(aux);
                this.edgesxpath.push(aux2);
                this.getObjetosXpath(element.children, this.i);
            }
        });
    }
    execPath_list(pathList) {
        /** //root/message | //root/price | /@abc */
        pathList.forEach((path) => {
            console.log(`PATH LIST: ${path.length}`);
            this.execNodes_list(path);
        });
    }
    execNodes_list(nodeList) {
        let rootXML = {
            elements: this.lista_objetos.length > 1
                ? [this.lista_objetos[1]]
                : [this.lista_objetos[0]],
            parent: undefined,
        };
        nodeList.forEach((node) => {
            if (typeof node === 'string')
                return;
        });
        this.searchElement(rootXML, nodeList, 0);
    }
    checkRoot(rootXML, nodeList) {
        let root = rootXML.elements;
        if (nodeList[0].type === Element_1.TypeElement.NODO) {
            if (nodeList[0].slashes === 0 || nodeList[0].slashes === 1) {
                // NODOS++ & BUSCAR EN ELEMENTOS | ATRIBUTOS DE ROOT
                if (nodeList[0].name === root.identificador)
                    return 1;
            }
            else if (nodeList[0].slashes === 2) {
                // NODO++ & BUSCAR EN ELEMENTOS | ATRIBUTOS HIJOS DE ROOT
                if (nodeList[0].name === root.identificador)
                    return 1;
                // NODO++ & BUSCAR EN ELEMENTOS HIJOS DE ROOT
                return 2;
            }
        }
        else if (nodeList[0].type === Element_1.TypeElement.CURRENT) {
            // NODO++ & BUSCAR EN ELEMENTOS | ATRIBUTOS DE ROOT
            if (nodeList[1].name === root.identificador ||
                nodeList[1].type === Element_1.TypeElement.ALL)
                return 3;
        }
        else if (nodeList[0].type === Element_1.TypeElement.ALL) {
            // NODO++ & BUSCAR EN ELEMENTOS | ATRIBUTOS DE ROOT
            return 1;
        }
        else if (nodeList[0].type === Element_1.TypeElement.ATRIBUTO) {
            // NODO++ & BUSCAR EN ATRIBUTOS DE ROOT
            if (nodeList[0].slashes === 2)
                return 2;
        }
        // ROOT NO COINCIDE
        return 0;
    }
    searchElement(rootXML, nodeList, index) {
        // console.log(rootXML);
        // VALIDAR ATRIBUTOS EN PROFUNDIDAD
        let resXML = rootXML;
        if (nodeList.length === index)
            this.printElements(rootXML.elements);
        rootXML.elements.forEach((element) => {
            resXML.elements = element.listaObjetos;
            resXML.parent = element;
            if (nodeList[index].type === Element_1.TypeElement.ALL) {
                if (nodeList.length > index + 1) {
                    this.searchElement(resXML, nodeList, index + 1);
                }
                else {
                    this.printElement(element);
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.ATRIBUTO) {
                if (this.searchAttributes(element.listaAtributos, nodeList[index].name)) {
                    this.printElement(element);
                }
                else if (nodeList[index].slashes == 2) {
                    this.searchElement(resXML, nodeList, index);
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.NODO) {
                if (nodeList[index].name === element.identificador) {
                    if (nodeList.length > index + 1) {
                        this.searchElement(resXML, nodeList, index + 1);
                    }
                    else {
                        this.printElement(element);
                    }
                }
                else if (nodeList[index].slashes == 2) {
                    if (nodeList.length > index) {
                        this.searchElement(resXML, nodeList, index);
                    }
                    else {
                        this.printElement(element);
                    }
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.CURRENT) {
                if (nodeList.length > index + 1)
                    this.searchElement(rootXML, nodeList, index + 1);
                else {
                    this.printElement(element);
                }
            }
            else if (nodeList[index].type === Element_1.TypeElement.PARENT) {
            }
        });
    }
    searchAttributes(attrs, attrName) {
        let result = false;
        attrs.forEach((attr) => {
            if (attr.identificador === attrName)
                result = true;
        });
        return result;
    }
    printElement(element) {
        console.info(element);
    }
    printElements(elements) {
        elements.forEach((element) => {
            console.info(element);
        });
    }
    setListener() {
        let inputFile = document.getElementById('open-file');
        if (inputFile !== undefined && inputFile !== null) {
            inputFile.addEventListener('change', this.readFile, false);
            console.log('inputFile activo');
        }
        let analizeXmlAsc = document.getElementById('analizeXmlAsc');
        if (analizeXmlAsc !== undefined && analizeXmlAsc !== null) {
            console.log('btn xmlAsc activo');
            analizeXmlAsc.addEventListener('click', () => {
                // ANALIZAR XML
                let codeBlock = document.getElementById('codeBlock');
                let content = codeBlock !== undefined && codeBlock !== null
                    ? codeBlock.value
                    : '';
                this.ejecutarCodigoXmlAsc(content);
                this.graficar();
                this.j = 1;
                this.graficarcst(this.listacst, this.j);
            });
        }
        let analizeXPathAsc = document.getElementById('analizeXPathAsc');
        if (analizeXPathAsc !== undefined && analizeXPathAsc !== null) {
            console.log('btn xpathAsc activo');
            analizeXPathAsc.addEventListener('click', () => {
                // ANALIZAR XML
                let input = document.getElementById('codeXPath');
                let content = input !== undefined && input !== null ? input.value : '';
                this.ejecutarCodigoXpathAsc(content);
                this.arbolXpath();
            });
        }
        let clean = document.getElementById('clean');
        if (clean !== undefined && clean !== null) {
            console.log('btn clean activo');
            clean.addEventListener('click', () => {
                let codeBlock = document.getElementById('codeBlock');
                if (codeBlock !== undefined && codeBlock !== null) {
                    codeBlock.value = '';
                }
            });
        }
        let tablaErrores = document.getElementById('tablaErrores');
        if (tablaErrores !== undefined && tablaErrores !== null) {
            console.log('btn Tabla Errores Activo');
            tablaErrores.addEventListener('click', () => {
                this.getErroresLexicos();
            });
        }
        let tablaSimbolosxml = document.getElementById('tablaxml');
        if (tablaSimbolosxml !== undefined && tablaSimbolosxml !== null) {
            console.log('btn Tabla Simbolos Activo');
            tablaSimbolosxml.addEventListener('click', () => {
                this.TablaSimbolos();
            });
        }
        let xmlcst = document.getElementById('arbolcst');
        if (xmlcst !== undefined && xmlcst !== null) {
            console.log('btn arbol cst Activo');
            xmlcst.addEventListener('click', () => { });
        }
    }
}
exports.Main = Main;

},{"./Expresiones/Atributo":6,"./Expresiones/Objeto":7,"./Gramatica/gramatica_XML_ASC":8,"./Gramatica/xpathAsc":9,"./Instrucciones/Element/Element":10}]},{},[11])(11)
});
