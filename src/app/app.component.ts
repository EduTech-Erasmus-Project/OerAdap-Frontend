import { Component, ElementRef, OnInit } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { LanguageService } from "./services/language.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  horizontalMenu: boolean;

  darkMode = false;

  menuColorMode = "light";

  menuColor = "layout-menu-light";

  themeColor = "blue";

  layoutColor = "blue";

  ripple = true;

  inputStyle = "outlined";

  constructor(
    private primengConfig: PrimeNGConfig,
    private languageService: LanguageService,
    public el: ElementRef
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    const lang = document.createAttribute("lang");
    lang.value = this.languageService.currentLang;
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(
      lang
    );
  }
}
