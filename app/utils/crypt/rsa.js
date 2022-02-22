const crypto = require("crypto");

class RSA {
  static MODULUS_LENGTH = 2048;

  static generateKeys() {
    const keys = crypto.generateKeyPairSync("rsa", {
      // The standard secure default length for RSA keys is 2048 bits
      modulusLength: 2048,
    });

    return keys;
  }

  //   static encrypt(publicKey, data) {
  //     const encryptedData = crypto.publicEncrypt(
  //       {
  //         key: publicKey,
  //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //         oaepHash: "sha512",
  //       },
  //       // We convert the data string to a buffer using `Buffer.from`
  //       Buffer.from(data)
  //     );

  //     // The encrypted data is in the form of bytes, so we return it in base64 format
  //     return encryptedData.toString("base64");
  //   }

  //   static decrypt(privateKey, encryptedData) {
  //     const decryptedData = crypto.privateDecrypt(
  //       {
  //         key: privateKey,
  //         // In order to decrypt the data, we need to specify the
  //         // same hashing function and padding scheme that we used to
  //         // encrypt the data in the previous step
  //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //         oaepHash: "sha512",
  //       },
  //       encryptedData
  //     );

  //     // The decrypted data is of the Buffer type, which we can convert to a
  //     // string to reveal the original data
  //     return decryptedData.toString();
  //   }
}

module.exports = RSA;
