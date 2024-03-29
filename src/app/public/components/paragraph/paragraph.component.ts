import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ParagraphService } from "src/app/services/paragraph.service";
import { Paragraph } from "../../../models/Page";
import { Message } from "primeng/api";
import { EventService } from "../../../services/event.service";
import { Subscription } from "rxjs";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-paragraph",
  templateUrl: "./paragraph.component.html",
  styleUrls: ["./paragraph.component.scss"],
})
export class ParagraphComponent implements OnInit, OnDestroy {
  @ViewChild("recordPlayer") recordPlayer: ElementRef;
  @ViewChild("audioDownload") audioDownload: ElementRef;
  @Input() paragraph: Paragraph;

  public edit = false;
  public htmlContent: any;
  public file: File;
  public selectFile: boolean = true;
  public recordAudio: boolean = false;
  public fileRecord: File;

  // public hourRecord: number = 0;
  // public minRecord: number = 0;
  // public secRecord: number = 0;

  // public rec: boolean = false;
  // public recording: boolean = false;
  // public permis: boolean = true;
  public generateAudio: boolean = false;

  public audioURL: any;
  private interval: any;
  public loaderAdapted: boolean = false;
  public audioPreviwe: string;
  public paragraphAdapted: Paragraph;
  public updateParagraph: boolean = false;
  private subscriptions: Subscription[] = [];
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "150px",
    minHeight: "150px",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: false,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    toolbarHiddenButtons: [
      [
        //'undo',
        //'redo',
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "indent",
        "outdent",
        "insertUnorderedList",
        "insertOrderedList",
        "heading",
        "fontName",
      ],
      [
        "fontSize",
        "textColor",
        "backgroundColor",
        "customClasses",
        "link",
        "unlink",
        "insertImage",
        "insertVideo",
        "insertHorizontalRule",
        "removeFormat",
        "toggleEditorMode",
      ],
    ],
  };

  public messages: Message[];

  constructor(
    private paragraphService: ParagraphService,
    private eventService: EventService,
    private languageService: LanguageService
  ) {
    // this.audioRecorderService.recorderError.subscribe((recorderErrorCase) => {
    //   // Handle Error
    //   //console.log("recorderErrorCase", recorderErrorCase);
    // });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    //console.log("paragraph", this.paragraph);
  }

  async onSave() {
    this.messages = [];

    if (this.htmlContent || this.file || this.fileRecord) {
      //console.log("on save", this.file || this.fileRecord);
      this.updateParagraph = true;

      let data: any = {
        text: this.htmlContent || "",
        html_text: this.htmlContent ? `<p>${this.htmlContent}</p>` : "",
        tag_page_learning_object: this.paragraph.id,
        file: this.file || this.fileRecord,
      };

      let paragraphSub = await this.paragraphService
        .tagAdapted(data, this.paragraph.id)
        .subscribe(
          (res: any) => {
            //console.log(res);
            //console.log("respuesta", res);
            this.paragraphAdapted = res.body;
            //console.log(res);
            this.updateParagraph = false;
            this.onCancelSelection();
            this.fileRecord = undefined;
            //this.edit = false;

            if (this.messages.length <= 0) {
              this.showSuccessMessage();
              this.eventService.emitEvent(true);
            }
          },
          (err) => {
            console.log(err);
            this.showErrorMessage(err.error?.message || err.error);
          }
        );
      this.subscriptions.push(paragraphSub);
    }
  }

  private async showSuccessMessage() {
    this.messages.push({
      severity: "success",
      //summary: "Guardado",
      detail: await this.languageService.get("edit.text.messages.success"),
    });
  }

  private showErrorMessage(message: string) {
    this.messages.push({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  onSelect(evt) {
    this.selectFile = true;
    this.file = evt.addedFiles[0];
    //console.log(this.file);
  }
  onRemove() {
    this.file = undefined;
  }

  onRecorAudio() {
    this.selectFile = false;
    this.recordAudio = true;
  }

  onCancelSelection() {
    this.selectFile = true;
    this.recordAudio = false;
    //this.recording = false;
    this.fileRecord = undefined;
    this.onRemove();
  }

  // async record() {
  //   this.rec = !this.rec;
  //   if (this.recording) {
  //     //console.log(this.audioRecorderService.getRecorderState())
  //     if (this.rec) {
  //       this.audioRecorderService.resume();
  //     } else {
  //       this.audioRecorderService.pause();
  //     }
  //   } else {
  //     this.recording = true;
  //     this.audioURL = undefined;
  //     this.secRecord = 0;
  //     this.minRecord = 0;
  //     this.hourRecord = 0;
  //     this.audioRecorderService.startRecording();

  //     this.interval = setInterval(() => {
  //       //console.log("record status", RecorderState.PAUSED)
  //       if (
  //         RecorderState.PAUSED != this.audioRecorderService.getRecorderState()
  //       ) {
  //         this.secRecord += 1;
  //         if (this.secRecord === 60) {
  //           this.secRecord = 0;
  //           this.minRecord += 1;
  //         }
  //         if (this.minRecord === 60) {
  //           this.minRecord = 0;
  //           this.hourRecord += 1;
  //         }
  //         if (this.hourRecord === 24) {
  //           this.stopRecord();
  //         }
  //       }
  //     }, 1000);
  //   }
  // }

  // async stopRecord() {
  //   clearInterval(this.interval);
  //   this.audioRecorderService
  //     .stopRecording(OutputFormat.WEBM_BLOB_URL)
  //     .then(async (output) => {
  //       //console.log(output)
  //       this.rec = false;
  //       this.recording = false;
  //       this.audioURL = output;
  //       this.fileRecord = await this.transforBlob(output);
  //     })
  //     .catch((errrorCase) => {
  //       // Handle Error
  //       console.log(errrorCase);
  //     });
  // }

  // async transforBlob(ulr: any) {
  //   try {
  //     const response = await fetch(ulr);
  //     const blob = await response.blob();
  //     const file = new File([blob], "audio/mp3", { type: blob.type });
  //     return file;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async editParagraph() {
    this.edit = !this.edit;
    ///console.log(this.edit);
    if (this.edit) {
      this.loaderAdapted = true;
      let paragraphSub = await this.paragraphService
        .getTagAdaptedByIdParagraph(this.paragraph.id)
        .subscribe(
          (res: any) => {
            //console.log(res);
            this.paragraphAdapted = res;
            this.loaderAdapted = false;
            this.htmlContent = res.text;
          },
          (err) => {
            //console.log(err);
            this.loaderAdapted = false;
          }
        );
      this.subscriptions.push(paragraphSub);
    }
  }

  public async onGenerateAudio() {
    this.messages = [];
    this.generateAudio = true;
    let convertTextSub = await this.paragraphService
      .convertTextToAudio(this.paragraph.id)
      .subscribe(
        (res: any) => {
          //console.log(res);
          this.paragraphAdapted = res;
          this.showSuccessMessage();
          this.eventService.emitEvent(true);
          this.generateAudio = false;
        },
        (error: any) => {
          this.showErrorMessage(error.error?.message || error.error);
          this.generateAudio = false;
        }
      );
    this.subscriptions.push(convertTextSub);
  }

  public async onChangeRevert() {
    //console.log("revert", this.paragraph.adaptation);

    try {
      this.messages = [];
      let res = await this.paragraphService
        .revertText(this.paragraph.id, {
          adaptation: this.paragraph.adaptation,
        })
        .toPromise();
      this.eventService.emitEvent(true);

      //console.log("update res", res);
    } catch (error) {
      this.showErrorMessage(error.error?.message || error.error);
      this.paragraph.adaptation = !this.paragraph.adaptation;
    }
  }

  public recordFile(evt: any) {
    this.fileRecord = evt;
  }
}
