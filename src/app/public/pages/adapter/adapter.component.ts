import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { LearningObjectService } from '../../../services/learning-object.service';

@Component({
  selector: "app-adapter",
  templateUrl: "./adapter.component.html",
  styleUrls: ["./adapter.component.scss"],
})
export class AdapterComponent implements OnInit {
  public file?: File;
  public progress: number = 0;
  public upload: boolean = false;
  public loader:boolean = false;

  constructor(private messageService: MessageService,private learningObjectService:LearningObjectService) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    this.file = event.addedFiles[0];
  }

  onRemove() {
    //console.log(event);
    //this.files.splice(this.files.indexOf(event), 1);
    this.file = undefined;
  }

  onUpload() {
    this.loader = true;
    this.learningObjectService.uploadObject(this.file).subscribe((res:any)=>{

      console.log(res)
      
      if (res.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * res.loaded / res.total);
      } else if (res instanceof HttpResponse) {
        
        this.upload = true;
      }
     
    }, err =>{
      console.log(err)
      this.upload = false;
      this.loader = false;
      this.progress = 0;
    })
  }
}
