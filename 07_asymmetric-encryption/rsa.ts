import { pki, util } from 'node-forge';
import { v4 } from 'uuid';

const bits: number = 2048;
const keyPair: pki.rsa.KeyPair = pki.rsa.generateKeyPair({ bits: bits });
const data: string = v4();
const longData: string = data.repeat(5) + '0000000000000000000000000000000000';
console.log(`PCKS#8:`);
console.log(`${keyToPem(keyPair)}`);

console.log(`Text         : ${data}`)
console.log(`Encrypt Text : ${rsaOaepEncrypt(keyPair.publicKey, data)}`);
console.log(`Decrypt Text : ${rsaOaepDecrypt(keyPair.privateKey, rsaOaepEncrypt(keyPair.publicKey, data))}`);

console.log();

console.log(`(${bits}/8) – 42 = ${bits/8} – 42 = ${bits/8-42}`);
console.log(`Long Text (${longData.length})   : ${longData}`);
console.log(`Encrypt Long Text : ${rsaOaepEncrypt(keyPair.publicKey, longData)}`);

function keyToPem(keyPair: pki.rsa.KeyPair): pki.PEM {
  const ans1PrivateKey: any = pki.privateKeyToAsn1(keyPair.privateKey);
  const ans1PrivateKeyInfo: any = pki.wrapRsaPrivateKey(ans1PrivateKey);
  return pki.privateKeyInfoToPem(ans1PrivateKeyInfo);
}

function rsaOaepEncrypt(publicKey: pki.rsa.PublicKey, text: string): string {
  return util.bytesToHex(publicKey.encrypt(text, 'RSA-OAEP'));
}

function rsaOaepDecrypt(privateKey: pki.rsa.PrivateKey, cipher: string): string {
  return privateKey.decrypt(util.hexToBytes(cipher), 'RSA-OAEP');
}
