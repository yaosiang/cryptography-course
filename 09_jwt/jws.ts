import dayjs from 'dayjs';
import { JWK, JWS } from 'jose';
import { v4 } from 'uuid';

const privateKey: JWK.ECKey = JWK.generateSync('EC', 'P-256', { alg: 'ES256', use: 'sig', kid: v4()});
const publicKey: JWK.ECKey = JWK.asKey(privateKey.toJWK());
const anotherPublicKey: JWK.ECKey = JWK.generateSync('EC', 'P-256', { alg: 'ES256', use: 'sig', kid: v4()}, false);
const payload: object = {
  iss: 'issuer',
  aud: 'audience',
  testKey: 'testValue',
  iat: dayjs().unix(),
  exp: dayjs().add(5, 'minute').unix(),
};
const jws: string = sign(payload, privateKey);

console.log(`JWS                     : ${jws}`);
console.log(`Verify with correct key : ${verify(jws, publicKey)}`);
console.log(`Verify with wrong key   : ${verify(jws, anotherPublicKey)}`);
console.log(`Verify with wrong jws   : ${verify(jws.substring(1), anotherPublicKey)}`);

function sign(payload: object, key: JWK.Key): string {
  return JWS.sign(payload, key, { 'typ': 'JWT'});
}

function verify(jws: string, key: JWK.Key): boolean {
  try {
    JWS.verify(jws, key);
    return true;
  } catch (error) {
    return false;
  }
}
