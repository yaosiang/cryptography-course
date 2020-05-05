import eccrypto, { Ecies } from 'eccrypto';
import { v4 } from 'uuid';

const privateKeyA = eccrypto.generatePrivate();
const publicKeyA = eccrypto.getPublic(privateKeyA);
const privateKeyB = eccrypto.generatePrivate();
const publicKeyB = eccrypto.getPublic(privateKeyB);
const data: string = v4();

encryptMsgForA(data).then(() => {
  console.log();
  encryptMsgForB(data).then(() => {
  });
});

  async function encrypt(publicKey: Buffer, text: string): Promise<Ecies> {
  return await eccrypto.encrypt(publicKey, Buffer.from(text));
}

async function decrypt(privateKey: Buffer, cipher: Ecies): Promise<Buffer> {
  return await eccrypto.decrypt(privateKey, cipher);
}

// Encrypting the message for A.
async function encryptMsgForA(data: string): Promise<void> {
  const cipher: Ecies = await encrypt(publicKeyA, data);
  const text: Buffer = await decrypt(privateKeyA, cipher);
  console.log(`Message to party A : ${text.toString()}`);
  console.log(`Cipher             : ${cipher.ciphertext.toString('hex')}`);
  console.log(`Public Key         : ${cipher.ephemPublicKey.toString('hex')}`);
  console.log(`IV                 : ${cipher.iv.toString('hex')}`);
  console.log(`MAC                : ${cipher.mac.toString('hex')}`);
}

// Encrypting the message for B.
async function encryptMsgForB(data: string): Promise<void> {
  const cipher: Ecies = await encrypt(publicKeyB, data);
  const text: Buffer = await decrypt(privateKeyB, cipher);
  console.log(`Message to party B : ${text.toString()}`);
  console.log(`Cipher             : ${cipher.ciphertext.toString('hex')}`);
  console.log(`Public Key         : ${cipher.ephemPublicKey.toString('hex')}`);
  console.log(`IV                 : ${cipher.iv.toString('hex')}`);
  console.log(`MAC                : ${cipher.mac.toString('hex')}`);
  }
