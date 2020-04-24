import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

const password: string = v4();
const wrongPassword: string = password.substring(1);
const rounds: number = 10;
const salt: string = bcrypt.genSaltSync(rounds);
const startTime: number = new Date().getTime();
const hash: string = bcryptSync(password, salt);
const endTime: number = new Date().getTime();

console.log(`Password                     : ${password}`);
console.log(`Salt                         : ${salt}`);
console.log(`Hash                         : ${bcryptSync(password, salt)}`);
console.log(`Verify with Correct Password : ${verifyBcrypt(password, hash)}`);
console.log(`Verify with Wrong Password   : ${verifyBcrypt(wrongPassword, hash)}`);
console.log(`It costs ${endTime - startTime} ms`);

function bcryptSync(password: string, salt: string): string {
  return bcrypt.hashSync(password, salt);
}

function verifyBcrypt(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
