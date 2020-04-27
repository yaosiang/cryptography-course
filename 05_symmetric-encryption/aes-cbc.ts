import * as aesjs from 'aes-js';

const key = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const iv  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const text: string = '12345678901234561234567890123456';

console.log(`Text   : ${text}`);
console.log(`Cipher : ${aesCbcEncrypt(key, iv, text)}`);
console.log(`Key    : [${key.toString()}]`);
console.log(`IV     : [${iv.toString()}]`);
console.log(aesCbcDecrypt(key, iv, aesCbcEncrypt(key, iv, text)) === text);

function aesCbcEncrypt(key: number[], iv: number[], text: string): string {
  const textBytes: Uint8Array = aesjs.utils.utf8.toBytes(text);

  const aesEcb: aesjs.ModeOfOperation.ModeOfOperationCBC = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptedBytes: Uint8Array = aesEcb.encrypt(textBytes);

  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

function aesCbcDecrypt(key: number[], iv: number[], cipher: string): string {
  const textBytes: Uint8Array = aesjs.utils.hex.toBytes(cipher);

  const aesEcb: aesjs.ModeOfOperation.ModeOfOperationCBC = new aesjs.ModeOfOperation.cbc(key, iv);
  const decryptedBytes: Uint8Array = aesEcb.decrypt(textBytes);

  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}
