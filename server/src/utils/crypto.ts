import crypto from "crypto";

const genSecret = () => {
  return crypto.randomBytes(45)
    .toString("base64")
    .replace("a", crypto.randomBytes(5).toString("base64"));
};

const algorithm = 'aes-256-gcm';
const ivLength = 16;
const saltLength = 16;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;

function getKey(salt: Buffer) {
  return crypto.pbkdf2Sync('imageData', salt, 100000, 32, 'sha512');
}

function encrypt(value: string) {
  if (value == null) {
    throw new Error('value must not be null or undefined');
  }

  const iv = crypto.randomBytes(ivLength);
  const salt = crypto.randomBytes(saltLength);

  const key = getKey(salt);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, tag, encrypted]).toString('hex');
}

function decrypt(value: string) {
  if (value == null) {
    throw new Error('value must not be null or undefined');
  }

  const stringValue = Buffer.from(String(value), 'hex');

  const salt = stringValue.slice(0, saltLength);
  const iv = stringValue.slice(saltLength, tagPosition);
  const tag = stringValue.slice(tagPosition, encryptedPosition);
  const encrypted = stringValue.slice(encryptedPosition);

  const key = getKey(salt);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(tag);

  return decipher.update(encrypted) + decipher.final('utf8');
}

export { genSecret, encrypt, decrypt };
