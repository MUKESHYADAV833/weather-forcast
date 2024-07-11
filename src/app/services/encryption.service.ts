import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }
  encryptData(data: string): string {
    const key = environment.encryptionKey;
    const iv = uuidv4();
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return `${iv}:${cipher.toString()}`;
  }

  decryptData(encryptedData: string): string {
    const key = environment.encryptionKey;

    // Split IV and ciphertext
    const parts = encryptedData.split(':');
    const iv = parts[0];
    const ciphertext = parts[1];

    // Convert iv to WordArray
    const parsedIv = CryptoJS.enc.Utf8.parse(iv);

    // Decrypt ciphertext
    const decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
      iv: parsedIv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    console.log(decrypted.toString(CryptoJS.enc.Utf8))
    // Convert decrypted data to Utf8 string
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
