"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkString = exports.base64ToByteArray = void 0;
function base64ToByteArray(base64String) {
    var buf = new Buffer(base64String, 'base64'); // Ta-da
}
exports.base64ToByteArray = base64ToByteArray;
function chunkString(base64, length) {
    let chunks = [];
    for (var i = 0, charsLength = base64.length; i < charsLength; i += length) {
        chunks.push(base64.substring(i, i + length));
    }
    return chunks;
}
exports.chunkString = chunkString;
//# sourceMappingURL=FileUtils.js.map