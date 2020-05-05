import * as crypto from 'crypto';
import eccrypto from 'eccrypto';
import { v4 } from 'uuid';

const privateKey = eccrypto.generatePrivate();
const publicKey = eccrypto.getPublic(privateKey);

const data = v4();
const digest: Buffer = crypto.createHash("sha256").update(data).digest();

eccrypto.sign(privateKey, digest)
  .then((signature: Buffer) => {
    console.log(`Text      : ${data}`);
    console.log(`Digest    : ${digest.toString('hex')}`)
    console.log(`Signature : ${signature.toString('hex')}`);
    // @ts-ignore
    eccrypto.verify(publicKey, digest, signature)
      .then(() => console.log("Signature is OK"))
      .catch((error: Error) => console.log("Signature is BAD"));
  });
