
const CryptoJS = require("crypto-js");



function encrypt(content) {
const parsedkey = CryptoJS.enc.Utf8.parse("fghfghituyhih");
const iv = CryptoJS.enc.Utf8.parse("ghjfghjfghfghi");
const encrypted = CryptoJS.AES.encrypt(content, parsedkey, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
return encrypted.toString();
};

function decrypt(word) {
    console.log(word);
var keys = CryptoJS.enc.Utf8.parse("fghfghituyhih");
let base64 = CryptoJS.enc.Base64.parse(word);
let src = CryptoJS.enc.Base64.stringify(base64);
var decrypt = CryptoJS.AES.decrypt(src, keys, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
console.log(decrypt.toString(CryptoJS.enc.Utf8))
return decrypt.toString(CryptoJS.enc.Utf8);
};

module.exports = {
    aesEncrypt: encrypt,
    aesDecrypt: decrypt
    };