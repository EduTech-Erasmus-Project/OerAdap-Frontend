
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { LearningObjectService } from 'src/app/services/learning-object.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class ImageComponent implements OnInit, OnDestroy {
  private subscribes: Subscription[] = [];
  @Input() item: any;

  public angForm: FormGroup;
  public edit: boolean = false;
  private textAux: string;
  public answers: any;

  public url: any;
  public generateTableDinamic: boolean = false;
  public displayModal: boolean;
  public activeButtons: boolean = false;
  public activateButtonOk : boolean = false;



  constructor(
    private learning_ObjectService: LearningObjectService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,

  ) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.angForm.addControl(this.item.id, new FormControl(this.item.text));
  }


  createForm() {
    this.angForm = this.fb.group({});
  }

  async onSave(item) {
    this.messages = [];

    let new_text_alt = this.angForm.get(item.toString()).value;
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

  generateTableActiveButton() {
    this.generateTableDinamic = true;
    this.activateButtonOk= true;
  }

  cancelGenerate() {
    console.log("cancel")
    this.displayModal = false;
    this.generateTableDinamic = false;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  view() {
    let table_atribute = document.getElementById('table1');
    this.validateTable();
    console.log("html " + table_atribute.outerHTML);
  }

  validateTable() {
    let table_atribute = document.getElementById('table') as HTMLTableRowElement;
    let numColumnas = (<HTMLInputElement>document.getElementById('numColumnas')).value;
    let numFilas = (<HTMLInputElement>document.getElementById('numFilas')).value;

    console.log("html index "+ numColumnas);
    
  }


  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        },
        reject: () => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
    });
}
}
