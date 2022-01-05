import { Component, EventEmitter, Input, OnInit, Output, PlatformRef, StaticProvider } from "@angular/core";
import { LearningObjectService } from "src/app/services/learning-object.service";

import {
  OaDetail,
  FileDetail,
  ConfigAdaptability,
} from "../../../models/LearningObject";

@Component({
  selector: "app-oa-info",
  templateUrl: "./oa-info.component.html",
  styleUrls: ["./oa-info.component.scss"],
})
export class OaInfoComponent implements OnInit {
  @Input() oa_detail: OaDetail;
  @Input() file_detail: FileDetail;
  @Input() config_adaptability: ConfigAdaptability;
  @Input() oa_id:number;
  @Output() eventAdaptabilit:EventEmitter<any> = new EventEmitter();

  //public configs:any[];

  public image: boolean;
  public video: boolean;
  public audio: boolean;
  public button: boolean;
  public paragraph: boolean;
  public navegador : string;
  public checked1: boolean = false;
  public displayResponsive:boolean = false;
  private latitude :any;
  private longitude : any;
  constructor(
    private learningObjectService: LearningObjectService,
  ) {}

  ngOnInit(): void {
    this.image = this.getValueCheck("image");
    this.video = this.getValueCheck("video");
    this.audio = this.getValueCheck("audio");
    this.button = this.getValueCheck("button");
    this.paragraph = this.getValueCheck("paragraph");

    //console.log(this.config_adaptability);
  }

  getValueCheck(value: string) {
    return this.config_adaptability.areas.includes(value);
  }

  get method() {
    if (this.config_adaptability.method === "handbook") {
      return "Manual";
    } else if (this.config_adaptability.method === "automatic") {
      return "Automatica";
    } else if (this.config_adaptability.method === "mixed") {
      return "Mixta";
    }
  }

  onChangeButton() {
    //console.log(this.button);
  }

  private emittEvent(){
    this.eventAdaptabilit.emit({
      image:this.image,
      video:this.video,
      audio:this.audio,
      paragraph:this.paragraph
    });
  }

  showResponsiveDialog(){
    this.displayResponsive = true
  }

 async descargar(){

    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        this. navegador='Edge' 
        break;
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        this. navegador='Opera'
        break;
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        this. navegador='Chrome'
        break;
      case agent.indexOf('trident') > -1:
        this. navegador='Trident'
        break;
      case agent.indexOf('firefox') > -1:
        this. navegador='Firefox'
        break;
      case agent.indexOf('safari') > -1:
        this. navegador='Safari'
        break;
    }

    //this.getLocation()
    this.learningObjectService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
      console.log(this.latitude,this.longitude)
  });

    let answers = {
        browser : this.navegador,
        longitude: this.longitude,
        latitude: this.latitude
    }
    console.log('id'+this.oa_id);
    let paht_download = await this.learningObjectService.getDownloadFileZip(this.oa_id, answers).subscribe(
      response =>{
        console.log(response);
        if(response){
          this.downloadFile(response.path)
          this.displayResponsive=false;
        }
      
      }
    )
  }

  getLocation() {
    this.learningObjectService.getPosition().then(pos => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;
        //console.log(this.latitude,this.longitude)
    });
  }

  downloadFile(data: any) {
    window.open(data);
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
