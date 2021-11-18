import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Video, Transcript } from "../../../models/Page";
import { VideoService } from "../../../services/video.service";
import { Subscription } from "rxjs";
import { error } from "@angular/compiler/src/util";
import { map } from "rxjs/operators";
import { Message, MessageService } from "primeng/api";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit, OnDestroy {
  @Input() video: Video;

  public displaySubtitle: boolean;
  public selectFile: boolean = false;
  public loader: boolean = false;
  public loaderGenerateSubtitle: boolean = false;

  public transcript?: Transcript[];
  public jsonString: string;
  public loaderJson: boolean = false;

  private subscrition: Subscription[] = [];
  public messages: Message[] = [];

  public language = [
    { name: "Alemán", code: "de" },
    { name: "Español", code: "es" },
    { name: "Francés", code: "fr" },
    { name: "Holandés", code: "nl" },
    { name: "Húngaro", code: "hu" },
    { name: "Ingles", code: "en" },
    { name: "Italiano", code: "it" },
    { name: "Portugués", code: "pt" },
    { name: "Ruso", code: "ru" },
    //{ name: "Otros", code: "Other" },
  ];

  public selectedCity1?: any;

  constructor(
    private videoService: VideoService,
    private messageService: MessageService
  ) {}
  ngOnDestroy(): void {
    this.subscrition.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadTranscript();
    this.messages = [];
  }

  async loadTranscript() {
    if (this.video.tags_adapted?.transcript?.length > 0) {
      this.transcript = this.video.tags_adapted.transcript.filter(
        (item: Transcript) => item.type === "JSONcc"
      );
    }
  }

  stopVideo() {
    var iframe = document.querySelector("iframe");
    var video = document.querySelector("video");
    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if (video) {
      video.pause();
    }
  }

  functionLoad() {
    //console.log("load");
  }

  onCancelSelection() {
    this.selectFile = false;
  }

  onGenerateSubtitle() {
    this.messages = [];
    this.loaderGenerateSubtitle = true;
    let generateSub = this.videoService
      .generateAutomaticTranscript(this.video.id)
      .subscribe(
        (res: any) => {
          if (res.status === "ready_tag_adapted") {
            //console.log(res);

            this.messages.push({
              severity: "warn",
              summary: "",
              detail:
                "La fuente de vídeo no soporta o tiene traducciones pero seguimos desarrollando.",
            });
          } else {
            this.video.tags_adapted = res;
            this.loadTranscript();

            if (res.code === "no_suported_transcript") {
              this.messages.push({
                severity: "warn",
                //summary: "",
                detail: "La fuente de vídeo no soporta tiene traducciones.",
              });
            } else {
              this.messages.push({
                severity: "success",
                //summary: "Guardado",
                detail: "Se ha generado los subtítulos automáticamente.",
              });
            }
          }

          this.loaderGenerateSubtitle = false;
        },
        (error) => {
          //console.log(error);
          this.messages.push({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
          this.loaderGenerateSubtitle = false;
        }
      );

    this.subscrition.push(generateSub);
  }
  onAddForSubtitle() {
    this.loader = true;
  }
  onRemoveForSubtitle(idx: number) {}

  async jsonToString(jsonId: any) {
    this.displaySubtitle = true;
    this.loaderJson = true;

    //console.log(jsonId);

    let jsonSub = await this.videoService.getVidoTranscript(jsonId).subscribe(
      (res: any) => {
        //console.log(res)
        let text = res.transcript.map((data) => data.text);
        this.jsonString = text.join(" ");
        this.loaderJson = false;
      },
      (error) => console.log(error)
    );

    this.subscrition.push(jsonSub);
  }
}
