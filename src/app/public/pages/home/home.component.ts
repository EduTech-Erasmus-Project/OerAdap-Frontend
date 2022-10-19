import { Component, OnInit, OnDestroy } from "@angular/core";
import { LanguageService } from "../../../services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LearningObjectService } from "src/app/services/learning-object.service";
import { MetadataInfo } from "src/app/models/MetadataInfo";
import { NumeralPipe } from "ngx-numeral";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  private subscribes: Subscription[] = [];
  public displayModal: boolean;
  public chartOptions: any = {
    responsive: true,
  };
  public data: any;
  public metadataInfo: MetadataInfo;
  public formatted_string: string;

  constructor(
    private languageService: LanguageService,
    private learningObjectService: LearningObjectService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.loadBreadcrumb();
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadBreadcrumb() {
    this.breadcrumbService.setItems([
      {
        label: (await this.languageService.get("menu.home")) || "",
        routerLink: ["/"],
      },
    ]);
  }

  private async loadData() {
    try {
      let res = await this.learningObjectService.getMetadataInfo().toPromise();
      // console.log("res", res);
      this.metadataInfo = res;
      this.loadChart();
    } catch (error) {
      console.log(error);
    }
  }

  public showModalDialog() {
    this.displayModal = true;
  }

  private loadChart() {
    this.data = {
      labels: this.metadataInfo.countries.map((country) => {
        if (country.country === "Private request Api") {
          return "Otros";
        }
        return country.country;
      }),
      datasets: [
        {
          data: this.metadataInfo.countries.map((country) => country.total),
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    };
  }

  toFormat(number) {
    if (number >= 1000) {
      const numeral = new NumeralPipe(number || 0);
      return numeral.format("0.0a");
    } else {
      return number || 0;
    }
  }
}
