import CryptoJS from 'crypto-js';
import { isBase64 } from './help';
const key = '5EFTXZMKjWoLtPrA'; // 秘钥key>=16位
const keyHex = CryptoJS.enc.Utf8.parse(key); // 将秘钥转化为utf8格式
const iv = CryptoJS.enc.Utf8.parse('5EFTXZMKjWoLtPrA'); // 编译向量，可以和key一致
/* 
解密
*/
export const Decrypt = (data) => {
    let sData = data;
    if (!isBase64(data)) {
        // 如果不是base64加密之后的数据，则需先转换成base64
        const encryptedHexStr = CryptoJS.enc.Hex.parse(sData);
        sData = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    }
    const decrppt = CryptoJS.AES.decrypt(sData, keyHex, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptStr = decrppt.toString(CryptoJS.enc.Utf8);
    return decryptStr.toString();
};

/* 
加密
*/
export const Encrypt = (data, b64 = true) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), keyHex, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    if (!b64) {
        return encrypted.ciphertext.toString();
    }

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext); //以base64加密数据
};
