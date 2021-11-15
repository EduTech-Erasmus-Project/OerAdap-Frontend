import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LearningObjectService } from 'src/app/services/learning-object.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @Input() item: any;

  private edit: boolean = false;
  private editTextArea = false;
  private textEdit : string;
  public answers: any;

  constructor(private learningObjectService:LearningObjectService,
    private messageServicee: MessageService
    ) { }

  ngOnInit(): void {
    this.textEdit = this.item.text;
  }

  cliclEdit(texto) {
    if (texto == null) {
      return this.edit = true;
    } else {
      return this.edit = false;
    }
  }
  editar() {
    this.editTextArea = true;
  }
  cancel(){
    this.editTextArea = false;
  }

  createText(){
    this.editTextArea = true;
  }
 async actualizar(){
  
    this.answers = {
      text: this.textEdit,
    }
    let updateAudio = await this.learningObjectService.updateAudio(this.answers, this.item.id).subscribe(response => {
      if(response){
        this.textEdit = response.text;
          this.showSuccess("Los datos se actualizaron con exito");
          this.editTextArea = false;
      }
    }, (err) => {
      if (err.status == 304) {
        this.showError('Datos no modificados')
      }
    })
  }

  async createAudios(){
    this.answers = {
      text: this.textEdit,
      tag_page_learning_object: this.item.id,
      type: 'audio',
      html_text: this.item.html_text,
      id_ref : this.item.id_class_ref,
      method:'create'
    }

    let sendAudios = await this.learningObjectService.sentCreateAudio(this.answers).subscribe(audios => {
      if(audios){
        //console.log(audios)
        this.textEdit = audios.text;  
        this.showSuccess("Los datos se agregaron con exito");
        this.editTextArea = false;
        this.edit = true;
      }
    },(err)=>{
      this.showError("Error al guardar los datos")
    })
   
  }

  
  showError(message) {
    this.messageServicee.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  showSuccess(message) {
    this.messageServicee.add({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  }

}
