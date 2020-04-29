import * as crypto from 'crypto';
import { v4 } from 'uuid';

const key: string = 'secret key';
const wrongKey: string = `@${key.substring(1)}`;
const data: string = v4();
const wrongData: string = `@${data.substring(1)}`;
const digest: string = hmacWithSha256(data, key);
const wrongDigest: string = hmacWithSha256(data, wrongKey);

console.log(`Key                         : ${key}`);
console.log(`Text                        : ${data}`);
console.log(`Wrong Key                   : ${wrongKey}`);
console.log(`Wrong Text                  : ${wrongData}`);
console.log(`HMAC Digest                 : ${digest}`);
console.log(`Wrong HMAC Digest           : ${wrongDigest}`);
console.log(`Verify with correct text    : ${verifyHmacWithSha256(data, digest, key)}`);
console.log(`Verify with correct digest  : ${verifyHmacWithSha256(data, digest, key)}`);
console.log(`Verify with modified text   : ${verifyHmacWithSha256(wrongData, digest, key)}`);
console.log(`Verify with modified key    : ${verifyHmacWithSha256(data, wrongDigest, key)}`);

function hmacWithSha256(data: string, key: string): string {
  const hmac: crypto.Hmac = crypto.createHmac('sha256', key);
  hmac.update(data);
  return hmac.digest('hex');
}

function verifyHmacWithSha256(data: string, digest: string, key: string): boolean {
  return digest === hmacWithSha256(data, key);
}
