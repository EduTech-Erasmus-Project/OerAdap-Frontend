import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LearningObjectService } from 'src/app/services/learning-object.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  // public subscribes: Subscription[] = [];
  @Input() item: any;


  public angForm: FormGroup;
  private edit: boolean = false;
  private textAux: string;
  private mensajeID: string;
  public answers: any;

  constructor(
    private learning_ObjectService: LearningObjectService,
    private fb: FormBuilder,
    private messageServicee: MessageService
  ) {
    this.createForm();
  }

  ngOnInit(): void {

    this.angForm.addControl(
      this.item.id,
      new FormControl(this.item.text)
    );
  }

  createForm() {
    this.angForm = this.fb.group({});
  }


  async onSave(item) {

    let new_text_alt = this.angForm.get(item.toString()).value
    this.answers = {
      text: new_text_alt
    }
    let sendDescription = await this.learning_ObjectService.updateImage(this.answers, item).subscribe(response => { 
      if (response) {
        this.showSuccess("Los datos se actualizaron con exito");
        this.item.text =response.text;
        this.angForm.controls[item.toString()].setValue(new_text_alt);
        this.edit = false;
      }
    }, (err) => {
      if (err.status == 304) {
        this.showError('Datos no modificados')
        this.item.text = this.textAux;
        this.angForm.controls[item.toString()].setValue(this.textAux);
        this.edit = false;
      }
    })
  }

  cliclEdit(identificador, texto) {
    //console.log("cliclEdit " + texto);
    this.edit = true;
    this.textAux = texto;
  }

  cancel(item) {
    this.edit = false;
    //console.log("cancel -" + this.angForm.get(item.toString()).value);
    this.angForm.controls[item.toString()].setValue(this.textAux);
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
