# 建議開發者知道的密碼學知識

## 第一次課程

### Hash
- Hash 是做什麼用的？
- Hash 的特性
- 什麼是 Cryptographic Hash Function？
- 常見演算法
- 迷思：雜湊不等於加密

### Message Authentication Code
- 如何確認訊息未被竄改？
- 常見演算法

### Key Derivation Function
- KDF 是什麼？
- 密碼要怎麼存放？
- 常見演算法

### Random Number Generator
- 什麼是隨機亂數？
- 什麼是 CSPRNG？

### Symmetric Encryption
- 訊息的機密性、完整性、不可否認性是什麼意思？
- 對稱式跟非對稱式是怎麼區分的？
- XOR 運算是什麼？
- AES 是什麼？
- AES Mode of Operation 又是什麼？
- 迷思：AES 一定是安全的嗎？
- 如何確保訊息完整性？
- 迷思：雜湊不等於加密

---

## 第二次課程

### Key Exchange
- 金鑰交換的目的
- Key Exchange 作法

### Asymmetric Encryption
- 用同一把 Key 做事情會有什麼問題？
- 非對稱式是什麼意思？
- 常見演算法族系
- 為什麼不能夠使用 Asymmetric Encryption 來加密任何東西？如何用 Hybrid Cryptography System 來克服？

### Digital Signature
- 訊息的不可否認性怎麼做到的？
- 簽章與查驗
- 數位簽章可以做什麼用？

---

## 第三次課程

### SSL／TLS
- TLS 可以做到怎樣的保護？
- TLS Handshake
- TLS Cipher Suites
- 數位憑證是怎麼運作的？

### JSON Web Token
- JWT 是什麼？
- JWT 有那些變形？
- JWT 常見用途

### 其他應用
- One Time Password 是什麼？
- End-to-End Encryption 是怎麼一回事？
