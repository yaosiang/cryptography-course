import * as crypto from 'crypto';
import * as assert from 'assert';

const alice: crypto.DiffieHellman = crypto.createDiffieHellman(2);
const primeFromAlice: string = alice.getPrime('hex');
const generatorFromAlice: string = alice.getGenerator('hex');
const keyFromAlice = alice.generateKeys('hex');
console.log('Key Exchange Agreements for Alice:');
logDetails(alice);

const bob = crypto.createDiffieHellman(primeFromAlice, 'hex', generatorFromAlice, 'hex');
const keyFromBob = bob.generateKeys('hex');
console.log('Key Exchange Agreements for Bob:');
logDetails(bob);

const secret1 = alice.computeSecret(keyFromBob, 'hex', 'hex');
const secret2 = bob.computeSecret(keyFromAlice, 'hex', 'hex');
assert.strictEqual(secret1, secret2);
console.log(`Shared Secret: ${parseInt(secret1, 16)}`);

// http://www.irongeek.com/diffie-hellman.php
function logDetails(dh: crypto.DiffieHellman): void {
  let keyExchangeArguments: any = {
    primeNumber: null,   // which is p
    primitiveRoot: null, // which is g
    privateX: null,      // the only secret parameter for each of its participant
    publicY: null,       // the public key which each of participant exchange with other part
  };

  keyExchangeArguments.primeNumber   = dh.getPrime().toString('hex')
  keyExchangeArguments.primitiveRoot = dh.getGenerator().toString('hex')
  keyExchangeArguments.privateX      = dh.getPrivateKey().toString('hex')
  keyExchangeArguments.publicY       = dh.getPublicKey().toString('hex')

  console.log(`  - Prime Number   : ${parseInt(keyExchangeArguments.primeNumber, 16)}`);
  console.log(`  - Primitive Root : ${parseInt(keyExchangeArguments.primitiveRoot, 16)}`);
  console.log(`  - Private X      : ${parseInt(keyExchangeArguments.privateX, 16)}`);
  console.log(`  - Public Y       : ${parseInt(keyExchangeArguments.publicY, 16)}`);
  console.log();
}
