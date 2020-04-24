import JsSHA from 'jssha';
import { v4 } from 'uuid';

const data: string = v4();

console.log(`Text     : ${data}`);
console.log(`SHA-1    : ${sha1(data)}`);
console.log(`SHA2-256 : ${sha256(data)}`);
console.log(`SHA3-256 : ${sha3(data)}`);

function sha1(data: string): string {
  const shaObject = new JsSHA('SHA-1', 'TEXT');
  shaObject.update(data);
  return shaObject.getHash('HEX');
}

function sha256(data: string): string {
  const shaObject = new JsSHA('SHA-256', 'TEXT');
  shaObject.update(data);
  return shaObject.getHash('HEX');
}

function sha3(data: string): string {
  const shaObject = new JsSHA('SHA3-256', 'TEXT');
  shaObject.update(data);
  return shaObject.getHash('HEX');
}
