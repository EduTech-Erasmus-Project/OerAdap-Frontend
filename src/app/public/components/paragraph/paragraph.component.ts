import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgAudioRecorderService, OutputFormat, RecorderState } from "ng-audio-recorder";
import { v4 as uuidv4 } from "uuid";

declare var MediaRecorder: any;

@Component({
  selector: "app-paragraph",
  templateUrl: "./paragraph.component.html",
  styleUrls: ["./paragraph.component.scss"],
})
export class ParagraphComponent implements OnInit {
  @ViewChild("recordPlayer") recordPlayer: ElementRef;
  @ViewChild("audioDownload") audioDownload: ElementRef;

  public edit = false;
  public htmlContent: any;
  public file: File;
  public selectFile: boolean = true;
  public recordAudio: boolean = false;
  public fileRecord: File;

  public hourRecord: number = 0;
  public minRecord: number = 0;
  public secRecord: number = 0;

  public rec: boolean = false;
  public recording: boolean = false;

  public permis: boolean = true;
  // public permisText: string;

  public audioURL: any;

  private interval:any;

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
        //'bold',
        //'italic',
        //'underline',
        "strikeThrough",
        "subscript",
        "superscript",
        //'justifyLeft',
        //'justifyCenter',
        //'justifyRight',
        //'justifyFull',
        //'indent',
        //'outdent',
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

  constructor(private audioRecorderService: NgAudioRecorderService) {
    this.audioRecorderService.recorderError.subscribe((recorderErrorCase) => {
      // Handle Error
      console.log("recorderErrorCase", recorderErrorCase);
    });
  }

  ngOnInit(): void {}

  onSave() {
    this.edit = false;
  }

  onSelect(evt) {
    this.selectFile = true;
    this.file = evt.addedFiles[0];
    console.log(this.file);
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
    this.recording = false;
    this.onRemove();
  }

  async record() {
    this.rec = !this.rec;
    if (this.recording) {
      //console.log(this.audioRecorderService.getRecorderState())
      if (this.rec) {
        this.audioRecorderService.resume();
      } else {
        this.audioRecorderService.pause();
      }
    } else {
      this.recording = true;
      this.audioURL = undefined;
      this.secRecord = 0;
      this.minRecord = 0;
      this.hourRecord = 0;
      this.audioRecorderService.startRecording();

      this.interval = setInterval(() => {

        //console.log("record status", RecorderState.PAUSED)
       if(RecorderState.PAUSED != this.audioRecorderService.getRecorderState()){
        this.secRecord += 1;
        if (this.secRecord === 60) {
          this.secRecord = 0;
          this.minRecord += 1;
        }
        if (this.minRecord === 60) {
          this.minRecord = 0;
          this.hourRecord += 1;
        }
        if (this.hourRecord === 24) {
          this.stopRecord();
        }
       }
      }, 1000);
    }
  }

  async stopRecord() {
    clearInterval(this.interval);
    this.audioRecorderService
      .stopRecording(OutputFormat.WEBM_BLOB_URL)
      .then((output) => {
        //console.log(output)
        this.rec = false;
        this.recording = false;
        this.audioURL = output;
      })
      .catch((errrorCase) => {
        // Handle Error
        console.log(errrorCase);
      });
  }

  async transforBlob(ulr: any) {
    try {
      const response = await fetch(ulr);
      const blob = await response.blob();
      const file = new File([blob], "audio/webm", { type: blob.type });
      return file;
    } catch (error) {
      console.log(error);
    }
  }
}
