import { Component, Input, OnInit } from '@angular/core';
import { MessageService,Message } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';
import { LearningObjectService } from 'src/app/services/learning-object.service';

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

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

  constructor(
    private learningObjectService: LearningObjectService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.textEdit = this.item?.text;
    console.log("all audios", this.item);
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
    //console.log(item.attributes[0].path_src);

    this.answers = {
      tag_page_learning_object: item.id,
      type: "audio",
      html_text: item.html_text,
      id_ref: item.id_class_ref,
      method: "automatic",
      path_src: item.attributes[0].path_src,
      path_system: item.attributes[0].path_system,
    };

    console.log(this.answers);


    let generate_text_audio = await this.learningObjectService
      .sentCreateAudio(this.answers)
      .subscribe(
        (response) => {
          //console.log("respuesta" + response);
          if (response) {
            this.showSuccess("Se genero la descripción del audio con exito");
            this.editTextArea = false;
            this.textEdit = response.text;
            this.item.text = this.textEdit;
            this.generate_text = false;
            this.eventService.emitEvent(true);
          }
        },
        (err) => {
          console.log(err);
          this.showError("Error al generar la descripción: " +(err.error?.message || err.message) );
          this.generate_text = false;
          this.editTextArea = false;
        }
      );
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
      let response = await this.learningObjectService.updateAudio(this.answers, this.item.id).toPromise();
      if (response) {
        this.textEdit = response.text;
        this.showSuccess("Los datos se actualizaron con exito");
        this.editTextArea = false;
        this.item.text = this.textEdit;
        this.eventService.emitEvent(true);
      }
    } catch (error) {
      this.showError("Error al actualizar los datos, " + error.error?.message || error.message);
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

    console.log(this.answers);

    try {
      let audio = await this.learningObjectService.sentCreateAudio(this.answers).toPromise();
      if (audio) {
        //console.log(audios)
        this.textEdit = audio.text;
        this.showSuccess("Los datos se agregaron con exito");
        this.editTextArea = false;
        this.edit = true;
        this.item.text = audio.text;
        this.eventService.emitEvent(true);
      }
    } catch (err) {
      this.showError("Error al guardar los datos, " + err.error?.message || err.message);
    }
  }

  showError(message) {
    this.messages.push({
      severity: "error",
      //summary: "Error",
      detail: message,
    });
  }

  showSuccess(message) {
    this.messages.push({
      severity: "success",
      //summary: "Success",
      detail: message,
    });
  }
}
