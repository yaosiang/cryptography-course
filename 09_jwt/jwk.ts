import { JWK } from 'jose';
import { v4 } from 'uuid';

generateRsaKey();
generateEccKey();

function generateRsaKey(): void {
  const rsaKey: JWK.RSAKey = JWK.generateSync('RSA', 2048, { alg: 'RS256', use: 'sig', kid: v4()});
  console.log('Private Key:');
  console.log(rsaKey.toJWK(true));
  console.log('Public Key:');
  console.log(rsaKey.toJWK());
}

function generateEccKey(): void {
  const eccKey: JWK.ECKey = JWK.generateSync('EC', 'P-256', { alg: 'ES256', use: 'sig', kid: v4()});
  console.log('Private Key:');
  console.log(eccKey.toJWK(true));
  console.log('Public Key:');
  console.log(eccKey.toJWK());
}
