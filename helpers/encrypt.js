// // crypto module
// const crypto = require("crypto");

// const algorithm = "aes-256-cbc"; 
// const config = process.env;

// // generate 16 bytes of random data
// const initVector = crypto.randomBytes(16);

// // protected data
// const message = "This is a secret message";

// // secret key generate 32 bytes of random data
// const Securitykey = crypto.randomBytes(32);

// // the cipher function
// const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// // encrypt the message
// // input encoding
// // output encoding

// const encrypt = (req) => {
//     let encryptedData = cipher.update(req, "utf-8", "hex");

// encryptedData += cipher.final("hex");

// console.log("Encrypted message: " + encryptedData);
// }

// const decrypt = (req) => {

// // the decipher function
// const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

// let decryptedData = decipher.update(req, "hex", "utf-8");

// decryptedData += decipher.final("utf8");

// console.log("Decrypted message: " + decryptedData);
// }

// module.exports = encrypt;



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