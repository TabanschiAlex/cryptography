import { Cipher } from '../lib/Cipher';
import { ConsoleInput } from '../lib/ConsoleInput';

class Vigenere implements Cipher {
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
        this.alphabet.charAt((this.alphabet.indexOf(letter) + (this.keys[count++] ?? this.keys[count = 0])) % this.alphabet.length))
      .join('');

    return this;
  }

  decrypt(count: number = 0): this {
    const phrase = this.encrypted ?? this.phrase;

    this.decrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ? ' ' :
        this.alphabet.charAt((this.alphabet.indexOf(letter) - (this.keys[count++] ?? this.keys[count = 0]) + this.alphabet.length) % this.alphabet.length))
      .join('');

    return this;
  }

  public static run(): Vigenere {
    const phrase: string = ConsoleInput.readLine("Introduce phrase: ");
    const key: number[] = ConsoleInput.readLine("Introduce key: ").split(',').map(el => +el);
    const alphabet: string = ConsoleInput.readLine("Introduce alphabet(optional): ", true);

    return new Vigenere(phrase, key, alphabet).encrypt().decrypt();
  }
}

/*console.log(new Vigenere('Buna ziua, IS').encrypt());*/
console.log(Vigenere.run());