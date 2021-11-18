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

  public edit: boolean = false;
  public editTextArea = false;
  public generate_text = false;
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
  
  async generarTexto(item){
    this.generate_text = true;
    console.log(item.attributes[0].path_src);

    this.answers = {
      tag_page_learning_object: item.id,
      type: 'audio',
      html_text: item.html_text,
      id_ref : item.id_class_ref,
      method:'automatic',
      path_src: item.attributes[0].path_src,
      path_system: item.attributes[0].path_system,
    }

    let generate_text_audio = await this.learningObjectService.sentCreateAudio(this.answers).subscribe(
      response=>{
        console.log('respuesta'+response)
        if(response){
          this.showSuccess('Se genero la descripción del audio con exito')
          this.editTextArea = false;
          this.textEdit = response.text;
          this.item.text =this.textEdit;
          this.generate_text = false;
        }
      },(err)=>{
        this.showError("Error al generar la descripción")
      }
    )
  }
 
  editar() {
    this.editTextArea = true;
  }
  cancel(texto){
    this.editTextArea = false;
    this.textEdit = texto;
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
          this.item.text = this.textEdit
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
        this.item.text = audios.text;
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
