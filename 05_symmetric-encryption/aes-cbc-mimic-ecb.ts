import * as aesjs from 'aes-js';

const key = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const iv  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Condition 1
const text: string = '12345678901234561234567890123456';

console.log(aesCbcMimicEcbEncrypt(key, iv, text));
console.log(aesCbcMimicEcbDecrypt(key, iv, aesCbcMimicEcbEncrypt(key, iv, text)) === text);

function aesCbcMimicEcbEncrypt(key: number[], iv: number[], text: string): string {
  const result: string[] = [];

  for (let i = 0; i < text.length; i += iv.length) {          // Condition 2
    const subText: string = text.substring(i, i + iv.length);
    const textBytes: Uint8Array = aesjs.utils.utf8.toBytes(subText);
    const aesEcb: aesjs.ModeOfOperation.ModeOfOperationCBC = new aesjs.ModeOfOperation.cbc(key, iv);
    const encryptedBytes: Uint8Array = aesEcb.encrypt(textBytes);
    result.push(aesjs.utils.hex.fromBytes(encryptedBytes));
  }

  return result.join('');
}

function aesCbcMimicEcbDecrypt(key: number[], iv: number[], cipher: string): string {
  const result: string[] = [];

  for (let i = 0; i < cipher.length; i += iv.length * 2) {
    const subText: string = cipher.substring(i, i + iv.length * 2);
    const textBytes: Uint8Array = aesjs.utils.hex.toBytes(subText);
    const aesEcb: aesjs.ModeOfOperation.ModeOfOperationCBC = new aesjs.ModeOfOperation.cbc(key, iv);
    const decryptedBytes: Uint8Array = aesEcb.decrypt(textBytes);
    result.push(aesjs.utils.utf8.fromBytes(decryptedBytes));
  }

  return result.join('');
}
