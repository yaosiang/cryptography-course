import * as crypto from 'crypto';
import { v4 } from 'uuid';

const password: string = v4();
const wrongPassword: string = password.substring(1);
const salt: string = crypto.randomBytes(16).toString('hex');
const iteration: number = 100000;

const startTime: number = new Date().getTime();
const dK: string = pbkdf2Sync(password, salt, iteration);
const endTime: number = new Date().getTime();

console.log(`Password                     : ${password}`);
console.log(`Salt                         : ${salt}`);
console.log(`Derived Key                  : ${pbkdf2Sync(password, salt, iteration)}`);
console.log(`Verify with Correct Password : ${verifyPbkdf2(password, salt, dK, iteration)}`);
console.log(`Verify with Wrong Password   : ${verifyPbkdf2(wrongPassword, salt, dK, iteration)}`);
console.log(`It costs ${endTime - startTime} ms`);

function pbkdf2Sync(password: string, salt: string, iteration: number = 100000, keyLength: number = 64, digest: string = 'sha256'): string {
  const key = crypto.pbkdf2Sync(password, salt, iteration, keyLength, digest);
  return key.toString('hex');
}

function verifyPbkdf2(password: string, salt: string, dK: string, iteration: number): boolean {
  return dK === pbkdf2Sync(password, salt, iteration);
}
