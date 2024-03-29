import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import * as CryptoJS from "crypto-js";
import { environment } from "../../environments/environment";

const secretKey = environment.cryptoSecretKey;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  saveStorageItem(key: string, value: string) {
    let data = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secretKey
    ).toString();
    //console.log("Value",data)
    //this.cookieService.set(key, data);
    localStorage.setItem(key, data);
  }

  getStorageItem(key: string): string {
    //let cookieValue = this.cookieService.get(key);
    try {
      let storageValue = localStorage.getItem(key);
      let bytes = CryptoJS.AES.decrypt(storageValue, secretKey);
      let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return originalText;
    } catch (error) {
      return null;
    }
  }

  removeStorageItem(key: string): void {
    //this.cookieService.delete(key);
    localStorage.removeItem(key);
  }

  saveCookieItem(key: string, value: string) {
    this.cookieService.set(key, value);
  }
  getCookieItem(key: string): string {
    return this.cookieService.get(key);
  }
  deleteCookieItem(key: string): void {
    this.cookieService.delete(key);
  }
}
