import { Pipe, PipeTransform } from "@angular/core";
import { LanguageService } from "../services/language.service";
import * as moment from "moment";

@Pipe({
  name: "moment",
})
export class MomentPipe implements PipeTransform {
  //private moment:any;

  constructor(
    private languageService: LanguageService,
  ) {
    moment.locale("es-us");
  }

  transform(value: any): string {
    return moment(new Date(value)).calendar();
  }
}
