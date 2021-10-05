import { Encrypt } from './Encrypt';

class Affine implements Encrypt {
  private readonly keyA: number;
  private readonly keyB: number;
  private readonly phrase: string;
  private readonly alphabet: string;
  private encrypted: string;
  private decrypted: string;

  constructor(phrase: string, keyA: number, keyB: number, alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    this.phrase = phrase;
    this.keyA = keyA;
    this.keyB = keyB;
    this.alphabet = alphabet;
  }

  private inverseModulo(divider = 0): number {
    while (divider < 26) {
      if ((this.keyA * ++divider) % this.alphabet.length === 1) {
        return divider;
      }
    }

    return -1;
  }

  public encrypt(): this {
    const phrase = this.decrypted ?? this.phrase;

    this.encrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ?
        ' ' : this.alphabet.charAt((this.keyA * this.alphabet.indexOf(letter) + this.keyB) % this.alphabet.length))
      .join('');

    return this;
  }

  public decrypt(): this {
    const phrase = this.encrypted ?? this.phrase;
    const modulo = this.inverseModulo();

    this.decrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ?
        ' ' : this.alphabet.charAt((modulo * (this.alphabet.indexOf(letter) - this.keyB + this.alphabet.length)) % this.alphabet.length))
      .join('');

    return this;
  }
}

console.log(new Affine('Tabanschi Alexandru', 7, 5).encrypt().decrypt());