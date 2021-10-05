class Caesar {
  private readonly key: number;
  private readonly phrase: string;
  private readonly alphabet: string;
  private encrypted: string;
  private decrypted: string;

  constructor(phrase: string, key: number, alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    this.phrase = phrase;
    this.key = key;
    this.alphabet = alphabet;
  }

  public crypt(): this {
    const phrase = this.decrypted ?? this.phrase;

    this.encrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ?
        ' ' : this.alphabet.charAt((this.alphabet.indexOf(letter) + this.key) % this.alphabet.length))
      .join('');

    return this;
  }

  public decrypt(): this {
    const phrase = this.encrypted ?? this.phrase;

    this.decrypted = phrase
      .toUpperCase()
      .split('')
      .map(letter => letter === ' ' ?
          ' ' : this.alphabet.charAt((this.alphabet.indexOf(letter) - this.key + this.alphabet.length) % this.alphabet.length))
      .join('');

    return this;
  }
}

console.log(new Caesar('Tabanschi Alexandru', 5).crypt().decrypt());