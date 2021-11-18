import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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

  public checked1: boolean = false;
  public displayResponsive:boolean = false;
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

    let paht_download = await this.learningObjectService.getDownloadFileZip(this.oa_id).subscribe(
      response =>{
        console.log(response);
        if(response){
          this.downloadFile(response.path)
          this.displayResponsive=false;
        }
      
      }
    )
  }
  downloadFile(data: any) {
    console.log(data)
    /*const blob = new Blob([data], {
      type: "application/zip"
    });*/
    //const url = window.URL.createObjectURL(blob);

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
