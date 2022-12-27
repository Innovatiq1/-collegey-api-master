/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import params from '../config/params';

const algorithm = 'aes-256-gcm';
const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;
const secret = params.encryption_key;

export function node_encrypt(value) {
	if (value == null || value == '') {
		return '';
	}
	const iv = randomBytes(ivLength);
	const salt = randomBytes(saltLength);
	const key = pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
	const cipher = createCipheriv(algorithm, key, iv);
	const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
	const tag = cipher.getAuthTag();
	return Buffer.concat([salt, iv, tag, encrypted]).toString('hex');
}
export function node_decrypt(value) {
	if (value == null || value == '') {
		return '';
	}
	try {
		const stringValue = Buffer.from(String(value), 'hex');
		const salt = stringValue.slice(0, saltLength);
		const iv = stringValue.slice(saltLength, tagPosition);
		const tag = stringValue.slice(tagPosition, encryptedPosition);
		const encrypted = stringValue.slice(encryptedPosition);
		const key = pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
		const decipher = createDecipheriv(algorithm, key, iv);
		decipher.setAuthTag(tag);
		return decipher.update(encrypted) + decipher.final('utf8');
	} catch (error) {
		return value;
	}
}
