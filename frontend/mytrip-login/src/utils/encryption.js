module.exports = cryptoLib => ({
  encrypt: (secret, decrypted) => {
    const cipher = cryptoLib.createCipher('aes192', secret);
    let encrypted = cipher.update(decrypted, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  decrypt: (secret, encrypted) => {
    const decipher = cryptoLib.createDecipher('aes192', secret);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
});
