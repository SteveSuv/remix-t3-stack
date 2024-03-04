import CryptoJS from "crypto-js";

export const hash = (text: string) => {
  return CryptoJS.SHA3(text).toString();
};

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString();
};

export const decrypt = (text: string) => {
  return CryptoJS.AES.decrypt(text, process.env.CRYPTO_SECRET).toString(
    CryptoJS.enc.Utf8,
  );
};
