import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PublicComponent } from "../../public/public.component";
import { Router } from "@angular/router";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-menu-public",
  templateUrl: "./menu-public.component.html",
  styleUrls: ["./menu-public.component.scss"],
})
export class MenuPublicComponent implements OnInit {
  public tieredItems: any;
  public activeItem: number;
  public selectedCountry: string;
  public countries: any[];
  public loged: boolean;
  //private queryParams: QuerySearch = {};

  constructor(
    public appMain: PublicComponent,
    private languageService: LanguageService,
    private router: Router,

  ) {
    // if (
    //   this.loginService.user?.administrator ||
    //   this.loginService.validateRole("superuser")
    // ) {
    //   this.router.navigateByUrl("/admin");
    // }
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  async loadMenu() {
    //console.log("menu", this.languageService.translate.currentLang);
    //this.translate.onLangChange.subscribe((translate: LangChangeEvent) => {
    this.tieredItems = [
      {
        label: await this.languageService.get("menu.home") || "",
        routerLink: "/",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: await this.languageService.get("menu.adapter") || "", //"Adaptador",
        routerLink: "adapter",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      // {
      //   label: "API", //translate.translations.menu.contact,
      //   routerLink: "api-doc",
      //   routerLinkActiveOptions: {
      //     exact: true,
      //     //styleClass: "active",
      //   },
      // },
      
      {
        label: await this.languageService.get("menu.about") || "", //"Quiénes Somos", 
        routerLink: "about-us",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: await this.languageService.get("menu.contact") || "",//"Contacto",
        routerLink: "contact",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: await this.languageService.get("menu.guide") || "",//"Guia de Usuario",
        routerLink: "guide",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
    ];
  }

  mobileMegaMenuItemClick(index) {
    this.appMain.megaMenuMobileClick = true;
    this.activeItem = this.activeItem === index ? null : index;
  }
}
