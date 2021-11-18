import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  public angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm() {
    this.angForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      message: [null, Validators.required],
    });
  }
  markTouchForm() {
    (<any>Object).values(this.angForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  get name() {
    return this.angForm.get("name");
  }
  get email() {
    return this.angForm.get("email");
  }
  get message() {
    return this.angForm.get("message");
  }

}
