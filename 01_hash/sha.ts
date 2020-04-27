import { get } from 'fast-levenshtein';
import JsSHA from 'jssha';
import { v4 } from 'uuid';

demo1();
demo2();

function demo1() {
  const data: string = v4();
  console.log(`Text     : ${data}`);
  console.log(`SHA-1    : ${sha1(data)}`);
  console.log(`SHA2-256 : ${sha256(data)}`);
  console.log(`SHA3-256 : ${sha3(data)}`);
}

function demo2() {
  const data: string = v4();
  const modifiedData: string = `@${data.substring(1)}`;
  console.log(`Text             : ${data}`);
  console.log(`SHA2-256         : ${sha256(data)}`);
  console.log(`Modified Text    : ${modifiedData}`);
  console.log(`SHA2-256         : ${sha256(modifiedData)}`);
  console.log(`Distance of Text : ${get(data, modifiedData)}`);
  console.log(`Distance of Hash : ${get(sha256(data), sha256(modifiedData))}`);
}

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
