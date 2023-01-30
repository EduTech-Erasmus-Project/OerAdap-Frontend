import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Message } from "primeng/api";
import { Subject, Subscription } from "rxjs";
import { LanguageService } from "src/app/services/language.service";
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

  constructor(private videoService: VideoService, private languageService:LanguageService) {}

  ngOnDestroy(): void {
    this.subscrition.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.jsonToString();

    this.showMessageEdit();

    this.onButtonEvt.subscribe((data) => {
      if (data === "save") {
        this.saveTranscript();
        this.acction = "view";
      } else {
        this.acction = data;
        // this.msg = [
        //   {
        //     severity: "warn",
        //     summary: "Advertencia",
        //     detail: "Está en modo de edición del archivo de subtitulo",
        //   },
        // ];
        this.showMessageEdit();
      }
      //this.acction = data;
    });

    
  }

  private async showMessageEdit(){
    this.msg = [
      {
        severity: "warn",
        summary: await this.languageService.get("edit.video.transcript.sumary"),
        detail: await this.languageService.get("edit.video.transcript.editing")//"Está en modo de edición del archivo de subtitulo",
      },
    ];
  }

  async jsonToString() {
    this.displaySubtitle = true;
    this.loaderJson = true;

    let jsonSub = await this.videoService
      .getVidoTranscript(this.transcriptId)
      .subscribe(
        (res: any) => {
          this.jsonString = res.transcript;
          this.loaderJson = false;
        },
        (error) => console.log(error)
      );

    this.subscrition.push(jsonSub);
  }

  async saveTranscript() {
    this.msg = [];

    let jsonSub = await this.videoService
      .updateTranscript(this.transcriptId, {data:this.jsonString})
      .subscribe(async (res: any) => {
        this.msg = [
          {
            severity: "success",
            detail: await this.languageService.get("edit.video.transcript.success")//"Se ha generado los cambios del subtítulo.",
          }
        ];
      }, error => {
        console.log(error);
        this.msg = [
          {
            severity: "error",
            summary: "Error",
            detail: error.error?.message || error.message,
          }
        ];
      });

    this.subscrition.push(jsonSub);
  }
}
