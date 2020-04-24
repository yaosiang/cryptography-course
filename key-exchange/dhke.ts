import * as crypto from 'crypto';
import * as assert from 'assert';

const alice: crypto.DiffieHellman = crypto.createDiffieHellman(1024);
const primeFromAlice: string = alice.getPrime('hex');
const keyFromAlice = alice.generateKeys('hex');
console.log('Key Exchange Agreements for Alice:');
logDetails(alice);

const bob = crypto.createDiffieHellman(primeFromAlice, 'hex');
const keyFromBob = bob.generateKeys('hex');
console.log('Key Exchange Agreements for Bob:');
logDetails(bob);

const secret1 = alice.computeSecret(keyFromBob, 'hex', 'hex');
const secret2 = bob.computeSecret(keyFromAlice, 'hex', 'hex');
assert.strictEqual(secret1, secret2);
console.log(`Secret: ${secret1}`);

function logDetails(dh: crypto.DiffieHellman): void {
  let keyExchangeArguments: any = {
    prime_number: null,   // which is q in our notation
    primitive_root: null, // which is t in our notation
    x: null,              // the only secret parameter for each of its participant
    y: null,              // the public key which each of participant exchange with other part
  };

  keyExchangeArguments.prime_number   = dh.getPrime().toString('hex')
  keyExchangeArguments.primitive_root = dh.getGenerator().toString('hex')
  keyExchangeArguments.x              = dh.getPrivateKey().toString('hex')
  keyExchangeArguments.y              = dh.getPublicKey().toString('hex')

  console.log(`  - Prime Number   : ${keyExchangeArguments.prime_number}`);
  console.log(`  - Primitive Root : ${keyExchangeArguments.primitive_root}`);
  console.log(`  - X              : ${keyExchangeArguments.x}`);
  console.log(`  - Y              : ${keyExchangeArguments.y}`);
  console.log();
}
