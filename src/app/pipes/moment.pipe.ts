import { Pipe, PipeTransform } from "@angular/core";
import { LanguageService } from "../services/language.service";
import * as moment from "moment";

@Pipe({
  name: "moment",
})
export class MomentPipe implements PipeTransform {
  constructor(
    private languageService: LanguageService,
  ) {
    moment.locale(this.languageService.translate.getDefaultLang()+"-us");
  }

  transform(value: any): string {
    return moment(new Date(value)).calendar();
  }
}
