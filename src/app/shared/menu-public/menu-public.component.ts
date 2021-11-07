import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PublicComponent } from "../../public/public.component";
import { Router, NavigationExtras } from "@angular/router";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-menu-public",
  templateUrl: "./menu-public.component.html",
  styleUrls: ["./menu-public.component.scss"],
})
export class MenuPublicComponent implements OnInit {
  public translate: TranslateService;
  public tieredItems: any;
  public activeItem: number;
  public selectedCountry: string;
  public countries: any[];
  public loged: boolean;
  //private queryParams: QuerySearch = {};

  constructor(
    public appMain: PublicComponent,
    private languageService: LanguageService,
    private router: Router
  ) {
    // if (
    //   this.loginService.user?.administrator ||
    //   this.loginService.validateRole("superuser")
    // ) {
    //   this.router.navigateByUrl("/admin");
    // }
  }

  ngOnInit(): void {
    this.translate = this.languageService.translate;
    this.loadMenu();
  }

  loadMenu() {
    //this.translate.onLangChange.subscribe((translate: LangChangeEvent) => {
    this.tieredItems = [
      {
        label: "Inicio", //translate.translations.menu.home,
        routerLink: "/",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "Adaptador", //translate.translations.menu.services,
        routerLink: "adapter",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "API", //translate.translations.menu.contact,
        routerLink: "#",
        routerLinkActiveOptions: {
          exact: true,
          //styleClass: "active",
        },
      },
      {
        label: "Información", //translate.translations.menu.contact,
        routerLink: "information",
        routerLinkActiveOptions: {
          exact: true,
          //styleClass: "active",
        },
      },
      {
        label: "Quiénes Somos", //translate.translations.menu.aboutUs,
        routerLink: "about-us",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "Contacto",
        routerLink: "contact",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
    ];
    //});
    // console.log("user menu");
    // if (this.loginService.validateRole("student")) {
    //   this.tieredItems.push({
    //     label: "Recomendados",
    //     routerLink: "recommended",
    //     routerLinkActiveOptions: {
    //       exact: true,
    //       styleClass: "",
    //     },
    //   });
    // }
  }

  mobileMegaMenuItemClick(index) {
    this.appMain.megaMenuMobileClick = true;
    this.activeItem = this.activeItem === index ? null : index;
  }
}
