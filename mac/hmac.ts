import * as crypto from 'crypto';
import { v4 } from 'uuid';

const key: string = 'secret key';
const data: string = v4();
const digest: string = hmacWithSha256(data, key);
const wrongDigest: string = digest.substring(1);

console.log(`Text                        : ${data}`);
console.log(`HMAC Digest                 : ${digest}`);
console.log(`Verify with correct digest  : ${verifyHmacWithSha256(data, digest, key)}`);
console.log(`Verify with modified digest : ${verifyHmacWithSha256(data, wrongDigest, key)}`);

function hmacWithSha256(data: string, key: string): string {
  const hmac: crypto.Hmac = crypto.createHmac('sha256', key);
  hmac.update(data);
  return hmac.digest('hex');
}

function verifyHmacWithSha256(data: string, digest: string, key: string): boolean {
  return digest === hmacWithSha256(data, key);
}
