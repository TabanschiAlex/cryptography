import { Cipher } from '../lib/Cipher';
import { ConsoleInput } from '../lib/ConsoleInput';

class Caesar implements Cipher {
  private readonly key: number;
  private readonly phrase: string;
  private readonly alphabet: string;
  private encrypted: string;
  private decrypted: string;

  constructor(phrase: string, key: number, alphabet?: string) {
    this.phrase = phrase;
    this.key = key;
    this.alphabet = alphabet ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  public encrypt(): this {
    const phrase = this.decrypted ?? this.phrase;

    this.encrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ? ' ' :
        this.alphabet.charAt((this.alphabet.indexOf(letter) + this.key) % this.alphabet.length))
      .join('');

    return this;
  }

  public decrypt(): this {
    const phrase = this.encrypted ?? this.phrase;

    this.decrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ? ' ' :
        this.alphabet.charAt((this.alphabet.indexOf(letter) - this.key + this.alphabet.length) % this.alphabet.length))
      .join('');

    return this;
  }

  public static run(): Caesar {
    const phrase: string = ConsoleInput.readLine("Introduce phrase: ");
    const key: number = ConsoleInput.readLineNumber("Introduce key: ");
    const alphabet: string = ConsoleInput.readLine("Introduce alphabet(optional): ", true);

    return new Caesar(phrase, key, alphabet).encrypt().decrypt();
  }
}

/*console.log(new Caesar('Tabanschi Alexandru', 5));*/
console.log(Caesar.run());