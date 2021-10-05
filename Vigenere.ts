import { Encrypt } from './Encrypt';

class Vigenere implements Encrypt {
  private readonly phrase: string;
  private readonly alphabet: string;
  private readonly keys: number[];
  private encrypted: string;
  private decrypted: string;

  constructor(phrase: string, keys?: number[], alphabet?: string) {
    this.phrase = phrase;
    this.keys = keys ?? [5, 10, 11, 4, 8];
    this.alphabet = alphabet ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(count: number = 0): this {
    const phrase = this.decrypted ?? this.phrase;

    this.encrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ? ' ' :
        this.alphabet.charAt((this.alphabet.indexOf(letter) + (this.keys[count++] ?? this.keys[count = 0])) % 26))
      .join('');

    return this;
  }

  decrypt(): this {
    return this;
  }
}

console.log(new Vigenere('Buna ziua, IS').encrypt());