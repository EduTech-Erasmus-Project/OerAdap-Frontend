import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Message } from "primeng/api";
import { Subject, Subscription } from "rxjs";
import { VideoService } from "src/app/services/video.service";

@Component({
  selector: "app-edit-transcript",
  templateUrl: "./edit-transcript.component.html",
  styleUrls: ["./edit-transcript.component.scss"],
})
export class EditTranscriptComponent implements OnInit, OnDestroy {
  @Input() transcriptId: number;
  @Input() onButtonEvt?: Subject<string>;

  public loaderJson: boolean = false;
  public displaySubtitle: boolean = false;
  public jsonString: string;
  public acction = "view";
  private subscrition: Subscription[] = [];
  public msg: Message[];

  //public

  constructor(private videoService: VideoService) {}

  ngOnDestroy(): void {
    this.subscrition.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    //console.log("id", this.transcriptId);
    this.jsonToString();

    this.onButtonEvt.subscribe((data) => {
      //console.log("data", data);
      if (data === "save") {
        this.saveTranscript();
        this.acction = "view";
      } else {
        this.acction = data;
        this.msg = [
          {
            severity: "warn",
            summary: "Advertencia",
            detail: "Está en modo de edición del archivo de subtitulo",
          },
        ];
      }
      //this.acction = data;
    });

    
  }

  async jsonToString() {
    this.displaySubtitle = true;
    this.loaderJson = true;

    //console.log(jsonId);

    let jsonSub = await this.videoService
      .getVidoTranscript(this.transcriptId)
      .subscribe(
        (res: any) => {
          //console.log("res transcript", res);

          // let text = res.transcript.map((data) => data.transcript);
          this.jsonString = res.transcript;
          // //console.log(res);
          this.loaderJson = false;
        },
        (error) => console.log(error)
      );

    this.subscrition.push(jsonSub);
  }

  async saveTranscript() {
    //this.loaderJson = true;
    //console.log("Send data");
    this.msg = [];

    let jsonSub = await this.videoService
      .updateTranscript(this.transcriptId, {data:this.jsonString})
      .subscribe((res: any) => {
        //console.log("res update transcript", res);
        //this.loaderJson = false;
        this.msg = [
          {
            severity: "success",
            //summary: "Guardado",
            detail: "Se ha generado los cambios del subtítulo.",
          }
        ];
      }, error => {
        console.log(error);
        this.msg = [
          {
            severity: "error",
            //summary: "Error",
            detail: "No se ha podido guardar los cambios del subtítulo.",
          }
        ];
      });

    this.subscrition.push(jsonSub);
  }
}
