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