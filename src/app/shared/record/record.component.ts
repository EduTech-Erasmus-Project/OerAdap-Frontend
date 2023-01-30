import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  NgAudioRecorderService,
  OutputFormat,
  RecorderState,
} from "ng-audio-recorder";

@Component({
  selector: "app-record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.css"],
})
export class RecordComponent implements OnInit {
  @Output() stopEvent: EventEmitter<File> = new EventEmitter<File>();
  public fileRecord: File;

  public hourRecord: number = 0;
  public minRecord: number = 0;
  public secRecord: number = 0;

  public rec: boolean = false;
  public recording: boolean = false;
  public permis: boolean = true;
  public generateAudio: boolean = false;

  public audioURL: any;
  private interval: any;

  constructor(private audioRecorderService: NgAudioRecorderService) {}

  ngOnInit(): void {}

  public async record() {
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
        if (
          RecorderState.PAUSED != this.audioRecorderService.getRecorderState()
        ) {
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

  public async stopRecord() {
    clearInterval(this.interval);
    this.audioRecorderService
      .stopRecording(OutputFormat.WEBM_BLOB_URL)
      .then(async (output) => {
        //console.log(output)
        this.rec = false;
        this.recording = false;
        this.audioURL = output;
        this.fileRecord = await this.transforBlob(output);
        //evemnto output stream
        this.stopEvent.emit(this.fileRecord);


      })
      .catch((errrorCase) => {
        // Handle Error
        console.log(errrorCase);
      });
  }

  private async transforBlob(ulr: any) {
    try {
      const response = await fetch(ulr);
      const blob = await response.blob();
      const file = new File([blob], "audio/mp3", { type: blob.type });
      return file;
    } catch (error) {
      console.log(error);
    }
  }
}
