const HEX_TABLE = Array.from({ length: 256 }, (_, index) => index.toString(16).padStart(2, '0'));

type CryptoLike = {
  getRandomValues?: (array: Uint8Array) => Uint8Array;
  randomUUID?: () => string;
};

const getCrypto = (): CryptoLike | undefined => {
  if (typeof globalThis === 'undefined') {
    return undefined;
  }

  return (globalThis as typeof globalThis & { crypto?: CryptoLike }).crypto;
};

const bytesToUuid = (bytes: Uint8Array) =>
  `${HEX_TABLE[bytes[0]]}${HEX_TABLE[bytes[1]]}${HEX_TABLE[bytes[2]]}${HEX_TABLE[bytes[3]]}` +
  `-${HEX_TABLE[bytes[4]]}${HEX_TABLE[bytes[5]]}` +
  `-${HEX_TABLE[bytes[6]]}${HEX_TABLE[bytes[7]]}` +
  `-${HEX_TABLE[bytes[8]]}${HEX_TABLE[bytes[9]]}` +
  `-${HEX_TABLE[bytes[10]]}${HEX_TABLE[bytes[11]]}${HEX_TABLE[bytes[12]]}${HEX_TABLE[bytes[13]]}${HEX_TABLE[bytes[14]]}${HEX_TABLE[bytes[15]]}`;

const getRandomBytes = (length: number) => {
  const crypto = getCrypto();
  if (crypto?.getRandomValues) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
};

export const supportsCrypto = () => {
  const crypto = getCrypto();
  return typeof crypto?.getRandomValues === 'function';
};

export const supportsRandomUUID = () => {
  const crypto = getCrypto();
  return typeof crypto?.randomUUID === 'function';
};

export const generateUuidV4 = () => {
  const crypto = getCrypto();
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  const bytes = getRandomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuid(bytes);
};

export type UuidFormat = 'lowercase' | 'uppercase' | 'no-hyphens';

export const formatUuid = (uuid: string, format: UuidFormat) => {
  switch (format) {
    case 'uppercase':
      return uuid.toUpperCase();
    case 'no-hyphens':
      return uuid.replace(/-/g, '');
    case 'lowercase':
    default:
      return uuid.toLowerCase();
  }
};

export const generateUniqueUuids = (count: number, generator: () => string = generateUuidV4) => {
  if (count <= 0) {
    return [];
  }

  const unique = new Set<string>();
  const results: string[] = [];
  const maxAttempts = Math.max(count * 20, 100);
  let attempts = 0;

  while (results.length < count && attempts < maxAttempts) {
    const uuid = generator();
    if (!unique.has(uuid)) {
      unique.add(uuid);
      results.push(uuid);
    }
    attempts += 1;
  }

  return results;
};
