import * as crypto from 'crypto';
import * as assert from 'assert';

const curveName: string = 'secp256k1';

const alice: crypto.ECDH = crypto.createECDH(curveName);
alice.generateKeys();
console.log('Key Exchange Agreements for Alice:');
logDetails(alice);

const bob = crypto.createECDH(curveName);
bob.generateKeys();
console.log('Key Exchange Agreements for Bob:');
logDetails(bob);

const secret1 = alice.computeSecret(bob.getPublicKey().toString('hex'), 'hex', 'hex');
const secret2 = bob.computeSecret(alice.getPublicKey().toString('hex'), 'hex', 'hex');
assert.strictEqual(secret1, secret2);
console.log(`Secret: ${secret1}`);

function logDetails(dh: crypto.ECDH): void {
  let keyExchangeArguments: any = {
    publicKey: null,
    privateKey: null,
  };

  keyExchangeArguments.privateKey  = dh.getPrivateKey().toString('hex')
  keyExchangeArguments.publicKey = dh.getPublicKey().toString('hex')

  console.log(`  - Private Key : ${keyExchangeArguments.privateKey}`);
  console.log(`  - Public Key  : ${keyExchangeArguments.publicKey}`);
  console.log();
}
