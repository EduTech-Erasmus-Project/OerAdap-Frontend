import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { LearningObjectService } from 'src/app/services/learning-object.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ImageComponent implements OnInit {
  // public subscribes: Subscription[] = [];
  @Input() item: any;


  public angForm: FormGroup;
  public edit: boolean = false;
  private textAux: string;
  private textAux_Edit: string;
  private mensajeID: string;
  public answers: any;
  public url: any;
  public displayModal: boolean;
  public flag_text_table: boolean = false;

  title = 'Tets-table';
  config = {
    toolbar: ['insertTable'],
    language: 'es'
  }

  public table_result: string = '';
  public Editor = ClassicEditor;


  constructor(
    private learning_ObjectService: LearningObjectService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.item.text_table) {
      this.table_result = this.item.text_table
      this.flag_text_table = true;
    }
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
      text: new_text_alt,
      method: 'img-alt'
    }
    let sendDescription = await this.learning_ObjectService.updateImage(this.answers, item).subscribe(response => {
      if (response) {
        this.showSuccess("Los datos se actualizaron con exito");
        this.item.text = response.text;
        this.angForm.controls[item.toString()].setValue(new_text_alt);
        this.edit = false;
        this.eventService.emitEvent(true);
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
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  showSuccess(message) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  }

  cancelGenerate() {
    this.displayModal = false;
    this.table_result = this.textAux_Edit
  }

  showModalDialog() {
    this.displayModal = true;
    this.flag_text_table = false;
  }

  async confirm(event: Event, id) {
    console.log("evt" + this.table_result)
    this.confirmationService.confirm({
      target: event.target,
      message: 'Esta seguro que desea guardar los cambios ?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        if (this.flag_text_table == false) {
          console.log('Se crea')
          //Aceptar primera añadir tabla
          this.answers = {
            text_table: this.table_result,
            method: 'transform-table'
          }
          let sendDescription = await this.learning_ObjectService.updateImage(this.answers, id).subscribe(response => {
            if (response) {

              this.item.text_table = response.text_table
              this.eventService.emitEvent(true);
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Su tabla se a creado' });
              this.displayModal = false;
              this.flag_text_table = true;

            }
          }, (err) => {
            if (err.status == 304) {
              this.showError('Datos no modificados')
            }
          })
        } else if (this.flag_text_table == true) {
          //editar tabla la segunda
          this.answers = {
            text_table: this.table_result,
            method: 'update-table'
          }
          let sendDescription = await this.learning_ObjectService.updateImage(this.answers, id).subscribe(response => {
            if (response) {

              this.eventService.emitEvent(true);
              this.displayModal = false;
              this.item.text_table = response.text_table;

              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Has aceptado' });
            }
          }, (err) => {
            if (err.status == 304) {
              this.showError('Datos no modificados')
            }
          })
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  showModalDialogEdit() {
    this.displayModal = true;

    this.textAux_Edit = this.table_result;

    this.flag_text_table = true;
  }

}
