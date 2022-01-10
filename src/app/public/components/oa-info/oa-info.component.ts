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

@Component({
  selector: "app-oa-info",
  templateUrl: "./oa-info.component.html",
  styleUrls: ["./oa-info.component.scss"],
})
export class OaInfoComponent implements OnInit, OnDestroy {
  @Input() learningObject: LearningObject;
  @Output() eventAdaptabilit: EventEmitter<any> = new EventEmitter();

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
  public dounloadState:boolean = false;

  constructor(private learningObjectService: LearningObjectService) {}
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.image = this.getValueCheck("image");
    this.video = this.getValueCheck("video");
    this.audio = this.getValueCheck("audio");
    this.button = this.getValueCheck("button");
    this.paragraph = this.getValueCheck("paragraph");

    //console.log(this.config_adaptability);
    //(this.learningObject);
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

  onChangeButton() {
    //console.log(this.button);
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
    //Servicio de retorno de objetos adaptados
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
          //console.log("response", response);
          this.tag_adapted = response;
          this.displayResponsive = true;
        }
      });
    this.subscription.push(objetos_adaptados);
  }

  async descargar() {
    
    if(this.dounloadState){
      return
    }

    this.dounloadState = true;
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

    //this.getLocation()
    this.learningObjectService.getPosition().then((pos) => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
  });


    let answers = {
      browser: this.navegador,
      longitude: this.longitude,
      latitude: this.latitude,
    };
    //console.log("id" + this.learningObject.id);
    if (this.learningObject.file_download) {
      this.downloadFile(this.learningObject.file_download);
      this.displayResponsive = false;
      return;
    }

    let paht_download = await this.learningObjectService
      .getDownloadFileZip(this.learningObject.id, answers)
      .subscribe((response) => {
        if (response) {
          this.downloadFile(response.path);
          this.displayResponsive = false;

        }
      });
    this.subscription.push(paht_download);
  }

  getLocation() {
    this.learningObjectService.getPosition().then((pos) => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
      //console.log(this.latitude,this.longitude)
    });
  }

  downloadFile(data: any) {
    window.open(data);
    this.dounloadState = false;
  }
  onChangeImage() {
    //console.log(this.image);
    this.emittEvent();
  }
  onChangeVideo() {
    //console.log(this.video);
    this.emittEvent();
  }
  onChangeAudio() {
    //console.log(this.audio);
    this.emittEvent();
  }
  onChangeParagraph() {
    //console.log(this.paragraph);
    this.emittEvent();
  }
}
