(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],3:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":2,"buffer":3,"ieee754":4}],4:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],5:[function(require,module,exports){
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
},{"_process":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
    console.log(ast);
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

            if(element2.acceso.predicado) {
                nodos.push({id: element2.acceso.predicado.id, label: element2.acceso.predicado.valor + ""});
                aristas.push({from: element2.acceso.id, to: element2.acceso.predicado.id});

                if(element2.acceso.predicado.izq) {
                    nodos.push({id: element2.acceso.predicado.izq.id, label: element2.acceso.predicado.izq.valor});
                    aristas.push({from: element2.acceso.predicado.id, to: element2.acceso.predicado.izq.id });
                }
                if(element2.acceso.predicado.der) {
                    nodos.push({id: element2.acceso.predicado.der.id, label: element2.acceso.predicado.der.valor});
                    aristas.push({from: element2.acceso.predicado.id, to: element2.acceso.predicado.der.id });
                }
                
            }
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
},{}],8:[function(require,module,exports){

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
},{}],9:[function(require,module,exports){
(function (Buffer){(function (){
var buffer = require('buffer');
var utf8 = require('utf8');

function toUtf8(cadena) {
    return utf8.encode(cadena);
}

module.exports.toUtf8 = toUtf8;

function toLatin1(cadena) {
    var latin1Buffer = buffer.transcode(Buffer.from(utf8.encode(cadena)), "utf8", "latin1");
    return latin1Buffer.toString('latin1');
}

module.exports.toLatin1 = toLatin1;

function toAscii(cadena) {
    var asciiBuff = buffer.transcode(Buffer.from(utf8.encode(cadena)), "utf8", "ascii");

    return asciiBuff.toString("ascii")
}

module.exports.toAscii = toAscii;
}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":3,"utf8":11}],10:[function(require,module,exports){
var parserXMLA = require('./src/XML.js').parser;
var parserXMLD = require('./src/xmldes.js').parser;

var parserXPathA = require('./src/indexXPath');
var parserXPathD = require('./src/XPathDesc').parser;

var dibujarXpath = require('./arbolASTXpath');
var dibujarXmlCST = require('./arbolCSTxml');
var tablaSimbolos = require('./tablaSimbolos');

var toencoding = require('./encodingTransform');

let tipoSalida = '';
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
}

hacerConsultaDes = () => {
    let textoQuery = document.getElementById('taQuery').value;
    execXpatDES(textoQuery);
}

function execXMLASC (input) {
    objetoXml = parserXMLA.parse(input);

    tipoSalida = objetoXml[4];

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

    tipoSalida = objetoXml[4];
    
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

    if(objetoXpathAsc != '') {
        if(tipoSalida == 'utf8'){
            document.getElementById('taResult').value = toencoding.toUtf8(objetoXpathAsc);
        } else if(tipoSalida == 'latin1') {
            document.getElementById('taResult').value = toencoding.toLatin1(objetoXpathAsc);
        } else if(tipoSalida == 'ascii') {
            document.getElementById('taResult').value = toencoding.toAscii(objetoXpathAsc);
        } else {
            document.getElementById('taResult').value = objetoXpathAsc;
        }
    } else {
        document.getElementById('taResult').value = 'no se encontraron elementos';
    }
    

    variablePath = parserXPathA.aJson();
    //console.log(variablePath);
    dibujarXpath.graficarAst(variablePath);
}

function execXpatDES(input) {
    objetoXpathAsc = parserXPathA.execDescendente(input, objetoXml[0]);

    if(objetoXpathAsc != '') {
        if(tipoSalida == 'utf8'){
            document.getElementById('taResult').value = toencoding.toUtf8(objetoXpathAsc);
        } else if(tipoSalida == 'latin1') {
            document.getElementById('taResult').value = toencoding.toLatin1(objetoXpathAsc);
        } else if(tipoSalida == 'ascii') {
            document.getElementById('taResult').value = toencoding.toAscii(objetoXpathAsc);
        } else {
            document.getElementById('taResult').value = objetoXpathAsc;
        }
    } else {
        document.getElementById('taResult').value = 'no se encontraron elementos';
    }
    

    variablePath = parserXPathA.aJson();
    //console.log(variablePath);
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
},{"./arbolASTXpath":7,"./arbolCSTxml":8,"./encodingTransform":9,"./src/XML.js":27,"./src/XPathDesc":29,"./src/indexXPath":30,"./src/xmldes.js":31,"./tablaSimbolos":32}],11:[function(require,module,exports){
/*! https://mths.be/utf8js v3.0.0 by @mathias */
;(function(root) {

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	root.version = '3.0.0';
	root.encode = utf8encode;
	root.decode = utf8decode;

}(typeof exports === 'undefined' ? this.utf8 = {} : exports));

},{}],12:[function(require,module,exports){
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
exports.__esModule = true;
exports.Division = void 0;
var Expresion_1 = require("./Expresion");
var Literal_1 = require("./Literal");
var Division = /** @class */ (function (_super) {
    __extends(Division, _super);
    function Division(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = 'div';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Division.prototype.copiarValor = function () {
        return new Division(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    };
    Division.prototype.getValor = function (entorno) {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);
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
}(Expresion_1.Expresion));
exports.Division = Division;

},{"./Expresion":15,"./Literal":18}],14:[function(require,module,exports){
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
exports.__esModule = true;
exports.Expresion = void 0;
var NodoXPath_1 = require("./NodoXPath");
var Expresion = /** @class */ (function (_super) {
    __extends(Expresion, _super);
    function Expresion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Expresion;
}(NodoXPath_1.NodoXPath));
exports.Expresion = Expresion;

},{"./NodoXPath":22}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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
exports.__esModule = true;
exports.Id = void 0;
var Expresion_1 = require("./Expresion");
var Id = /** @class */ (function (_super) {
    __extends(Id, _super);
    function Id(t, iden) {
        var _this = _super.call(this) || this;
        _this.id = iden;
        _this.tipo = t;
        return _this;
    }
    Id.prototype.getValor = function (entorno) {
        //Buscar en el entorno (Objeto XML) lo que deba de ser
        throw new Error("Method not implemented.");
    };
    Id.prototype.copiarValor = function () {
        return new Id(this.tipo, this.id);
    };
    return Id;
}(Expresion_1.Expresion));
exports.Id = Id;

},{"./Expresion":15}],18:[function(require,module,exports){
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
exports.__esModule = true;
exports.Literal = void 0;
var Expresion_1 = require("./Expresion");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    //linea: number; //Desbloquear si implementa interfaz
    //columna: number;  //Desbloquear si implementa interfaz
    function Literal(t, v, l, c) {
        var _this = _super.call(this) || this;
        _this.tipo = t;
        _this.valor = v;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Literal.prototype.getValor = function (entorno) {
        if (this.valor == 'last()' && this.tipo == 6) {
            return new Literal(0, entorno[0].length, this.linea, this.columna);
        }
        else {
            return new Literal(this.tipo, this.valor, this.linea, this.columna);
        }
    };
    Literal.prototype.copiarValor = function () {
        return new Literal(this.tipo, this.valor, this.linea, this.columna);
    };
    return Literal;
}(Expresion_1.Expresion));
exports.Literal = Literal;

},{"./Expresion":15}],19:[function(require,module,exports){
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
exports.__esModule = true;
exports.Modulo = void 0;
var Expresion_1 = require("./Expresion");
var Literal_1 = require("./Literal");
var Modulo = /** @class */ (function (_super) {
    __extends(Modulo, _super);
    function Modulo(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = 'mod';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Modulo.prototype.copiarValor = function () {
        return new Modulo(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    };
    Modulo.prototype.getValor = function (entorno) {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);
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
}(Expresion_1.Expresion));
exports.Modulo = Modulo;

},{"./Expresion":15,"./Literal":18}],20:[function(require,module,exports){
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
exports.__esModule = true;
exports.Multiplicacion = void 0;
var Expresion_1 = require("./Expresion");
var Literal_1 = require("./Literal");
var Multiplicacion = /** @class */ (function (_super) {
    __extends(Multiplicacion, _super);
    function Multiplicacion(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = '*';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Multiplicacion.prototype.copiarValor = function () {
        return new Multiplicacion(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    };
    Multiplicacion.prototype.getValor = function (entorno) {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);
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
}(Expresion_1.Expresion));
exports.Multiplicacion = Multiplicacion;

},{"./Expresion":15,"./Literal":18}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.NodoXPath = void 0;
var NodoXPath = /** @class */ (function () {
    function NodoXPath() {
        this.linea = -1;
        this.columna = -1;
        //abstract graficar(): string;
    }
    return NodoXPath;
}());
exports.NodoXPath = NodoXPath;

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.ObjetoXPath = void 0;
var ObjetoXPath = /** @class */ (function () {
    function ObjetoXPath(v) {
        this.valor = v;
        this.atributo = false;
        this.ambito = "local";
    }
    ObjetoXPath.prototype.copiarValor = function () {
        var nuevo = new ObjetoXPath(this.valor);
        nuevo.atributo = this.atributo;
        nuevo.ambito = this.ambito;
        if (this.exp != undefined) {
            nuevo.exp = this.exp.copiarValor();
        }
        else {
            nuevo.exp = undefined;
        }
        return nuevo;
    };
    ObjetoXPath.prototype.setExpresion = function (E) {
        this.exp = E;
    };
    return ObjetoXPath;
}());
exports.ObjetoXPath = ObjetoXPath;

},{}],25:[function(require,module,exports){
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
exports.__esModule = true;
exports.Resta = void 0;
var Expresion_1 = require("./Expresion");
var Literal_1 = require("./Literal");
var Resta = /** @class */ (function (_super) {
    __extends(Resta, _super);
    function Resta(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = '-';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Resta.prototype.copiarValor = function () {
        return new Resta(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    };
    Resta.prototype.getValor = function (entorno) {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);
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
}(Expresion_1.Expresion));
exports.Resta = Resta;
},{"./Expresion":15,"./Literal":18}],26:[function(require,module,exports){
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
exports.__esModule = true;
exports.Suma = void 0;
var Expresion_1 = require("./Expresion");
var Literal_1 = require("./Literal");
var Suma = /** @class */ (function (_super) {
    __extends(Suma, _super);
    function Suma(izq, der, l, c) {
        var _this = _super.call(this) || this;
        _this.operacion = '+';
        _this.hI = izq;
        _this.hD = der;
        _this.linea = l;
        _this.columna = c;
        return _this;
    }
    Suma.prototype.copiarValor = function () {
        return new Suma(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    };
    Suma.prototype.getValor = function (entorno) {
        var res = new Literal_1.Literal(69, '@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);
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
}(Expresion_1.Expresion));
exports.Suma = Suma;

},{"./Expresion":15,"./Literal":18}],27:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,13],$V1=[1,9],$V2=[1,8],$V3=[15,16],$V4=[1,15],$V5=[1,14],$V6=[2,9,15,16],$V7=[2,5,13,18],$V8=[1,33],$V9=[1,32],$Va=[2,13,18],$Vb=[9,18,24];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"ROOT":4,"EOF":5,"ENCODING":6,"ELEMENTO":7,"StartP":8,"Name":9,"Igual":10,"Value":11,"ENDDEF":12,"Start":13,"ATRIBUTOS":14,"Slash":15,"Close":16,"CONTENIDO":17,"End":18,"ELEMENTOS":19,"LISTA_ATRIBUTOS":20,"ATRIBUTO":21,"LISTA_DATOS":22,"DATOS":23,"Data":24,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"StartP",9:"Name",10:"Igual",11:"Value",12:"ENDDEF",13:"Start",15:"Slash",16:"Close",18:"End",24:"Data"},
productions_: [0,[3,2],[3,1],[4,2],[6,6],[6,0],[7,4],[7,7],[7,7],[7,2],[7,2],[7,2],[14,1],[14,0],[20,2],[20,1],[21,3],[21,2],[19,2],[19,1],[17,1],[17,0],[22,2],[22,1],[23,1],[23,1]],
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

        if((codificacion ==='utf-8')
        | (codificacion ==='iso 88591' | codificacion ==='iso 88591-1')
        | (codificacion ==='ascii')){
            this.$.nodo.addNodo(new Nodo(setid(),'<?'));
            this.$.nodo.addNodo(new Nodo(setid(),'xml'));
            this.$.nodo.addNodo(new Nodo(setid(),'encoding'));
            this.$.nodo.addNodo(new Nodo(setid(),'='));
            this.$.nodo.addNodo(new Nodo(setid(),'Value',[],codificacion));
            this.$.nodo.addNodo(new Nodo(setid(),'?>'));
            setCoding();
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
case 9:
  addErr($$[$0-1],_$[$0-1],'Se esperaba '); this.$ = undefined; 
break;
case 10: case 11:
  addErr($$[$0-1],_$[$0-1],'Caracteres inesperados han sido localizados, esperaba [Lista_elementos,>]'); this.$ = undefined; 
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
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS1')));
        aux.addNodo($$[$0-1].nodo);

        if($$[$0]!=undefined){
            aux.addNodo($$[$0].nodo);
            $$[$0-1].push($$[$0]);
        }
        
        this.$ = $$[$0-1];        
        this.$.nodo = aux;
    
break;
case 15:

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
case 16:

        this.$ = new AtributoXML($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column);
        this.$.nodo = new Nodo(setid(),'ATRIBUTO');
        aux = new Nodo(setid(),'Name');
        aux.addNodo(new Nodo(setid(),$$[$0-2]));
        this.$.nodo.addNodo(aux);
        this.$.nodo.addNodo(new Nodo(setid(),'='));
        aux = new Nodo(setid(),'Value');
        aux.addNodo(new Nodo(setid(),$$[$0].replace(/"/g,'')));
        this.$.nodo.addNodo(aux);
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTO')));
    
break;
case 17:

        addErr($$[$0-1],_$[$0-1],'Caracteres inseperados se han encontrado, se esperaba "="');
        this.$ = undefined;
    
break;
case 18:

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
case 19:

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
case 20:

        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO1')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 21:

        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo(new Nodo(setid(),'Epsilon'))
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO2')));

        this.$ = [];
        this.$.nodo = aux;
    
break;
case 22:

        aux = new Nodo(setid(),'LISTA_DATOS');
        aux.addNodo($$[$0-1].nodo);
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS1')));

        this.$ = new String($$[$0-1] + $$[$0]);
        this.$.nodo = aux;
    
break;
case 23:

        aux = new Nodo(setid(),'LISTA_DATOS');
        aux.addNodo($$[$0].nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS2')));

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 24:

        aux = new Nodo(setid(),'DATOS');        
        aux.setProdu(new FilaGrammar(getGrammar('DATOS1')));
        aux1 = new Nodo(setid(),'Data');
        aux1.addNodo(new Nodo(setid(),$$[$0]));
        aux.addNodo(aux1);

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 25:

        aux = new Nodo(setid(),'DATOS');
        aux.setProdu(new FilaGrammar(getGrammar('DATOS2')));
        aux1 = new Nodo(setid(),'Name');
        aux1.addNodo(new Nodo(setid(),$$[$0]));
        aux.addNodo(aux1);

        this.$ = new String(' ' + $$[$0]);
        this.$.nodo = aux;
    
break;
}
},
table: [o($V0,[2,5],{3:1,4:2,6:4,5:[1,3],8:[1,5]}),{1:[3]},{5:[1,6]},{1:[2,2]},{2:$V1,7:7,13:$V2},{9:[1,10]},{1:[2,1]},{5:[2,3]},o($V3,$V0,{14:11,20:12,21:13,2:$V4,9:$V5}),{13:[1,18],16:[1,17],18:[1,16]},{9:[1,19]},{15:[1,20],16:[1,21]},o($V3,[2,12],{21:22,2:$V4,9:$V5}),o($V6,[2,15]),{10:[1,23]},{11:[1,24]},o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),{10:[1,25]},{16:[1,26]},{2:$V1,7:30,9:$V8,13:$V2,17:27,18:[2,21],19:28,22:29,23:31,24:$V9},o($V6,[2,14]),{11:[1,34]},o($V6,[2,17]),{11:[1,35]},o($V7,[2,6]),{18:[1,36]},{2:$V1,7:38,13:$V2,18:[1,37]},{9:$V8,18:[2,20],23:39,24:$V9},o($Va,[2,19]),o($Vb,[2,23]),o($Vb,[2,24]),o($Vb,[2,25]),o($V6,[2,16]),{12:[1,40]},{9:[1,41]},{9:[1,42]},o($Va,[2,18]),o($Vb,[2,22]),o($V0,[2,4]),{16:[1,43]},{16:[1,44]},o($V7,[2,7]),o($V7,[2,8])],
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

    let codificacion = 'utf8';
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

    const setCoding = () => {
        if(codificacion === 'utf-8'){
            codificacion = 'utf8';
        }else if(codificacion === 'iso 88591' | codificacion === 'iso 88591-1'){
            codificacion = 'iso';
        }else if(codificacion === 'ascii'){
            codificacion = 'ascii';
        }else{
            codificacion = 'utf8';
        }
    }

    const fixObject = (xmlobj) =>{
        let nuevo = Object.assign({},xmlobj);
        return nuevo;
    }
    
    let tgs = '';
    let tgc = '';
    let aux,axu1;
 
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
        errores.push(new Error('lexico',yy_.yytext,yy_.yylloc.first_line,yy_.yylloc.first_column,'Se ha encontrado un error lexico')); 
    
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
},{"./AtributoXML.js":12,"./Error.js":14,"./FilaGrammar.js":16,"./Nodo.js":21,"./ObjetoXML.js":23,"_process":6,"fs":1,"path":5}],28:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,7],$V2=[1,9],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[5,6],$V9=[13,15,19,22,23,24],$Va=[5,6,9,10],$Vb=[1,27],$Vc=[1,26],$Vd=[1,29],$Ve=[1,30],$Vf=[1,31],$Vg=[1,32],$Vh=[1,33],$Vi=[1,34],$Vj=[1,39],$Vk=[1,37],$Vl=[1,38],$Vm=[1,40],$Vn=[1,41],$Vo=[1,42],$Vp=[1,43],$Vq=[1,44],$Vr=[1,45],$Vs=[1,46],$Vt=[1,47],$Vu=[1,48],$Vv=[1,49],$Vw=[18,21,22,25,26,27,28,29,30,31,32,33,34,35,36],$Vx=[18,21,25,26,29,30,31,32,33,34,35,36],$Vy=[18,21,29,30,31,32,33,34,35,36];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"LCONSULTAS":4,"EOF":5,"vertical":6,"CONSULTA":7,"OPPATH":8,"dobleslash":9,"slash":10,"RUTA":11,"ENODO":12,"arroba":13,"NODO":14,"TKid":15,"lcorchete":16,"E":17,"rcorchete":18,"Rnode":19,"lparen":20,"rparen":21,"por":22,"dot":23,"dobledot":24,"mas":25,"menos":26,"div":27,"mod":28,"menor":29,"menorigual":30,"mayor":31,"mayorigual":32,"igual":33,"noigual":34,"and":35,"or":36,"PRIMITIVO":37,"TKinteger":38,"TKdouble":39,"TKchar":40,"TKstring":41,"Rlast":42,"Rposition":43,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"vertical",9:"dobleslash",10:"slash",13:"arroba",15:"TKid",16:"lcorchete",18:"rcorchete",19:"Rnode",20:"lparen",21:"rparen",22:"por",23:"dot",24:"dobledot",25:"mas",26:"menos",27:"div",28:"mod",29:"menor",30:"menorigual",31:"mayor",32:"mayorigual",33:"igual",34:"noigual",35:"and",36:"or",38:"TKinteger",39:"TKdouble",40:"TKchar",41:"TKstring",42:"Rlast",43:"Rposition"},
productions_: [0,[3,2],[4,3],[4,1],[8,1],[8,1],[7,2],[7,1],[11,3],[11,1],[12,2],[12,1],[14,4],[14,1],[14,3],[14,1],[14,1],[14,1],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,2],[17,3],[17,1],[37,1],[37,1],[37,1],[37,1],[37,3],[37,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

                            console.log('Analisis XPath Ascendente Finalizado!'); 
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
case 7: case 11: case 33:
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
 
                                    var aux = new ObjetoXPath($$[$0-3].toString());
                                    aux.setExpresion($$[$0-1]);
                                    this.$ = aux;
                                
break;
case 13: case 15: case 16: case 17:
 this.$ = new ObjetoXPath($$[$0]); 
break;
case 14:
 this.$ = new ObjetoXPath($$[$0-2]+'()'); 
break;
case 18:
 this.$ = new Suma($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 19:
 this.$ = new Resta($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 20:
 this.$ = new Multiplicacion($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 21:
 this.$ = new Division($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 22:
 this.$ = new Modulo($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 31:
 
                                    var men = new Literal(0,'0');
                                    this.$ = new Resta(men,$$[$0],_$[$0-1].first_line,_$[$0-1].first_column);
                                
break;
case 32:
 this.$ = $$[$0-1]; 
break;
case 34:
 this.$ = new Literal(0,$$[$0].toString()); 
break;
case 35:
 this.$ = new Literal(1,$$[$0].toString()); 
break;
case 36:
 this.$ = new Literal(2,$$[$0].toString()); 
break;
case 37:
 this.$ = new Literal(3,$$[$0].toString()); 
break;
case 38: case 39:
 this.$ = new Literal(6,$$[$0-2].toString()+'()'); 
break;
}
},
table: [{3:1,4:2,7:3,8:4,9:$V0,10:$V1,11:5,12:8,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},{1:[3]},{5:[1,16],6:[1,17]},o($V8,[2,3]),{11:18,12:8,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($V8,[2,7],{8:19,9:$V0,10:$V1}),o($V9,[2,4]),o($V9,[2,5]),o($Va,[2,9]),{14:20,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($Va,[2,11]),o($Va,[2,13],{16:[1,21]}),{20:[1,22]},o($Va,[2,15]),o($Va,[2,16]),o($Va,[2,17]),{1:[2,1]},{7:23,8:4,9:$V0,10:$V1,11:5,12:8,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($V8,[2,6],{8:19,9:$V0,10:$V1}),{12:24,13:$V2,14:10,15:$V3,19:$V4,22:$V5,23:$V6,24:$V7},o($Va,[2,10]),{17:25,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{21:[1,35]},o($V8,[2,2]),o($Va,[2,8]),{18:[1,36],22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp,31:$Vq,32:$Vr,33:$Vs,34:$Vt,35:$Vu,36:$Vv},{17:50,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:51,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},o($Vw,[2,33]),o($Vw,[2,34]),o($Vw,[2,35]),o($Vw,[2,36]),o($Vw,[2,37]),{20:[1,52]},{20:[1,53]},o($Va,[2,14]),o($Va,[2,12]),{17:54,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:55,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:56,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:57,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:58,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:59,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:60,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:61,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:62,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:63,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:64,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:65,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},{17:66,20:$Vb,26:$Vc,37:28,38:$Vd,39:$Ve,40:$Vf,41:$Vg,42:$Vh,43:$Vi},o($Vw,[2,31]),{21:[1,67],22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp,31:$Vq,32:$Vr,33:$Vs,34:$Vt,35:$Vu,36:$Vv},{21:[1,68]},{21:[1,69]},o($Vx,[2,18],{22:$Vj,27:$Vm,28:$Vn}),o($Vx,[2,19],{22:$Vj,27:$Vm,28:$Vn}),o($Vw,[2,20]),o($Vw,[2,21]),o($Vw,[2,22]),o($Vy,[2,23],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn}),o($Vy,[2,24],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn}),o($Vy,[2,25],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn}),o($Vy,[2,26],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn}),o($Vy,[2,27],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn}),o($Vy,[2,28],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn}),o([18,21,35,36],[2,29],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp,31:$Vq,32:$Vr,33:$Vs,34:$Vt}),o([18,21,36],[2,30],{22:$Vj,25:$Vk,26:$Vl,27:$Vm,28:$Vn,29:$Vo,30:$Vp,31:$Vq,32:$Vr,33:$Vs,34:$Vt,35:$Vu}),o($Vw,[2,32]),o($Vw,[2,38]),o($Vw,[2,39])],
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
    const { Id } = require('./Id');

    const { Error } = require('./Error');
    //var erroresXPath = require('./indexXPath').erroresXPath;
    var erroresXPath = [];
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
case 1:return 42;
break;
case 2:return 43;
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
case 17:return 36;
break;
case 18:return 35;
break;
case 19:return 28;
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
case 31:return 25;
break;
case 32:return 26;
break;
case 33:return "por";
break;
case 34:return 33;
break;
case 35:return 34;
break;
case 36:return 30;
break;
case 37:return 29;
break;
case 38:return 32;
break;
case 39:return 31;
break;
case 40:return 20;
break;
case 41:return 21;
break;
case 42:return 39;
break;
case 43:return 38;
break;
case 44:return 15;
break;
case 45:return 41;
break;
case 46:return 40;
break;
case 47:
        //console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
        erroresXPath.push(new Error('Lexico'), yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column, `${yy_.yytext} no pertenece al lengaje XPath`);
    
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
},{"./Division":13,"./Error":14,"./Id":17,"./Literal":18,"./Modulo":19,"./Multiplicacion":20,"./ObjetoXPath":24,"./Resta":25,"./Suma":26,"_process":6,"fs":1,"path":5}],29:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,7],$V2=[1,9],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[2,4],$V9=[1,18],$Va=[5,8],$Vb=[15,17,21,24,25,26],$Vc=[2,11],$Vd=[5,8,10,11],$Ve=[1,29],$Vf=[1,28],$Vg=[1,31],$Vh=[1,32],$Vi=[1,33],$Vj=[1,34],$Vk=[1,35],$Vl=[1,36],$Vm=[1,43],$Vn=[1,41],$Vo=[1,42],$Vp=[1,44],$Vq=[1,45],$Vr=[1,46],$Vs=[1,47],$Vt=[1,48],$Vu=[1,49],$Vv=[1,50],$Vw=[1,51],$Vx=[1,52],$Vy=[1,53],$Vz=[20,23,24,27,28,29,30,31,32,33,34,35,36,37,38],$VA=[20,23,27,28,31,32,33,34,35,36,37,38],$VB=[20,23,31,32,33,34,35,36,37,38];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"LCONSULTAS":4,"EOF":5,"CONSULTA":6,"LCP":7,"vertical":8,"OPPATH":9,"dobleslash":10,"slash":11,"RUTA":12,"ENODO":13,"RP":14,"arroba":15,"NODO":16,"TKid":17,"lcorchete":18,"E":19,"rcorchete":20,"Rnode":21,"lparen":22,"rparen":23,"por":24,"dot":25,"dobledot":26,"mas":27,"menos":28,"div":29,"mod":30,"menor":31,"menorigual":32,"mayor":33,"mayorigual":34,"igual":35,"noigual":36,"and":37,"or":38,"PRIMITIVO":39,"TKinteger":40,"TKdouble":41,"TKchar":42,"TKstring":43,"Rlast":44,"Rposition":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"vertical",10:"dobleslash",11:"slash",15:"arroba",17:"TKid",18:"lcorchete",20:"rcorchete",21:"Rnode",22:"lparen",23:"rparen",24:"por",25:"dot",26:"dobledot",27:"mas",28:"menos",29:"div",30:"mod",31:"menor",32:"menorigual",33:"mayor",34:"mayorigual",35:"igual",36:"noigual",37:"and",38:"or",40:"TKinteger",41:"TKdouble",42:"TKchar",43:"TKstring",44:"Rlast",45:"Rposition"},
productions_: [0,[3,2],[4,2],[7,3],[7,0],[9,1],[9,1],[6,2],[6,1],[12,2],[14,3],[14,0],[13,2],[13,1],[16,4],[16,1],[16,3],[16,1],[16,1],[16,1],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,3],[19,2],[19,3],[19,1],[39,1],[39,1],[39,1],[39,1],[39,3],[39,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
                                console.log('Analisis XPath Descendente Finalizado'); 
                                this.$ = $$[$0-1]; return this.$;
                            
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
case 8: case 13: case 35:
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
 
                                    var aux = new ObjetoXPath($$[$0-3].toString());
                                    aux.setExpresion($$[$0-1]);
                                    this.$ = aux;
                                
break;
case 15: case 17: case 18: case 19:
 this.$ = new ObjetoXPath($$[$0]); 
break;
case 16:
 this.$ = new ObjetoXPath($$[$0-2]+'()'); 
break;
case 20:
 this.$ = new Suma($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 21:
 this.$ = new Resta($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 22:
 this.$ = new Multiplicacion($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 23:
 this.$ = new Division($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 24:
 this.$ = new Modulo($$[$0-2],$$[$0],_$[$0-1].first_line,_$[$0-1].first_column); 
break;
case 33:
 
                                    var men = new Literal(0,'0');
                                    this.$ = new Resta(men,$$[$0],_$[$0-1].first_line,_$[$0-1].first_column);
                                
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
table: [{3:1,4:2,6:3,9:4,10:$V0,11:$V1,12:5,13:8,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},{1:[3]},{5:[1,16]},{5:$V8,7:17,8:$V9},{12:19,13:8,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Va,[2,8]),o($Vb,[2,5]),o($Vb,[2,6]),o($Va,$Vc,{14:20,9:21,10:$V0,11:$V1}),{16:22,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Vd,[2,13]),o($Vd,[2,15],{18:[1,23]}),{22:[1,24]},o($Vd,[2,17]),o($Vd,[2,18]),o($Vd,[2,19]),{1:[2,1]},{5:[2,2]},{6:25,9:4,10:$V0,11:$V1,12:5,13:8,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Va,[2,7]),o($Va,[2,9]),{13:26,15:$V2,16:10,17:$V3,21:$V4,24:$V5,25:$V6,26:$V7},o($Vd,[2,12]),{19:27,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{23:[1,37]},{5:$V8,7:38,8:$V9},o($Va,$Vc,{9:21,14:39,10:$V0,11:$V1}),{20:[1,40],24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,34:$Vu,35:$Vv,36:$Vw,37:$Vx,38:$Vy},{19:54,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:55,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},o($Vz,[2,35]),o($Vz,[2,36]),o($Vz,[2,37]),o($Vz,[2,38]),o($Vz,[2,39]),{22:[1,56]},{22:[1,57]},o($Vd,[2,16]),{5:[2,3]},o($Va,[2,10]),o($Vd,[2,14]),{19:58,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:59,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:60,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:61,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:62,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:63,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:64,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:65,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:66,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:67,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:68,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:69,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},{19:70,22:$Ve,28:$Vf,39:30,40:$Vg,41:$Vh,42:$Vi,43:$Vj,44:$Vk,45:$Vl},o($Vz,[2,33]),{23:[1,71],24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,34:$Vu,35:$Vv,36:$Vw,37:$Vx,38:$Vy},{23:[1,72]},{23:[1,73]},o($VA,[2,20],{24:$Vm,29:$Vp,30:$Vq}),o($VA,[2,21],{24:$Vm,29:$Vp,30:$Vq}),o($Vz,[2,22]),o($Vz,[2,23]),o($Vz,[2,24]),o($VB,[2,25],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq}),o($VB,[2,26],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq}),o($VB,[2,27],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq}),o($VB,[2,28],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq}),o($VB,[2,29],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq}),o($VB,[2,30],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq}),o([20,23,37,38],[2,31],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,34:$Vu,35:$Vv,36:$Vw}),o([20,23,38],[2,32],{24:$Vm,27:$Vn,28:$Vo,29:$Vp,30:$Vq,31:$Vr,32:$Vs,33:$Vt,34:$Vu,35:$Vv,36:$Vw,37:$Vx}),o($Vz,[2,34]),o($Vz,[2,40]),o($Vz,[2,41])],
defaultActions: {16:[2,1],17:[2,2],38:[2,3]},
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
    const { Id } = require('./Id');

    const { Error } = require('./Error');
    //var {erroresXPath} = require('./indexXPath').erroresXPath;
    var erroresXPath = [];
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
case 17:return 38;
break;
case 18:return 37;
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
case 42:return 41;
break;
case 43:return 40;
break;
case 44:return 17;
break;
case 45:return 43;
break;
case 46:return 42;
break;
case 47:
        //console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
        erroresXPath.push(new Error('Lexico'), yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column, `${yy_.yytext} no pertenece al lengaje XPath`);
    
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
},{"./Division":13,"./Error":14,"./Id":17,"./Literal":18,"./Modulo":19,"./Multiplicacion":20,"./ObjetoXPath":24,"./Resta":25,"./Suma":26,"_process":6,"fs":1,"path":5}],30:[function(require,module,exports){
"use strict";
var XPathAsc = require('./XPath');
var XPathDes = require('./XPathDesc');
var arbolXPath;
var countId = 0;

let leXpath = [];
module.exports.erroresXPath = leXpath;

function execAscendente(entrada, xmlObj) {
    countId = 0;
    xmlObj.pasarPadre();
    var arbolXml = xmlObj;
    
    //Ejecuto el parser ascendente del XPath
    arbolXPath = XPathAsc.parse(entrada);
    
    //Recorro el arbol XPath y ejecuto instrucciones
    var resultado = ejecutarRaiz(arbolXml, arbolXPath);

    return resultado;
}
module.exports.execAscendente = execAscendente;

function execDescendente(entrada, xmlObj) {
    countId = 0;
    xmlObj.pasarPadre();
    var arbolXml = xmlObj;

    //Ejecuto el parser descendente del XPath
    arbolXPath = XPathDes.parse(entrada);
   
    //Recorro el arbol XPath Descendente y ejecuto instrucciones
    var resultado = ejecutarRaiz(arbolXml, arbolXPath);

    return resultado;
}
module.exports.execDescendente = execDescendente;

function ejecutarRaiz(XML, XPATH){
    var respuestas = [];
    //
    XPATH.forEach((consulta) => {
        //var verif = ejecucionRecursiva(XML, consulta);
        removeDot(consulta);

        if(consulta[0].ambito == 'local') {
            if(XML.etiqueta_id == consulta[0].valor) {
                var auxConsulta = copiarConsultas(consulta);
                auxConsulta.shift();
                if(auxConsulta.length > 0) {
                    var verif = newRecursiva(XML, auxConsulta);
                    if(verif != undefined && verif != '')
                        respuestas.push(verif);
                } else {
                    respuestas.push([XML]);
                }
            }
        } else {
            //Hacer busqueda india :v
        }
    });
    //

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
function newRecursiva(XML, consulta) { //XML = Posible Arreglo de objetos XML
    var resultadoIntermedio = [];

    if(Array.isArray(XML)) {
        //Recorrer y consultar
        XML.forEach((objXML) => {
            //Verificar objetos repetidos??    
            var ver = consultar(objXML, consulta[0]);
            if (ver != undefined || ver != null) {
                if(ver.length != 0) {
                    if(Array.isArray(ver)) {
                        ver.forEach((al) => {
                            resultadoIntermedio.push(al);    
                        });
                    } else {
                        resultadoIntermedio.push(ver);
                    }
                }
            }
        });
    } else {
        //Solo consultar
        var ver = consultar(XML, consulta[0]);
        if(ver != undefined || ver != null) { //cambiar a push y verificar que me devuelve >0
            if(Array.isArray(ver)) {
                if(ver.length > 0) {
                    ver.forEach((al) => {
                        resultadoIntermedio.push(al);    
                    });
                }
            } else {
                resultadoIntermedio.push(ver);  
            }
        }
    }

    var newConsulta = copiarConsultas(consulta);
    newConsulta.shift();

    var resultado = resultadoIntermedio;
    if(newConsulta.length != 0) {
        var resultado = newRecursiva(resultadoIntermedio, newConsulta);
    }

    return resultado;
}
function consultar(oXML, oXPath) {
    if(oXPath.ambito == 'local') {
        // Nodo Actual
        if(oXPath.valor == '.') {
            return oXML;
        } else if(oXPath.valor == '..') {
            //Verificar bien el flujo con el ..
            if(oXML.padre != undefined) {
                return oXML.padre;
            }
            return;
        }

        //Nodos desconocidos
        if(oXPath.valor == '*') {
            //verificar si es * o @*
        } else if(oXPath.valor == 'node()') {
            //Devolver todos los nodos :v
        }
        
        //Atributos
        if(oXPath.atributo == true) {
            // Recorrer lista de atributos
            var aux = [];
            oXML.lista_atributos.forEach((att) => {
                if(att.atributo == oXPath.valor) {
                    aux.push(oXML);
                }
            });
            return aux;
        } else {
            var resAux = [];
            
            //Verificar si tiene predicado
            if(oXPath.exp != undefined) {
                //Buscar en la lista de nodos del padre lo que diga el predicado
                //Verificar si quiere buscar nodo en x posicion, algun atributo o mas
                //if(oXML.padre != undefined) {
                oXML.lista_objetos.forEach((obH) => {
                    if(obH.etiqueta_id == oXPath.valor) {
                        resAux.push(obH);
                    }
                });
                
                var expVal = oXPath.exp.getValor([resAux]);
                if(expVal.tipo == 0 || expVal.tipo == 1) {
                    var oTmp = resAux[expVal.valor - 1];
                    if(oTmp != undefined) {
                        return oTmp;
                    }
                }
                //}
            } else {
                // Recorrer lista de nodos
                oXML.lista_objetos.forEach((obH) => {
                    if(obH.etiqueta_id == oXPath.valor) {
                        resAux.push(obH);
                    }
                });
                return resAux;
            }
        }
    } else if (oXPath.ambito == 'full') {
        console.log('consulta hardcore');
    }
}

function removeDot(consulta) {
    while (consulta[0].valor == '.') {
        consulta.shift()
    }
}
function copiarConsultas (lConsultas) {
    var aux = [];
    lConsultas.forEach((consulta) => {
        aux.push(consulta.copiarValor());
    })

    return aux;
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

            if(acc.exp != undefined) {
                var pred = {}
                pred = obtenerValor(acc.exp);
                
                consulta.push({ acceso: {ambito: tmpA,valor: tmpV,id: countId, predicado: pred} });
                countId ++;
            } else {
                consulta.push({ acceso: {ambito: tmpA,valor: tmpV,id: countId} });
                countId ++;
            }
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

function obtenerValor(Exp) {
    var E = {}
    if(Exp.operacion != undefined) {
        E.valor = Exp.operacion;
        E.id = countId;
        countId++;

        E.izq = obtenerValor(Exp.hI);
        E.der = obtenerValor(Exp.hD);
    } else {
        E.valor = Exp.valor;
        E.id = countId++;
    }
    return E;
}
},{"./XPath":28,"./XPathDesc":29}],31:[function(require,module,exports){
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
        | (codificacion==='iso 88591' | codificacion ==='iso 88591-1') 
        | (codificacion==='hex')
        | (codificacion==='ascii')){
            this.$.nodo.addNodo(new Nodo(setid(),'<?'));
            this.$.nodo.addNodo(new Nodo(setid(),'xml'));
            this.$.nodo.addNodo(new Nodo(setid(),'encoding'));
            this.$.nodo.addNodo(new Nodo(setid(),'='));
            this.$.nodo.addNodo(new Nodo(setid(),'Value',[],codificacion));
            this.$.nodo.addNodo(new Nodo(setid(),'?>'));
            setCoding();
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
  addErr($$[$0-1],_$[$0-1],'Caracteres inesperados han sido localizados, esperaba [Lista_elementos,>]'); this.$ = undefined; 
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
        aux = new Nodo(setid(),'Name');
        aux.addNodo(new Nodo(setid(),$$[$0-2]));
        this.$.nodo.addNodo(aux);
        this.$.nodo.addNodo(new Nodo(setid(),'='));
        aux = new Nodo(setid(),'Value');
        aux.addNodo(new Nodo(setid(),$$[$0].replace(/"/g,'')));
        this.$.nodo.addNodo(aux);
        this.$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTO')));
    
break;
case 18:

        addErr($$[$0-1],_$[$0-1],'Caracteres inseperados se han encontrado, se esperaba "="');
        this.$ = undefined;
    
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
        aux.setProdu(new FilaGrammar(getGrammar('DATOS1')));
        aux1 = new Nodo(setid(),'Data');
        aux1.addNodo(new Nodo(setid(),$$[$0]));
        aux.addNodo(aux1);

        this.$ = new String($$[$0]);
        this.$.nodo = aux;
    
break;
case 28:

        aux = new Nodo(setid(),'DATOS');
        aux.setProdu(new FilaGrammar(getGrammar('DATOS2')));
        aux1 = new Nodo(setid(),'Name');
        aux1.addNodo(new Nodo(setid(),$$[$0]));
        aux.addNodo(aux1);

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

    const setCoding = () => {
        if(codificacion === 'utf-8'){
            codificacion = 'utf8';
        }else if(codificacion === 'iso 88591' | codificacion === 'iso 88591-1'){
            codificacion = 'iso';
        }else if(codificacion === 'ascii'){
            codificacion = 'ascii';
        }else{
            codificacion = 'utf8';
        }
    }

    let tgs = '';
    let tgc = '';
    let aux,aux1;
 
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
        errores.push(new Error('sintactico',yy_.yytext,yy_.yylloc.first_line,yy_.yylloc.first_column,'Se ha encontrado un error lexico')); 
    
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
},{"./AtributoXML.js":12,"./Error.js":14,"./FilaGrammar.js":16,"./Nodo.js":21,"./ObjetoXML.js":23,"_process":6,"fs":1,"path":5}],32:[function(require,module,exports){
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

},{}]},{},[10]);
