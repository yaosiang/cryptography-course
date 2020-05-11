import { authenticator } from '@otplib/preset-default';

const secret = authenticator.generateSecret();
// console.log(authenticator.allOptions());

const token = generateToken(secret);
console.log(token);
console.log(checkToken(token, secret));

console.log('Wait 30 secs');
setTimeout(() => {
  console.log(checkToken(token, secret));
}, 30000);

function generateToken(secret: string): string {
  return authenticator.generate(secret);
}

function checkToken(token: string, secret: string): boolean {
  try {
    return authenticator.check(token, secret);
  } catch (err) {
    console.error(err);
    return false;
  }
}
