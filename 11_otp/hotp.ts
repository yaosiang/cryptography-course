import { hotp } from 'otplib';

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
const counter = 1; // it should be a random number

const token = generateToken(secret, counter);
console.log(token);
console.log(checkToken(token, secret, counter));

console.log(`Current counter is ${counter}`);
console.log(`Add counter to ${counter + 1}`);
console.log(checkToken(token, secret, counter + 1));

function generateToken(secret: string, counter: number): string {
  return hotp.generate(secret, counter);
}

function checkToken(token: string, secret: string, counter: number): boolean {
  try {
    return hotp.check(token, secret, counter);
  } catch (err) {
    console.error(err);
    return false;
  }
}
