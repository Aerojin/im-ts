import * as CryptoJS from "crypto-js";

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1M7U1NOW1W/y3sCYAP552y+Fs32qDpSAeYu9WEZ+NFazreZV
ngA+hX4QokuxCkBsMaO1jC1FJTkv7lY3jhtJhwaddQbmhyCjdNAUo6WjaeDwwdzw
lODNeZQZZcKSxQEmk+KtAHyM7vvwZbiUFO4Kf5YxZ3Ro3VfBKWjSRFo8RsljoAza
0flV3VuwccTQCcJHIebtpeWW3pOD2gemQtE/H7J9tnPupeAgTCXIgKW7W3l+MXZ+
fLxqc+o+6tJuu5EzbRPIbm+AzPjIMzAYARV4HOKjS23RLrt/+2cSIS3JjUK93eQU
q6vtolfDMvbYGZDmKRzG2VF5d9qAPEgAJMvM0wIDAQABAoIBADUqWye0mOlH56BY
82DEMsNcswVtrq+n0BUNoUdNjTgcNRWMBvXLT9Nf9F3nlRpfj+gy4ydbI/wxtlTP
+18oWA1AzNOw3qUBtXR4i796oUHRbbSxMvWu2Aa4xkOTAcHwEKg/qEMH2tnV3XA8
VdqIwdywNDWJcq1hwCNNScLD3G0+a/2FyDYQSnvKPJDEg+MGBcxDbs+Ih8MHfIQa
hdu3E2vW+LR8+qYi76/VWpnYlHdhbb2lcbyisiMvzs3/WdD0E3Cj+oNwNb8991vJ
emDFzpmxvb+Oz3zAedLE9LPbYv6aAUrj6eEvofVCBETrCUZNW0Qd2aAqLcU5eC7z
wx1sGtkCgYEA/WK8RFpSDEu4OHCLIGnAZfa6G6b9yxCZa2gPV9R5KNldSb3pxDfH
ICj/veeLVWPMH2YVeDCdSfGnBa2MSAcUeMRuVBV8TcZJu+fUA4VYZ+JCR0H+nnCL
UOJEBvCx4o7XM8twwXiLI3P8x96boOOTGD9w/AeNIjtzmRYt3J2HGscCgYEA1wDr
HheUxDJkN7Yodgv0y6JUYH+IikB4yAnKPqquuJ6SzGDlXY5sNyWGSWcZFH3U2RgZ
eHds1sYPGFBk0Lh92UcLAS99LgADDFRaR4OBqIbMFcgpvp/7I64xi8tWKRnUQH45
Bhl6VP6m4kRPPGGGwy3vD2l/M5yqfSIxr06OEZUCgYEAwvBXT279eKA4lpNfNgym
DMwI2oVa9ANNRSjFxRieLiMsdjM5yc/vzno8ZungdE1XGUD8e39LQzw6909RgYiQ
42icSOxOubc3uuzcW+kW3rVfsFrBfTuwswWguIYtFNQ4FI0Lro0C3r+5VjuZF+p9
nEYSspNMrW13vesmVXiMHLkCgYBQobWLaYiPM97FzfjKnJ1HqS8/qVSJlLg3PQSu
D9DKyB2BrG0Ycws+e0IrURDk0HP8nr8eoJseyNRsZ+oHJMl9rNkBrs+haru56gCZ
hUYg77ymBpUxOkozDWbjaHR9oYQqU6wLD48DRSVNAhU9Lc4ecKGRBB2CO6TsnOBJ
QIqjKQKBgQCNgC2tj+m7dP6rbH5atSp/SEDodjUp4daAQusk5DHun+ap/5NELQqF
LgLzjswmX9Q8keiW5aHExBHGKUCzhjKq70lrwX2KC++uKhniVacjJF78IBK6+rX+
iGbjPArd+5yVRCLVPn6tKnDVT7X3PHEFSgvhl1cDH5crZ1setUqZsA==
-----END RSA PRIVATE KEY-----
`;

// const PAYLOAD = {
//   email: "hellojwt3@163.com",
//   username: "hellojwt3",
//   exp: 1728100196000,
//   iat: 1727840996000,
// };

const base64UrlEncode = (str) => {
  const encodedSource = CryptoJS.enc.Base64.stringify(str);
  const reg = new RegExp("/", "g");

  return encodedSource.replace(/=+$/, "").replace(/\+/g, "-").replace(reg, "_");
  //   return encodedSource;
};

const generateToken = (secretSalt) => {
  const key = secretSalt || PRIVATE_KEY;
  let header = JSON.stringify({
    alg: "RS256",
    typ: "JWT",
  });

  let iat = new Date().getTime();
  let exp = iat + 24 * 60 * 60 * 1000;
  console.log(exp - iat);
  let payload = JSON.stringify({
    email: "hellojwt4@163.com",
    username: "hellojwt3",
    iat: iat,
    exp: exp,
  });

  let before_sign =
    base64UrlEncode(CryptoJS.enc.Utf8.parse(header)) +
    "." +
    base64UrlEncode(CryptoJS.enc.Utf8.parse(payload));
  let signature = CryptoJS.HmacSHA256(before_sign, key);
  signature = base64UrlEncode(signature);
  let final_sign = before_sign + "." + signature;
  return final_sign;
};

export { generateToken };
