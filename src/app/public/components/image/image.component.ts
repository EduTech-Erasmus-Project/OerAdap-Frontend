import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { EventService } from "src/app/services/event.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImageService } from "src/app/services/image.service";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class ImageComponent implements OnInit, OnDestroy {
  @Input() item: any;
  private subscribes: Subscription[] = [];
  public angForm: UntypedFormGroup;
  public edit: boolean = false;
  private textAux: string;
  private textAux_Edit: string;
  public messages: any;
  public answers: any;

  public url: any;
  public displayModal: boolean;
  public flag_text_table: boolean = false;

  title = "Tets-table";
  config = {
    toolbar: ["insertTable"],
    language: "es",
  };

  public table_result: string = "";
  public Editor = ClassicEditor;

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private imageService: ImageService
  ) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    if (this.item.text_table) {
      this.table_result = this.item.text_table;
      this.flag_text_table = true;
    }
    this.angForm.addControl(
      this.item.id,
      new UntypedFormControl(this.item.text)
    );

    this.angForm.addControl(
      this.item.id,
      new UntypedFormControl(this.item.text)
    );
  }

  createForm() {
    this.angForm = this.fb.group({});
  }

  async onSave(item) {
    this.messages = [];

    let new_text_alt = this.angForm.get(item.toString()).value;
    this.answers = {
      text: new_text_alt,
      method: "img-alt",
    };
    let sendDescription = await this.imageService
      .updateImage(this.answers, item)
      .subscribe(
        (response) => {
          if (response) {
            this.showSuccess("Los datos se actualizaron con exito");
            this.item.text = response.text;
            this.angForm.controls[item.toString()].setValue(new_text_alt);
            this.edit = false;
            this.eventService.emitEvent(true);
          }
        },
        (err) => {
          if (err.status == 304) {
            this.showError("Error, " + err.error?.message || err.message);
            this.edit = false;
            return;
          }

          this.showError("Error: " + err.error?.message || err.message);
          this.edit = false;
        }
      );

    this.subscribes.push(sendDescription);
  }

  public cliclEdit(texto) {
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
    this.table_result = this.textAux_Edit;
  }

  showModalDialog() {
    this.displayModal = true;
    this.flag_text_table = false;
  }

  async confirm(event: Event, id) {
    this.messageService.clear();
    this.confirmationService.confirm({
      target: event.target,
      message: "Esta seguro que desea guardar los cambios ?",
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        if (this.flag_text_table == false && this.table_result != "") {
          // console.log('Se crea')

          //Aceptar primera añadir tabla
          this.answers = {
            text_table: this.table_result,
            method: "transform-table",
          };
          let sendDescription = await this.imageService
            .updateImage(this.answers, id)
            .subscribe(
              (response) => {
                if (response) {
                  this.item.text_table = response.text_table;
                  this.eventService.emitEvent(true);
                  this.messageService.add({
                    severity: "success",
                    summary: "Guardado",
                    detail: "La tabla se creo correctamente.",
                  });
                  this.displayModal = false;
                  this.flag_text_table = true;
                }
              },
              (err) => {
                this.showError("Error, " + err.error?.message || err.message);
              }
            );
        } else if (this.flag_text_table == true && this.table_result != "") {
          //editar tabla la segunda
          this.answers = {
            text_table: this.table_result,
            method: "update-table",
          };
          let sendDescription = await this.imageService
            .updateImage(this.answers, id)
            .subscribe(
              (response) => {
                if (response) {
                  this.eventService.emitEvent(true);
                  this.displayModal = false;
                  this.item.text_table = response.text_table;
                  this.messageService.clear;
                  this.messageService.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Se actualizo la tabla correctamente.",
                  });
                }
              },
              (err) => {
                this.showError("Error, " + err.error?.message || err.message);
              }
            );
          this.subscribes.push(sendDescription);
        } else if (this.table_result == "") {
          this.messageService.add({
            severity: "error",
            summary: "Tabla vacia",
            detail: "Porfavor genere una tabla antes de guardar",
          });
        }
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
        });
      },
    });
  }

  showModalDialogEdit() {
    this.messageService.clear();
    this.displayModal = true;
    this.textAux_Edit = this.table_result;
    this.flag_text_table = true;
  }

  public async onChangeViewFullScreenImage(evt: any, item: any) {
    try {
      this.messageService.clear();
      let res = await this.imageService
        .updatePreviewImage({ preview: evt.checked }, item.id)
        .toPromise();
      this.eventService.emitEvent(true);
      //console.log("update res", res);
    } catch (error) {
      this.showError("Error, " + error.error?.message || error.message);
    }
  }

  public async onChangeRevert() {
    //console.log("revert", this.item.adaptation);

    try {
      this.messageService.clear();
      let res = await this.imageService
        .revertImage(this.item.id, { adaptation: this.item.adaptation })
        .toPromise();
      this.eventService.emitEvent(true);
      
      //console.log("update res", res);
    } catch (error) {
      this.showError("Error, " + error.error?.message || error.message);
      this.item.adaptation = !this.item.adaptation;
    }
  }
}
