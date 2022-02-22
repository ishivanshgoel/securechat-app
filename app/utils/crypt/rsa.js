const NodeRSA = require("encrypt-rsa").default;
const nodeRSA = new NodeRSA();

class RSA {
  static generateKeys() {
    const { privateKey, publicKey } = nodeRSA.createPrivateAndPublicKeys();
    return { privateKey, publicKey };
  }
}

/**
 * Reference: https://www.npmjs.com/package/encrypt-rsa
 */

module.exports = RSA;
