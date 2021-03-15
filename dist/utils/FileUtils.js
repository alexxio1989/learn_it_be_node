"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkArray = exports.chunkString = exports.arrayToBase64 = exports.base64ToByteArray = void 0;
function base64ToByteArray(base64String) {
    var buf = new Buffer(base64String, 'base64'); // Ta-da
}
exports.base64ToByteArray = base64ToByteArray;
function arrayToBase64(bytes) {
    let binary = '';
    let len = bytes.length;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return Buffer.from(bytes).toString('base64');
}
exports.arrayToBase64 = arrayToBase64;
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