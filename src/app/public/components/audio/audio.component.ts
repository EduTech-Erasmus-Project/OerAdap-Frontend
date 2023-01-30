import { Component, Input, OnInit } from "@angular/core";
import { Message } from "primeng/api";
import { Subscription } from "rxjs";
import { AudioService } from "src/app/services/audio.service";
import { EventService } from "src/app/services/event.service";
import { LanguageService } from "src/app/services/language.service";
@Component({
  selector: "app-audio",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"],
})
export class AudioComponent implements OnInit {
  @Input() item: any;

  public edit: boolean = false;
  public editTextArea = false;
  public generate_text = false;
  private textEdit: string;
  public answers: any;

  public messages: Message[] = [];
  private subscriptions: Subscription[] = [];

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

  constructor(
    //     thisprivate learningObjectService: LearningObjectService,
    private eventService: EventService,
    private audioService: AudioService,
    private languageSevice: LanguageService
  ) {}

  ngOnInit(): void {
    this.textEdit = this.item?.text;
  }

  cliclEdit(texto) {
    if (texto == null) {
      return (this.edit = true);
    } else {
      return (this.edit = false);
    }
  }

  async generarTexto(item) {
    this.messages = [];

    this.generate_text = true;
    this.answers = {
      tag_page_learning_object: item.id,
      type: "audio",
      html_text: item.html_text,
      id_ref: item.id_class_ref,
      method: "automatic",
      path_src: item.attributes[0].path_src,
      path_system: item.attributes[0].path_system,
    };

    let generate_text_audio = await this.audioService
      .sentCreateAudio(this.answers)
      .subscribe(
        async (response) => {
          if (response) {
            this.showSuccess(
              await this.languageSevice.get("edit.audio.messages.success")
            );
            this.editTextArea = false;
            this.textEdit = response.text;
            this.item.text = this.textEdit;
            this.generate_text = false;
            this.eventService.emitEvent(true);
          }
        },
        async (err) => {
          console.log(err);
          this.showError("Error, " + (err.error?.message || err.message));
          this.generate_text = false;
          this.editTextArea = false;
        }
      );

    this.subscriptions.push(generate_text_audio);
  }

  editar() {
    this.editTextArea = true;
  }
  cancel(texto) {
    this.editTextArea = false;
    this.textEdit = texto;
  }

  createText() {
    this.editTextArea = true;
  }

  async actualizar() {
    this.messages = [];
    this.answers = {
      text: this.textEdit,
    };
    try {
      let response = await this.audioService
        .updateAudio(this.answers, this.item.id)
        .toPromise();
      if (response) {
        this.textEdit = response.text;
        this.showSuccess(
          await this.languageSevice.get("edit.audio.messages.success")
        );
        this.editTextArea = false;
        this.item.text = this.textEdit;
        this.eventService.emitEvent(true);
      }
    } catch (error) {
      this.showError("Error, " + error.error?.message || error.message);
    }
  }

  async createAudios() {
    this.messages = [];
    this.answers = {
      text: this.textEdit,
      tag_page_learning_object: this.item.id,
      type: "audio",
      html_text: this.item.html_text,
      id_ref: this.item.id_class_ref,
      method: "create",
      path_src: this.item.attributes[0].path_src,
      path_system: this.item.attributes[0].path_system,
    };

    try {
      let audio = await this.audioService
        .sentCreateAudio(this.answers)
        .toPromise();
      if (audio) {
        //console.log(audios)
        this.textEdit = audio.text;
        this.showSuccess(
          await this.languageSevice.get("edit.audio.messages.success")
        );
        this.editTextArea = false;
        this.edit = true;
        this.item.text = audio.text;
        this.eventService.emitEvent(true);
      }
    } catch (err) {
      this.showError(err.error?.message || err.message);
    }
  }

  showError(message) {
    this.messages.push({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  showSuccess(message) {
    this.messages.push({
      severity: "success",
      detail: message,
    });
  }

  public async onChangeRevert() {
    try {
      this.messages = [];
      let res = await this.audioService
        .revertAudio(this.item.id, { adaptation: this.item.adaptation })
        .toPromise();
      this.eventService.emitEvent(true);
    } catch (error) {
      this.showError("Error, " + error.error?.message || error.message);
      this.item.adaptation = !this.item.adaptation;
    }
  }
}
