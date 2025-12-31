/**
 * Generates headers for valid API request signing.
 * Uses Web Crypto API to avoid external dependencies.
 */
export async function signRequest(payload: any, secret: string) {
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Create the string to sign: JSON string of payload + timestamp
    // We sort keys to ensure deterministic JSON string
    const sortedPayload = sortObjectKeys(payload);
    const dataToSign = JSON.stringify(sortedPayload) + timestamp;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(dataToSign);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        messageData
    );

    // Convert buffer to hex string
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
        'X-Signature': signatureHex
    };
}

function sortObjectKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }

    return Object.keys(obj)
        .sort()
        .reduce((result: any, key) => {
            result[key] = sortObjectKeys(obj[key]);
            return result;
        }, {});
}
