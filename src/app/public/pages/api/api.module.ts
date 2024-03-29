import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiComponent } from './api.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
@NgModule({
  declarations: [ApiComponent],
  imports: [
    CommonModule,
    ApiRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ApiModule { }
