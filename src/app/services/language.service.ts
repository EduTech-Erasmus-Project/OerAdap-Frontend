import { Injectable } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import * as moment from "moment";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(
    private translateService: TranslateService,
    private storageService: StorageService
  ) {
    translateService.addLangs(["es", "en"]);
    translateService.setDefaultLang(this.storageService.getStorageItem("language") || "es");
    moment.locale("es-us");
  }

  public get translate(): TranslateService {
    return this.translateService;
  }

  public get momentjs() {
    return moment;
  }

  public setTranslate(code: string) {
    this.translateService.use(code);
    this.storageService.saveStorageItem("language", code);
    window.location.reload();
  }

  public onLangChange() {
    return this.translateService.onLangChange;
  }

  public async get(key: string) {
    try {
      let res = await this.translateService.get(key).toPromise();
      return res;
    } catch (error) {
      return null;
    }
  }

  public get currentLang() {
    return this.storageService.getStorageItem("language") || "es";
  }
}
