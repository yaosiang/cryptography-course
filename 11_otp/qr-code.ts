import { authenticator } from '@otplib/preset-default';
import qrcode from 'qrcode';

const user = 'your-gmail-account@gmail.com';
const service = 'Google';
const secret = authenticator.generateSecret();
const otpauth = authenticator.keyuri(user, service, secret);

generateQrCode().then((result: string) => {
  console.log(result);
})

async function generateQrCode(): Promise<string> {
  return await qrcode.toDataURL(otpauth);
}
