"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkArray = exports.chunkString = exports.decompressArray = exports.compressArray = exports.arrayToBase64 = exports.base64ToByteArray = void 0;
const zlibt_1 = require("zlibt");
function base64ToByteArray(base64String) {
    var buf = new Buffer(base64String, 'base64'); // Ta-da
}
exports.base64ToByteArray = base64ToByteArray;
function arrayToBase64(bytes) {
    return Buffer.from(bytes).toString('base64');
}
exports.arrayToBase64 = arrayToBase64;
function compressArray(bytes) {
    let array = [];
    const deflate = new zlibt_1.Zlib.Deflate(bytes, null);
    const compress = deflate.compress();
    for (var i = 0; i < compress.byteLength; i++) {
        array.push(compress[i]);
    }
    return array;
}
exports.compressArray = compressArray;
function decompressArray(bytes) {
    let array = [];
    const inflate = new zlibt_1.Zlib.Inflate(bytes, null);
    const plain = inflate.decompress();
    for (var i = 0; i < plain.byteLength; i++) {
        array.push(plain[i]);
    }
    return array;
}
exports.decompressArray = decompressArray;
function chunkString(base64, length) {
    let chunks = [];
    for (var i = 0, charsLength = base64.length; i < charsLength; i += length) {
        chunks.push(base64.substring(i, i + length));
    }
    return chunks;
}
exports.chunkString = chunkString;
function chunkArray(bytes, length) {
    let results = [];
    while (bytes.length) {
        results.push(bytes.splice(0, length));
    }
    return results;
}
exports.chunkArray = chunkArray;
//# sourceMappingURL=FileUtils.js.map