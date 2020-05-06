import * as crypto from 'crypto';
import eccrypto from 'eccrypto';
import { v4 } from 'uuid';

const privateKey = eccrypto.generatePrivate();
const publicKey = eccrypto.getPublic(privateKey);

const data = v4();
const digest: Buffer = crypto.createHash("sha256").update(data).digest();

eccrypto.sign(privateKey, digest)
  .then(async (signature: Buffer) => {
    console.log(`Text      : ${data}`);
    console.log(`Digest    : ${digest.toString('hex')}`)
    try {
      console.log(`Signature : ${signature.toString('hex')}`);
      // @ts-ignore
      await eccrypto.verify(publicKey, digest, signature);
      console.log("Signature is OK")
    } catch (error) {
      console.log("Signature is BAD")
    }

    try {
      const modifiedSignature: Buffer = signature.reverse();
      console.log(`Modified Signature : ${modifiedSignature.toString('hex')}`);
      // @ts-ignore
      await eccrypto.verify(publicKey, digest, modifiedSignature);
      console.log("Signature is OK")
    } catch (error) {
      console.log("Signature is BAD")
    }
  });
