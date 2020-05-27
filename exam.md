---
tags: cryptography
---

# 密碼學考題試券

## 考試規則

- 全部 30 題是非題，正確比率超過或包含 70% 即算通過。
- 作答時間不限制，可重播影片來協助答題。
- 若對試題有疑問，可至 https://github.com/yaosiang/cryptography-course 發 issue 詢問。

### Hash

- Q：密碼雜湊函式可以使用已經被證明會產生碰撞的雜湊函式。
- Q：不管訊息長度大小，在經過密碼雜湊函式處理過產出的 Hash 值，長度會是固定的。
- Q：密碼雜湊函式極難從 Hash 值反推回原始訊息。

### MAC

- Q：MAC 可以在 pre-shared secret 的情況下，確保訊息完整性跟訊息來源。
- Q：MAC 可以提供訊息的保密。

### KDF

- Q：密碼可以明文或加密形式存放沒關係。
- Q：Salted hased password 的安全強度比 Secure KDF 高。
- Q：常見 KDF 演算法的運算速度跟密碼雜湊函式一樣快速。

### Symmetric Encrytion

- Q：對稱式演算法的對稱，是相同明文在加密後都會產生一樣密文的意思。
- Q：工作模式（mode of operation）是在講區塊加密演算法（如：AES）如何處理多個區塊訊息的方式。
- Q：在沒有金鑰（key）的情況下，使用 AES-ECB 無法透過修改密文來操縱解開的明文。
- Q：使用 AES-GCM 沒有辦法確保訊息完整性。

### Key Exchange

- Q：透過 Key Exchange，可以在不安全的管道上，雙方協調出一個 shared secret。
- Q：單純的 Diffie–Hellman Key Exchange 有可能受到中間人攻擊。

### Asymmteric Encryption

- Q：公鑰跟私鑰在數學上有一定關係。
- Q：公鑰也應該如同私鑰一般的保管及存放。
- Q：RSA 與 ECC 是兩種常見的非對稱式加密演算法。
- Q：RSA 的金鑰長度比 ECC 來的長。
- Q：單純的非對稱式加密可以加密任意長度的訊息。
- Q：非對稱式加密是使用公鑰來加密。

### Digital Signatures

- Q：使用數位簽章可以確保訊息的不可否認性。
- Q：數位簽章是使用公鑰對訊息雜湊值做簽署（sign）。
- Q：收到數位簽章跟原始訊息的接收者，需要使用公鑰來查驗（verify）數位簽章是否正確。

### TLS／SSL

- Q：目前（2020 年 6 月）最新的 TLS 版本是 1.3。
- Q：Certificate Authority 會透過簽發數位憑證（certificate）來確保公鑰的合法性。
- Q：Root CA 的數位憑證（或稱根憑證）會透過瀏覽器軟體來散佈。
- Q：數位憑證的信任鍊若斷掉，則 TLS Handshake 仍然可以建立。
- Q：TLS 在 Handshake 階段完成後會協調出一把 session key，這把 key 會在後續用對稱式加密演算法來加密傳遞的資訊。

### JWT

- Q：JWT 是種 Token 傳遞格式，只有訊息簽章的 Token 稱為 JWS（JSON Web Signature），若要加密訊息，則需要使用 JWE（JSON Web Encryption）。
- Q：使用 JWT 可以不查驗簽章，也可以把表頭的 alg 設定成 none。
