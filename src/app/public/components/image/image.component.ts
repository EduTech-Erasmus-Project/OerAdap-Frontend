import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
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
  private textAux : string;

  private mensajeID: string;
  constructor(
    private learning_ObjectService: LearningObjectService,
    private fb: FormBuilder,
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


  onSave(evt) {
    console.log("onSave " + evt);

  }

  cliclEdit(texto){
    console.log("cliclEdit " + texto);
  }
  
}
