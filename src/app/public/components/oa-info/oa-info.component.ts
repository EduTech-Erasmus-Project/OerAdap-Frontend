import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PlatformRef,
  StaticProvider,
  OnDestroy,
} from "@angular/core";
import { LearningObjectService } from "src/app/services/learning-object.service";
import { LearningObject } from "../../../models/LearningObject";
import { Subscription } from "rxjs";
import { Message, MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-oa-info",
  templateUrl: "./oa-info.component.html",
  styleUrls: ["./oa-info.component.scss"],
})
export class OaInfoComponent implements OnInit, OnDestroy {
  @Input() learningObject: LearningObject;
  @Output() eventAdaptabilit: EventEmitter<any> = new EventEmitter();
  private location: any;

  //public configs:any[];

  public image: boolean;
  public video: boolean;
  public audio: boolean;
  public button: boolean;
  public paragraph: boolean;
  public navegador: string;
  public checked1: boolean = false;
  public displayResponsive: boolean = false;
  private latitude: any;
  private longitude: any;
  public tag_adapted: {};
  private subscription: Subscription[] = [];
  public dounloadState: boolean = false;
  public msgs: Message[];

  public loader: boolean = false;
  private refKey?: string;
  private refId?: number;

  constructor(
    private learningObjectService: LearningObjectService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    //console.log("router", this.activatedRoute?.snapshot?.queryParams);
    let ref = this.activatedRoute?.snapshot?.queryParams?.ref;
    let id = this.activatedRoute?.snapshot?.queryParams?.id;
    if (ref && id) {
      this.refKey = decodeURIComponent(atob(ref));
      this.refId = Number(decodeURIComponent(atob(id)));
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.image = this.getValueCheck("image");
    this.video = this.getValueCheck("video");
    this.audio = this.getValueCheck("audio");
    this.button = this.getValueCheck("button");
    this.paragraph = this.getValueCheck("paragraph");

    //console.log("learningObject", this.learningObject);
  }

  getValueCheck(value: string) {
    return this.learningObject.config_adaptability.areas.includes(value);
  }

  get method() {
    if (this.learningObject.config_adaptability.method === "handbook") {
      return "Manual";
    } else if (this.learningObject.config_adaptability.method === "automatic") {
      return "Automatica";
    } else if (this.learningObject.config_adaptability.method === "mixed") {
      return "Mixta";
    }
  }

  private emittEvent() {
    this.eventAdaptabilit.emit({
      image: this.image,
      video: this.video,
      audio: this.audio,
      paragraph: this.paragraph,
    });
  }

  async showResponsiveDialog() {
    try {
      const agent = window.navigator.userAgent.toLowerCase();
      switch (true) {
        case agent.indexOf("edge") > -1:
          this.navegador = "Edge";
          break;
        case agent.indexOf("opr") > -1 && !!(<any>window).opr:
          this.navegador = "Opera";
          break;
        case agent.indexOf("chrome") > -1 && !!(<any>window).chrome:
          this.navegador = "Chrome";
          break;
        case agent.indexOf("trident") > -1:
          this.navegador = "Trident";
          break;
        case agent.indexOf("firefox") > -1:
          this.navegador = "Firefox";
          break;
        case agent.indexOf("safari") > -1:
          this.navegador = "Safari";
          break;
      }
    } catch (error) {
      this.navegador = "Other";
    }
    this.learningObjectService
      .getPosition()
      .then((pos) => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;
      })
      .catch((error) => {
        console.log(error);
      });

    this.msgs = [];
    if (
      this.learningObject?.config_adaptability.method == "automatic" &&
      !this.learningObject?.complete_adaptation
    ) {
      return;
    }
    let objetos_adaptados = await this.learningObjectService
      .getTagAdapted(this.learningObject.id)
      .subscribe((response) => {
        if (response) {
          this.tag_adapted = response;
          this.displayResponsive = true;
        }
      });
    this.subscription.push(objetos_adaptados);
  }

  // private getPosition(){
  //   this.learningObjectService.getPosition().then((pos) => {
  //     this.latitude = pos.lat;
  //     this.longitude = pos.lng;
  //   });
  // }

  async descargar() {
    this.msgs = [];

    if (this.dounloadState) {
      return;
    }

    this.location = {
      browser: this.navegador,
      longitude: this.longitude,
      latitude: this.latitude,
    };

    this.dounloadState = true;
    let paht_download = await this.learningObjectService
      .getDownloadFileZip(this.learningObject.id, this.location)
      .subscribe(
        (response) => {
          if (response) {
            this.downloadFile(response.path);
            this.displayResponsive = false;
          }
        },
        (error) => {
          console.log(error);

          this.msgs = [
            {
              severity: "error",
              summary: "Error",
              detail:
                "No se pudo descargar el archivo, " + error.error?.message ||
                error.message,
            },
          ];
          this.dounloadState = false;
        }
      );
    this.subscription.push(paht_download);
  }

  downloadFile(data: any) {
    window.open(data);
    this.dounloadState = false;
  }
  onChangeImage() {
    this.emittEvent();
  }
  onChangeVideo() {
    this.emittEvent();
  }
  onChangeAudio() {
    this.emittEvent();
  }
  onChangeParagraph() {
    this.emittEvent();
  }

  public async onSaveROA() {
    try {
      this.loader = true;
      let response = await this.learningObjectService
        .getDownloadFileZip(this.learningObject.id, this.location)
        .toPromise();
      //console.log("Download", response);

      let data = {
        key: this.refKey,
        urlZip: response.path,
        IdOa: this.refId,
        IdOer: this.learningObject.id,
      };
      // console.log("data send ROA", data);
      let resRoa:any = await this.learningObjectService.postROA(data).toPromise();
      console.log("resRoa", resRoa);
      this.messageService.add({
        severity: "success",
        detail: await this.languageService.get(
          "edit.information.messages.successROA"
        ), //"Se ha guardado el archivo en el repositorio.",
      });
      this.loader = false;
      if(resRoa?.data){
        console.log("url ", resRoa?.data?.roa_ref_url);
        window.open(resRoa?.data?.roa_ref_url, "_blank");
      }
    } catch (error) {
      this.loader = false;
      console.log(error);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message || error.message,
      });
    }
  }
}
