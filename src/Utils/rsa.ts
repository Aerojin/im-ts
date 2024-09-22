import { KJUR, KEYUTIL, RSAKey, hextob64, b64utohex  } from 'jsrsasign';

console.log(11, KJUR, KEYUTIL, RSAKey, hextob64, b64utohex)

// 公钥
const pubKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1QXYgs4R70DRLmeajAiC
c5otNB3RNZ9BM6k+U2C0FHSDMj9C7dwbyXMdV6H7z/RyTF6/GZ7NCYoEmbnfqtU1
T7xDABE9KqNn0hyCrcVi+Gc8iCIv8LJnTrpAoDOfuQyo68pPH17/8YLXo+l4dNW+
9hOZqXVU8HsEs0EwIuoWbMOcQ9gucBXlh+YEnNkARVNXNjnFvp0RlGmulWaC7xAv
x/SrIjLuoOfx49vQiU29fnVsyq/qahV2/vXL5jOsn20wmGl6LGZq0zmhhPCPmIYr
LWgUw8ijSIGap8udzPwJuMki/Y4HXBOmCZFm/9tuoCsVbvrD/OaAlC29tjV77C0s
+wIDAQAB
-----END PUBLIC KEY-----
`;
// 私钥
const privKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA1QXYgs4R70DRLmeajAiCc5otNB3RNZ9BM6k+U2C0FHSDMj9C
7dwbyXMdV6H7z/RyTF6/GZ7NCYoEmbnfqtU1T7xDABE9KqNn0hyCrcVi+Gc8iCIv
8LJnTrpAoDOfuQyo68pPH17/8YLXo+l4dNW+9hOZqXVU8HsEs0EwIuoWbMOcQ9gu
cBXlh+YEnNkARVNXNjnFvp0RlGmulWaC7xAvx/SrIjLuoOfx49vQiU29fnVsyq/q
ahV2/vXL5jOsn20wmGl6LGZq0zmhhPCPmIYrLWgUw8ijSIGap8udzPwJuMki/Y4H
XBOmCZFm/9tuoCsVbvrD/OaAlC29tjV77C0s+wIDAQABAoIBAFIvAyzT2892Lj28
8r77uXhoDvCAYGpTmpAXx1fbgx4xJTyJc4TY2k+J/dQFRmUgZchY9VkpDumTOdsk
/smln/+3HhI0lGiSykchgLkR4fD7wzqyFdTCv2B8MtqbkA+QdsshLg1oVU4TsKYo
OLS6kgXV4f6iqbZtf464o52UujoTOM+anXL5uO0xWI7QeSHsC9FIQ2EwofrroWRG
ROmoIhZfj3NQaQU8MqTYYt0fzSz7ojfZj91Bq+C7etF7WrhY36lk1+wH+pooGTPd
ccFsomuApMdKQC8X+8Vl9CCPssorqJZB4Kb+ziikCxEKunCq6dYLtyaXo8GwiQQX
A1O7uUECgYEA+8Bzlwf2IM7JY01VWIeSWUlqUKn+ld2/nsuDVcIbRK2CvXGm2nSi
ZUWg6qoFXUnR0M7M9VoI8E4/k3qW2mPfcTEdCxLX3iRhJ3t6ylZewL422Pj6AkE9
nKIt4PHsvZ6azD4+4KDwrRJgBdR0UcY2NTHGIPMw52fAbRkgGsdEOgMCgYEA2J4W
k/K5JIQyKInIgXHN+YmgENQaQmkhkuNIx1wMKvye0w1Ve0TiH4qOkt9gkkvL/u4z
JmdPisGls3MK5eDMKG/131D2M+Ky29g50HKmD4K5BuZlvVL/ri6/InwrkqJbgkPr
5aOH2Jyc3ova/PvsGkQIzchQcj1aX8EWcDkMS6kCgYB/oiB4L7cfBvee+rQMQB94
WPonjyfdPyFJFpCtR82fUgB4n0gidQNoKJbeofg6RZS0MkRDF7R0cJdW483bRssf
jfDVjmYW34bKB5ZHQuai/Uy9T+0ge4cLBEYSR1TpBaIhbmVeaPncJPa9veqDEuSk
r2lthx4CE93A8f4O1XvHlQKBgBrORWD9kmewbDyUAFn0aVbN7x7mAHHjbKIuuhzh
iSfwpv7bEY71kT3x+X63Yc34zz+23mGMO02idQzl2Z1k2h7O7BA8hpsZHKUT9uOS
rHYS6S6vaDurf7RgWIq97u5wZP6TxSdfuznU95yalfjke+0sKiK8/SeF7B8ZV9t/
U8QxAoGBAJ1fy5uj/tt4CM4Sbk/ST2hSsmiqROoQipPpY9kxvE4kPGfkt8P9YvUb
vvU3JNRyVIP7G/SQ3+RNIgR7LHT2VFfZGLvhMGGpy6nMC9aNdVsU5eH6Zd1rhc8f
tUfdz5uIe2hi1F4hsXC1upqsGe4Di/slWjmbqZLJpptGPHgRjDSM
-----END RSA PRIVATE KEY-----
`;



export const encrypt  = (value: string): string => {
    const pub  = KEYUTIL.getKey(pubKey);
    const enc = KJUR.crypto.Cipher.encrypt(value, pub as RSAKey, 'RSAOAEP');


    console.log("jsrsasign decrypt: " + enc);
    console.log("jsrsasign hextob64: " + hextob64(enc));

    return hextob64(enc);
};

export const decrypt = (value: string): string => {
    const prv = KEYUTIL.getKey(privKey);
    const dec = KJUR.crypto.Cipher.decrypt(b64utohex(value), prv as RSAKey, 'RSAOAEP');

    console.log("jsrsasign decrypt: " + dec);
    console.log("jsrsasign b64utohex: " + b64utohex(dec));
    return dec;
};