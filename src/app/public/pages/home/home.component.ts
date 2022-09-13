import { Component, OnInit, OnDestroy } from "@angular/core";
import { LanguageService } from "../../../services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LearningObjectService } from "src/app/services/learning-object.service";
import { MetadataInfo } from "src/app/models/MetadataInfo";

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
  public chartOptions: any= {
    responsive: true,
    // legend: {
    //   display: true,
    //   position: "right",
    // },
    
  };;
  public data: any;
  public metadataInfo:MetadataInfo;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private learningObjectService:LearningObjectService
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

  private loadChart(){
    this.data = {
      labels: this.metadataInfo.countries.map((country) => {
        if(country.country === "Private request Api"){
          return "Otros";
        }
        return country.country;
      }),
      datasets: [
          {
              data: this.metadataInfo.countries.map((country) => country.total),
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };
  }
}
