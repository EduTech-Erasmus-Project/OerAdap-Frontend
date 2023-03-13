import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Video, Transcript } from "../../../models/Page";
import { VideoService } from "../../../services/video.service";
import { Subject, Subscription } from "rxjs";
import { Message } from "primeng/api";
import { EventService } from "../../../services/event.service";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { Download } from "src/app/models/Download";
import { LanguageService } from "src/app/services/language.service";

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
  public transcriptId: number;
  public onButtonEvt?: Subject<string>;
  public acctionTranscript: string = "view";
  private subscrition: Subscription[] = [];
  public messages: Message[] = [];
  public selectLanguage: any[] = [];
  public form: UntypedFormGroup;
  private WS: WebSocket;
  public download: Download;
  public messageDownload?: string;

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
    private fb: UntypedFormBuilder,
    private languageService: LanguageService
  ) {
    this.form = this.fb.group({
      transcriptions: this.fb.array([]),
    });
    this.onButtonEvt = new Subject();
  }

  ngOnInit(): void {
    this.loadTranscript();
    this.messages = [];
    if (this.video.adapting) {
      this.connectSocket();
    }
  }

  private async connectSocket() {
    this.WS = new WebSocket(
      `${environment.serverWs}/adapter/video/progress/${this.video.id}`
    );

    this.WS.onerror = async (event) => {
      //console.log("WebSocket error: ", typeof(event), event);
      this.messages.push({
        severity: "error",
        summary: "Error",
        detail: await this.languageService.get("edit.video.messages.msgError1"), //"Error en el socket de video.",
      });
    };
    this.WS.onmessage = async (event: any) => {
      let data = JSON.parse(event.data);
      this.download = data;
      if(data.type === "video" && data.status === "downloading"){
        this.messageDownload = await this.languageService.get("edit.video.socket.msg1"); 
      }
      if(data.type === "video" && data.status === "video_finished"){
        this.messageDownload = await this.languageService.get("edit.video.socket.msg2"); 
      }
      if(data.type === "video" && data.status === "process"){
        this.messageDownload = await this.languageService.get("edit.video.socket.msg3"); 
      }
      if(data.type === "transcript" && data.status === "downloading"){
        this.messageDownload = await this.languageService.get("edit.video.socket.msg4"); 
      }
      if (data.status === "error") {
        this.messages.push({
          severity: "error",
          summary: "Error",
          detail: data.message,
        });
        this.video.adapting = false;
      }

      if (data.status === "video_not_found") {
        this.messages.push({
          severity: "error",
          summary: "Error",
          detail: await this.languageService.get(
            "edit.video.messages.msgError4"
          ),
        });
        this.video.adapting = false;
      }
      if (data.status === "ready_tag_adapted") {
        this.messages.push({
          severity: "warn",
          summary: "",
          detail: await this.languageService.get(
            "edit.video.messages.msgError6"
          ),
        });
        this.video.adapting = false;
        this.eventService.emitEvent(true);
      }
      if (data.status === "no_supported_transcript") {
        this.messages.push({
          severity: "warn",
          detail: await this.languageService.get(
            "edit.video.messages.msgError6"
          ),
        });
        this.video = data.data;
        this.eventService.emitEvent(true);
      }
      if (data.status === "finished") {
        this.messages.push({
          severity: "success",
          detail: await this.languageService.get(
            "edit.video.messages.msgSuccess1"
          ),
        });
        this.video = data.data;
        this.loadTranscript();
        this.eventService.emitEvent(true);
      }
    };
  }

  ngOnDestroy(): void {
    try {
      this.WS.close();
      this.subscrition.forEach((sub) => sub.unsubscribe());
    } catch (error) {}
  }

  get transcriptions() {
    return this.form.get("transcriptions") as UntypedFormArray;
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
    let generateSub = this.videoService
      .generateAutomaticTranscript(this.video.id)
      .subscribe(
        async (res: any) => {
          if (res.code === "developing") {
            this.messages.push({
              severity: "error",
              summary: "Error",
              detail: await this.languageService.get(
                "edit.video.messages.msgError3"
              ),
            });
            return;
          }
          this.video = res.data;
          this.connectSocket();
        },
        (error) => {
          console.log(error);
          if (error.status) {
            this.messages.push({
              severity: "error",
              summary: "Error",
              detail: error.error?.message || error.message,
            });
            return;
          }
        }
      );
    this.subscrition.push(generateSub);
  }

  onFileChange(event, idx) {
    if (event.target.files.length > 0) {
      this.transcriptions.at(idx).patchValue({
        file_data: event.target.files[0],
      });
    }
  }

  public async onSubmit() {
    this.messages = [];
    if (this.form.valid) {
      this.videoService.addTranscript(this.video.id, this.form.value).subscribe(
        async (res: any) => {
          if (res?.body) {
            this.messages.push({
              severity: "success",
              detail: await this.languageService.get(
                "edit.video.messages.msgSuccess2"
              ),
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
            detail: error.error?.message || error.message,
          });
        }
      );
    } else {
      this.messages.push({
        severity: "error",
        summary: "Error",
        detail: await this.languageService.get("edit.video.messages.msgError2"),
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

  public async onChangeRevert() {
    try {
      this.messages = [];
      let res = await this.videoService
        .revertVideo(this.video.id, { adaptation: this.video.adaptation })
        .toPromise();
      this.eventService.emitEvent(true);
    } catch (error) {
      this.messages.push({
        severity: "error",
        summary: "Error",
        detail: error.error?.message || error.message,
      });
      this.video.adaptation = !this.video.adaptation;
    }
  }
}
