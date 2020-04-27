// ref: https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81

import {
  BinaryLike,
  CipherGCM,
  CipherGCMTypes,
  CipherKey,
  createCipheriv,
  createDecipheriv,
  randomBytes
} from 'crypto';

const key = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
const text: string = '12345678901234561234567890123456';
const algorithm: CipherGCMTypes = 'aes-128-gcm';

const [cipher, iv, tag]: [string, Uint8Array, Buffer] = aesGcmEncrypt(key, text);
const decrypted: string = aesGcmDecrypt(key, iv, tag, cipher);
console.log(`Text   : ${text}`);
console.log(`Cipher : ${cipher}`);
console.log(`Key    : [${key.toString()}]`);
console.log(`IV     : [${iv.toString()}]`);
console.log(`Tag    : ${tag.toString('hex')}`)
console.log(decrypted === text);

function aesGcmEncrypt(key: CipherKey, text: string): [string, Uint8Array, Buffer] {
  const iv: Uint8Array = new Uint8Array(randomBytes(128 / 8))
  const aesGcm: CipherGCM = createCipheriv(algorithm, key, iv);

  let cipher: string = aesGcm.update(text, 'utf8', 'hex');
  cipher += aesGcm.final('hex');

  return [cipher, iv, aesGcm.getAuthTag()];
}


function aesGcmDecrypt(key: BinaryLike, iv: Uint8Array, tag: Buffer, cipher: string): string {
  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);

  let text: string = decipher.update(cipher, 'hex', 'utf8');
  text += decipher.final('utf8');

  return text;
}
