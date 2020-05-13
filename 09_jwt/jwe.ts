import dayjs from 'dayjs';
import { JWK, JWE } from 'jose';
import { v4 } from 'uuid';

const privateKey: JWK.RSAKey = JWK.generateSync('RSA', 2048, { 'alg': 'RSA-OAEP', use: 'enc', kid: v4()});
const publicKey: JWK.RSAKey = JWK.asKey(privateKey.toJWK());
const anotherPrivateKey: JWK.RSAKey = JWK.generateSync('RSA', 2048, { 'alg': 'RSA-OAEP', use: 'enc', kid: v4()});
const payload: object = {
  iss: 'issuer',
  aud: 'audience',
  testKey: 'testValue',
  iat: dayjs().unix(),
  exp: dayjs().add(5, 'minute').unix(),
};
const jwe: string = encrypt(JSON.stringify(payload), publicKey);

console.log(`JWS                     : ${jwe}`);
console.log(`Verify with correct key : ${decrypt(jwe, privateKey)}`);
console.log(`Verify with wrong key   : ${decrypt(jwe, anotherPrivateKey)}`);
console.log(`Verify with wrong jws   : ${decrypt(jwe.substring(1), privateKey)}`);

function encrypt(payload: string, key: JWK.Key): string {
  return JWE.encrypt(payload, key, { 'typ': 'JWT'});
}

function decrypt(jwe: string, key: JWK.Key): string {
  try {
    return JWE.decrypt(jwe, key).toString('utf8');
  } catch (error) {
    return '';
  }
}
