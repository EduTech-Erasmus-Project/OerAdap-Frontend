import { Component, OnInit, OnDestroy } from "@angular/core";
import { LanguageService } from "../../../services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public translate: TranslateService;
  public loading: boolean = false;
  private subscribes: Subscription[] = [];
  public displayModal: boolean;

  constructor(
    private languageService: LanguageService,
    private router: Router,
  ) {}
  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.translate = this.languageService.translate;
    this.loadData();
  }

  loadData() {
    // let popularsSub = this.objectService.getPopulars().subscribe((res) => {
    //   this.populars =
    //     res.map((res) => {
    //       return {
    //         ...res.learning_object,
    //         rating: res.rating,
    //       };
    //     }) || [];
    // });
    // this.subscribes.push(popularsSub);
  }

  showModalDialog() {
    this.displayModal = true;
}


}
