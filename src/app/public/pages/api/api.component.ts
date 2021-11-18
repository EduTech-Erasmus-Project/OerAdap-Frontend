import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  public formApi: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm() {
    this.formApi = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      message: [null, Validators.required],
    });
  }
  markTouchForm() {
    (<any>Object).values(this.formApi.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  get name() {
    return this.formApi.get("name");
  }
  get email() {
    return this.formApi.get("email");
  }
  get message() {
    return this.formApi.get("message");
  }

  validateUser() {
   
  }

}
