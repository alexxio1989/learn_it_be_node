
export function base64ToByteArray(base64String: string) {
    var buf = new Buffer(base64String, 'base64'); // Ta-da
}

export function arrayToBase64(bytes: any[]) : string {
 
    return Buffer.from(bytes).toString('base64')
}

export function chunkString(base64: string, length: number) {
    let chunks = [];
    for (var i = 0, charsLength = base64.length; i < charsLength; i += length) {
        chunks.push(base64.substring(i, i + length));
    }
    return chunks;
}

export function chunkArray(bytes: any[], length: number) {
    let results = [];
    
    while (bytes.length) {
        results.push(bytes.splice(0, length))
    }

    return results;
}