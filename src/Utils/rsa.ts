import * as jsrsasign  from 'jsrsasign';

const { KJUR, KEYUTIL, RSAKey, hextob64, b64utohex  } = jsrsasign;

const key = KEYUTIL.generateKeypair('RSA', 2048)

// 公钥
const pubKey = KEYUTIL.getPEM(key.pubKeyObj);
// 私钥
const privKey = KEYUTIL.getPEM(key.prvKeyObj);


export const encrypt  = (value: string): string => {
    // const pub  = KEYUTIL.getKey(pubKey);

    // const aa = KEYUTIL.getKey(pubKey);

    // aa.encrypt(1111);
    const enc = KJUR.crypto.Cipher.encrypt(value, pubKey, 'RSAOAEP');


    console.log("jsrsasign decrypt: " + enc);
    console.log("jsrsasign hextob64: " + hextob64(enc));

    return hextob64(enc);
};

export const decrypt = (value: string): string => {
    const prv = KEYUTIL.getKey(privKey);
    const dec = KJUR.crypto.Cipher.decrypt(b64utohex(value), privKey, 'RSAOAEP');

    console.log("jsrsasign decrypt: " + dec);
    console.log("jsrsasign b64utohex: " + b64utohex(dec));
    return dec;
};