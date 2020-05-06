import * as forge from 'node-forge';
import { v4 } from 'uuid';

const bits: number = 2048;
const keyPair: forge.pki.rsa.KeyPair = forge.pki.rsa.generateKeyPair({ bits: bits });
const data: string = v4();
const md: forge.md.MessageDigest = forge.md.sha1.create().update(data, 'utf8');
const digest: forge.Bytes = md.digest().bytes();

// sign data with a private key and output DigestInfo DER-encoded bytes
// (defaults to RSASSA PKCS#1 v1.5)
const signature: forge.Bytes = keyPair.privateKey.sign(md);
console.log(`Signature     : ${forge.util.bytesToHex(signature)}`);

// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
try {
  const verified: boolean = keyPair.publicKey.verify(digest, signature);
  console.log(`Verify Result : ${verified}`);
} catch (error) {
  console.error(error);
}

console.log();

const modifiedSignature: string = `@${signature.substring(1)}`;
console.log(`Modified Signature : ${forge.util.bytesToHex(modifiedSignature)}`);
try {
  const verified: boolean = keyPair.publicKey.verify(digest, modifiedSignature);
  console.log(`Verify Result     : ${verified}`);
} catch (error) {
  console.error(error);
}
