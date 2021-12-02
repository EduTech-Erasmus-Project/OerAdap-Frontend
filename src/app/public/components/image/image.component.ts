import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { Message } from 'primeng/api';
import { Subscription } from "rxjs";
import { LearningObjectService } from "src/app/services/learning-object.service";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit, OnDestroy {
  private subscribes: Subscription[] = [];
  @Input() item: any;

  public angForm: FormGroup;
  public edit: boolean = false;
  private textAux: string;
  public answers: any;
  public messages: Message[] = [];

  constructor(
    private learning_ObjectService: LearningObjectService,
    private fb: FormBuilder,
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
    };
    let sendDescription = await this.learning_ObjectService
      .updateImage(this.answers, item)
      .subscribe(
        (response) => {
          if (response) {
            console.log("response image", response);

            //this.ervice.add({severity:'success', summary:'Service Message', detail:'Via ervice'});

            this.messages.push({
              severity: "success",
              summary: "Success",
              detail: "Los datos se actualizaron con exito",
            });
            this.item.text = response.text;
            this.angForm.controls[item.toString()].setValue(new_text_alt);
            this.edit = false;
          }
        },
        (err) => {
          if (err.status == 304) {
            this.messages.push({
              severity: "error",
              summary: "Error",
              detail: "Los datos no se actualizaron",
            });
            this.item.text = this.textAux;
            this.angForm.controls[item.toString()].setValue(this.textAux);
            this.edit = false;
          }
        }
      );
      this.subscribes.push(sendDescription);
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
}
