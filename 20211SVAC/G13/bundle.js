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
/*var Dracula = require("graphdracula");
var Graph = Dracula.Graph;
var p = Dracula.Renderer.Raphael.prototype;
Dracula.Renderer.Raphael.prototype = p;
var render = function (r, n) {
    var set = r
        .set()
        .push(
            r
                .rect(n.point[0] - 30, n.point[1] - 13, 50, 50)
                .attr({ fill: "#fa8", "stroke-width": 2, r: 9 })
        )
        .push(
            r.text(n.point[0], n.point[1] + 15, n.id).attr({ "font-size": "20px" })
        );
    return set;
};*/

function graficarAst(ast) {
    //Dracula.Renderer.defaultRenderFunc = render;
    //var Renderer = Dracula.Renderer.Raphael;
    //var Layout = Dracula.Layout.Spring;
    //var graph = new Graph();

    let nodos = [];
    let aristas = [];

    //graph.addNode("" + ast.id, { label: "lista_consultas" });
    nodos.push({id: ast.id, label: "lista_consultas" });

    ast.lista_consultas.forEach((element) => {
        //graph.addNode("" + element.id, { label: "consulta" });
        nodos.push({id: element.id, label: "consulta" });
        //graph.addEdge("" + ast.id, "" + element.id, { directed: true });
        aristas.push({from: ast.id, to: element.id})

        element.consulta.forEach((element2) => {
            //graph.addNode("" + element2.acceso.id, { label: "acceso" });
            nodos.push({id: element2.acceso.id, label: "acceso" });
            /*graph.addEdge("" + element.id, "" + element2.acceso.id, {
                directed: true,
            });*/
            aristas.push({from: element.id, to: element2.acceso.id});

            /*graph.addNode("" + element2.acceso.ambito.id, {
                label: element2.acceso.ambito.ambito,
            });*/
            nodos.push({id: element2.acceso.ambito.id, label: element2.acceso.ambito.ambito });
            /*graph.addNode("" + element2.acceso.valor.id, {
                label: element2.acceso.valor.valor,
            });*/
            nodos.push({id: element2.acceso.valor.id, label: element2.acceso.valor.valor });
            
            /*graph.addEdge("" + element2.acceso.id, "" + element2.acceso.ambito.id, {
                directed: true,
            });*/
            aristas.push({from: element2.acceso.id, to: element2.acceso.ambito.id })
            /*graph.addEdge("" + element2.acceso.id, "" + element2.acceso.valor.id, {
                directed: true,
            });*/
            aristas.push({from: element2.acceso.id, to: element2.acceso.valor.id });
        });
    });
    var nodes = new vis.DataSet(nodos);
    var edges = new vis.DataSet(aristas);
    //console.log()
    var container = document.getElementById("canvas");
    var data = {
        nodes: nodes,
        edges: edges
    }

    var options = {
        autoResize: true,
        height: '400px',
        clickToUse: false,
        layout: {
            hierarchical: {
                direction: 'UD',
                sortMethod: 'directed',
            }
        },
        physics: {
           stabilization: false,
           barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
           }
        },
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 15,
                color: '#000000'
            },
            borderWidth: 2
        }
     };
    var network = new vis.Network(container, data, options);
    /*var layouter = new Dracula.Layout.Spring(graph);
    layouter.layout();
    var renderer = new Dracula.Renderer.Raphael("#canvas", graph, 1080, 520);
    renderer.draw();*/
}

module.exports.graficarAst = graficarAst;
},{}],5:[function(require,module,exports){

function graficarCst(cst) {
    
    const resultArray = [];
    addNestedChildrenToArray(cst.S, resultArray, null, "S");
    

    let contador = false;

    let nodos = [];
    let aristas = [];

    resultArray.forEach(element => {
        if(contador) {
            nodos.push({id: parseInt(element.split("_._")[1], 10), label: element.split("_._")[2] });
            aristas.push({from: parseInt(element.split("_._")[0], 10), to: parseInt(element.split("_._")[1], 10) })
        } else {
            nodos.push({id: parseInt(element.split("_._")[1], 10), label: element.split("_._")[2] })
            contador = true;
        }
    });

    var nodes = new vis.DataSet(nodos);
    var edges = new vis.DataSet(aristas);
    
    var container = document.getElementById("canvas1");
    var data = {
        nodes: nodes,
        edges: edges
    }

    var options = {
        autoResize: true,
        height: '400px',
        clickToUse: false,
        layout: {
            hierarchical: {
                direction: 'UD',
                sortMethod: 'directed',
            }
        },
        physics: {
           stabilization: false,
           barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
           }
        },
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 15,
                color: '#000000'
            },
            borderWidth: 2
        }
     };

    var network = new vis.Network(container, data, options);

}

function addNestedChildrenToArray(obj, resultArray, padre, nombre) {
	resultArray.push(padre + "_._" + obj.node_id + "_._" + nombre);
    obj.node_list.forEach(child => addNestedChildrenToArray(child, resultArray, obj.node_id, child.node_name));
}


module.exports.graficarCst = graficarCst;
},{}],6:[function(require,module,exports){
var parserXMLA = require('./src/XML.js').parser;
var parserXMLD = require('./src/xmldes.js').parser;

var parserXPathA = require('./src/indexXPath');
var parserXPathD = require('./src/XPathDesc').parser;

var dibujarXpath = require('./arbolASTXpath');
var dibujarXmlCST = require('./arbolCSTxml');
var tablaSimbolos = require('./tablaSimbolos');


let objetoXml;

let objetoXpathAsc;
let objetoXpathDes;

let variablePath;

cargarArchivo = () => {
    let archivos = document.getElementById("customFile").files;

    let archivo = archivos[0];

    let reader = new FileReader();

    reader.onload = function(e) {
        let arc = e.target.result
        document.getElementById("taCS").value = archivoABox(arc);
        
    }
    reader.readAsText(archivo)

} 

function archivoABox(entrada) {
    let limpio = [];

    for(let i = 0; i < entrada.length; i++) {
        limpio.push(entrada.charAt(i));
    }
    
    return limpio.join("");
}

parseXMLASC = () => {
    execXMLASC(document.getElementById('taCS').value);
}

parseXMLDES = () => {
    execXMLDES(document.getElementById('taCS').value);
}

hacerConsulta = () => {
    let textoQuery = document.getElementById('taQuery').value;
    execXpatASC(textoQuery);
    console.log(textoQuery);
}

function execXMLASC (input) {
    objetoXml = parserXMLA.parse(input);

    limpiarTabla('gramTabla');
    tablaGramaticaXml(objetoXml[2]);
    
    limpiarTabla('simbolosXml');
    simbolosXml(objetoXml[0]);

    dibujarXmlCST.graficarCst(objetoXml[1]);
    
    if(objetoXml[3].length > 0) {
        limpiarTabla('erroresXml');
        erroresXml(objetoXml[3]);
    } 
    
    return; 
}

function execXMLDES (input) {
    objetoXml = parserXMLD.parse(input);

    limpiarTabla('gramTabla');
    tablaGramaticaXml(objetoXml[2]);

    limpiarTabla('simbolosXml');
    simbolosXml(objetoXml[0]);

    dibujarXmlCST.graficarCst(objetoXml[1]);

    if(objetoXml[3].length > 0) {
        limpiarTabla('erroresXml');
        erroresXml(objetoXml[3]);
    } 

    return;
}

function execXpatASC(input) {
    objetoXpathAsc = parserXPathA.execAscendente(input, objetoXml[0]);

    document.getElementById('taResult').value = objetoXpathAsc;

    variablePath = parserXPathA.aJson();
    console.log(variablePath);
    dibujarXpath.graficarAst(variablePath);
}

// llenar tabla de gramatica
function tablaGramaticaXml(tabla) {
    let tbodyRef = document.getElementById('gramTabla').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    tabla.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.produccion }</td>
                    <td>${ element.accion }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}
// tabla errores
function erroresXml(errores) {
    let tbodyRef = document.getElementById('erroresXml').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    errores.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.contenido }</td>
                    <td>${ element.mensaje }</td>
                    <td>${ element.tipo }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.columna }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

function simbolosXml(simbolos) {
    let arrSimbolos = tablaSimbolos.hacerTablaSimbolos(simbolos);

    let tbodyRef = document.getElementById('simbolosXml').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    arrSimbolos.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.nombre }</td>
                    <td>${ element.tipo }</td>
                    <td>${ element.ambito }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.columna }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

function limpiarTabla(nombreTabla) {
    let tableHeaderRowCount = 1;
    let table = document.getElementById(nombreTabla);
    let rowCount = table.rows.length; 

    for(let i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}
},{"./arbolASTXpath":4,"./arbolCSTxml":5,"./src/XML.js":20,"./src/XPathDesc":22,"./src/indexXPath":23,"./src/xmldes.js":24,"./tablaSimbolos":25}],7:[function(require,module,exports){
"use strict";
//Clase de los atributos que puede tener una etiqueta XML
Object.defineProperty(exports, "__esModule", { value: true });
var AtributoXML = /** @class */ (function () {
    /**
     * Constructor de un atributo para una etiqueta xml
     * @param atributo nombre de atributo
     * @param contenido cadena con contenido del atributo
     * @param fila fila donde se encontro un atributo
     * @param columna columna donde se entonctro un atributo
     */
    function AtributoXML(atributo, contenido, fila, columna) {
        this.contenido = ''; //Contenido del atributo
        this.atributo = atributo;
        this.setContenido(contenido);
        this.fila = (fila != undefined) ? fila : 0;
        this.columna = (columna != undefined) ? columna : 0;
    }
    /**
     * Normaliza entrada de un atributo y setea el contenido del atributo
     * @param cont void
     */
    AtributoXML.prototype.setContenido = function (cont) {
        var cadena = cont.replace('\n', '').replace('\t', '').replace('\r', '');
        if (cadena.replace('\n', '') === '') {
            this.contenido = '';
        }
        else {
            this.contenido = cont.replace(/"/g, '');
        }
    };
    /**
     * Retorna el atributo  en una cadena: atributo = contenido
     * @returns string
     */
    AtributoXML.prototype.toString = function () {
        return this.atributo + '=' + this.contenido;
    };
    return AtributoXML;
}());
exports.AtributoXML = AtributoXML;

},{}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Division = void 0;
var Literal_1 = require("./Literal");
var Division = /** @class */ (function () {
    //linea: number;
    //columna: number;
    function Division(izq, der, l, c) {
        this.operacion = 'div';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    Division.prototype.getValor = function () {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor();
        var e2 = this.hD.getValor();
        if (e1.tipo == 0) {
            if (e2.tipo == 0) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseInt(e1.valor.toString()) / parseInt(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else if (e2.tipo == 1) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseInt(e1.valor.toString()) / parseFloat(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else {
                //ERROR: tipo2 no es valido para las divisiones
            }
        }
        else if (e1.tipo == 1) {
            if (e2.tipo == 0) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseFloat(e1.valor.toString()) / parseInt(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else if (e2.tipo == 1) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseFloat(e1.valor.toString()) / parseFloat(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else {
                //ERROR: tipo2 no es valido para las divisiones
            }
        }
        else {
            //ERROR: tipo1 no es valido para las divisiones
        }
        return res;
    };
    return Division;
}());
exports.Division = Division;

},{"./Literal":12}],9:[function(require,module,exports){
"use strict";
//Clase para los errores encontrados durante el analisis
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    /**
     * Contructor de un objeto de error
     * @param tipo tipo de error (lexico|sintactico|semantico)
     * @param contenido contenido del error
     * @param linea linea de error
     * @param columna columna de error
     * @param mensaje mensaje sobre tipo de error encontrado
     */
    function Error(tipo, contenido, linea, columna, mensaje) {
        this.tipo = tipo;
        this.contenido = contenido;
        this.linea = linea;
        this.columna = columna;
        this.mensaje = mensaje;
    }
    /**
     * Retorna cadena con informacion del error
     * @returns string
     */
    Error.prototype.toString = function () {
        var cadena = '';
        cadena += ' Tipo: ' + this.tipo +
            " Error:'" + this.contenido + "' en linea:" + this.linea + ' columna:' + this.columna
            + ' Mensaje:' + this.mensaje;
        return cadena;
    };
    return Error;
}());
exports.Error = Error;

},{}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Clase para guardar las filas del reporte gramatical
var FilaGrammar = /** @class */ (function () {
    /**
     *
     * @param arreglo arreglo de cadenas(string) con contenido de gramatica [0->produccion,1->accion]
     */
    function FilaGrammar(arreglo) {
        this.produccion = (arreglo[0] != null) ? arreglo[0] : '';
        this.accion = (arreglo[1] != null) ? arreglo[1] : '';
    }
    return FilaGrammar;
}());
exports.FilaGrammar = FilaGrammar;

},{}],12:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Literal = void 0;
var Literal = /** @class */ (function () {
    function Literal(t, v, l, c) {
        this.tipo = t;
        this.valor = v;
        this.linea = l;
        this.columna = c;
    }
    Literal.prototype.getValor = function () {
        return new Literal(this.tipo, this.valor, this.linea, this.columna);
    };
    return Literal;
}());
exports.Literal = Literal;

},{}],13:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Modulo = void 0;
var Literal_1 = require("./Literal");
var Modulo = /** @class */ (function () {
    //linea: number;
    //columna: number;
    function Modulo(izq, der, l, c) {
        this.operacion = 'mod';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    Modulo.prototype.getValor = function () {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor();
        var e2 = this.hD.getValor();
        if (e1.tipo == 0) {
            if (e2.tipo == 0) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseInt(e1.valor.toString()) % parseInt(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else if (e2.tipo == 1) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseInt(e1.valor.toString()) % parseFloat(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else {
                //ERROR: tipo2 no es valido para para obtener el modulo
            }
        }
        else if (e1.tipo == 1) {
            if (e2.tipo == 0) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseFloat(e1.valor.toString()) % parseInt(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else if (e2.tipo == 1) {
                if (parseInt(e2.valor.toString()) != 0) {
                    res.tipo = 1;
                    res.valor = parseFloat(e1.valor.toString()) % parseFloat(e2.valor.toString());
                    return res;
                }
                else {
                    //ERROR: valor2 no puede ser 0
                }
            }
            else {
                //ERROR: tipo2 no es valido para obtener el modulo
            }
        }
        else {
            //ERROR: tipo1 no es valido para para obtener el modulo
        }
        return res;
    };
    return Modulo;
}());
exports.Modulo = Modulo;

},{"./Literal":12}],14:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Multiplicacion = void 0;
var Literal_1 = require("./Literal");
var Multiplicacion = /** @class */ (function () {
    //linea: number;
    //columna: number;
    function Multiplicacion(izq, der, l, c) {
        this.operacion = '*';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    Multiplicacion.prototype.getValor = function () {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor();
        var e2 = this.hD.getValor();
        if (e1.tipo == 0) {
            if (e2.tipo == 0) {
                res.tipo = 0;
                res.valor = parseInt(e1.valor.toString()) * parseInt(e2.valor.toString());
                return res;
            }
            else if (e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseInt(e1.valor.toString()) * parseFloat(e2.valor.toString());
                return res;
            }
            else {
                //ERROR: tipo2 no es valido para las multiplicaciones
            }
        }
        else if (e1.tipo == 1) {
            if (e2.tipo == 0) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) * parseInt(e2.valor.toString());
                return res;
            }
            else if (e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) * parseFloat(e2.valor.toString());
                return res;
            }
            else {
                //ERROR: tipo2 no es valido para las multiplicaciones
            }
        }
        else {
            //ERROR: tipo1 no es valido para las multiplicaciones
        }
        return res;
    };
    return Multiplicacion;
}());
exports.Multiplicacion = Multiplicacion;

},{"./Literal":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nodo = /** @class */ (function () {
    /**
     * Constructor de Nodo para estructura del CST
     * @param node_id numero de nodo
     * @param name nombre del nodo
     * @param content contenido del nodo
     * @param list lista de nodos hijos
     */
    function Nodo(id, name, list, content) {
        this.node_id = id;
        this.node_name = name;
        this.node_content = (content != undefined) ? content : '';
        this.node_list = (list != undefined) ? list : [];
    }
    /**
     * Agrega un nodo a lista de nodos
     * @param nodo void
     */
    Nodo.prototype.addNodo = function (nodo) {
        if (nodo != undefined) {
            this.node_list.push(nodo);
        }
    };
    /**
     * Devuleve cadena con las propiedades del nodo
     * @returns string
     */
    Nodo.prototype.toString = function () {
        var cadena = 'Nodo:' + this.node_name + ' Contenido:' + this.node_content;
        return cadena;
    };
    /**
     * Setea el objeto de produccion para un nodo
     * @param produ void
     */
    Nodo.prototype.setProdu = function (produ) {
        this.node_production = produ;
    };
    /**
     * Metodo que obtiene arreglo con objetos de produccion de gramatica y de nodos sus hijos
     * @returns FilaGrammar[]
     */
    Nodo.prototype.getGrammar = function () {
        var resultado = new Array();
        if (this.node_production != undefined) {
            resultado.push(this.node_production);
            var size = this.node_list.length;
            for (var i = 0; i < size; i++) {
                if (this.node_list[i] != undefined) {
                    resultado = resultado.concat(this.node_list[i].getGrammar());
                }
            }
        }
        return resultado;
    };
    return Nodo;
}());
exports.Nodo = Nodo;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjetoXML = /** @class */ (function () {
    /**
     * Constructor para un objeto/etiqueta XML
     * @param tipo tipo de objeto/etiqueta xml, 1:<tag /> | 0:<tag></tag>
     * @param etiqueta_id nombre que identifica la etiqueta de objeto xml
     * @param contenido contenido dentro de una etiqueta xml, string
     * @param lista_atributos lista con atributos de un objeto/etiqueta xml
     * @param lista_objetos lista de objetos que un objeto/etiqueta xml puede contener
     * @param linea linea donde fue encontrada la etiqueta
     * @param columna columna donde fue encontrada la etiqueta
     */
    function ObjetoXML(tipo, etiqueta_id, contenido, lista_atributos, lista_objetos, linea, columna) {
        this.contenido = ''; //contenido de la etiqueta, el texto
        this.tipo = tipo;
        this.setContenido(contenido);
        this.etiqueta_id = etiqueta_id;
        this.linea = (linea != undefined) ? linea : 0;
        this.columna = (columna != undefined) ? columna : 0;
        this.lista_atributos = (lista_atributos != undefined) ? lista_atributos : [];
        this.lista_objetos = (lista_objetos != undefined) ? lista_objetos : [];
    }
    /**
     * Asigna el padre de una etiqueta
     * @param padre void
     */
    ObjetoXML.prototype.setPadre = function (padre) {
        this.padre = padre;
    };
    /**
     * Agrega un atributo a la lista de atributos de una etiqueta XML
     * @param atributo void
     */
    ObjetoXML.prototype.addAtributo = function (atributo) {
        if (atributo != undefined) {
            this.lista_atributos.push(atributo);
        }
    };
    /**
     * Agrega un nuevo objeto a la lista de objetos de una etiqueta
     * @param objeto void
     */
    ObjetoXML.prototype.addObjeto = function (objeto) {
        if (objeto != undefined) {
            this.lista_objetos.push(objeto);
        }
    };
    /**
     * Verifica si la lista de atributos esta vacia
     * @returns boolean
     */
    ObjetoXML.prototype.atributosIsEmpty = function () {
        if (this.lista_atributos === null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Verifica que la cadena de entrada no este vacia y arregla la cadena si hay caracteres especiales
     * @param cont void
     */
    ObjetoXML.prototype.setContenido = function (cont) {
        //comprueba que la cadena no solo tenga espacios_en_blanco/tabs/saltos
        var cadena = cont.toString().replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/ /g, '');
        if (cadena != '') {
            /**
             * reemplaza los caracteres especiales
             * &alt = <
             * &amp = &
             * &gt  = >
             * &quot = "
             * &apos = '
             */
            cont = cont.toString().replace(/&alt;/g, '<').replace(/&amp/g, '&').replace(/&gt/g, '>').replace(/&quot;/g, '"'.replace(/&apos;/g, "'"));
            this.contenido = cont;
        }
        else {
            this.contenido = '';
        }
    };
    /**
     * retorna cadena con el formato de XML <tag {atributos} > {elementos/contenido} </tag>
     * @returns string
     */
    ObjetoXML.prototype.toString = function (iden) {
        if (iden === void 0) { iden = ''; }
        var cadena = '';
        var elementos = '';
        var atributos = '';
        if (this.lista_atributos.length > 0) {
            atributos += ' ';
            this.lista_atributos.forEach(function (element) { atributos += element.toString() + ' '; });
            atributos += '';
        }
        this.lista_objetos.forEach(function (element) { elementos += iden + element.toString(iden + '\t') + '\n'; });
        if (this.tipo === 0) {
            cadena += iden + "<" + this.etiqueta_id + atributos + ">" + this.contenido + ((elementos != '') ? '\n' + elementos : '') + ((elementos != '') ? iden : '') + "</" + this.etiqueta_id + ">";
        }
        else {
            cadena += iden + "<" + this.etiqueta_id + atributos + "/>";
        }
        return cadena;
    };
    /**
     * Metodo que pasa una refencia del la etiqueta padre a sus respectivos hijos
     */
    ObjetoXML.prototype.pasarPadre = function () {
        var size = this.lista_objetos.length;
        for (var i = 0; i < size; i++) {
            this.lista_objetos[i].setPadre(this);
            this.lista_objetos[i].pasarPadre();
        }
    };
    /**
     * Obtiene una copia del objeto, pero este esta arreglado para no eliminar el parametro
     * 'padre' al objeto
     * @returns ObjetoXML
     */
    ObjetoXML.prototype.getFixedCopy = function () {
        var nuevo = Object.assign({}, this);
        delete nuevo.padre;
        var size = nuevo.lista_objetos.length;
        for (var i = 0; i < size; i++) {
            nuevo.lista_objetos[i].getFixedCopy;
        }
        return nuevo;
    };
    /**
     * Devuelve el nombre del padre de una etiqueta, si es que posee uno
     * @returns string
     */
    ObjetoXML.prototype.getNameFather = function () {
        return (this.padre != undefined) ? this.padre.etiqueta_id : '';
    };
    return ObjetoXML;
}());
exports.ObjetoXML = ObjetoXML;

},{}],17:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.ObjetoXPath = void 0;
var ObjetoXPath = /** @class */ (function () {
    function ObjetoXPath(v) {
        this.valor = v;
        this.atributo = false;
        this.ambito = "local";
    }
    ObjetoXPath.prototype.setExpresion = function (E) {
        this.exp = E;
    };
    return ObjetoXPath;
}());
exports.ObjetoXPath = ObjetoXPath;

},{}],18:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Resta = void 0;
var Literal_1 = require("./Literal");
var Resta = /** @class */ (function () {
    //linea: number;
    //columna: number;
    function Resta(izq, der, l, c) {
        this.operacion = '-';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    Resta.prototype.getValor = function () {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor();
        var e2 = this.hD.getValor();
        if (e1.tipo == 0) {
            if (e2.tipo == 0) {
                res.tipo = 0;
                res.valor = parseInt(e1.valor.toString()) - parseInt(e2.valor.toString());
                return res;
            }
            else if (e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseInt(e1.valor.toString()) - parseFloat(e2.valor.toString());
                return res;
            }
            else {
                //ERROR: tipo2 no es valido para las restas
            }
        }
        else if (e1.tipo == 1) {
            if (e2.tipo == 0) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) - parseInt(e2.valor.toString());
                return res;
            }
            else if (e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) - parseFloat(e2.valor.toString());
                return res;
            }
            else {
                //ERROR: tipo2 no es valido para las restas
            }
        }
        else {
            //ERROR: tipo1 no es valido para las restas
        }
        return res;
    };
    return Resta;
}());
exports.Resta = Resta;

},{"./Literal":12}],19:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Suma = void 0;
var Literal_1 = require("./Literal");
var Suma = /** @class */ (function () {
    //linea: number;
    //columna: number;
    function Suma(izq, der, l, c) {
        this.operacion = '+';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    Suma.prototype.getValor = function () {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor();
        var e2 = this.hD.getValor();
        if (e1.tipo == 0) {
            if (e2.tipo == 0) {
                res.tipo = 0;
                res.valor = parseInt(e1.valor.toString()) + parseInt(e2.valor.toString());
                return res;
            }
            else if (e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseInt(e1.valor.toString()) + parseFloat(e2.valor.toString());
                return res;
            }
            else {
                //ERROR: tipo2 no es valido para las sumas
            }
        }
        else if (e1.tipo == 1) {
            if (e2.tipo == 0) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) + parseInt(e2.valor.toString());
                return res;
            }
            else if (e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) + parseFloat(e2.valor.toString());
                return res;
            }
            else {
                //ERROR: tipo2 no es valido para las sumas
            }
        }
        else {
            //ERROR: tipo1 no es valido para las sumas
        }
        return res;
    };
    return Suma;
}());
exports.Suma = Suma;

},{"./Literal":12}],20:[function(require,module,exports){
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
var XML = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,13],$V1=[1,9],$V2=[1,8],$V3=[15,16],$V4=[1,15],$V5=[1,14],$V6=[1,17],$V7=[1,16],$V8=[2,9,15,16],$V9=[2,5,13,18],$Va=[1,33],$Vb=[1,32],$Vc=[2,13,18],$Vd=[2,9,18,24],$Ve=[1,41];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"ROOT":4,"EOF":5,"ENCODING":6,"ELEMENTO":7,"StartP":8,"Name":9,"Igual":10,"Value":11,"ENDDEF":12,"Start":13,"ATRIBUTOS":14,"Slash":15,"Close":16,"CONTENIDO":17,"End":18,"ELEMENTOS":19,"LISTA_ATRIBUTOS":20,"ATRIBUTO":21,"LISTA_DATOS":22,"DATOS":23,"Data":24,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"StartP",9:"Name",10:"Igual",11:"Value",12:"ENDDEF",13:"Start",15:"Slash",16:"Close",18:"End",24:"Data"},
productions_: [0,[3,2],[3,1],[4,2],[6,6],[6,0],[7,4],[7,7],[7,7],[7,2],[7,2],[14,1],[14,0],[20,2],[20,1],[21,3],[21,2],[19,2],[19,1],[17,1],[17,0],[22,2],[22,1],[23,1],[23,1],[23,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

        //console.log("Se inicia el analisis Lexico/Sintactico 'Ascendente'");        
        let cst = new Nodo(0,'S',[$$[$0-1].nodo]);
        cst.setProdu(new FilaGrammar(getGrammar('S')));
        let gramaticaRep = cst.getGrammar();
        //console.log($$[$0-1].toString());
        console.log('Analisis XML Ascendente Finalizado!');        
        errores.forEach(element =>{ console.log(element.toString()); });
        
        return [$$[$0-1],{"S": cst},gramaticaRep,errores,codificacion];

    
break;
case 2:
 
        console.log('Nothing to show!');
        return {};
    
break;
case 3:

        aux = new Nodo(setid(),'ROOT',[$$[$0-1].nodo,$$[$0].nodo]);
        aux.setProdu(new FilaGrammar(getGrammar('ROOT')));

        this.$ = $$[$0];
        this.$.nodo = aux;
    
break;
case 4:

        console.log('<?xml encoding='+$$[$0-1]+'?>');
        codificacion = $$[$0-1].replace(/"/g,'').toLowerCase();
        this.$ = {};

        this.$.nodo = new Nodo(setid(),"ENCODING");
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ENCODING1')));

        if((codificacion==='utf-8') 
        | (codificacion==='iso 88591') 
        | (codificacion==='hex')
        | (codificacion==='ascii')){
            this.$.nodo.addNodo(new Nodo(setid(),'<?'));
            this.$.nodo.addNodo(new Nodo(setid(),'xml'));
            this.$.nodo.addNodo(new Nodo(setid(),'encoding'));
            this.$.nodo.addNodo(new Nodo(setid(),'='));
            this.$.nodo.addNodo(new Nodo(setid(),'Value',[],codificacion));
            this.$.nodo.addNodo(new Nodo(setid(),'?>'));
        }else{
            errores.push(new Error('semantico',codificacion,_$[$0-1].first_line,_$[$0-1].first_column,'codificacion invalida'));
        }        
        
    
break;
case 5:

        this.$ = {};
        this.$.nodo = new Nodo(setid(),"ENCODING");
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ENCODING2')));
    
break;
case 6:

        tgs = setTag($$[$0-3]);
        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),tgs));
        aux.addNodo($$[$0-2].nodo);
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO1')));

        this.$ = new ObjetoXML(1,setTag($$[$0-3]),'',$$[$0-2]);
        this.$.linea = _$[$0-3].first_line;
        this.$.columna = _$[$0-3].first_column;
        this.$.nodo = aux;
    
break;
case 7:

        tgs = setTag($$[$0-6]);
        tgc = setTag($$[$0-1]);
        
        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo($$[$0-5].nodo);
        aux.addNodo(new Nodo(setid(),'>'));
        aux.addNodo($$[$0-3].nodo);
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO2')));

        this.$ = new ObjetoXML(0,setTag($$[$0-6]),$$[$0-3].toString(),$$[$0-5]);
        this.$.linea = _$[$0-6].first_line;
        this.$.columna = _$[$0-6].first_column;
        this.$.nodo = aux;

        if(tgs != tgc){
            let mensaje = ('las etiquetas de inicio y fin no coindicen!');            
            errores.push(new Error('semantico',tgc,_$[$0-1].first_line,_$[$0-1].first_column,mensaje));
        }
    
break;
case 8:

        tgs = setTag($$[$0-6]);
        tgc = setTag($$[$0-1]);

        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo($$[$0-5].nodo);
        aux.addNodo(new Nodo(setid(),'>'));
        if($$[$0-3]!=undefined){
            aux.addNodo($$[$0-3].nodo);
        }
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO3')));

        if($$[$0-3]!=undefined){
            this.$ = new ObjetoXML(0,setTag($$[$0-6]),'',$$[$0-5],$$[$0-3]);
        }else{
            this.$ = new ObjetoXML(0,setTag($$[$0-6]),'',$$[$0-5]);
        }
        this.$.linea = _$[$0-6].first_line;
        this.$.columna = _$[$0-6].first_column;
        this.$.nodo = aux;

        if(tgs != tgc){
            let mensaje = ('las etiquetas de inicio y fin no coindicen!');            
            errores.push(new Error('semantico',tgs,_$[$0-1].first_line,_$[$0-1].first_column,mensaje));
        } 
    
break;
case 9: case 10:
  addErr($$[$0-1],_$[$0-1],'Se esperaba '); this.$ = undefined; 
break;
case 11:

        aux = new Nodo(setid(),'ATRIBUTOS');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('ATRIBUTOS1')));

        this.$ = $$[$0];
        this.$.nodo = aux;
    
break;
case 12:

        this.$ = [];
        this.$.nodo = new Nodo(setid(),"ATRIBUTOS");
        this.$.nodo.addNodo(new Nodo(setid(),'Epsilon'));
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTOS2')));
    
break;
case 13:

        aux = new Nodo(setid(),'LISTA_ATRIBUTOS');
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS1')));
        aux.addNodo($$[$0-1].nodo);

        if($$[$0]!=undefined){
            aux.addNodo($$[$0].nodo);
            $$[$0-1].push($$[$0]);
        }
        
        this.$ = $$[$0-1];        
        this.$.nodo = aux;
    
break;
case 14:

        if($$[$0]!=undefined){
            aux = new Nodo(setid(),'LISTA_ATRIBUTOS');
            aux.addNodo($$[$0].nodo);
            aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS2')));

            this.$ = [$$[$0]];
            this.$.nodo = aux;
        }else{
            this.$ = [];
        }
    
break;
case 15:

        this.$ = new AtributoXML($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column);
        this.$.nodo = new Nodo(setid(),'ATRIBUTO');
        this.$.nodo.addNodo(new Nodo(setid(),'Name',[],$$[$0-2]));
        this.$.nodo.addNodo(new Nodo(setid(),'='));
        this.$.nodo.addNodo(new Nodo(setid(),'Value',[],$$[$0]));
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTO')));
    
break;
case 16:

        addErr($$[$0-1],_$[$0-1],'Se esperaba "="');
        this.$ = undefined;
    
break;
case 17:

        aux = new Nodo(setid(),'ELEMENTOS');
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS1')));
        aux.addNodo($$[$0-1].nodo);
        if($$[$0]!=undefined){
            aux.addNodo($$[$0].nodo);
            $$[$0-1].push($$[$0]); 
        }

        
        this.$ = $$[$0-1];
        this.$.nodo = aux;
    
break;
case 18:

        if($$[$0]!=undefined){
            
            aux = new Nodo(setid(),'ELEMENTOS');
            aux.addNodo($$[$0].nodo);
            aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS2')));
            
            this.$ = [$$[$0]];
            this.$.nodo = aux;
        }else{
            this.$ = [];
        }
    
break;
case 19:

        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO1')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 20:

        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo(new Nodo(setid(),'Epsilon'))
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO2')));

        this.$ = [];
        this.$.nodo = aux;
    
break;
case 21:

        aux = new Nodo(setid(),'LISTA_DATOS');
        aux.addNodo($$[$0-1].nodo);
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS1')));

        this.$ = new String($$[$0-1] + $$[$0]);
        this.$.nodo = aux;
    
break;
case 22:

        aux = new Nodo(setid(),'LISTA_DATOS');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS2')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 23:

        aux = new Nodo(setid(),'DATOS');
        aux.addNodo(new Nodo(setid(),'Data',[],$$[$0]));
        aux.setProdu(new FilaGrammar(getGrammar('DATOS1')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 24:

        aux = new Nodo(setid(),'DATOS');
        aux.addNodo(new Nodo(setid(),'Name',[],$$[$0]));
        aux.setProdu(new FilaGrammar(getGrammar('DATOS2')));

        this.$ = new String(' ' + $$[$0]);
        this.$.nodo = aux;
    
break;
case 25:
  addErr($$[$0-1],_$[$0-1],'Se esperaba '); this.$ = []; 
break;
}
},
table: [o($V0,[2,5],{3:1,4:2,6:4,5:[1,3],8:[1,5]}),{1:[3]},{5:[1,6]},{1:[2,2]},{2:$V1,7:7,13:$V2},{9:[1,10]},{1:[2,1]},{5:[2,3]},o($V3,[2,12],{14:11,20:12,21:13,2:$V4,9:$V5}),{13:$V6,16:$V7},{9:[1,18]},{15:[1,19],16:[1,20]},o($V3,[2,11],{21:21,2:$V4,9:$V5}),o($V8,[2,14]),{10:[1,22]},{11:[1,23]},o($V9,[2,9]),o($V9,[2,10]),{10:[1,24]},{16:[1,25]},{2:[1,31],7:29,9:$Va,13:$V2,17:26,18:[2,20],19:27,22:28,23:30,24:$Vb},o($V8,$V0),{11:[1,34]},o($V8,[2,16]),{11:[1,35]},o($V9,[2,6]),{18:[1,36]},{2:$V1,7:38,13:$V2,18:[1,37]},{2:[1,40],9:$Va,18:[2,19],23:39,24:$Vb},o($Vc,[2,18]),o($Vd,[2,22]),{13:$V6,16:$V7,18:$Ve},o($Vd,[2,23]),o($Vd,[2,24]),o($V8,[2,15]),{12:[1,42]},{9:[1,43]},{9:[1,44]},o($Vc,[2,17]),o($Vd,[2,21]),{18:$Ve},o($Vd,[2,25]),o($V0,[2,4]),{16:[1,45]},{16:[1,46]},o($V9,[2,7]),o($V9,[2,8])],
defaultActions: {3:[2,2],6:[2,1],7:[2,3]},
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

    
    const { AtributoXML } = require('./AtributoXML.js');
    const { ObjetoXML } = require('./ObjetoXML.js');
    const { Error } = require('./Error.js');
    const { Nodo } = require('./Nodo.js');
    const {FilaGrammar} = require('./FilaGrammar.js');

    let codificacion = 'UTF-8'
    let errores = [];
    let gramatica = [];
    

    //Variables para uso local    
    let contador = 1;
    let contador2 = 0;

    const setTag = (cadena) =>{
        return cadena = cadena.replace(/\n/g,'').replace(/\r/g,'').replace(/\t/g,'').replace(/ /g,'').replace(/</g,''); 
    }

    const setid = () =>{
        return contador++;
    }

    const setidTag = () =>{
        return contador2++;
    }

    const getGrammar = (production) =>{
        let cadena = [];
        switch(production){
            case 'S':
                cadena = ['S -> ROOT ','{ S = ROOT; }'];
                break;

            case 'ROOT':
                cadena = ['ROOT -> ENCODIGN ELEMENTO',
                '{ ROOT.tag = ELEMENTO.tag; ROOT.enc = ENCODING.enc; }'];
                break;

            case 'ENCODING1':
                cadena = ['ENCODIGN -> StartP Name Name Igual Value ENDDEF',
                '{ ENCODING.enc = Value.val }'];
                break;

            case 'ENCODING2':
                cadena = ['ENCODIGN -> epsilon','{ ENCODING.enc = "UTF-8"; }'];
                break;

            case 'ELEMENTO1':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Slash Close ',
                '{ ELEMENTO.tag = newTag(Start.val,ATRIBUTOS.list); }'];
                break;

            case 'ELEMENTO2':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Close CONTENIDO End Name Close',
                '{ ELEMENTO.tag = new Tag(Start.val,ATRIBUTOS.list,CONTENIDO.val); }'];
                break;

            case 'ELEMENTO3':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Close ELEMENTOS End Name Close',
                '{ ELEMENTO.tag = newTag(Start.val,ATRIBUTOS.list,ELEMENTOS.list); }'];
                break;

            case 'ATRIBUTOS1':
                cadena = ['ATRIBUTOS -> LISTA_ATRIBUTOS',
                '{ ATRIBUTOS.list = LISTA_ATRIBUTOS.list; }'];
                break;

            case 'ATRIBUTOS2':
                cadena = ['ATRIBUTOS -> epsilon',
                '{ ATRIBUTOS.list = newList(); }'];
                break;

            case 'LISTA_ATRIBUTOS1':
                cadena = ['LISTA_ATRIBUTOS -> LISTA_ATRIBUTOS ATRIBUTO',
                '{ LISTA_ATRIBUTOS1.list.add(ATRIBUTO.atrib); LISTA_ATRIBUTOS.list = ATRIBUTOS1.list; }'];
                break;

            case 'LISTA_ATRIBUTOS2':
                cadena = ['LISTA_ATRIBUTOS -> ATRIBUTO',
                '{ LISTA_ATRIBUTOS.list = new List(); }'];
                break;

            case 'ATRIBUTO':
                cadena = ['ATRIBUTO -> Name Igual Value',
                '{ ATRIBUTO.atrib = newAtributo(Name.val,Value,val); }'];
                break;

            case 'ELEMENTOS1':
                cadena = ['ELEMENTOS -> ELEMENTOS ELEMENTO',
                '{ ELEMENTOS1.list.add(ELEMENTO.tag); ELEMENTOS.list = ELEMENTOS1.list; }'];
                break;

            case 'ELEMENTOS2':
                cadena = ['ELEMENTOS -> ELEMENTO',
                '{ ELEMENTOS.list = newList(ELEMENTO.tag); }'];
                break;

            case 'CONTENIDO1':
                cadena = ['CONTENIDO -> LISTA_DATOS',
                '{ CONTENIDO.list = LISTA_DATOS.list; }'];
                break;

            case 'CONTENIDO2':
                cadena = ['CONTENIDO -> epsilon',
                '{ CONTENIDO.list = newList(); }'];
                break;

            case 'LISTA_DATOS1':
                cadena = ['LISTA_DATOS -> LISTA_DATOS DATOS',
                '{ LISTA_DATOS1.list.add(DATOS.val); LISTA_DATOS.list = LISTA_DATOS1.list; }'];
                break;

            case 'LISTA_DATOS2':
                cadena = ['LISTA_DATOS -> DATOS',
                '{ LISTA_DATOS.list = newList(DATOS.val); }'];
                break;

            case 'DATOS1':
                cadena = ['DATOS ->Data','{ DATOS.val = Data.val; }'];
                break;

            case 'DATOS2':
                cadena = ['DATOS -> Name','{ DATOS.val = Name.val; }'];
                break;
            
            default:
                break;
        }
        return cadena;
    }

    const addErr = (err,loc,msj) => {
        //tipo,linea,columna,mensaje
        errores.push(new Error('semantico',err,loc.first_line,loc.first_column,msj));
    }    

    const fixObject = (xmlobj) =>{
        let nuevo = Object.assign({},xmlobj);
        return nuevo;
    }
    
    let tgs = '';
    let tgc = '';
    let aux;
 
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
options: {"ranges":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* skip */ 
break;
case 1: return 15; 
break;
case 2: return 10; 
break;
case 3: return 16; 
break;
case 4: return 9; 
break;
case 5: return 11; 
break;
case 6: return 12; 
break;
case 7: return 'ATTDEF'; 
break;
case 8: return 13; 
break;
case 9: return 18; 
break;
case 10: /*skip*/ 
break;
case 11: return 24; 
break;
case 12: return 8; 
break;
case 13: /* skip, must be an extra one at EOF */ 
break;
case 14:  return 5;   
break;
case 15: console.log('Se ha encontrado un error lexico: " ' + yy_.yytext + ' "  [linea: ' + yy_.yylloc.first_line + ', columna: ' + yy_.yylloc.first_column+']'); 
        errores.push(new Error('semantico',yy_.yytext,yy_.yylloc.first_line,yy_.yylloc.first_column,'Se ha encontrado un error lexico')); 
    
break;
}
},
rules: [/^(?:([ \t\r\n]+))/,/^(?:\/)/,/^(?:=)/,/^(?:(>((\r\n|\r|\n))?))/,/^(?:(([A-Za-z\200-\377_])([A-Za-z\200-\377_0-9.-])*))/,/^(?:("[^"\""]*"))/,/^(?:\?(>((\r\n|\r|\n))?))/,/^(?:((((\r\n|\r|\n))?<)\?ROOT-ATT\b))/,/^(?:(((\r\n|\r|\n))?<)([ \t\r\n]+)?(([A-Za-z\200-\377_])([A-Za-z\200-\377_0-9.-])*))/,/^(?:(((\r\n|\r|\n))?<)([ \t\r\n]+)?\/)/,/^(?:((((\r\n|\r|\n))?<)!--([^-]|-[^-])*--(>((\r\n|\r|\n))?)))/,/^(?:(([^<\n&]|\n[^<&]|\n(&#[0-9]+;|&#x[0-9a-fA-F]+;|&[a-z]+;)|(&#[0-9]+;|&#x[0-9a-fA-F]+;|&[a-z]+;))+))/,/^(?:<\?)/,/^(?:((\r\n|\r|\n)))/,/^(?:$)/,/^(?:.)/],
conditions: {"CONTENIDO":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"inclusive":true}}
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
exports.parser = XML;
exports.Parser = XML.Parser;
exports.parse = function () { return XML.parse.apply(XML, arguments); };
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
},{"./AtributoXML.js":7,"./Error.js":9,"./FilaGrammar.js":11,"./Nodo.js":15,"./ObjetoXML.js":16,"_process":3,"fs":1,"path":2}],21:[function(require,module,exports){
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
var XPath = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,7],$V2=[1,9],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[5,6],$V9=[13,15,19,22,23,24],$Va=[5,6,9,10],$Vb=[1,29],$Vc=[1,28],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[18,26,28],$Vk=[1,43],$Vl=[1,41],$Vm=[1,42],$Vn=[1,44],$Vo=[1,45],$Vp=[1,46],$Vq=[1,47],$Vr=[1,48],$Vs=[1,49],$Vt=[1,50],$Vu=[1,51],$Vv=[18,21,22,26,28,29,30,31,32,33,34,35,36,37,38],$Vw=[18,21,26,28,29,30,33,34,35,36,37,38],$Vx=[18,21,26,28,33,34,35,36,37,38];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"LCONSULTAS":4,"EOF":5,"vertical":6,"CONSULTA":7,"OPPATH":8,"dobleslash":9,"slash":10,"RUTA":11,"ENODO":12,"arroba":13,"NODO":14,"TKid":15,"lcorchete":16,"PRED":17,"rcorchete":18,"Rnode":19,"lparen":20,"rparen":21,"por":22,"dot":23,"dobledot":24,"L_LOGICAS":25,"and":26,"E":27,"or":28,"mas":29,"menos":30,"div":31,"mod":32,"menor":33,"menorigual":34,"mayor":35,"mayorigual":36,"igual":37,"noigual":38,"PRIMITIVO":39,"TKinteger":40,"TKdouble":41,"TKchar":42,"TKstring":43,"Rlast":44,"Rposition":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"vertical",9:"dobleslash",10:"slash",13:"arroba",15:"TKid",16:"lcorchete",18:"rcorchete",19:"Rnode",20:"lparen",21:"rparen",22:"por",23:"dot",24:"dobledot",26:"and",28:"or",29:"mas",30:"menos",31:"div",32:"mod",33:"menor",34:"menorigual",35:"mayor",36:"mayorigual",37:"igual",38:"noigual",40:"TKinteger",41:"TKdouble",42:"TKchar",43:"TKstring",44:"Rlast",45:"Rposition"},
productions_: [0,[3,2],[4,3],[4,1],[8,1],[8,1],[7,2],[7,1],[11,3],[11,1],[12,2],[12,1],[14,4],[14,1],[14,3],[14,1],[14,1],[14,1],[17,1],[25,3],[25,3],[25,1],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,3],[27,2],[27,3],[27,1],[39,1],[39,1],[39,1],[39,1],[39,3],[39,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

                            console.log('Analisis XPath Finalizado!'); 
                            this.$ = $$[$0-1]; return this.$;
                        
break;
case 2:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 3:
 this.$ = [$$[$0]] 
break;
case 4:
 this.$ = 'full'; 
break;
case 5:
 this.$ = 'local'; 
break;
case 6:
 $$[$0][0].ambito = $$[$0-1]; this.$ = $$[$0]; 
break;
case 7: case 11: case 35:
 this.$ = $$[$0]; 
break;
case 8:
 $$[$0].ambito = $$[$0-1]; $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 9:
 this.$ = [$$[$0]]; 
break;
case 10:
 $$[$0].atributo = true; this.$ = $$[$0]; 
break;
case 12:
 
                                    //console.log($$[$0-1]); 
                                    var aux = new ObjetoXPath($$[$0-3].toString());
                                    aux.exp = $$[$0-1].getValor();
                                    //aux.exp = $$[$0-1];
                                    this.$ = aux;
                                
break;
case 13: case 15: case 16: case 17:
 this.$ = new ObjetoXPath($$[$0]); 
break;
case 14:
 this.$ = new ObjetoXPath($$[$0-2]+'()'); 
break;
case 22:
 this.$ = new Suma($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 23:
 this.$ = new Resta($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 24:
 this.$ = new Multiplicacion($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 25:
 this.$ = new Division($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 26:
 this.$ = new Modulo($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 33:
 this.$ = $$[$0] * -1; 
break;
case 34:
 this.$ = $$[$0-1]; 
break;
case 36:
 this.$ = new Literal(0,$$[$0].toString()); 
break;
case 37:
 this.$ = new Literal(1,$$[$0].toString()); 
break;
case 38:
 this.$ = new Literal(2,$$[$0].toString()); 
break;
case 39:
 this.$ = new Literal(3,$$[$0].toString()); 
break;
case 40: case 41:
 this.$ = new Literal(6,$$[$0-2].toString()+'()'); 
break;
}
},
table: [{3:1,4:2,7:3,8:4,9:$V0,10:$V1,11:5,12:8,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},{1:[3]},{5:[1,16],6:[1,17]},o($V8,[2,3]),{11:18,12:8,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($V8,[2,7],{8:19,9:$V0,10:$V1}),o($V9,[2,4]),o($V9,[2,5]),o($Va,[2,9]),{14:20,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($Va,[2,11]),o($Va,[2,13],{16:[1,21]}),{20:[1,22]},o($Va,[2,15]),o($Va,[2,16]),o($Va,[2,17]),{1:[2,1]},{7:23,8:4,9:$V0,10:$V1,11:5,12:8,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($V8,[2,6],{8:19,9:$V0,10:$V1}),{12:24,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($Va,[2,10]),{17:25,20:$Vb,25:26,27:27,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{21:[1,37]},o($V8,[2,2]),o($Va,[2,8]),{18:[1,38]},{18:[2,18],26:[1,39],28:[1,40]},o($Vj,[2,21],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,33:$Vp,34:$Vq,35:$Vr,36:$Vs,37:$Vt,38:$Vu}),{20:$Vb,27:52,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:53,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},o($Vv,[2,35]),o($Vv,[2,36]),o($Vv,[2,37]),o($Vv,[2,38]),o($Vv,[2,39]),{20:[1,54]},{20:[1,55]},o($Va,[2,14]),o($Va,[2,12]),{20:$Vb,27:56,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:57,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:58,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:59,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:60,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:61,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:62,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:63,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:64,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:65,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:66,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:67,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},{20:$Vb,27:68,30:$Vc,39:30,40:$Vd,41:$Ve,42:$Vf,43:$Vg,44:$Vh,45:$Vi},o($Vv,[2,33]),{21:[1,69],22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,33:$Vp,34:$Vq,35:$Vr,36:$Vs,37:$Vt,38:$Vu},{21:[1,70]},{21:[1,71]},o($Vj,[2,19],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,33:$Vp,34:$Vq,35:$Vr,36:$Vs,37:$Vt,38:$Vu}),o($Vj,[2,20],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,33:$Vp,34:$Vq,35:$Vr,36:$Vs,37:$Vt,38:$Vu}),o($Vw,[2,22],{22:$Vk,31:$Vn,32:$Vo}),o($Vw,[2,23],{22:$Vk,31:$Vn,32:$Vo}),o($Vv,[2,24]),o($Vv,[2,25]),o($Vv,[2,26]),o($Vx,[2,27],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vx,[2,28],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vx,[2,29],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vx,[2,30],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vx,[2,31],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vx,[2,32],{22:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vv,[2,34]),o($Vv,[2,40]),o($Vv,[2,41])],
defaultActions: {16:[2,1]},
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

    const { ObjetoXPath } = require('./ObjetoXPath');
    const { Suma } = require('./Suma');
    const { Resta } = require('./Resta');
    const { Multiplicacion } = require('./Multiplicacion');
    const { Division } = require('./Division');
    const { Modulo } = require('./Modulo');
    const { Literal } = require('./Literal');
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
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 44;
break;
case 2:return 45;
break;
case 3:return 19;
break;
case 4:return 'Rancestor';
break;
case 5:return 'RancestorOS';
break;
case 6:return 'Rattribute';
break;
case 7:return 'Rchild';
break;
case 8:return 'Rdescendant';
break;
case 9:return 'RdescendantOS';
break;
case 10:return 'Rfollowing';
break;
case 11:return 'RfollowingSibling';
break;
case 12:return 'Rnamespace';
break;
case 13:return 'Rparent';
break;
case 14:return 'Rpreceding';
break;
case 15:return 'RprecedingSibling';
break;
case 16:return 'Rself';
break;
case 17:return 28;
break;
case 18:return 26;
break;
case 19:return 32;
break;
case 20:return "div";
break;
case 21:return 9;
break;
case 22:return 10;
break;
case 23:return 24;
break;
case 24:return 23;
break;
case 25:return "arroba";
break;
case 26:return "lcorchete";
break;
case 27:return "rcorchete";
break;
case 28:return "dobleBiDot";
break;
case 29:return "singleBiDot";
break;
case 30:return "vertical";
break;
case 31:return 29;
break;
case 32:return 30;
break;
case 33:return "por";
break;
case 34:return 37;
break;
case 35:return 38;
break;
case 36:return 34;
break;
case 37:return 33;
break;
case 38:return 36;
break;
case 39:return 35;
break;
case 40:return 20;
break;
case 41:return 21;
break;
case 42:return 41;
break;
case 43:return 40;
break;
case 44:return 15;
break;
case 45:return 43;
break;
case 46:return 42;
break;
case 47:
        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
    
break;
case 48:return 5
break;
}
},
rules: [/^(?:\s+)/,/^(?:last\b)/,/^(?:position\b)/,/^(?:node\b)/,/^(?:ancestor\b)/,/^(?:ancestor-or-self\b)/,/^(?:attribute\b)/,/^(?:child\b)/,/^(?:descendant\b)/,/^(?:descendant-or-self\b)/,/^(?:following\b)/,/^(?:following-sibling\b)/,/^(?:namespace\b)/,/^(?:parent\b)/,/^(?:preceding\b)/,/^(?:preceding-sibling\b)/,/^(?:self\b)/,/^(?:or\b)/,/^(?:and\b)/,/^(?:mod\b)/,/^(?:div\b)/,/^(?:\/\/)/,/^(?:\/)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:@)/,/^(?:\[)/,/^(?:\])/,/^(?:::)/,/^(?::)/,/^(?:\|)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:=)/,/^(?:!=)/,/^(?:<=)/,/^(?:<)/,/^(?:>=)/,/^(?:>)/,/^(?:\()/,/^(?:\))/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
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
exports.parser = XPath;
exports.Parser = XPath.Parser;
exports.parse = function () { return XPath.parse.apply(XPath, arguments); };
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
},{"./Division":8,"./Literal":12,"./Modulo":13,"./Multiplicacion":14,"./ObjetoXPath":17,"./Resta":18,"./Suma":19,"_process":3,"fs":1,"path":2}],22:[function(require,module,exports){
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
var XPathDesc = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,7],$V2=[1,9],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[2,4],$V9=[1,18],$Va=[5,8],$Vb=[15,17,21,24,25,26],$Vc=[2,11],$Vd=[5,8,10,11],$Ve=[1,30],$Vf=[1,29],$Vg=[1,28],$Vh=[1,32],$Vi=[1,33],$Vj=[1,34],$Vk=[1,35],$Vl=[1,42],$Vm=[1,40],$Vn=[1,41],$Vo=[1,43],$Vp=[1,44],$Vq=[1,45],$Vr=[1,46],$Vs=[1,47],$Vt=[1,48],$Vu=[1,49],$Vv=[1,50],$Vw=[20,23,24,27,28,29,30,31,32,33,34,35,36],$Vx=[20,23,27,28,29,30,31,32,33,34,35,36],$Vy=[20,23,27,28,31,32,33,34,35,36],$Vz=[20,23,31,32,33,34,35,36];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"LCONSULTAS":4,"EOF":5,"CONSULTA":6,"LCP":7,"vertical":8,"OPPATH":9,"dobleslash":10,"slash":11,"RUTA":12,"ENODO":13,"RP":14,"arroba":15,"NODO":16,"TKid":17,"lcorchete":18,"E":19,"rcorchete":20,"Rnode":21,"lparen":22,"rparen":23,"por":24,"dot":25,"dobledot":26,"mas":27,"menos":28,"div":29,"mod":30,"menor":31,"menorigual":32,"mayor":33,"mayorigual":34,"igual":35,"noigual":36,"PRIMITIVO":37,"TKinteger":38,"TKdouble":39,"TKchar":40,"TKstring":41,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"vertical",10:"dobleslash",11:"slash",15:"arroba",17:"TKid",18:"lcorchete",20:"rcorchete",21:"Rnode",22:"lparen",23:"rparen",24:"por",25:"dot",26:"dobledot",27:"mas",28:"menos",29:"div",30:"mod",31:"menor",32:"menorigual",33:"mayor",34:"mayorigual",35:"igual",36:"noigual",38:"TKinteger",39:"TKdouble",40:"TKchar",41:"TKstring"},
productions_: [0,[3,2],[4,2],[7,3],[7,0],[9,1],[9,1],[6,2],[6,1],[12,2],[14,3],[14,0],[13,2],[13,1],[16,4],[16,1],[16,3],[16,1],[16,1],[16,1],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,2],[19,3],[19,3],[19,1],[37,1],[37,1],[37,1],[37,1],[37,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 console.log('Todo bien todo correcto'); this.$ = $$[$0-1]; return this.$; 
break;
case 2: case 3: case 9:
 this.$ = [$$[$0-1]]; this.$ = this.$.concat($$[$0]); 
break;
case 4:
 this.$ = []; 
break;
case 5:
 this.$ = 'full'; 
break;
case 6:
 this.$ = 'local'; 
break;
case 7:
 $$[$0][0].ambito = $$[$0-1]; this.$ = $$[$0]; 
break;
case 8: case 13: case 34:
 this.$ = $$[$0]; 
break;
case 10:
 $$[$0-1].ambito = $$[$0-2]; this.$ = [$$[$0-1]]; this.$ = this.$.concat($$[$0]); 
break;
case 11:
 this.$ = [] 
break;
case 12:
 $$[$0].atributo = true; this.$ = $$[$0]; 
break;
case 14:
 
                                    console.log($$[$0-1]); 
                                    this.$ = new ObjetoXPath($$[$0-3]);
                                
break;
case 15: case 17: case 18: case 19:
 this.$ = new ObjetoXPath($$[$0]); 
break;
case 16:
 this.$ = new ObjetoXPath($$[$0-2]+'()'); 
break;
case 20:
 this.$ =  $$[$0-2] + $$[$0]; 
break;
case 21:
 this.$ =  $$[$0-2] - $$[$0]; 
break;
case 22:
 this.$ =  $$[$0-2] * $$[$0]; 
break;
case 23:
 this.$ =  $$[$0-2] / $$[$0]; 
break;
case 24:
 this.$ =  $$[$0-2] % $$[$0]; 
break;
case 25: case 26: case 27: case 28: case 29: case 30: case 33:
  
break;
case 31:
 this.$ = $$[$0] * -1; 
break;
case 32:
 this.$ = $$[$0-1]; 
break;
case 35:
 this.$ = parseInt($$[$0]); 
break;
case 36:
 this.$ = parseFloat($$[$0]); 
break;
case 37: case 38: case 39:
 this.$ = $$[$0] 
break;
}
},
table: [{3:1,4:2,6:3,9:4,10:$V0,11:$V1,12:5,13:8,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},{1:[3]},{5:[1,16]},{5:$V8,7:17,8:$V9},{12:19,13:8,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Va,[2,8]),o($Vb,[2,5]),o($Vb,[2,6]),o($Va,$Vc,{14:20,9:21,10:$V0,11:$V1}),{16:22,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Vd,[2,13]),o($Vd,[2,15],{18:[1,23]}),{22:[1,24]},o($Vd,[2,17]),o($Vd,[2,18]),o($Vd,[2,19]),{1:[2,1]},{5:[2,2]},{6:25,9:4,10:$V0,11:$V1,12:5,13:8,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Va,[2,7]),o($Va,[2,9]),{13:26,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Vd,[2,12]),{17:$Ve,19:27,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{23:[1,36]},{5:$V8,7:37,8:$V9},o($Va,$Vc,{9:21,14:38,10:$V0,11:$V1}),{20:[1,39],24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp,31:$Vq,32:$Vr,33:$Vs,34:$Vt,35:$Vu,36:$Vv},{17:$Ve,19:51,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:52,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},o($Vw,[2,39],{22:[1,53]}),o($Vw,[2,34]),o($Vw,[2,35]),o($Vw,[2,36]),o($Vw,[2,37]),o($Vw,[2,38]),o($Vd,[2,16]),{5:[2,3]},o($Va,[2,10]),o($Vd,[2,14]),{17:$Ve,19:54,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:55,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:56,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:57,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:58,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:59,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:60,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:61,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:62,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:63,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},{17:$Ve,19:64,22:$Vf,28:$Vg,37:31,38:$Vh,39:$Vi,40:$Vj,41:$Vk},o($Vx,[2,31],{24:$Vl}),{23:[1,65],24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp,31:$Vq,32:$Vr,33:$Vs,34:$Vt,35:$Vu,36:$Vv},{23:[1,66]},o($Vy,[2,20],{24:$Vl,29:$Vo,30:$Vp}),o($Vy,[2,21],{24:$Vl,29:$Vo,30:$Vp}),o($Vx,[2,22],{24:$Vl}),o($Vx,[2,23],{24:$Vl}),o($Vx,[2,24],{24:$Vl}),o($Vz,[2,25],{24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp}),o($Vz,[2,26],{24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp}),o($Vz,[2,27],{24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp}),o($Vz,[2,28],{24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp}),o($Vz,[2,29],{24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp}),o($Vz,[2,30],{24:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp}),o($Vw,[2,32]),o($Vw,[2,33])],
defaultActions: {16:[2,1],17:[2,2],37:[2,3]},
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

    const { ObjetoXPath } = require('./ObjetoXPath');
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
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 'Rlast';
break;
case 2:return 'Rposition';
break;
case 3:return 21;
break;
case 4:return 'Rancestor';
break;
case 5:return 'RancestorOS';
break;
case 6:return 'Rattribute';
break;
case 7:return 'Rchild';
break;
case 8:return 'Rdescendant';
break;
case 9:return 'RdescendantOS';
break;
case 10:return 'Rfollowing';
break;
case 11:return 'RfollowingSibling';
break;
case 12:return 'Rnamespace';
break;
case 13:return 'Rparent';
break;
case 14:return 'Rpreceding';
break;
case 15:return 'RprecedingSibling';
break;
case 16:return 'Rself';
break;
case 17:return 'or';
break;
case 18:return 'and';
break;
case 19:return 30;
break;
case 20:return "div";
break;
case 21:return 10;
break;
case 22:return 11;
break;
case 23:return 26;
break;
case 24:return 25;
break;
case 25:return "arroba";
break;
case 26:return "lcorchete";
break;
case 27:return "rcorchete";
break;
case 28:return "dobleBiDot";
break;
case 29:return "singleBiDot";
break;
case 30:return "vertical";
break;
case 31:return 27;
break;
case 32:return 28;
break;
case 33:return "por";
break;
case 34:return 35;
break;
case 35:return 36;
break;
case 36:return 32;
break;
case 37:return 31;
break;
case 38:return 34;
break;
case 39:return 33;
break;
case 40:return 22;
break;
case 41:return 23;
break;
case 42:return 39;
break;
case 43:return 38;
break;
case 44:return 17;
break;
case 45:return 41;
break;
case 46:return 40;
break;
case 47:
        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
    
break;
case 48:return 5
break;
}
},
rules: [/^(?:\s+)/,/^(?:last\b)/,/^(?:position\b)/,/^(?:node\b)/,/^(?:ancestor\b)/,/^(?:ancestor-or-self\b)/,/^(?:attribute\b)/,/^(?:child\b)/,/^(?:descendant\b)/,/^(?:descendant-or-self\b)/,/^(?:following\b)/,/^(?:following-sibling\b)/,/^(?:namespace\b)/,/^(?:parent\b)/,/^(?:preceding\b)/,/^(?:preceding-sibling\b)/,/^(?:self\b)/,/^(?:or\b)/,/^(?:and\b)/,/^(?:mod\b)/,/^(?:div\b)/,/^(?:\/\/)/,/^(?:\/)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:@)/,/^(?:\[)/,/^(?:\])/,/^(?:::)/,/^(?::)/,/^(?:\|)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:=)/,/^(?:!=)/,/^(?:<=)/,/^(?:<)/,/^(?:>=)/,/^(?:>)/,/^(?:\()/,/^(?:\))/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
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
exports.parser = XPathDesc;
exports.Parser = XPathDesc.Parser;
exports.parse = function () { return XPathDesc.parse.apply(XPathDesc, arguments); };
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
},{"./ObjetoXPath":17,"_process":3,"fs":1,"path":2}],23:[function(require,module,exports){
"use strict";
var XPathAsc = require('../src/XPath');
var XPathDes = require('../src/XPathDesc');
var fs = require('fs');
var XmlAsc = require('../src/XML');
var arbolXPath;
var Expresion = require('../src/Expresion');

function execAscendente(entrada, xmlObj) {
    var arbolXml = xmlObj;
    arbolXPath = XPathAsc.parse(entrada);
    var resultado = ejecutarRaiz(arbolXml, arbolXPath);

    return resultado;
}

module.exports.execAscendente = execAscendente;

function execDescendente(entrada) {
    console.log('\n========== DESCENDENTE ==========');

    var XMLtxt = fs.readFileSync('../src/simp.xml');
    var obXML = XmlDsc.parse(XMLtxt.toString());
    var arbolXml = obXML[0];
    
    var arbolXPath = XPathDes.parse(entrada);
    var resultado = ejecutarRaiz(arbolXml, arbolXPath);
    
    console.log("\n"+resultado);
}

function ejecutarRaiz(XML, XPATH){
    //console.log(XML);
    //console.log(XPATH);
    
    var respuestas = [];
    XPATH.forEach((consulta) => {
        var res = []
        var verif = ejecucionRecursiva(XML, consulta, res);
        if(verif != undefined && verif != '')
            respuestas.push(verif);
    });

    //Convertir [[],[],[],[]] to String
    /*
    respuestas.forEach((respuesta) => {
        deleteNod(respuesta);
    });*/

    var texto = '';
    if(respuestas.length > 0) {
        texto += printRespuestas(respuestas[0]);
        respuestas.shift();
        respuestas.forEach((respuesta) => {
            texto += '\n' + printRespuestas(respuesta);
        });
    }
    
    return texto;
}
function ejecucionRecursiva(XML, consulta, cadena) {
    var res = [];
    var expr;

    if(consulta[0].exp != undefined) {
        //expr = consulta[0].exp.getValor();
        //console.log(typeof(consulta[0].exp));
    }

    if(consulta[0].ambito == 'local') {
        if(consulta[0].valor == '.') {
            var auxConsulta = JSON.parse(JSON.stringify(consulta));
            auxConsulta.shift();
            return ejecucionRecursiva(XML, auxConsulta);
        }

        if(consulta[0].valor == '*') {

        } else if(consulta[0].valor == 'node()') {

        }

        if(consulta[0].atributo == true) {
            //Verificar y recorrer para @*, @id
        } else if(consulta[0].valor == XML.etiqueta_id) {
            var tmpConsulta = JSON.parse(JSON.stringify(consulta));
            tmpConsulta.shift();
            if(tmpConsulta.length == 0) {
                //Resolver
                //delete XML['nodo'];
                return XML;
            } else {
                XML.lista_objetos.forEach((o) => {
                    var tmp = ejecucionRecursiva(o, tmpConsulta); 
                    if(tmp != '') {
                        res.push(tmp);
                    }
                });
                if (tmpConsulta[0].exp != undefined) {
                    var oTmp = res[tmpConsulta[0].exp.valor];
                    if(oTmp != undefined) {
                        res = [];
                        res.push(oTmp);
                    }
                }
            }
        }
    } else if(consulta[0].ambito == 'full') {
        console.log('FULL');
        if(consulta[0].valor == '.') {
            console.log('\t> cosa hardcore');
        }
    }
    return res;
}
function seguirFull(XML, consulta){
}
function getFull(XML,consulta) {
}
function printRespuestas(respuesta) {
    var txt = '';
    respuesta.forEach((oXML) => {
        if(Array.isArray(oXML) == true) {
            txt += printRespuestas(oXML);
        } else  {
            txt += getContenido(oXML) + '\n';
        }
    });

    return txt;
}
function getContenido(XML) {
    var att = '';
    if(XML.lista_atributos !== undefined) {
        if(XML.lista_atributos.length != 0) {
            XML.lista_atributos.forEach((at) => {
                att += ` ${at.atributo}=${at.contenido}`;
            });
        }
    }

    var tmp;
    if(XML.tipo == 0) { //<></>
        //Verificar objetos internos
        var cnt = XML.contenido;
        if(XML.lista_objetos !== undefined) {
            if(XML.lista_objetos.length != 0) {
                cnt = ' ';
                XML.lista_objetos.forEach((hj) => {
                    cnt += getContenido(hj);
                });
            }
        }

        tmp = `<${XML.etiqueta_id}${att}>${cnt}</${XML.etiqueta_id}> `; 
    } else { //Solo </>
        tmp = `<${XML.etiqueta_id}${att}/> `;
    }

    return tmp;
}

function aJson() {
    var countId = 0;

    var ast = {};
    var lista_consultas = [];
    
    arbolXPath.forEach(function (ec) {
        var consulta = [];
        ec.forEach(function (acc) {
            var tmpA = {}
            var tmpV = {}
            if (acc.ambito == 'full') {
                tmpA = {ambito: '//', id: countId};
                countId ++;
            }
            else {
                tmpA = {ambito: '/', id: countId};
                countId ++;
            }
            tmpV = {valor: acc.valor, id: countId}
            countId ++;

            consulta.push({ acceso: {ambito: tmpA,valor: tmpV,id: countId} });
            countId ++;
        });
        lista_consultas.push({ consulta: consulta, id: countId });
        countId ++;
    });
    ast.lista_consultas = lista_consultas;
    ast.id = countId;
    countId ++;

    return ast;
}
module.exports.aJson = aJson;
function deleteNod(respuesta){
    respuesta.forEach((oXML) => {
        delete oXML['nodo'];
        if(oXML.lista_objetos != undefined)
            deleteNod(oXML.lista_objetos);
    });
}
},{"../src/Expresion":10,"../src/XML":20,"../src/XPath":21,"../src/XPathDesc":22,"fs":1}],24:[function(require,module,exports){
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
var xmldes = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,13],$V1=[1,9],$V2=[1,8],$V3=[15,16],$V4=[1,15],$V5=[1,14],$V6=[2,16],$V7=[2,5,13,18],$V8=[1,34],$V9=[1,33],$Va=[2,9,15,16],$Vb=[2,21],$Vc=[2,26],$Vd=[9,18,27];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"ROOT":4,"EOF":5,"ENCODING":6,"ELEMENTO":7,"StartP":8,"Name":9,"Igual":10,"Value":11,"ENDDEF":12,"Start":13,"ATRIBUTOS":14,"Slash":15,"Close":16,"CONTENIDO":17,"End":18,"ELEMENTOS":19,"LISTA_ATRIBUTOS":20,"ATRIBUTO":21,"LISTA_ATRIBUTOS_P":22,"ELEMENTOS_P":23,"LISTA_DATOS":24,"DATOS":25,"LISTA_DATOS_P":26,"Data":27,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"StartP",9:"Name",10:"Igual",11:"Value",12:"ENDDEF",13:"Start",15:"Slash",16:"Close",18:"End",27:"Data"},
productions_: [0,[3,2],[3,1],[4,2],[6,6],[6,0],[7,4],[7,7],[7,7],[7,2],[7,2],[7,2],[14,1],[14,0],[20,2],[22,2],[22,0],[21,3],[21,2],[19,2],[23,2],[23,0],[17,1],[17,0],[24,2],[26,2],[26,0],[25,1],[25,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

        console.log("Se inicia el analisis Lexico/Sintactico 'Descendente'");        
        let cst = new Nodo(0,'S',[$$[$0-1].nodo]);
        cst.setProdu(new FilaGrammar(getGrammar('S')));
        let gramaticaRep = cst.getGrammar();
        //console.log($$[$0-1].toString());
        console.log('Analisis XML Descendente Finalizado!');        
        errores.forEach(element =>{ console.log(element.toString()); });
        
        return [$$[$0-1],{"S": cst},gramaticaRep,errores,codificacion];
    
break;
case 2:

        console.log('Nothing to show!');
        return {};
    
break;
case 3:

        aux = new Nodo(setid(),'ROOT',[$$[$0-1].nodo,$$[$0].nodo]);
        aux.setProdu(new FilaGrammar(getGrammar('ROOT')));

        this.$ = $$[$0];
        this.$.nodo = aux;
    
break;
case 4:

        console.log('<?xml encoding='+$$[$0-1]+'?>');
        codificacion = $$[$0-1].replace(/"/g,'').toLowerCase();
        this.$ = {};

        this.$.nodo  = new Nodo(setid(),"ENCODING");
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ENCODING1')));

        if((codificacion==='utf-8') 
        | (codificacion==='iso 88591') 
        | (codificacion==='hex')
        | (codificacion==='ascii')){
            this.$.nodo.addNodo(new Nodo(setid(),'<?'));
            this.$.nodo.addNodo(new Nodo(setid(),'xml'));
            this.$.nodo.addNodo(new Nodo(setid(),'encoding'));
            this.$.nodo.addNodo(new Nodo(setid(),'='));
            this.$.nodo.addNodo(new Nodo(setid(),'Value',[],codificacion));
            this.$.nodo.addNodo(new Nodo(setid(),'?>'));
        }else{
            errores.push(new Error('semantico',codificacion,_$[$0-1].first_line,_$[$0-1].first_column,'codificacion invalida'));
        }

    
break;
case 5:

        this.$ = {};
        this.$.nodo = new Nodo(setid(),"ENCODING");
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ENCODING2')));
    
break;
case 6:


        tgs = setTag($$[$0-3]);
        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),tgs));
        aux.addNodo($$[$0-2].nodo);
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO1')));

        this.$ = new ObjetoXML(1,setTag($$[$0-3]),'',$$[$0-2]);
        this.$.linea = _$[$0-3].first_line;
        this.$.columna = _$[$0-3].first_column;
        this.$.nodo = aux;
    
break;
case 7:
 
        tgs = setTag($$[$0-6]);
        tgc = setTag($$[$0-1]);
        
        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo($$[$0-5].nodo);
        aux.addNodo(new Nodo(setid(),'>'));
        aux.addNodo($$[$0-3].nodo);
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO2')));

        this.$ = new ObjetoXML(0,setTag($$[$0-6]),$$[$0-3].toString(),$$[$0-5]);
        this.$.linea = _$[$0-6].first_line;
        this.$.columna = _$[$0-6].first_column;
        this.$.nodo = aux;

        if(tgs != tgc){
            let mensaje = ('las etiquetas de inicio y fin no coindicen!');            
            errores.push(new Error('semantico',tgc,_$[$0-1].first_line,_$[$0-1].first_column,mensaje));            
            //return;
        }
    
break;
case 8:
 
        tgs = setTag($$[$0-6]);
        tgc = setTag($$[$0-1]);

        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo($$[$0-5].nodo);
        aux.addNodo(new Nodo(setid(),'>'));
        if($$[$0-3]!=undefined){
            aux.addNodo($$[$0-3].nodo);
        }
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO3')));

        if($$[$0-3]!=undefined){
            this.$ = new ObjetoXML(0,setTag($$[$0-6]),'',$$[$0-5],$$[$0-3]);
        }else{
            this.$ = new ObjetoXML(0,setTag($$[$0-6]),'',$$[$0-5]);
        }
        this.$.linea = _$[$0-6].first_line;
        this.$.columna = _$[$0-6].first_column;
        this.$.nodo = aux;

        if(tgs != tgc){
            let mensaje = ('las etiquetas de inicio y fin no coindicen!');            
            errores.push(new Error('semantico',tgs,_$[$0-1].first_line,_$[$0-1].first_column,mensaje));            
            //return;
        }        
    
break;
case 9: case 10: case 11:
  addErr($$[$0-1],_$[$0-1],'Se esperaba '); this.$ = undefined; 
break;
case 12:

        aux = new Nodo(setid(),'ATRIBUTOS');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('ATRIBUTOS1')));

        this.$ = $$[$0];
        this.$.nodo = aux;
    
break;
case 13:

        this.$ = [];
        this.$.nodo = new Nodo(setid(),"ATRIBUTOS");
        this.$.nodo.addNodo(new Nodo(setid(),'Epsilon'));
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTOS2')));
    
break;
case 14:

        aux = new Nodo(setid(),'LISTA_ATRIBUTOS');
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS')));        
        aux.addNodo($$[$0].nodo);

        if($$[$0-1]!=undefined){
            aux.addNodo($$[$0-1].nodo);
            this.$ = [$$[$0-1]];
        }else{
            this.$ = [];
        }
        
        this.$ = this.$.concat($$[$0]);
        this.$.nodo = aux;
    
break;
case 15:

        aux = new Nodo(setid(),'LISTA_ATRIBUTOS_P');
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS_P1')));
        aux.addNodo($$[$0].nodo);
        if($$[$0-1]!=undefined){
            aux.addNodo($$[$0-1].nodo);
            this.$ = [$$[$0-1]];
        }else{
            this.$ = [];
        }        
        
        this.$ = this.$.concat($$[$0]);
        this.$.nodo = aux;
    
break;
case 16:

        aux = new Nodo(setid(),'LISTA_ATRIBUTOS_P');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS_P2')));

        this.$ = [];
        this.$.nodo = aux;
    
break;
case 17:

        this.$ = new AtributoXML($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column);
        this.$.nodo = new Nodo(setid(),'ATRIBUTO');
        this.$.nodo.addNodo(new Nodo(setid(),'Name',[],$$[$0-2]));
        this.$.nodo.addNodo(new Nodo(setid(),'='));
        this.$.nodo.addNodo(new Nodo(setid(),'Value',[],$$[$0]));
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTO')));
    
break;
case 18:

        addErr($$[$0-1],_$[$0-1],'Se esperaba "="');
        this.$ = undefined;
        //console.log('errinfo: ', {loc: _$[$0-1],val: $$[$0-1],});
    
break;
case 19:

        aux = new Nodo(setid(),'ELEMENTOS');
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS')));        
        aux.addNodo($$[$0].nodo);

        if($$[$0-1]!=undefined){
            aux.addNodo($$[$0-1].nodo);
            this.$ = [$$[$0-1]];
        }else{
            this.$ = [];
        }

        
        this.$ = this.$.concat($$[$0]);
        this.$.nodo = aux;
    
break;
case 20:

        aux = new Nodo(setid(),'ELEMENTOS_P');
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS_P1')));        
        aux.addNodo($$[$0].nodo);

        if($$[$0-1]!=undefined){
            aux.addNodo($$[$0-1].nodo);
            this.$ = [$$[$0-1]];
        }else{
            this.$ = [];
        }
        
        this.$ = this.$.concat($$[$0]);
        this.$.nodo = aux;
    
break;
case 21:

        aux = new Nodo(setid(),'ELEMENTOS_P');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS_P2')));

        this.$ = [];
        this.$.nodo = aux;
    
break;
case 22:

        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO1')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 23:

        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO2')));

        this.$ = [];
        this.$.nodo = aux;
    
break;
case 24:

        aux = new Nodo(setid(),'LISTA_DATOS');
        aux.addNodo($$[$0-1].nodo);
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS')));

        this.$ = $$[$0-1];
        this.$ = new String(this.$ + $$[$0]);
        this.$.nodo = aux;
    
break;
case 25:

        aux = new Nodo(setid(),'LISTA_DATOS_P');
        aux.addNodo($$[$0-1].nodo);
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS_P1')));

        //this.$ = $$[$0-1];
        this.$ = new String($$[$0-1].toString() + $$[$0].toString());
        this.$.nodo = aux;
    
break;
case 26:

        aux = new Nodo(setid(),'LISTA_DATOS_P');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS_P2')));

        this.$ = [];
        this.$.nodo = aux;
    
break;
case 27:

        aux = new Nodo(setid(),'DATOS');
        aux.addNodo(new Nodo(setid(),'Data',[],$$[$0]));
        aux.setProdu(new FilaGrammar(getGrammar('DATOS1')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 28:

        aux = new Nodo(setid(),'DATOS');
        aux.addNodo(new Nodo(setid(),'Name',[],$$[$0]));
        aux.setProdu(new FilaGrammar(getGrammar('DATOS2')));

        this.$ = new String(' ' + $$[$0]);
        this.$.nodo = aux;
    
break;
}
},
table: [o($V0,[2,5],{3:1,4:2,6:4,5:[1,3],8:[1,5]}),{1:[3]},{5:[1,6]},{1:[2,2]},{2:$V1,7:7,13:$V2},{9:[1,10]},{1:[2,1]},{5:[2,3]},o($V3,$V0,{14:11,20:12,21:13,2:$V4,9:$V5}),{13:[1,18],16:[1,17],18:[1,16]},{9:[1,19]},{15:[1,20],16:[1,21]},o($V3,[2,12]),o($V3,$V6,{22:22,21:23,2:$V4,9:$V5}),{10:[1,24]},{11:[1,25]},o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),{10:[1,26]},{16:[1,27]},{2:$V1,7:31,9:$V8,13:$V2,17:28,18:[2,23],19:29,24:30,25:32,27:$V9},o($V3,[2,14]),o($V3,$V6,{21:23,22:35,2:$V4,9:$V5}),{11:[1,36]},o($Va,[2,18]),{11:[1,37]},o($V7,[2,6]),{18:[1,38]},{18:[1,39]},{18:[2,22]},{2:$V1,7:41,13:$V2,18:$Vb,23:40},{9:$V8,18:$Vc,25:43,26:42,27:$V9},o($Vd,[2,27]),o($Vd,[2,28]),o($V3,[2,15]),o($Va,[2,17]),{12:[1,44]},{9:[1,45]},{9:[1,46]},{18:[2,19]},{2:$V1,7:41,13:$V2,18:$Vb,23:47},{18:[2,24]},{9:$V8,18:$Vc,25:43,26:48,27:$V9},o($V0,[2,4]),{16:[1,49]},{16:[1,50]},{18:[2,20]},{18:[2,25]},o($V7,[2,7]),o($V7,[2,8])],
defaultActions: {3:[2,2],6:[2,1],7:[2,3],30:[2,22],40:[2,19],42:[2,24],47:[2,20],48:[2,25]},
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

    const { AtributoXML } = require('./AtributoXML.js');
    const { ObjetoXML } = require('./ObjetoXML.js');
    const { Error } = require('./Error.js');
    const { Nodo } = require('./Nodo.js');
    const {FilaGrammar} = require('./FilaGrammar.js');

    let codificacion = 'UTF-8'
    let errores = []; 
    let gramatica = [];
    

    //Variables para uso local
    let contador = 1;

    /*Metodo que quita caracters innecesarios y regresa el nombre de una etiqueta*/
    const setTag = (cadena) =>{
        return cadena = cadena.replace(/\n/g,'').replace(/\r/g,'').replace(/\t/g,'').replace(/ /g,'').replace(/</g,''); 
    }

    const setid = () =>{
        return contador++;
    }

    const getGrammar = (production) =>{
        let cadena = [];
        switch(production){
            case 'S':
                cadena = ['S -> ROOT ','{ S = ROOT; }'];
                break;

            case 'ROOT':
                cadena = ['ROOT -> ENCODING ELEMENTO',
                '{ ROOT.tag = ELEMENTO.tag; ROOT.enc = ENCODING.enc; }'];
                break;

            case 'ENCODING1':
                cadena = ['ENCODING -> StartP Name Name Igual Value ENDDEF',
                '{ ENCODING.enc = Value.val }'];
                break;

            case 'ENCODING2':
                cadena = ['ENCODING -> epsilon','{ ENCODING.enc = "UTF-8"; }'];
                break;

            case 'ELEMENTO1':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Slash Close ',
                '{ ELEMENTO.tag = newTag(Start.val,ATRIBUTOS.list); }'];
                break;

            case 'ELEMENTO2':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Close CONTENIDO End Name Close',
                '{ ELEMENTO.tag = new Tag(Start.val,ATRIBUTOS.list,CONTENIDO.val); }'];
                break;

            case 'ELEMENTO3':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Close ELEMENTOS End Name Close',
                '{ ELEMENTO.tag = newTag(Start.val,ATRIBUTOS.list,ELEMENTOS.list);  }'];
                break;

            case 'ATRIBUTOS1':
                cadena = ['ATRIBUTOS -> LISTA_ATRIBUTOS','{ ATRIBUTOS.list = LISTA_ATRIBUTOS.list; }'];
                break;

            case 'ATRIBUTOS2':
                cadena = ['ATRIBUTOS -> epsilon','{ ATRIBUTOS.list = newList(); }'];
                break;

            case 'LISTA_ATRIBUTOS':
                cadena = ['LISTA_ATRIBUTOS -> ATRIBUTO LISTA_ATRIBUTOS_P',
                '{ LISTA_ATRIBUTOS_P.list.add(ATRIBUTO.atrib); LISTA_ATRIBUTOS.list = LISTA_ATRIBUTOS_P.list; }'];
                break;

            case 'LISTA_ATRIBUTOS_P1':
                cadena = ['LISTA_ATRIBUTOS_P -> ATRIBUTO LISTA_ATRIBUTOS_P',
                '{ LISTA_ATRIBUTO_P.list.add(ATRIBUTO.atrib); }'];
                break;

            case 'LISTA_ATRIBUTOS_P2':
                cadena = ['LISTA_ATRIBUTOS_P -> epsilon',
                '{ LISTA_ATRIBUTOS_P.list = new List(); }'];
                break;

            case 'ATRIBUTO':
                cadena = ['ATRIBUTO -> Name Igual Value',
                '{ ATRIBUTO.atrib = new Atributo(Name.val,Value,val); }'];
                break;

            case 'ELEMENTOS':
                cadena = ['ELEMENTOS -> ELEMENTO ELEMENTOS_P',
                '{ ELEMENTOS_P.list.add(ELEMENTO.elem); ELEMENTOS.list = ELEMENTOS_P.list; }'];
                break;

            case 'ELEMENTOS_P1':
                cadena = ['ELEMENTOS_P -> ELEMENTO ELEMENTOS_P',
                '{ ELEMENTOS_P.list.add(ELEMENTO.alem); }'];
                break;

            case 'ELEMENTOS_P2':
                cadena = ['ELEMENTOS_P -> epsilon',
                '{ ELEMENTOS_P.list = new List(); }'];
                break;

            case 'CONTENIDO1':
                cadena = ['CONTENIDO -> LISTA_DATOS','{ CONTENIDO.list = LISTA_DATOS.list; }'];
                break;

            case 'CONTENIDO2':
                cadena = ['CONTENIDO -> epsilon','{ CONTENIDO.list = new List(); }'];
                break;

            case 'LISTA_DATOS':
                cadena = ['LISTA_DATOS -> DATOS LISTA_DATOS_P','{ LISTA_DATOS_P.list.add(DATOS.val); }'];
                break;

            case 'LISTA_DATOS_P1':
                cadena = ['LISTA_DATOS_P -> DATOS LISTA_DATOS_P ','{ LISTA_DATOS_P.list.add(DATOS.val); }'];
                break;

            case 'LISTA_DATOS_P2':
                cadena = ['LISTA_DATOS_P -> epsilon','{ LISTA_DATOS_P.list = new List(); }'];
                break;

            case 'DATOS1':
                cadena = ['DATOS ->Data','{ DATOS.val = Data.val }'];
                break;

            case 'DATOS2':
                cadena = ['DATOS -> Name','{ DATOS.val = Name.val }'];
                break;
            
            default:
                break;
        }
        return cadena;
    }

    const addErr = (err,loc,msj) => {
        //tipo,linea,columna,mensaje
        errores.push(new Error('semantico',err,loc.first_line,loc.first_column,msj));
    }

    let tgs = '';
    let tgc = '';
    let aux;
 
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
options: {"ranges":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* skip */ 
break;
case 1: return 15; 
break;
case 2: return 10; 
break;
case 3: return 16; 
break;
case 4: return 9; 
break;
case 5: return 11; 
break;
case 6: return 12; 
break;
case 7: return 'ATTDEF'; 
break;
case 8: return 13; 
break;
case 9: return 18; 
break;
case 10: /*skip*/ 
break;
case 11: return 27; 
break;
case 12: return 8; 
break;
case 13:/* skip, must be an extra one at EOF */; 
break;
case 14:  return 5;   
break;
case 15: console.log('Se ha encontrado un error lexico: " ' + yy_.yytext + ' "  [linea: ' + yy_.yylloc.first_line + ', columna: ' + yy_.yylloc.first_column+']'); 
        errores.push(new Error('semantico',yy_.yytext,yy_.yylloc.first_line,yy_.yylloc.first_column,'Se ha encontrado un error lexico')); 
    
break;
}
},
rules: [/^(?:([ \t\r\n]+))/,/^(?:\/)/,/^(?:=)/,/^(?:(>((\r\n|\r|\n))?))/,/^(?:(([A-Za-z\200-\377_])([A-Za-z\200-\377_0-9.-])*))/,/^(?:("[^"\""]*"))/,/^(?:\?(>((\r\n|\r|\n))?))/,/^(?:((((\r\n|\r|\n))?<)\?ROOT-ATT\b))/,/^(?:(((\r\n|\r|\n))?<)([ \t\r\n]+)?(([A-Za-z\200-\377_])([A-Za-z\200-\377_0-9.-])*))/,/^(?:(((\r\n|\r|\n))?<)([ \t\r\n]+)?\/)/,/^(?:((((\r\n|\r|\n))?<)!--([^-]|-[^-])*--(>((\r\n|\r|\n))?)))/,/^(?:(([^<\n&]|\n[^<&]|\n(&#[0-9]+;|&#x[0-9a-fA-F]+;|&[a-z]+;)|(&#[0-9]+;|&#x[0-9a-fA-F]+;|&[a-z]+;))+))/,/^(?:<\?)/,/^(?:((\r\n|\r|\n)))/,/^(?:$)/,/^(?:.)/],
conditions: {"CONTENIDO":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"inclusive":true}}
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
exports.parser = xmldes;
exports.Parser = xmldes.Parser;
exports.parse = function () { return xmldes.parse.apply(xmldes, arguments); };
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
},{"./AtributoXML.js":7,"./Error.js":9,"./FilaGrammar.js":11,"./Nodo.js":15,"./ObjetoXML.js":16,"_process":3,"fs":1,"path":2}],25:[function(require,module,exports){
function hacerTablaSimbolos(objeto) {
    
    const resultArray = [];
    addNestedChildrenToArray(objeto, resultArray);

    return resultArray;
}

function addNestedChildrenToArray(obj, resultArray, padre) {
	resultArray.push({nombre: obj.etiqueta_id, linea: obj.linea, columna: obj.columna, tipo: "objeto", ambito: padre || 'global'});
    if(obj.lista_atributos.length > 0) {
        obj.lista_atributos.forEach(atr => resultArray.push({nombre: atr.atributo, tipo: "atributo", linea: atr.fila, columna: atr.columna, ambito: obj.etiqueta_id}))
    }
    obj.lista_objetos.forEach(child => addNestedChildrenToArray(child, resultArray, obj.etiqueta_id));
}

module.exports.hacerTablaSimbolos = hacerTablaSimbolos;

},{}]},{},[6]);
