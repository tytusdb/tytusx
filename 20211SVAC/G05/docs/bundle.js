(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.myBundle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
var CSTXML = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,4],$V2=[1,5],$V3=[2,5,7,13,17],$V4=[16,19],$V5=[1,16],$V6=[1,15],$V7=[2,14,16,19],$V8=[1,35],$V9=[1,27],$Va=[1,28],$Vb=[1,29],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[9,14,17,24,25,26,27,28,29,30];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"ROOTS":4,"EOF":5,"ROOT":6,"prologo":7,"RVERSION":8,"asig":9,"StringLiteral1":10,"RENCODING":11,"prologc":12,"lt":13,"identifier":14,"LIST_ATRIBUTOS":15,"gt":16,"etiqca":17,"CONTENTS":18,"etiqcc":19,"ATRIBUTOS":20,"ATRIBUTO":21,"StringLiteral2":22,"BODY":23,"DoubleLiteral":24,"less":25,"greater":26,"ampersand":27,"apostrophe":28,"quotation":29,"simbolos1":30,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"prologo",8:"RVERSION",9:"asig",10:"StringLiteral1",11:"RENCODING",12:"prologc",13:"lt",14:"identifier",16:"gt",17:"etiqca",19:"etiqcc",22:"StringLiteral2",24:"DoubleLiteral",25:"less",26:"greater",27:"ampersand",28:"apostrophe",29:"quotation",30:"simbolos1"},
productions_: [0,[3,2],[4,2],[4,1],[6,8],[6,8],[6,8],[6,7],[6,4],[6,1],[15,1],[15,0],[20,2],[20,1],[21,3],[21,3],[21,1],[18,2],[18,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 var padre = new NodoCST('START', '');
                                                                                      padre.agregarHijo($$[$0-1]);
                                                                                      this.$ = padre;
                                                                                      return this.$; 
break;
case 2:
 var padre = new NodoCST('ROOTS', '');
                                                                                      padre.agregarHijo($$[$0-1]);
                                                                                      padre.agregarHijo($$[$0]);
                                                                                      this.$ = padre; 
                                                                                    
break;
case 3:
 var padre = new NodoCST('ROOTS', '');
                                                                                      padre.agregarHijo($$[$0]);
                                                                                      this.$ = padre; 
break;
case 4:
 var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<?xml', '');
                                                                                      var hijo2 = new NodoCST('version', '');
                                                                                      var hijo3 = new NodoCST('=', '');
                                                                                      var hijo4 = new NodoCST('String', $$[$0-4]);
                                                                                      var hijo5 = new NodoCST('encoding', '');
                                                                                      var hijo6 = new NodoCST('=', '');
                                                                                      var hijo7 = new NodoCST('String', $$[$0-1]);
                                                                                      var hijo8 = new NodoCST('?>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo(hijo3);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo(hijo5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      padre.agregarHijo(hijo8);
                                                                                      this.$ = padre;
                                                                                    
break;
case 5:
 var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $$[$0-6]);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('>', '');
                                                                                      //var hijo5 = new NodoCST('encoding', '');
                                                                                      var hijo6 = new NodoCST('</', '');
                                                                                      var hijo7 = new NodoCST('identifier', $$[$0-1]);
                                                                                      var hijo8 = new NodoCST('>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($$[$0-5]);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo($$[$0-3]);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      padre.agregarHijo(hijo8);
                                                                                      this.$ = padre;
                                                                                    
break;
case 6:
 var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $$[$0-6]);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('>', '');
                                                                                      var hijo5 = new NodoCST('CONTENT', $$[$0-3]);
                                                                                      var hijo6 = new NodoCST('</', '');
                                                                                      var hijo7 = new NodoCST('identifier', $$[$0-1]);
                                                                                      var hijo8 = new NodoCST('>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($$[$0-5]);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo(hijo5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      padre.agregarHijo(hijo8);
                                                                                      this.$ = padre;
                                                                                    
break;
case 7:
 var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $$[$0-5]);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('>', '');
                                                                                      var hijo5 = new NodoCST('</', '');
                                                                                      var hijo6 = new NodoCST('identifier', $$[$0-1]);
                                                                                      var hijo7 = new NodoCST('>', '');
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($$[$0-4]);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      padre.agregarHijo(hijo5);
                                                                                      padre.agregarHijo(hijo6);
                                                                                      padre.agregarHijo(hijo7);
                                                                                      this.$ = padre;
                                                                                    
break;
case 8:
 var padre = new NodoCST('ROOT', '');
                                                                                      var hijo1 = new NodoCST('<', '');
                                                                                      var hijo2 = new NodoCST('identifier', $$[$0-2]);
                                                                                      //var hijo3 = new NodoCST('>', '');
                                                                                      var hijo4 = new NodoCST('/>', '');
                                                                                      
                                                                                      padre.agregarHijo(hijo1);
                                                                                      padre.agregarHijo(hijo2);
                                                                                      padre.agregarHijo($$[$0-1]);
                                                                                      padre.agregarHijo(hijo4);
                                                                                      this.$ = padre;
                                                                                    
break;
case 9:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                                                      
                                                                                    
break;
case 10:
 var padre = new NodoCST('LIST_ATRIBUTOS', '');
                                                      padre.agregarHijo($$[$0]);
                                                      this.$ = padre;
                                                    
break;
case 11:
 var padre = new NodoCST('LIST_ATRIBUTOS', '');
                                                      var hijo = new NodoCST('ε','');
                                                      padre.agregarHijo(hijo);
                                                      this.$=padre; 
break;
case 12:
 var padre = new NodoCST('ATRIBUTOS', '');
                                                      padre.agregarHijo($$[$0-1]);
                                                      padre.agregarHijo($$[$0]);
                                                      this.$ = padre;
                                                    
break;
case 13:
 var padre = new NodoCST('ATRIBUTOS', '');
                                                      padre.agregarHijo($$[$0]);
                                                      this.$ = padre; 
break;
case 14: case 15:
 var padre = new NodoCST('ATRIBUTO', '');
                                                      var hijo1 = new NodoCST('identifier', $$[$0-2]);
                                                      var hijo2 = new NodoCST('=', '');
                                                      var hijo3 = new NodoCST('String', $$[$0]);
                                                      padre.agregarHijo(hijo1);
                                                      padre.agregarHijo(hijo2);
                                                      padre.agregarHijo(hijo3);
                                                      this.$ = padre;
                                                    
break;
case 16:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                      
                                                    
break;
case 17:
 $$[$0-1] = $$[$0-1] + ' ' + $$[$0]; this.$ = $$[$0-1]; 
break;
case 18: case 19: case 20: case 26: case 27:
 this.$ = $$[$0] 
break;
case 21:
 this.$ = '<' 
break;
case 22:
 this.$ = '>' 
break;
case 23:
 this.$ = '&' 
break;
case 24:
 this.$ = "'" 
break;
case 25:
 this.$ = '"' 
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:$V1,13:$V2},{1:[3]},{2:$V0,5:[1,7],6:8,7:$V1,13:$V2},o($V3,[2,3]),{8:[1,9]},{14:[1,10]},o($V3,[2,9]),{1:[2,1]},o($V3,[2,2]),{9:[1,11]},o($V4,[2,11],{15:12,20:13,21:14,2:$V5,14:$V6}),{10:[1,17]},{16:[1,18],19:[1,19]},o($V4,[2,10],{21:20,2:$V5,14:$V6}),o($V7,[2,13]),{9:[1,21]},o($V7,[2,16]),{11:[1,22]},{2:$V0,4:23,6:3,7:$V1,9:$V8,13:$V2,14:$V9,17:[1,25],18:24,23:26,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg},o($V3,[2,8]),o($V7,[2,12]),{10:[1,36],22:[1,37]},{9:[1,38]},{2:$V0,6:8,7:$V1,13:$V2,17:[1,39]},{9:$V8,14:$V9,17:[1,40],23:41,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg},{14:[1,42]},o($Vh,[2,18]),o($Vh,[2,19]),o($Vh,[2,20]),o($Vh,[2,21]),o($Vh,[2,22]),o($Vh,[2,23]),o($Vh,[2,24]),o($Vh,[2,25]),o($Vh,[2,26]),o($Vh,[2,27]),o($V7,[2,14]),o($V7,[2,15]),{10:[1,43]},{14:[1,44]},{14:[1,45]},o($Vh,[2,17]),{16:[1,46]},{12:[1,47]},{16:[1,48]},{16:[1,49]},o($V3,[2,7]),o($V3,[2,4]),o($V3,[2,5]),o($V3,[2,6])],
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


const { GraficarCST_XML } = require('../Graficador/GraficarCST_XML');
const { NodoCST } = require('../Graficador/NodoCST');
var cst = new GraficarCST_XML();
var raiz = new NodoCST;

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
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:this.begin('comment');
break;
case 1:this.popState();
break;
case 2:/* ignora contenido de los comentarios*/
break;
case 3:// ignora los espacios en blanco
break;
case 4:return 7;
break;
case 5:return 12;
break;
case 6:return 17;
break;
case 7:return 19;
break;
case 8:return 8;
break;
case 9:return 11
break;
case 10:return 25;
break;
case 11:return 26;
break;
case 12:return 27;
break;
case 13:return 28;
break;
case 14:return 29;
break;
case 15:return 13;
break;
case 16:return 16;
break;
case 17:return 9;
break;
case 18:return 24;
break;
case 19:return 10
break;
case 20:return 22
break;
case 21:return 14;
break;
case 22:return 30;
break;
case 23:
            console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
        
break;
case 24:return 5
break;
}
},
rules: [/^(?:<!--)/,/^(?:-->)/,/^(?:.)/,/^(?:\s+)/,/^(?:<\?xml\b)/,/^(?:\?>)/,/^(?:<\/)/,/^(?:\/>)/,/^(?:version\b)/,/^(?:encoding\b)/,/^(?:&lt;)/,/^(?:&gt;)/,/^(?:&amp;)/,/^(?:&apos;)/,/^(?:&quot;)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:\d+([.]\d*)?)/,/^(?:"[^\"]*")/,/^(?:'[^\']*')/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:([\u0021]|[\u0023-\u0025]|[\u0028-\u002F]|[\u003A-\u003B]|[\u003F-\u0040]|[\u005B-\u0060]|[\u007B-\u007E]|[\u00A1-\u00AC]|[\u00AE-\uD7F0])+)/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true},"INITIAL":{"rules":[0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true}}
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
exports.parser = CSTXML;
exports.Parser = CSTXML.Parser;
exports.parse = function () { return CSTXML.parse.apply(CSTXML, arguments); };
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
},{"../Graficador/GraficarCST_XML":9,"../Graficador/NodoCST":10,"_process":3,"fs":1,"path":2}],5:[function(require,module,exports){
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
var gramaticaXML = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,4],$V2=[1,5],$V3=[2,5,7,13,17],$V4=[16,19],$V5=[1,16],$V6=[1,15],$V7=[2,14,16,19],$V8=[1,35],$V9=[1,27],$Va=[1,28],$Vb=[1,29],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[9,14,17,24,25,26,27,28,29,30];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"ROOTS":4,"EOF":5,"ROOT":6,"prologo":7,"RVERSION":8,"asig":9,"StringLiteral1":10,"RENCODING":11,"prologc":12,"lt":13,"identifier":14,"LIST_ATRIBUTOS":15,"gt":16,"etiqca":17,"CONTENTS":18,"etiqcc":19,"ATRIBUTOS":20,"ATRIBUTO":21,"StringLiteral2":22,"BODY":23,"DoubleLiteral":24,"less":25,"greater":26,"ampersand":27,"apostrophe":28,"quotation":29,"simbolos1":30,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"prologo",8:"RVERSION",9:"asig",10:"StringLiteral1",11:"RENCODING",12:"prologc",13:"lt",14:"identifier",16:"gt",17:"etiqca",19:"etiqcc",22:"StringLiteral2",24:"DoubleLiteral",25:"less",26:"greater",27:"ampersand",28:"apostrophe",29:"quotation",30:"simbolos1"},
productions_: [0,[3,2],[4,2],[4,1],[6,8],[6,8],[6,8],[6,7],[6,4],[6,1],[15,1],[15,0],[20,2],[20,1],[21,3],[21,3],[21,1],[18,2],[18,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; 
                         gramatical.agregar('Start->Roots','$$=$$[$0-1]');
                         return {
                              result: this.$,
                              reporteGram: gramatical
                         }; 
break;
case 2:
 $$[$0-1].push($$[$0]);
                         gramatical.agregar('Roots->Roots Root','$$[$0-1].push($$[$0])');
                         this.$ = $$[$0-1]; 
break;
case 3:
 this.$ = [$$[$0]]; 
                          gramatical.agregar('Roots->Root','$$=Array($$[$0])');
                         
break;
case 4:
 this.$ = new Objeto($$[$0-7],'',_$[$0-7].first_line,_$[$0-7].first_column,[],[],$$[$0-1]); 
                                                                                      gramatical.agregar('ROOT -> prologo RVERSION asig StringLiteral1 RENCODING asig StringLiteral1 prologc','$$ = new Objeto()');
                                                                                     
break;
case 5:
 this.$ = new Objeto($$[$0-6],'',_$[$0-7].first_line,_$[$0-7].first_column,$$[$0-5],$$[$0-3],$$[$0-1]); 
                                                                                      gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt ROOTS etiqca identifier gt','$$= new Objeto()');
                                                                                     
break;
case 6:
 this.$ = new Objeto($$[$0-6],$$[$0-3],_$[$0-7].first_line,_$[$0-7].first_column,$$[$0-5],[],$$[$0-1]); 
                                                                                      gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt CONTENTS etiqca identifier gt','$$ = new Objeto()');
                                                                                     
break;
case 7:
 this.$ = new Objeto($$[$0-5],'',_$[$0-6].first_line,_$[$0-6].first_column,$$[$0-4],[],$$[$0]); 
                                                                                      gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt etiqca identifier gt','$$ = new Objeto();');
                                                                                     
break;
case 8:
 this.$ = new Objeto($$[$0-2],'',_$[$0-3].first_line,_$[$0-3].first_column,$$[$0-1],[],''); 
                                                                                      gramatical.agregar('ROOT ->  lt identifier LIST_ATRIBUTOS etiqcc ','$$ = new Objeto()');
                                                                                     
break;
case 9:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                                                      new ESintactico("Sintactico", "No se esperaba: "+yytext,"XML Asc", this._$.first_line , this._$.first_column);
                                                                                    
break;
case 10:
 this.$ = $$[$0];
                                                        gramatical.agregar('LIST_ATRIBUTOS -> ATRIBUTOS','$$=$$[$0]');
                                                        
break;
case 11:
 this.$ = []; 
                                                        gramatical.agregar('LIST_ATRIBUTOS -> ','$$ = [];');
                                                       
break;
case 12:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
                                                             gramatical.agregar('ATRIBUTOS -> ATRIBUTOS ATRIBUTO','$$[$0-1].push($$[$0]); this.$ = $$[$0-1]');
                                                       
break;
case 13:
 this.$ = [$$[$0]]; 
                                                        gramatical.agregar('ATRIBUTOS -> ATRIBUTO','$$=Array($$[$0])');
                                                       
break;
case 14:
 this.$ = new Atributo($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column); 
                                                       gramatical.agregar('ATRIBUTO -> id asig StringLiteral1','$$ = new Atributo()');
                                                  
break;
case 15:
 this.$ = new Atributo($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column); 
                                                        gramatical.agregar('ATRIBUTO -> id asig StringLiteral2','$$ = new Atributo()');
                                                  
break;
case 16:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
                                                      new ESintactico("Sintactico", "No se esperaba: "+yytext,"XML Asc", this._$.first_line , this._$.first_column);
                                                    
break;
case 17:
 $$[$0-1] = $$[$0-1] + ' ' + $$[$0]; this.$ = $$[$0-1];
                                                       gramatical.agregar('Contents -> Contents Body','ConcatenarCaracteres()');
                                                  
break;
case 18:
 this.$ = $$[$0]; 
                                                       gramatical.agregar('Contents -> Body','$$=$$[$0]');        
                                                  
break;
case 19:
 this.$ = $$[$0];  
                                                       gramatical.agregar('Body -> Id','$$=$$[$0]');        
                                                  
break;
case 20:
 this.$ = $$[$0]; 
                                                       gramatical.agregar('Body -> DoubleLiteral','$$=$$[$0]');
break;
case 21:
 this.$ = '<'; 
                                                       gramatical.agregar('Body -> <','$$=$$[$0]');
break;
case 22:
 this.$ = '>'; 
                                                       gramatical.agregar('Body -> >','$$=$$[$0]');
break;
case 23:
 this.$ = '&'; 
                                                       gramatical.agregar('Body -> &','$$=$$[$0]');
break;
case 24:
 this.$ = "'"; 
                                                       gramatical.agregar("Body -> '",'$$=$$[$0]');
break;
case 25:
 this.$ = '"'; 
                                                       gramatical.agregar('Body -> "','$$=$$[$0]');
break;
case 26:
 this.$ = $$[$0]; 
                                                       gramatical.agregar('Body -> simbolos1','$$=$$[$0]');
break;
case 27:
 this.$ = $$[$0]; 
                                                       gramatical.agregar('Body -> asig','$$=$$[$0]');
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:$V1,13:$V2},{1:[3]},{2:$V0,5:[1,7],6:8,7:$V1,13:$V2},o($V3,[2,3]),{8:[1,9]},{14:[1,10]},o($V3,[2,9]),{1:[2,1]},o($V3,[2,2]),{9:[1,11]},o($V4,[2,11],{15:12,20:13,21:14,2:$V5,14:$V6}),{10:[1,17]},{16:[1,18],19:[1,19]},o($V4,[2,10],{21:20,2:$V5,14:$V6}),o($V7,[2,13]),{9:[1,21]},o($V7,[2,16]),{11:[1,22]},{2:$V0,4:23,6:3,7:$V1,9:$V8,13:$V2,14:$V9,17:[1,25],18:24,23:26,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg},o($V3,[2,8]),o($V7,[2,12]),{10:[1,36],22:[1,37]},{9:[1,38]},{2:$V0,6:8,7:$V1,13:$V2,17:[1,39]},{9:$V8,14:$V9,17:[1,40],23:41,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg},{14:[1,42]},o($Vh,[2,18]),o($Vh,[2,19]),o($Vh,[2,20]),o($Vh,[2,21]),o($Vh,[2,22]),o($Vh,[2,23]),o($Vh,[2,24]),o($Vh,[2,25]),o($Vh,[2,26]),o($Vh,[2,27]),o($V7,[2,14]),o($V7,[2,15]),{10:[1,43]},{14:[1,44]},{14:[1,45]},o($Vh,[2,17]),{16:[1,46]},{12:[1,47]},{16:[1,48]},{16:[1,49]},o($V3,[2,7]),o($V3,[2,4]),o($V3,[2,5]),o($V3,[2,6])],
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


const { Objeto } = require('../Interprete/Expresion/Objeto');
const { Atributo } = require('../Interprete/Expresion/Atributo');
const {ELexico, ESintactico} = require('../Interprete/Util/TError')
const {Gramatical} = require('../Simbolo/Gramatical')
 var gramatical = new Gramatical(); 

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
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:this.begin('comment');
break;
case 1:this.popState();
break;
case 2:/* ignora contenido de los comentarios*/
break;
case 3:// ignora los espacios en blanco
break;
case 4:return 7;
break;
case 5:return 12;
break;
case 6:return 17;
break;
case 7:return 19;
break;
case 8:return 8;
break;
case 9:return 11
break;
case 10:return 25;
break;
case 11:return 26;
break;
case 12:return 27;
break;
case 13:return 28;
break;
case 14:return 29;
break;
case 15:return 13;
break;
case 16:return 16;
break;
case 17:return 9;
break;
case 18:return 24;
break;
case 19:return 10
break;
case 20:return 22
break;
case 21:return 14;
break;
case 22:return 30;
break;
case 23:
            console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
             new ELexico("Lexico", "Caracter inesperado \'"+yy_.yytext+"\'", 'XML Asc', yy_.yylloc.first_line, yy_.yylloc.first_column)
        
break;
case 24:return 5
break;
}
},
rules: [/^(?:<!--)/,/^(?:-->)/,/^(?:.)/,/^(?:\s+)/,/^(?:<\?xml\b)/,/^(?:\?>)/,/^(?:<\/)/,/^(?:\/>)/,/^(?:version\b)/,/^(?:encoding\b)/,/^(?:&lt;)/,/^(?:&gt;)/,/^(?:&amp;)/,/^(?:&apos;)/,/^(?:&quot;)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:\d+([.]\d*)?)/,/^(?:"[^\"]*")/,/^(?:'[^\']*')/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:([\u0021]|[\u0023-\u0025]|[\u0028-\u002F]|[\u003A-\u003B]|[\u003F-\u0040]|[\u005B-\u0060]|[\u007B-\u007E]|[\u00A1-\u00AC]|[\u00AE-\uD7F0])+)/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true},"INITIAL":{"rules":[0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true}}
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
exports.parser = gramaticaXML;
exports.Parser = gramaticaXML.Parser;
exports.parse = function () { return gramaticaXML.parse.apply(gramaticaXML, arguments); };
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
},{"../Interprete/Expresion/Atributo":12,"../Interprete/Expresion/Objeto":13,"../Interprete/Util/TError":15,"../Simbolo/Gramatical":17,"_process":3,"fs":1,"path":2}],6:[function(require,module,exports){
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
var gramaticaXMLDSC = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,4],$V2=[1,5],$V3=[5,18],$V4=[2,4],$V5=[2,5,8,14,18],$V6=[17,20],$V7=[1,18],$V8=[1,17],$V9=[2,15],$Va=[2,15,17,20],$Vb=[1,38],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[1,37],$Vk=[2,21],$Vl=[10,15,18,27,28,29,30,31,32,33];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"ROOTS":4,"EOF":5,"ROOT":6,"ROOTS_P":7,"prologo":8,"RVERSION":9,"asig":10,"StringLiteral1":11,"RENCODING":12,"prologc":13,"lt":14,"identifier":15,"LIST_ATRIBUTOS":16,"gt":17,"etiqca":18,"CONTENTS":19,"etiqcc":20,"ATRIBUTOS":21,"ATRIBUTO":22,"ATRIBUTOS_P":23,"StringLiteral2":24,"BODY":25,"CONTENTS_P":26,"DoubleLiteral":27,"less":28,"greater":29,"ampersand":30,"apostrophe":31,"quotation":32,"simbolos1":33,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"prologo",9:"RVERSION",10:"asig",11:"StringLiteral1",12:"RENCODING",13:"prologc",14:"lt",15:"identifier",17:"gt",18:"etiqca",20:"etiqcc",24:"StringLiteral2",27:"DoubleLiteral",28:"less",29:"greater",30:"ampersand",31:"apostrophe",32:"quotation",33:"simbolos1"},
productions_: [0,[3,2],[4,2],[7,2],[7,0],[6,8],[6,8],[6,8],[6,7],[6,4],[6,1],[16,1],[16,0],[21,2],[23,2],[23,0],[22,3],[22,3],[22,1],[19,2],[26,2],[26,0],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$=$$[$0-1];  
                                                         gramatical.agregar('Start->Roots','$$=$$[$0-1]');
                                                        return {
                                                        result: this.$,
                                                        reporteGram: gramatical
                                                    }; 
break;
case 2:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ROOTS -> ROOT ROOTS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 3:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ROOTS_P -> ROOT ROOTS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 4:
 this.$ = []; 
                                                         gramatical.agregar('ROOTS_P ->  Ɛ','$$=[]');
                                                        
break;
case 5:
 this.$ = new Objeto($$[$0-7],'',_$[$0-7].first_line,_$[$0-7].first_column,[],[],$$[$0-1]); 
                                                                                        gramatical.agregar('ROOT -> prologo RVERSION asig StringLiteral1 RENCODING asig StringLiteral1 prologc','$$ = new Objeto()');
                                                                                        
break;
case 6:
 this.$ = new Objeto($$[$0-6],'',_$[$0-7].first_line,_$[$0-7].first_column,$$[$0-5],$$[$0-3],$$[$0-1]); 
                                                                                         gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt ROOTS etiqca identifier gt','$$= new Objeto()');
                                                                                        
break;
case 7:
 this.$ = new Objeto($$[$0-6],$$[$0-3],_$[$0-7].first_line,_$[$0-7].first_column,$$[$0-5],[],$$[$0-1]); 
                                                                                         gramatical.agregar('Start->Roots','$$=$$[$0-7]'); gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt CONTENTS etiqca identifier gt','$$ = new Objeto()');
                                                                                        
break;
case 8:
 this.$ = new Objeto($$[$0-5],'',_$[$0-6].first_line,_$[$0-6].first_column,$$[$0-4],[],$$[$0]); 
                                                                                         gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt etiqca identifier gt','$$ = new Objeto();');
                                                                                        
break;
case 9:
 this.$ = new Objeto($$[$0-2],'',_$[$0-3].first_line,_$[$0-3].first_column,$$[$0-1],[],''); 
                                                                                          gramatical.agregar('ROOT ->  lt identifier LIST_ATRIBUTOS etiqcc ','$$ = new Objeto()');
                                                                                        
break;
case 10: case 18:
   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
					new ESintactico("Sintactico", "No se esperaba: "+yytext,"XML Asc", this._$.first_line , this._$.first_column);
				
break;
case 11:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('LIST_ATRIBUTOS -> ATRIBUTOS','$$=$$[$0]');
                                                        
break;
case 12:
 this.$ = []; 
                                                         gramatical.agregar('LIST_ATRIBUTOS ->  Ɛ','$$=[]');
                                                        
break;
case 13:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ATRIBUTOS -> ATRIBUTO ATRIBUTOS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 14:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ATRIBUTOS_P -> ATRIBUTO ATRIBUTOS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 15:
 this.$ = [] ;
                                                         gramatical.agregar('ATRIBUTOS_P ->  Ɛ','$$=[]');
                                                        
break;
case 16:
 this.$ = new Atributo($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column); 
                                                         gramatical.agregar('ATRIBUTO -> id asig StringLiteral1','$$ = new Atributo()');
                                                        
break;
case 17:
 this.$ = new Atributo($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column); 
                                                         gramatical.agregar('ATRIBUTO -> id asig StringLiteral2','$$ = new Atributo()');
                                                        
break;
case 19:
 $$[$0] = $$[$0-1] + ' ' + $$[$0]; this.$=$$[$0];
                                                         gramatical.agregar('Contents -> Body Contents_P','concatenarCaracteres()');
                                                        
break;
case 20:
  $$[$0] = $$[$0-1] + ' ' + $$[$0]; this.$=$$[$0]; 
                                                         gramatical.agregar('Contents_P -> Body Contents','ConcatenarCaracteres()');
                                                        
break;
case 21:
 this.$ = "" ;
                                                         gramatical.agregar('Contents_P ->  Ɛ','$$=""');
                                                        
break;
case 22:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> Id','$$=$$[$0]');
                                                        
break;
case 23:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> DoubleLiteral','$$=$$[$0]');
                                                        
break;
case 24:
 this.$ = '<'; 
                                                         gramatical.agregar('Body -> <','$$=$$[$0]');
                                                        
break;
case 25:
 this.$ = '>'; 
                                                         gramatical.agregar('Body -> >','$$=$$[$0]');
                                                        
break;
case 26:
 this.$ = '&'; 
                                                         gramatical.agregar('Body -> &','$$=$$[$0]');
                                                        
break;
case 27:
 this.$ = "'"; 
                                                         gramatical.agregar("Body -> '",'$$=$$[$0]');
                                                        
break;
case 28:
 this.$ = '"'; 
                                                         gramatical.agregar('Body -> "','$$=$$[$0]');
                                                        
break;
case 29:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> simbolos1','$$=$$[$0]');
                                                        
break;
case 30:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> asig','$$=$$[$0]');
                                                        
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,8:$V1,14:$V2},{1:[3]},{5:[1,7]},o($V3,$V4,{7:8,6:9,2:$V0,8:$V1,14:$V2}),{9:[1,10]},{15:[1,11]},o($V5,[2,10]),{1:[2,1]},o($V3,[2,2]),o($V3,$V4,{6:9,7:12,2:$V0,8:$V1,14:$V2}),{10:[1,13]},o($V6,[2,12],{16:14,21:15,22:16,2:$V7,15:$V8}),o($V3,[2,3]),{11:[1,19]},{17:[1,20],20:[1,21]},o($V6,[2,11]),o($V6,$V9,{23:22,22:23,2:$V7,15:$V8}),{10:[1,24]},o($Va,[2,18]),{12:[1,25]},{2:$V0,4:26,6:3,8:$V1,10:$Vb,14:$V2,15:$Vc,18:[1,28],19:27,25:29,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj},o($V5,[2,9]),o($V6,[2,13]),o($V6,$V9,{22:23,23:39,2:$V7,15:$V8}),{11:[1,40],24:[1,41]},{10:[1,42]},{18:[1,43]},{18:[1,44]},{15:[1,45]},{10:$Vb,15:$Vc,18:$Vk,25:47,26:46,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj},o($Vl,[2,22]),o($Vl,[2,23]),o($Vl,[2,24]),o($Vl,[2,25]),o($Vl,[2,26]),o($Vl,[2,27]),o($Vl,[2,28]),o($Vl,[2,29]),o($Vl,[2,30]),o($V6,[2,14]),o($Va,[2,16]),o($Va,[2,17]),{11:[1,48]},{15:[1,49]},{15:[1,50]},{17:[1,51]},{18:[2,19]},{10:$Vb,15:$Vc,18:$Vk,25:47,26:52,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj},{13:[1,53]},{17:[1,54]},{17:[1,55]},o($V5,[2,8]),{18:[2,20]},o($V5,[2,5]),o($V5,[2,6]),o($V5,[2,7])],
defaultActions: {7:[2,1],46:[2,19],52:[2,20]},
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


const { Objeto } = require('../Interprete/Expresion/Objeto');
const { Atributo } = require('../Interprete/Expresion/Atributo');
const {ELexico, ESintactico} = require('../Interprete/Util/TError')
const {Gramatical} = require('../Simbolo/Gramatical')
 var gramatical = new Gramatical(); 

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
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:this.begin('comment');
break;
case 1:this.popState();
break;
case 2:/* ignora contenido de los comentarios*/
break;
case 3:// ignora los espacios en blanco
break;
case 4:return 8;
break;
case 5:return 13;
break;
case 6:return 18;
break;
case 7:return 20;
break;
case 8:return 9;
break;
case 9:return 12
break;
case 10:return 28;
break;
case 11:return 29;
break;
case 12:return 30;
break;
case 13:return 31;
break;
case 14:return 32;
break;
case 15:return 14;
break;
case 16:return 17;
break;
case 17:return 10;
break;
case 18:return 27;
break;
case 19:return 11
break;
case 20:return 24
break;
case 21:return 15;
break;
case 22:return 33;
break;
case 23:
            console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                 new ELexico("Lexico", "Caracter inesperado \'"+yy_.yytext+"\'", 'XML Asc', yy_.yylloc.first_line, yy_.yylloc.first_column)
        
break;
case 24:return 5
break;
}
},
rules: [/^(?:<!--)/,/^(?:-->)/,/^(?:.)/,/^(?:\s+)/,/^(?:<\?xml\b)/,/^(?:\?>)/,/^(?:<\/)/,/^(?:\/>)/,/^(?:version\b)/,/^(?:encoding\b)/,/^(?:&lt;)/,/^(?:&gt;)/,/^(?:&amp;)/,/^(?:&apos;)/,/^(?:&quot;)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:\d+([.]\d*)?)/,/^(?:"[^\"]*")/,/^(?:'[^\']*')/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:([\u0021]|[\u0023-\u0025]|[\u0028-\u002F]|[\u003A-\u003B]|[\u003F-\u0040]|[\u005B-\u0060]|[\u007B-\u007E]|[\u00A1-\u00AC]|[\u00AE-\uD7F0])+)/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true},"INITIAL":{"rules":[0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true}}
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
exports.parser = gramaticaXMLDSC;
exports.Parser = gramaticaXMLDSC.Parser;
exports.parse = function () { return gramaticaXMLDSC.parse.apply(gramaticaXMLDSC, arguments); };
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
},{"../Interprete/Expresion/Atributo":12,"../Interprete/Expresion/Objeto":13,"../Interprete/Util/TError":15,"../Simbolo/Gramatical":17,"_process":3,"fs":1,"path":2}],7:[function(require,module,exports){
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
var gramaticaXPath = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,13],$V1=[1,12],$V2=[1,53],$V3=[1,15],$V4=[1,35],$V5=[1,41],$V6=[1,42],$V7=[1,43],$V8=[1,44],$V9=[1,45],$Va=[1,46],$Vb=[1,47],$Vc=[1,48],$Vd=[1,49],$Ve=[1,27],$Vf=[1,36],$Vg=[1,37],$Vh=[1,38],$Vi=[1,39],$Vj=[1,40],$Vk=[1,51],$Vl=[1,52],$Vm=[1,54],$Vn=[1,24],$Vo=[1,30],$Vp=[1,31],$Vq=[1,32],$Vr=[1,33],$Vs=[1,34],$Vt=[5,40],$Vu=[5,8,40],$Vv=[1,57],$Vw=[5,8,10,40],$Vx=[5,8,10,14,15,16,17,18,19,21,23,40],$Vy=[1,67],$Vz=[1,68],$VA=[1,69],$VB=[5,8,10,14,15,16,17,18,19,21,23,25,26,27,40],$VC=[1,70],$VD=[5,8,10,14,15,16,17,18,19,21,23,25,26,27,28,40],$VE=[1,75],$VF=[5,8,10,14,15,16,17,18,19,21,23,25,26,27,28,31,40],$VG=[5,8,10,14,15,16,17,18,19,21,23,25,26,27,28,31,39,40],$VH=[1,78],$VI=[21,23,25,31,39,44,46,47,48,49,50,51,52,53,55,56,57,58,59,60,61,62,63,66,68,69,70,71,72],$VJ=[1,111],$VK=[25,61,62,63];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"XPATH":3,"EXPR":4,"EOF":5,"EXPRSINGLE":6,"OREXPR":7,"or":8,"ANDEXPR":9,"and":10,"COMPARISONXPR":11,"STRINGCONCATXPR":12,"GENERALCOMP":13,"=":14,"!=":15,"<":16,">":17,"<=":18,">=":19,"ADDITIVEEXPR":20,"+":21,"MULTIPLICATIVEEXPR":22,"-":23,"UNIONEXPR":24,"*":25,"div":26,"mod":27,"|":28,"UNARYEXPR":29,"PATHEXPR":30,"/":31,"RELATIVEPATHEXPR":32,"STEPEXPR":33,"POSTFIXEXPR":34,"AXISTEP":35,"REVERSESTEP":36,"PREDICATELIST":37,"FORDWARDSTEP":38,"[":39,"]":40,"FORDWARDAXIS":41,"NODETEST":42,"ABBREVFORDWARDSTEP":43,"child":44,"::":45,"descendant-or-self":46,"descendant":47,"attribute":48,"self":49,"following-sibling":50,"following":51,"namespace":52,"@":53,"REVERSEAXIS":54,"..":55,"parent":56,"ancestor":57,"preceding-sibling":58,"preceding":59,"ancestor-or-self":60,"text()":61,"node()":62,"nodename":63,"PRIMARYEXPR":64,"LITERAL":65,".":66,"ARRAYCONSTRUCTOR":67,"digito":68,"todo1":69,"todo2":70,"last()":71,"position()":72,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"or",10:"and",14:"=",15:"!=",16:"<",17:">",18:"<=",19:">=",21:"+",23:"-",25:"*",26:"div",27:"mod",28:"|",31:"/",39:"[",40:"]",44:"child",45:"::",46:"descendant-or-self",47:"descendant",48:"attribute",49:"self",50:"following-sibling",51:"following",52:"namespace",53:"@",55:"..",56:"parent",57:"ancestor",58:"preceding-sibling",59:"preceding",60:"ancestor-or-self",61:"text()",62:"node()",63:"nodename",66:".",68:"digito",69:"todo1",70:"todo2",71:"last()",72:"position()"},
productions_: [0,[3,2],[4,1],[6,1],[7,3],[7,1],[9,3],[9,1],[11,3],[11,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[12,1],[20,3],[20,3],[20,1],[22,1],[22,3],[22,3],[22,3],[24,3],[24,1],[29,2],[29,2],[29,1],[30,3],[30,2],[30,1],[32,1],[32,3],[32,4],[33,1],[33,1],[35,2],[35,2],[35,1],[35,1],[37,4],[37,3],[38,2],[38,1],[41,2],[41,2],[41,2],[41,2],[41,2],[41,2],[41,2],[41,2],[43,2],[43,1],[36,2],[36,1],[54,2],[54,2],[54,2],[54,2],[54,2],[42,1],[42,1],[42,1],[42,1],[34,1],[34,4],[64,1],[64,1],[64,1],[67,2],[67,3],[65,1],[65,1],[65,1],[65,1],[65,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
this.$=$$[$0-1];return this.$;
break;
case 2: case 3: case 9: case 28: case 36: case 40: case 44: case 54:
this.$=$$[$0];
break;
case 4: case 6: case 17: case 18: case 21: case 22: case 23: case 24:
 $$[$0-2].push($$[$0]); this.$=$$[$0-2]; 
break;
case 5: case 7: case 19: case 20: case 25: case 32:
this.$=[$$[$0]];
break;
case 16:
 this.$ = $$[$0] ;
break;
case 29:
$$[$0][0].tiposlash="//"; this.$= new Sacceso("//",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column);
break;
case 30:
this.$= new Sacceso("/",$$[$0],_$[$0-1].first_line,_$[$0-1].first_column);
break;
case 31:
this.$= new Sacceso("",$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 33:
 $$[$0].tiposlash="/";$$[$0-2].push($$[$0]); this.$=$$[$0-2]; 
break;
case 34:
 $$[$0].tiposlash="//";$$[$0-3].push($$[$0]); this.$=$$[$0-3]; 
break;
case 41: case 42:
console.log("dio");
break;
case 53:
$$[$0-1].tipo=Tipo2.ATRIBUTO; this.$ = $$[$0-1];
break;
case 62: case 63:
this.$ = new Acceso("",$$[$0],Tipo2.TEST,_$[$0].first_line,_$[$0].first_column);
break;
case 64:
this.$ = new Acceso("",$$[$0],Tipo2.SIGNO,_$[$0].first_line,_$[$0].first_column);
break;
case 65:
this.$ = new Acceso("",$$[$0],Tipo2.ACCESO,_$[$0].first_line,_$[$0].first_column);
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,11:6,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{1:[3]},{5:[1,55]},o($Vt,[2,2]),o($Vt,[2,3],{8:[1,56]}),o($Vu,[2,5],{10:$Vv}),o($Vw,[2,7]),o($Vw,[2,9],{13:58,14:[1,59],15:[1,60],16:[1,61],17:[1,62],18:[1,63],19:[1,64]}),o([5,8,10,14,15,16,17,18,19,40],[2,16],{21:[1,65],23:[1,66]}),o($Vx,[2,19],{25:$Vy,26:$Vz,27:$VA}),o($VB,[2,20],{28:$VC}),o($VD,[2,25]),{25:$V2,30:71,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{25:$V2,30:72,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VD,[2,28]),{25:$V2,31:[1,73],32:74,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VD,[2,31],{31:$VE}),o($VF,[2,32]),o($VF,[2,35],{39:[1,76]}),o($VF,[2,36]),o($VG,[2,66]),o($VF,[2,39],{37:77,39:$VH}),o($VF,[2,40],{37:79,39:$VH}),o($VG,[2,68]),o($VG,[2,69]),o($VG,[2,70]),{25:$V2,42:80,61:$Vk,62:$Vl,63:$Vm},o($VG,[2,56]),{25:$V2,42:81,61:$Vk,62:$Vl,63:$Vm},o($VG,[2,44]),o($VG,[2,73]),o($VG,[2,74]),o($VG,[2,75]),o($VG,[2,76]),o($VG,[2,77]),{6:83,7:4,9:5,11:6,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,40:[1,82],41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{45:[1,84]},{45:[1,85]},{45:[1,86]},{45:[1,87]},{45:[1,88]},{45:[1,89]},{45:[1,90]},{45:[1,91]},{45:[1,92]},{45:[1,93]},{45:[1,94]},{45:[1,95]},{45:[1,96]},{25:$V2,42:97,61:$Vk,62:$Vl,63:$Vm},o($VG,[2,54]),o($VG,[2,62]),o($VG,[2,63]),o($VG,[2,64]),o($VG,[2,65]),{1:[2,1]},{9:98,11:6,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{11:99,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{12:100,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VI,[2,10]),o($VI,[2,11]),o($VI,[2,12]),o($VI,[2,13]),o($VI,[2,14]),o($VI,[2,15]),{21:$V0,22:101,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{21:$V0,22:102,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{21:$V0,23:$V1,24:103,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{21:$V0,23:$V1,24:104,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{21:$V0,23:$V1,24:105,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{21:$V0,23:$V1,25:$V2,29:106,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VD,[2,26]),o($VD,[2,27]),{25:$V2,32:107,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VD,[2,30],{31:$VE}),{25:$V2,31:[1,109],33:108,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{4:110,6:3,7:4,9:5,11:6,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VF,[2,37],{39:$VJ}),{4:112,6:3,7:4,9:5,11:6,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},o($VF,[2,38],{39:$VJ}),o($VG,[2,55]),o($VG,[2,43]),o($VG,[2,71]),{40:[1,113]},o($VK,[2,57]),o($VK,[2,58]),o($VK,[2,59]),o($VK,[2,60]),o($VK,[2,61]),o($VK,[2,45]),o($VK,[2,46]),o($VK,[2,47]),o($VK,[2,48]),o($VK,[2,49]),o($VK,[2,50]),o($VK,[2,51]),o($VK,[2,52]),o($VG,[2,53]),o($Vu,[2,4],{10:$Vv}),o($Vw,[2,6]),o($Vw,[2,8]),o($Vx,[2,17],{25:$Vy,26:$Vz,27:$VA}),o($Vx,[2,18],{25:$Vy,26:$Vz,27:$VA}),o($VB,[2,21],{28:$VC}),o($VB,[2,22],{28:$VC}),o($VB,[2,23],{28:$VC}),o($VD,[2,24]),o($VD,[2,29],{31:$VE}),o($VF,[2,33]),{25:$V2,33:114,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{40:[1,115]},{4:116,6:3,7:4,9:5,11:6,12:7,20:8,21:$V0,22:9,23:$V1,24:10,25:$V2,29:11,30:14,31:$V3,32:16,33:17,34:18,35:19,36:21,38:22,39:$V4,41:28,42:50,43:29,44:$V5,46:$V6,47:$V7,48:$V8,49:$V9,50:$Va,51:$Vb,52:$Vc,53:$Vd,54:26,55:$Ve,56:$Vf,57:$Vg,58:$Vh,59:$Vi,60:$Vj,61:$Vk,62:$Vl,63:$Vm,64:20,65:23,66:$Vn,67:25,68:$Vo,69:$Vp,70:$Vq,71:$Vr,72:$Vs},{40:[1,117]},o($VG,[2,72]),o($VF,[2,34]),o($VG,[2,67]),{40:[1,118]},o($VG,[2,42]),o($VG,[2,41])],
defaultActions: {55:[2,1]},
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

	const { Acceso, Tipo2 } = require('../Interprete/Expresion/Acceso');
    const { Sacceso } = require('../Interprete/Expresion/Sacceso');
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
case 0:return 69;
break;
case 1:return 70;
break;
case 2:return 66;
break;
case 3:return 55;
break;
case 4:return 45;
break;
case 5:return 31;
break;
case 6:return 39;
break;
case 7:return 40;
break;
case 8:return 53;
break;
case 9:return 28;
break;
case 10:return 21;
break;
case 11:return 23;
break;
case 12:return 26;
break;
case 13:return 25;
break;
case 14:return 19;
break;
case 15:return 18;
break;
case 16:return 15;
break;
case 17:return 14;
break;
case 18:return 17;
break;
case 19:return 16;
break;
case 20:return 8;
break;
case 21:return 10;
break;
case 22:return 27;
break;
case 23:return 62;
break;
case 24:return 61;
break;
case 25:return 71;
break;
case 26:return 72;
break;
case 27:return 56;
break;
case 28:return 60;
break;
case 29:return 57;
break;
case 30:return 48;
break;
case 31:return 44;
break;
case 32:return 46;
break;
case 33:return 47;
break;
case 34:return 50;
break;
case 35:return 51;
break;
case 36:return 52;
break;
case 37:return 58;
break;
case 38:return 59;
break;
case 39:return 49;
break;
case 40:return 68;
break;
case 41:return 63;
break;
case 42:
break;
case 43:
break;
case 44:return 5;
break;
case 45: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:"[^\"]*")/i,/^(?:'[^\']*')/i,/^(?:\.)/i,/^(?:\.\.)/i,/^(?:::)/i,/^(?:\/)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:@)/i,/^(?:\|)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:div\b)/i,/^(?:\*)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:!=)/i,/^(?:=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:or\b)/i,/^(?:and\b)/i,/^(?:mod\b)/i,/^(?:node\(\))/i,/^(?:text\(\))/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:parent\b)/i,/^(?:ancestor-or-self\b)/i,/^(?:ancestor\b)/i,/^(?:attribute\b)/i,/^(?:child\b)/i,/^(?:descendant-or-self\b)/i,/^(?:descendant\b)/i,/^(?:following-sibling\b)/i,/^(?:following\b)/i,/^(?:namespace\b)/i,/^(?:preceding-sibling\b)/i,/^(?:preceding\b)/i,/^(?:self\b)/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:([a-zA-Z])[a-zA-Z0-9_]*\b)/i,/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],"inclusive":true}}
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
exports.parser = gramaticaXPath;
exports.Parser = gramaticaXPath.Parser;
exports.parse = function () { return gramaticaXPath.parse.apply(gramaticaXPath, arguments); };
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
},{"../Interprete/Expresion/Acceso":11,"../Interprete/Expresion/Sacceso":14,"_process":3,"fs":1,"path":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficarAST = void 0;
class GraficarAST {
    constructor() {
        this.cadenaFinal = "";
        this.i = 0;
        this.j = 0;
    }
    graficar(arbol) {
        try {
            this.cadenaFinal += "digraph G{ node[shape = \"oval\" , style=filled, color=\"yellow\"];\n\n";
            this.cadenaFinal += "L_Objetos;\n";
            arbol.forEach((objeto) => {
                let cadenaInterna = "";
                if (objeto.identificador1 == "?XML") {
                    //Acciones para el prologo
                }
                else {
                    this.cadenaFinal += 'L_Objetos->';
                    this.cadenaFinal += this.recorrer(objeto);
                }
                //this.cadenaFinal += cadenaInterna
            });
            this.cadenaFinal += "\n}";
            // console.log(this.cadenaFinal);
            var direccion = encodeURI("https://dreampuf.github.io/GraphvizOnline/#" + this.cadenaFinal);
            window.open(direccion, '_blank');
        }
        catch (error) {
        }
    }
    recorrer(nodo) {
        let cadena = "";
        this.i++;
        let padre = "nodo" + this.i;
        //Con esta linea agregamos el objeto anterior al padre
        cadena += padre + ";\n";
        cadena += padre + "[label = \"" + nodo.identificador1 + "\"];\n";
        if (nodo.listaAtributos.length > 0) {
            nodo.listaAtributos.forEach((atributo) => {
                this.j++;
                let atrib = "nodoA" + this.j;
                //Acciones para graficara tributos a objeto
                cadena += padre + "->" + atrib + ";\n";
                cadena += atrib + "[label =\"" + atributo.identificador + "=" + atributo.valor.replace(/['"]+/g, '') + "\"];\n";
            });
        }
        //Verificamos si tiene texto para agregarselo
        if (nodo.texto != '') {
            this.i++;
            let nodoTexto = "nodoT" + this.i;
            cadena += padre + "->" + nodoTexto + ";\n";
            cadena += nodoTexto + "[label =\"" + nodo.texto + "\"];\n";
        }
        if (nodo.listaObjetos.length > 0) {
            nodo.listaObjetos.forEach((objetoHijo) => {
                //Con esta linea agregamos el objeto anterior al padre
                cadena += padre + "->";
                cadena += this.recorrer(objetoHijo);
            });
        }
        return cadena;
    }
}
exports.GraficarAST = GraficarAST;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficarCST_XML = void 0;
class GraficarCST_XML {
    constructor() {
        this.i = 0;
    }
    graficar(raiz) {
        var codigo = "";
        this.i = 0;
        codigo += 'digraph SG {\n';
        codigo += this.recorrer(raiz);
        codigo += "}";
        return codigo;
    }
    ;
    recorrer(nodo) {
        var cadena = "";
        this.i++;
        var padre = "nodo" + this.i;
        var valor = nodo.valor;
        if (valor == '') {
            cadena += padre + '[label="' + nodo.etiqueta + '"];\n';
        }
        else {
            if (valor.includes('\"')) {
                console.log('entre');
                valor = valor.replace(/"/g, '');
            }
            cadena += padre + '[label="' + nodo.etiqueta + '\\n' + valor + '"];\n';
        }
        for (var j = 0; j < nodo.hijos.length; j++) {
            var nodoHijo = nodo.hijos[j];
            cadena += padre + ' -> nodo' + (this.i + 1) + ';\n';
            cadena += this.recorrer(nodoHijo);
        }
        return cadena;
    }
    ;
}
exports.GraficarCST_XML = GraficarCST_XML;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoCST = void 0;
class NodoCST {
    constructor() {
        if (arguments.length == 0) {
            this.etiqueta = "";
            this.valor = "";
            this.hijos = [];
            this.linea = -1;
            this.columna = -1;
        }
        else if (arguments.length == 2) {
            this.etiqueta = arguments[0];
            this.valor = arguments[1];
            this.hijos = [];
            this.linea = -1;
            this.columna = -1;
        }
        else if (arguments.length == 4) {
            this.etiqueta = arguments[0];
            this.valor = arguments[1];
            this.hijos = [];
            this.linea = arguments[2];
            this.columna = arguments[3];
        }
    }
    agregarHijo(nuevoHijo) {
        this.hijos.push(nuevoHijo);
    }
}
exports.NodoCST = NodoCST;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = exports.Tipo2 = void 0;
var Tipo2;
(function (Tipo2) {
    Tipo2[Tipo2["ACCESO"] = 0] = "ACCESO";
    Tipo2[Tipo2["ATRIBUTO"] = 1] = "ATRIBUTO";
    Tipo2[Tipo2["TEST"] = 2] = "TEST";
    Tipo2[Tipo2["SIGNO"] = 3] = "SIGNO";
})(Tipo2 = exports.Tipo2 || (exports.Tipo2 = {}));
class Acceso {
    constructor(tiposlash, valor, tipo, linea, columna) {
        this.tiposlash = tiposlash;
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Acceso = Acceso;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
class Atributo {
    constructor(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Atributo = Atributo;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objeto = void 0;
const Entorno_1 = require("../../Simbolo/Entorno");
class Objeto {
    constructor(id, texto, linea, columna, listaA, listaO, ide) {
        this.identificador1 = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaA;
        this.listaObjetos = listaO;
        this.identificador2 = ide;
        this.entorno = new Entorno_1.Entorno(null);
    }
}
exports.Objeto = Objeto;

},{"../../Simbolo/Entorno":16}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sacceso = void 0;
class Sacceso {
    constructor(tipoinicio, Nacceso, linea, columna) {
        this.tipoinicio = tipoinicio;
        this.Nacceso = Nacceso;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Sacceso = Sacceso;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTE = exports.ESemantico = exports.ELexico = exports.ESintactico = exports.TError = exports.errorLex = exports.errorSin = exports.errorSem = void 0;
exports.errorSem = [];
exports.errorSin = [];
exports.errorLex = [];
function Error(tipo, desc, analizador, linea, col) {
    return {
        tipo: tipo,
        descripcion: desc,
        analizador: analizador,
        linea: linea,
        columna: col
    };
}
class TError {
    constructor() {
        this.tablaErrores = [];
        this.semantico = [];
        this.lexic = [];
    }
    agregar(tipo, desc, analizador, linea, col) {
        const result = Error(tipo, desc, analizador, linea, col);
        this.tablaErrores.push(result);
        exports.errorSem.push(result);
    }
    imprimir() {
        let todosErrores = "";
        this.tablaErrores.forEach(element => {
            todosErrores += "[error][ linea: " + element.linea + " columna: " + element.columna + " ] " + element.descripcion + "\n";
        });
        return todosErrores;
    }
    get() {
        return this.tablaErrores;
    }
}
exports.TError = TError;
class ESintactico {
    constructor(tipo, descripcion, analizador, linea, columna) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        exports.errorSin.push(result);
    }
}
exports.ESintactico = ESintactico;
class ELexico {
    constructor(tipo, descripcion, analizador, linea, columna) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        exports.errorLex.push(result);
    }
}
exports.ELexico = ELexico;
class ESemantico {
    constructor(tipo, descripcion, analizador, linea, columna) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        exports.errorSem.push(result);
    }
}
exports.ESemantico = ESemantico;
function resetTE() {
    exports.errorSem = [];
    exports.errorSin = [];
    exports.errorLex = [];
}
exports.resetTE = resetTE;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
class Entorno {
    constructor(anterior) {
        //this.tabla = {};
        this.tablita = [];
        this.anterior = anterior;
    }
    agregar(id, simbolo) {
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        //this.tabla[id] = simbolo;
        this.tablita.push(simbolo);
    }
    /*
        eliminar(id:string):boolean{
            id = id.toLowerCase();
            for (let e:Entorno = this; e != null; e = e.anterior)
            {
                const value = e.tabla[id]
                if (value!==undefined)
                {
                    delete e.tabla[id];
                    return true;
                }
            }
            return false;
        }
    */
    /*
    existe(id:string):boolean{
            id = id.toLowerCase();
            
            for (let e:Entorno = this; e != null; e = e.anterior)
            {
                const value = e.tabla[id]
                
                if (value!==undefined)
                {
                    return true;
                }
            }
            return false;
        }
    */
    /*
        existeEnActual(id:string):boolean{
            id = id.toLowerCase();
            if (this.tabla[id]!==undefined)
            {
                return true;
            }
            return false;
        }
    */
    existeEnActual(id) {
        id = id.toLowerCase();
        for (let i = 0; i < this.tablita.length; i++) {
            if (this.tablita[i].indentificador == id) {
                return true;
            }
        }
        /*
        this.tablita.forEach(simbol => {
            if(simbol.indentificador==id){
                return true;
            }
        });*/
        return false;
    }
    getSimbolo(id) {
        id = id.toLowerCase();
        for (let i = 0; i < this.tablita.length; i++) {
            if (this.tablita[i].indentificador == id) {
                return this.tablita[i];
            }
        }
        /*
        this.tablita.forEach(simbol => {
            if(simbol.indentificador==id){
                return simbol;
            }
        });*/
        return null;
    }
}
exports.Entorno = Entorno;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gramatical = void 0;
class Gramatical {
    constructor() {
        this.listaReporte = [];
    }
    agregar(producccion, regla) {
        let objetoReporte = {
            produccion: producccion,
            regla: regla
        };
        this.listaReporte.push(objetoReporte);
    }
}
exports.Gramatical = Gramatical;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, id, linea, columna, value, ent) {
        this.indentificador = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = value;
        this.entorno = ent;
    }
    ToString() {
        return String(this.valor);
    }
}
exports.Simbolo = Simbolo;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INT"] = 1] = "INT";
    Tipo[Tipo["DOUBLE"] = 2] = "DOUBLE";
    Tipo[Tipo["BOOL"] = 3] = "BOOL";
    Tipo[Tipo["VOID"] = 4] = "VOID";
    Tipo[Tipo["STRUCT"] = 5] = "STRUCT";
    Tipo[Tipo["ARRAY"] = 6] = "ARRAY";
    Tipo[Tipo["ETIQUETA"] = 7] = "ETIQUETA";
    Tipo[Tipo["ATRIBUTO"] = 8] = "ATRIBUTO";
    Tipo[Tipo["ENCODING"] = 9] = "ENCODING";
})(Tipo = exports.Tipo || (exports.Tipo = {}));

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tipo_js_1 = require("./Simbolo/Tipo.js");
const Entorno_js_1 = require("./Simbolo/Entorno.js");
const Simbolo_js_1 = require("./Simbolo/Simbolo.js");
const GraficarAST_js_1 = require("./Graficador/GraficarAST.js");
const GraficarCST_XML_1 = require("./Graficador/GraficarCST_XML");
const TError_js_1 = require("./Interprete/Util/TError.js");
const CST_XML = require('./Analizadores/CSTXML.js');
const gramaticaXML = require('./Analizadores/gramaticaXML.js');
const gramaticaXMLD = require('./Analizadores/gramaticaXMLDSC.js');
const gramaticaXpath = require('./Analizadores/gramaticaXPath.js');
let ObjetosNode;
var graficador = new GraficarCST_XML_1.GraficarCST_XML();
let resultadoxpath = "";
let contador;
const TError_1 = require("./Interprete/Util/TError");
let ObjetosXML;
let cadenaReporteTS = ` <thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Ambito</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
let algo;
let cadenaErrores;
let reporteGramatical;
let cadenaReporteGram;
//Esta funcion es para mientras en lo que sincroniza con la pag
ejecutarXML(`
<?xml version="1.0" encoding="UTF-8" ?>

<app>
<biblioteca dir="calle 3>5<5" prop="Sergio's">
    <libro>
        <titulo>Libro A</titulo>
        <autor>&Julio &amp;Tommy&amp; Garcia</autor>
        <fechapublicacion ano="2001" mes="Enero"/>
    </libro>

    <libro>
        <titulo>Libro B</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechapublicacion ano="2002" mes="Febrero"/>
    </libro>

</biblioteca>
<hem>
    <pdf>
        <titulo>Libro 2</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechapublicacion ano="2002" mes="Febrero"/>
    </pdf>
    <libro>
        <titulo>Libro 3</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechapublicacion ano="2002" mes="Febrero"/>
    </libro>
</hem>
</app>
`);
realizarGraficaAST();
//   tablaErroresFicticia()
//accionesEjecutables()
//tablaErroresFicticia()
function ejecutarXML(entrada) {
    TError_1.resetTE(); // Metodo para resetear la tabla de errores
    vaciarTodo();
    cadenaReporteTS = ` <thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Ambito</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
    //Parseo para obtener la raiz o raices  
    const resultado = gramaticaXML.parse(entrada);
    const objetos = resultado.result;
    reporteGramatical = resultado.reporteGram;
    ObjetosXML = objetos;
    const entornoGlobal = new Entorno_js_1.Entorno(null);
    //funcion recursiva para manejo de entornos
    objetos.forEach((objeto) => {
        if (objeto.identificador1 == "<?xml") {
            //Acciones para el prologo
        }
        else {
            cadenaReporteTS += `<tr>`;
            llenarTablaXML(objeto, entornoGlobal, null);
            cadenaReporteTS += `</tr>`;
        }
    });
    //esta es solo para debug jaja
    const ent = entornoGlobal;
    algo = entornoGlobal;
    // ejecutarXpath("//libro")
    // console.log(cadenaReporteTS)
    return cadenaReporteTS;
}
;
function validarEtiqueta(cadena1, cadena2) {
    if (cadena2 === "") { //si solo es 1 etiqueta de abrir
        return true;
    }
    if (cadena1 === cadena2) { //si vienen las 2 cadenas
        return true;
    }
    else {
        return false;
    }
}
/*

function recorrer(nodo: Objeto){

    if (nodo.texto!=''){
        resultadoxpath+="<"+nodo.identificador1+">"+nodo.texto+"</"+nodo.identificador1+">\n";
    }
    if (nodo.listaObjetos.length != undefined) {
        if (nodo.listaObjetos.length >0) {
            nodo.listaObjetos.forEach((objetoHijo: Objeto) => {
                recorrer(objetoHijo);
            })
         }
    }
    
}
function avanzar(en: Entorno, listac: Array<Acceso>){
    
    let llave: string=""
    
    llave= listac[listac.length-1].valor
    listac.pop()
    
    if(en.existe(llave)){

        let simbolos :Array<Simbolo>=[]
        simbolos.push(en.getSimbolo(llave))

        if(listac.length===0){

            simbolos.forEach((ob: Simbolo) => {

                let nodo=ob.valor
                recorrer(nodo);
            })

        }else{

            simbolos.forEach((ob: Simbolo) => {
                let nodo=ob.valor
                let entornoNodo: Entorno =nodo.entorno
                avanzar(entornoNodo,listac)
            })
        }
    }
    
}
*/
function generarxml(nodo) {
    let result2 = "";
    if (nodo.texto != "") {
        let result = "";
        result = "<" + nodo.identificador1 + ">" + nodo.texto + "</" + nodo.identificador1 + ">\n";
        return result;
    }
    else {
        if (nodo.listaObjetos.length > 0) {
            let result3 = "";
            nodo.listaObjetos.forEach((objetoHijo) => {
                result3 += generarxml(objetoHijo);
            });
            result2 += "<" + nodo.identificador1 + ">\n" + result3 + "</" + nodo.identificador1 + ">\n";
        }
    }
    return result2;
}
;
function recursiva(en, listac) {
    let llave = "";
    llave = listac[listac.length - 1].valor;
    let salida = "";
    let tiposlash = listac[listac.length - 1].tiposlash;
    listac.pop();
    if (tiposlash == "/" || tiposlash == "") {
        if (en.existeEnActual(llave)) {
            let simbolos = [];
            for (let i = 0; i < en.tablita.length; i++) {
                if (en.tablita[i].indentificador == llave) {
                    simbolos.push(en.tablita[i]);
                }
            }
            //console.log(simbolos)
            if (listac.length == 0) {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        salida += generarxml(nodo);
                    }
                });
            }
            else {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        let entornoNodo = nodo.entorno;
                        let listac2 = [];
                        for (let i = 0; i < listac.length; i++) {
                            listac2.push(listac[i]);
                        }
                        salida += recursiva(entornoNodo, listac2);
                    }
                });
            }
        }
    }
    else if (tiposlash == "//") {
        if (en.existeEnActual(llave)) {
            let simbolos = [];
            for (let i = 0; i < en.tablita.length; i++) {
                if (en.tablita[i].indentificador == llave) {
                    simbolos.push(en.tablita[i]);
                }
            }
            if (listac.length == 0) {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        salida += generarxml(nodo);
                    }
                });
            }
            else {
                simbolos.forEach((ob) => {
                    if (ob != null) {
                        let nodo = ob.valor;
                        let entornoNodo = nodo.entorno;
                        let listac2 = [];
                        for (let i = 0; i < listac.length; i++) {
                            listac2.push(listac[i]);
                        }
                        salida += recursiva(entornoNodo, listac2);
                    }
                });
            }
        }
        else {
            let listac2 = [];
            for (let i = 0; i < listac.length; i++) {
                listac2.push(listac[i]);
            }
            salida += recursiva2(en, llave, listac2);
        }
    }
    return salida;
}
;
function recursiva2(en, nombre, listap) {
    let bo = "";
    if (en.existeEnActual(nombre)) {
        let simbolos = [];
        for (let i = 0; i < en.tablita.length; i++) {
            if (en.tablita[i].indentificador == nombre) {
                simbolos.push(en.tablita[i]);
            }
        }
        if (listap.length == 0) {
            simbolos.forEach((ob) => {
                if (ob != null) {
                    let nodo = ob.valor;
                    bo += generarxml(nodo);
                }
            });
        }
        else {
            simbolos.forEach((ob) => {
                if (ob != null) {
                    let nodo = ob.valor;
                    let entornoNodo = nodo.entorno;
                    let listac3 = [];
                    for (let i = 0; i < listap.length; i++) {
                        listac3.push(listap[i]);
                    }
                    bo += recursiva(entornoNodo, listac3);
                }
            });
        }
        return bo;
    }
    else {
        for (let i = 0; i < en.tablita.length; i++) {
            bo += recursiva2(en.tablita[i].valor.entorno, nombre, listap);
        }
        return bo;
    }
}
function ejecutarXpath(entrada) {
    const en = algo;
    const objetos = gramaticaXpath.parse(entrada);
    resultadoxpath = "";
    //console.log(objetos[0][0][0][0][0].Nacceso[0])
    let listac = [];
    for (let i = objetos[0][0][0][0][0].Nacceso.length - 1; i > -1; i--) {
        listac.push(objetos[0][0][0][0][0].Nacceso[i]);
    }
    //console.log(en)
    //console.log(en.tablita[1])
    return recursiva(en, listac);
    /*
    contador=objetos[0][0][0][0][0].length


    for(let ob1 of objetos[0][0][0][0][0]){

        for(let ob2 of ObjetosXML){

            if (ob2.identificador1 == "?XML") {

            }else if(ob1.valor==ob2.identificador1){
                avanzar(ob2,ob1,objetos[0][0][0][0][0],contador)
            }
        }
    }*/
    /*
    objetos[0][0][0][0][0].forEach((objeto1: Acceso ) => {
    
        ObjetosXML.forEach((objeto2: Objeto) => {
            
            if (objeto2.identificador1 == "?XML") {
                
            } else if (objeto1.valor==objeto2.identificador1) {
                //avanzar(objeto2,contador)
            }
            
        })

    })*/
}
;
function ejecutarXML_DSC(entrada) {
    cadenaReporteTS = ` <thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Ambito</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
    //Parseo para obtener la raiz o raices  
    const resultado = gramaticaXMLD.parse(entrada);
    const objetos = resultado.result;
    const reporteG = resultado.reporteGram;
    ObjetosXML = objetos;
    const entornoGlobal = new Entorno_js_1.Entorno(null);
    //funcion recursiva para manejo de entornos
    objetos.forEach((objeto) => {
        if (objeto.identificador1 == "<?xml") {
            //Acciones para el prologo
        }
        else {
            cadenaReporteTS += `<tr>`;
            llenarTablaXML(objeto, entornoGlobal, null);
            cadenaReporteTS += `</tr>`;
        }
    });
    //esta es solo para debug jaja
    const ent = entornoGlobal;
    algo = entornoGlobal;
    // console.log(cadenaReporteTS)
    console.log(imprimirTablaErrores());
    return cadenaReporteTS;
}
;
function llenarTablaXML(objeto, entorno, padre) {
    if (!validarEtiqueta(objeto.identificador1, objeto.identificador2)) { //verificamos que las etiquetas sean iguales
        new TError_js_1.ESemantico("Semantico", "No coinciden las etiquetas: '" + objeto.identificador1 + "' y '" + objeto.identificador2 + "'", "XML Asc", objeto.linea, objeto.columna);
        return;
    }
    //Inicializamos los entornos del objeto
    const entornoObjeto = new Entorno_js_1.Entorno(null);
    //Verificamos si tiene atributos para asignarselos
    if (objeto.listaAtributos.length > 0) {
        objeto.listaAtributos.forEach((atributo) => {
            //ESto para el llenada
            const simbolo = new Simbolo_js_1.Simbolo(Tipo_js_1.Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor.replace(/['"]+/g, ''), entornoObjeto);
            entornoObjeto.agregar(simbolo.indentificador, simbolo);
            //Esto es para la graficada de la tabla de simbolos
            cadenaReporteTS += `<tr>`;
            cadenaReporteTS += `<td>${simbolo.indentificador}</td><td>Atributo</td><td>${objeto.identificador1}</td><td>${atributo.linea}</td><td>${atributo.columna}</td>`;
            cadenaReporteTS += `<tr>`;
        });
    }
    //Verificamos si tiene texto para agregarselo
    if (objeto.texto != '') {
        const simbolo = new Simbolo_js_1.Simbolo(Tipo_js_1.Tipo.ATRIBUTO, 'textoInterno', objeto.linea, objeto.columna, objeto.texto, entornoObjeto);
        entornoObjeto.agregar(simbolo.indentificador, simbolo);
        //Esto es para la graficada de la tabla de simbolos
        // cadenaReporteTS+=`<td>${objeto.texto}</td><td>Atributo</td><td>${objeto.identificador1}</td><td>${objeto.linea}</td><td>${objeto.columna}</td>`
    }
    //Agregamos al entorno global
    objeto.entorno = entornoObjeto;
    const simbolo = new Simbolo_js_1.Simbolo(Tipo_js_1.Tipo.ETIQUETA, objeto.identificador1, objeto.linea, objeto.columna, objeto, entornoObjeto);
    entorno.agregar(simbolo.indentificador, simbolo);
    //Esto es para la graficada de la tabla de simbolos
    let ambitoTS = "";
    if (padre != null) {
        ambitoTS = padre.identificador1;
    }
    else {
        ambitoTS = "Global";
    }
    cadenaReporteTS += `<tr>`;
    cadenaReporteTS += `<td>${objeto.identificador1}</td><td>Objeto</td><td>${ambitoTS}</td><td>${objeto.linea}</td><td>${objeto.columna}</td>`;
    cadenaReporteTS += `</tr>`;
    //Verificamos si tiene mas hijos para recorrerlos recursivamente
    if (objeto.listaObjetos.length > 0) {
        objeto.listaObjetos.forEach((objetoHijo) => {
            const resultado = objetoHijo;
            llenarTablaXML(objetoHijo, entornoObjeto, objeto);
        });
    }
}
;
function realizarGraficaAST() {
    const graficador = new GraficarAST_js_1.GraficarAST;
    graficador.graficar(ObjetosXML);
}
;
function reporteTablaErrores() {
    let cadenaReporteTE = ` <thead><tr><th scope="col">Tipo</th><th scope="col">Descripcion</th><th scope="col">Archivo</th><th scope="col">Fila</th><th scope="col">Columna</th>
                        </tr></thead>`;
    TError_js_1.errorLex.forEach(element => {
        cadenaReporteTE += `<tr>`;
        cadenaReporteTE += `<td>${element.tipo}</td><td>${element.descripcion}</td><td>${element.analizador}</td><td>${element.linea}</td><td>${element.columna}</td>`;
        cadenaReporteTE += `</tr>`;
    });
    TError_js_1.errorSin.forEach(element => {
        cadenaReporteTE += `<tr>`;
        cadenaReporteTE += `<td>${element.tipo}</td><td>${element.descripcion}</td><td>${element.analizador}</td><td>${element.linea}</td><td>${element.columna}</td>`;
        cadenaReporteTE += `</tr>`;
    });
    TError_js_1.errorSem.forEach(element => {
        cadenaReporteTE += `<tr>`;
        cadenaReporteTE += `<td>${element.tipo}</td><td>${element.descripcion}</td><td>${element.analizador}</td><td>${element.linea}</td><td>${element.columna}</td>`;
        cadenaReporteTE += `</tr>`;
    });
    return cadenaReporteTE;
}
;
function realizarGraficaCST_XML(entrada) {
    ObjetosNode = CST_XML.parse(entrada);
    var cadena = graficador.graficar(ObjetosNode);
    var direccion = encodeURI("https://dreampuf.github.io/GraphvizOnline/#" + cadena);
    window.open(direccion, '_blank');
}
;
function llenarReporteG() {
    let cadena;
    // console.log(reporteGramatical.listaReporte)
    cadena = ` <thead><tr><th scope="col">Produccion</th><th scope="col">Regla Semántica</th>
    </tr></thead>`;
    reporteGramatical.listaReporte.forEach((element) => {
        cadena += `<tr>`;
        cadena += `<td>${element.produccion}</td><td>${element.regla}</td>`;
        cadena += `</tr>`;
    });
    // console.log(cadena)
    return cadena;
}
function imprimirTablaErrores() {
    let cadenaR = ``;
    TError_js_1.errorLex.forEach(element => {
        cadenaR += `Tipo:${element.tipo} Descripcion: ${element.descripcion} Analizador: ${element.analizador} Linea: ${element.linea} Columna: ${element.columna}\n`;
    });
    TError_js_1.errorSin.forEach(element => {
        cadenaR += `Tipo:${element.tipo} Descripcion: ${element.descripcion} Analizador: ${element.analizador} Linea: ${element.linea} Columna: ${element.columna}\n`;
    });
    TError_js_1.errorSem.forEach(element => {
        cadenaR += `Tipo:${element.tipo} Descripcion: ${element.descripcion} Analizador: ${element.analizador} Linea: ${element.linea} Columna: ${element.columna}\n`;
    });
    return cadenaR;
}
;
function vaciarTodo() {
    cadenaReporteTS = '';
}
/*ejecutarXML_DSC(`
<?xml version="1.0" encoding="UTF-8" ?>

<biblioteca dir="calle 3>5<5" prop="Sergio's">
    <libro>
        <titulo>Libro Actual Nèvada</titulo>
        <autor>Julio &amp;Tommy&amp; Garcia</autor>
        <fechaPublicacion ano="2001" mes="Enero"/>
    </libro>

    <libro>
        <titulo>Libro B</titulo>
        <autor>Autor 2 &amp; Autor 3</autor>
        <descripcion> holi </descripcion>
        <fechaPublicacion ano="2002" mes="Febrero"/>
    </libro>

  
</biblioteca>

<hemeroteca dir="zona 21" prop="kev" estado="chilera">
    
</hemeroteca>
`);*/
module.exports = { ejecutarXML, realizarGraficaAST, reporteTablaErrores, ejecutarXpath, realizarGraficaCST_XML, llenarReporteG, ejecutarXML_DSC };

},{"./Analizadores/CSTXML.js":4,"./Analizadores/gramaticaXML.js":5,"./Analizadores/gramaticaXMLDSC.js":6,"./Analizadores/gramaticaXPath.js":7,"./Graficador/GraficarAST.js":8,"./Graficador/GraficarCST_XML":9,"./Interprete/Util/TError":15,"./Interprete/Util/TError.js":15,"./Simbolo/Entorno.js":16,"./Simbolo/Simbolo.js":18,"./Simbolo/Tipo.js":19}]},{},[20])(20)
});
