
export function base64ToByteArray(base64String: string) {
    var buf = new Buffer(base64String, 'base64'); // Ta-da
}

export function chunkString(base64: string, length: number) {
    let chunks = [];
    for (var i = 0, charsLength = base64.length; i < charsLength; i += length) {
        chunks.push(base64.substring(i, i + length));
    }
    return chunks;
}