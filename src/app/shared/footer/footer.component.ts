import { Component, OnInit } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public languages: any[];
  public language: string;
  public currentYear: number;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languages = [
      { name: "Español", code: "es" },
      { name: "Ingles", code: "en" },
    ];
    this.currentYear = new Date().getFullYear();
    this.language = this.languageService.currentLang;
  }

  onChangLanguage(event) {
    //console.log(event.target?.value);
    this.languageService.setTranslate(event.target.value);
  }
}
