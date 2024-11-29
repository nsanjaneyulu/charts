import { Injectable } from '@angular/core';
//import * as cjs from 'crypto-js';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CipherService {

  //private key!: cjs.lib.WordArray;
  //private iv!: cjs.lib.WordArray;

  private secretKey: string = 'key';

  constructor() {
    //this.key = cjs.enc.Utf8.parse(environment.aes.key.decode("base64", "utf8").decode('hex', 'ascii'));
    //this.iv = cjs.enc.Utf8.parse(environment.aes.vector.decode("base64", "utf8").decode('hex', 'ascii'));
  }

  public encryptData(data: any): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
      return encrypted;
    } catch (e) {
      console.error('Error encrypting data', e);
      return '';
    }
  }

  // Method for decrypting the data
  public decryptData(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      // console.log('bytes', bytes); 
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return encryptedData;
    } catch (e) {
      console.error('Error decrypting data', e);
      return null;
    }
  }

  public encrypt = (plainText: string): string => {
    // try {
    //   const cText = cjs.AES.encrypt(cjs.enc.Utf8.parse(plainText), this.key, { iv: this.iv, mode: cjs.mode.CBC, padding: cjs.pad.ZeroPadding });
    //   return cText.toString().trim();
    // } catch {
    // //   return plainText;
    // }

    return plainText;
  }

  public decrypt = (cipherText: string): string => {
    // try {
    //   const cText = cjs.AES.decrypt(cipherText, this.key, { iv: this.iv, mode: cjs.mode.CBC, padding: cjs.pad.ZeroPadding });
    //   return cjs.enc.Utf8.stringify(cjs.enc.Hex.parse(cText.toString())).trim();
    // } catch {
    //   return cipherText;
    // }
    return cipherText;
  }
}
