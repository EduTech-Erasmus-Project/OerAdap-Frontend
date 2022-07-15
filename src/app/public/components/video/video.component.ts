import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Video, Transcript } from "../../../models/Page";
import { VideoService } from "../../../services/video.service";
import { Subject, Subscription } from "rxjs";
import { Message } from "primeng/api";
import { EventService } from "../../../services/event.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Download } from "src/app/models/Download";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit, OnDestroy {
  @Input() video: Video;

  public displaySubtitle: boolean = false;
  public selectFile: boolean = false;
  public loader: boolean = false;
  public loaderGenerateSubtitle: boolean = false;

  public transcript?: Transcript[];
  //public jsonString: string;
  //public loaderJson: boolean = false;
  public transcriptId: number;
  public onButtonEvt?: Subject<string>;
  public acctionTranscript: string = "view";

  private subscrition: Subscription[] = [];
  public messages: Message[] = [];

  public selectLanguage: any[] = [];

  public form: FormGroup;
  private url?: string;
  private WS: WebSocket;

  public download: Download;

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
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      transcriptions: this.fb.array([]),
    });
    //this.addTranscription();
    //console.log("Instance of video component");
    this.onButtonEvt = new Subject();
  }

  ngOnInit(): void {
    //console.log("video", this.video);
    this.loadTranscript();
    this.messages = [];
    //console.log("video", this.video);
    if (this.video.adapting) {
      this.connectSocket();
    }
  }

  private async connectSocket() {
    // let socket = await this.websocketService.getProgress(this.video.id).subscribe(
    //   (message) => {
    //     console.log("socket message", message);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // this.subscrition.push(socket);
    this.WS = new WebSocket(
      `${environment.serverWs}/adapter/video/progress/${this.video.id}`
    );

    this.WS.onerror = (event) => {
      //console.log("WebSocket error: " + event);
      this.messages.push({
        severity: "error",
        summary: "Error",
        detail: "Error en el socket de video.",
      });
    };
    this.WS.onmessage = (event: any) => {
      let data = JSON.parse(event.data);
      //console.log("WebSocket mesague ", JSON.parse(event.data));
      //this.progress$.next();
      this.download = data;

      if (data.status === "error") {
        this.messages.push({
          severity: "error",
          summary: "Error",
          detail: data.message,
        });
        //this.loaderGenerateSubtitle = false;
        //return;
        this.video.adapting = false;
      }

      if (data.status === "video_not_found") {
        this.messages.push({
          severity: "error",
          summary: "Error",
          detail: "El video no se puede descargar.",
        });
        //this.loaderGenerateSubtitle = false;
        //return;
        this.video.adapting = false;
      }

      //this.video = res.data;
      if (data.status === "ready_tag_adapted") {
        //console.log(res);

        this.messages.push({
          severity: "warn",
          summary: "",
          detail:
            "La fuente de vídeo no soporta o no tiene traducciones pero seguimos desarrollando.",
        });
        this.video.adapting = false;
        this.eventService.emitEvent(true);
      }
      //this.loadTranscript();
      if (data.status === "no_supported_transcript") {
        this.messages.push({
          severity: "warn",
          //summary: "",
          detail: "La fuente de vídeo no soporta o no tiene traducciones.",
        });
        //this.video.adapting = false;
        this.video = data.data;
        this.eventService.emitEvent(true);
      }

      if (data.status === "finished") {
        this.messages.push({
          severity: "success",
          //summary: "Guardado",
          detail: "Se ha generado los subtítulos automáticamente.",
        });
        this.video = data.data;
        this.loadTranscript();
        this.eventService.emitEvent(true);
      }
    };
  }

  ngOnDestroy(): void {
    //console.log("Destroy video component", this.video.id);
    try {
      this.WS.close();
      this.subscrition.forEach((sub) => sub.unsubscribe());
    } catch (error) {}
  }

  get transcriptions() {
    return this.form.get("transcriptions") as FormArray;
  }

  removeTranscription(idx: number) {
    this.transcriptions.removeAt(idx);
  }

  addTranscription() {
    this.transcriptions.push(
      this.fb.group({
        language: [null, Validators.required],
        file: [null, Validators.required],
        file_data: [null],
      })
    );
  }

  async loadTranscript() {
    if (this.video.tags_adapted?.transcript?.length > 0) {
      //console.log("Transcriptions", this.video.tags_adapted?.transcript);

      this.transcript = this.video.tags_adapted.transcript.filter(
        (item: Transcript) => item.type === "text/vtt"
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

  onCancelSelection() {
    this.selectFile = false;
  }

  onGenerateSubtitle() {
    this.messages = [];
    //this.loaderGenerateSubtitle = true;
    let generateSub = this.videoService
      .generateAutomaticTranscript(this.video.id)
      .subscribe(
        (res: any) => {
          if (res.code === "developing") {
            this.messages.push({
              severity: "error",
              summary: "Error",
              detail:
                "La generación de subtitulado automática está en desarrollo.",
            });
            //this.loaderGenerateSubtitle = false;
            return;
          }
          //.log("res video", res);
          this.video = res.data;
          this.connectSocket();
        },
        (error) => {
          console.log(error);
          //this.loaderGenerateSubtitle = false;

          if (error.status === 504) {
            return;
          }

          if (error.status === 500) {
            this.messages.push({
              severity: "error",
              summary: "Error",
              detail:
                "El servidor no está disponible, por favor intente más tarde.",
            });
            return;
          }

          // if (!this.video.adapting) {
          //   this.messages.push({
          //     severity: "error",
          //     summary: "Error",
          //     detail: "El vídeo no está disponible.",
          //   });
          //   this.loaderGenerateSubtitle = false;
          // }

          if (error.status === 400) {
            this.messages.push({
              severity: "error",
              summary: "Error",
              detail: error.error.message,
            });
            return;
          }
        }
      );

    this.subscrition.push(generateSub);
  }
  onAddForSubtitle() {
    //optimizethis.loader = true;
    //console.log("Add subtitle form");
  }

  // async jsonToString(jsonId: any) {
  //   this.displaySubtitle = true;
  //   this.loaderJson = true;

  //   //console.log(jsonId);

  //   let jsonSub = await this.videoService.getVidoTranscript(jsonId).subscribe(
  //     (res: any) => {
  //       //console.log("res video", res);
  //       let text = res.transcript.map((data) => data.transcript);
  //       this.jsonString = text.join("\r\n");
  //       //console.log(res);
  //       this.loaderJson = false;
  //     },
  //     (error) => console.log(error)
  //   );

  //   this.subscrition.push(jsonSub);
  // }

  onChangeLanguage(event) {
    //console.log(event);
  }

  onFileChange(event, idx) {
    //console.log(event)
    if (event.target.files.length > 0) {
      this.transcriptions.at(idx).patchValue({
        file_data: event.target.files[0],
      });
    }
  }

  onSubmit() {
    this.messages = [];
    if (this.form.valid) {
      //console.log("is valid")
      //console.log(this.form);
      this.videoService.addTranscript(this.video.id, this.form.value).subscribe(
        (res: any) => {
          if (res?.body) {
            this.messages.push({
              severity: "success",
              //summary: "Guardado",
              detail: "Se ha guardado el subtítulo.",
            });
            this.video.tags_adapted = res.body;
            this.loadTranscript();
            this.eventService.emitEvent(true);
            this.form.reset();
          }
        },
        (error) => {
          console.log(error);
          this.messages.push({
            severity: "error",
            summary: "Error",
            detail: error.error.message,
          });
        }
      );
    } else {
      this.messages.push({
        severity: "error",
        summary: "Error",
        detail: "Por favor, complete todos los campos.",
      });
    }
  }

  public showTranscript(id: number) {
    this.transcriptId = id;
    this.displaySubtitle = true;
  }

  public emitButtonEvt(event: string) {
    if (event === "save") {
      this.acctionTranscript = "view";
      this.eventService.emitEvent(true);
    } else {
      this.acctionTranscript = event;
    }
    this.onButtonEvt.next(event);
  }
}
