export interface Cipher {
  encrypt(): this;
  decrypt(): this;
}