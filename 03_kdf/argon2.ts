import * as argon2 from 'argon2';
import { v4 } from 'uuid';

const password: string = v4();
const wrongPassword: string = `@${password.substring(1)}`;
let hash: string;
let endTime: number;
const startTime: number = new Date().getTime();
argon2id(password)
  .then(async (result: string) => {
    hash = result;
    endTime = new Date().getTime();

    console.log(`Password                     : ${password}`);
    console.log(`Wrong Password               : ${wrongPassword}`);
    console.log(`Hash                         : ${hash}`);
    console.log(`Verify with Correct Password : ${await verifyArgon2(password, hash)}`);
    console.log(`Verify with Wrong Password   : ${await verifyArgon2(wrongPassword, hash)}`);
    console.log(`It costs ${endTime - startTime} ms`);
  });

async function argon2id(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id});
}

async function verifyArgon2(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}
