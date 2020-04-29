import { get } from 'fast-levenshtein';
import JsSHA from 'jssha';
import { v4 } from 'uuid';

const data: string = v4();

demo1();
demo2();

// 如何用依賴套件計算各種 SHA 值
function demo1(): void {
  console.log(`Text     : ${data}`);
  console.log(`SHA-1    : ${sha1(data)}`);
  console.log(`SHA2-256 : ${sha256(data)}`);
  console.log(`SHA2-512 : ${sha512(data)}`);
  console.log(`SHA3-256 : ${sha3_256(data)}`);
  console.log(`SHA3-512 : ${sha3_512(data)}`);
}

// 些微的輸入訊息變化，產生的 SHA 值會有很大的差異
function demo2(): void {
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

function sha512(data: string): string {
  const shaObject = new JsSHA('SHA-512', 'TEXT');
  shaObject.update(data);
  return shaObject.getHash('HEX');
}

function sha3_256(data: string): string {
  const shaObject = new JsSHA('SHA3-256', 'TEXT');
  shaObject.update(data);
  return shaObject.getHash('HEX');
}

function sha3_512(data: string): string {
  const shaObject = new JsSHA('SHA3-512', 'TEXT');
  shaObject.update(data);
  return shaObject.getHash('HEX');
}
