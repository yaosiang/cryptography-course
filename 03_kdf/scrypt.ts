import * as crypto from 'crypto';
import { v4 } from 'uuid';

const password: string = v4();
const wrongPassword: string = password.substring(1);
const salt: string = crypto.randomBytes(16).toString('hex');

const startTime: number = new Date().getTime();
const dK: string = scryptSync(password, salt);
const endTime: number = new Date().getTime();

console.log(`Password                     : ${password}`);
console.log(`Salt                         : ${salt}`);
console.log(`Derived Key                  : ${scryptSync(password, salt)}`);
console.log(`Verify with Correct Password : ${verifyScrypt(password, salt, dK)}`);
console.log(`Verify with Wrong Password   : ${verifyScrypt(wrongPassword, salt, dK)}`);
console.log(`It costs ${endTime - startTime} ms`);

function scryptSync(password: string, salt: string, keyLength: number = 64): string {
  const key = crypto.scryptSync(password, salt, keyLength);
  return key.toString('hex');
}

function verifyScrypt(password: string, salt: string, dK: string): boolean {
  return dK === scryptSync(password, salt);
}
