import { Cipher } from '../lib/Cipher';
import { ConsoleInput } from '../lib/ConsoleInput';

class Polybius implements Cipher {
  private readonly phrase: string;
  private readonly alphabet: Record<number, string>;
  private encrypted: string;
  private decrypted: string;

  constructor(phrase: string, alphabet?: Record<number, string>) {
    this.phrase = phrase;
    this.alphabet = alphabet ??
      {
        11: 'A',  12: 'B',  13: 'C',  14: 'D',      15: 'E',
        21: 'F',  22: 'G',  23: 'H',  24: '[I/J]',  25: 'K',
        31: 'L',  32: 'M',  33: 'N',  34: 'O',      35: 'P',
        41: 'Q',  42: 'R',  43: 'S',  44: 'T',      45: 'U',
        51: 'V',  52: 'W',  53: 'X',  54: 'Y',      55: 'Z',
      }
  }

  private getKeyByValue(obj, value): string {
    return Object
      .keys(obj)
      .filter(key => obj[key].includes(value))[0];
  }

  private static getPairs(str: string): string[] {
    const result: string[] = [];

    while (str.length) {
      result.push(str.substring(0, 2));
      str = str.slice(2);
    }

    return result;
  }

  public encrypt(): this {
    const phrase = this.decrypted ?? this.phrase;

    this.encrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => this.getKeyByValue(this.alphabet, letter) ?? '  ')
      .join('');

    return this;
  }

  public decrypt(): this {
    const phrase = this.encrypted ?? this.phrase;

    this.decrypted = Polybius.getPairs(phrase.toUpperCase())
      .map(pair => this.alphabet[pair] ?? ' ')
      .join('');

    return this;
  }

  public static run(): Polybius {
    const phrase: string = ConsoleInput.readLine("Introduce phrase: ");
    return new Polybius(phrase).encrypt().decrypt();
  }
}

/*console.log(new Polybius('A sosit timpul').encrypt().decrypt());*/
console.log(Polybius.run());