import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiComponent } from './api.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [ApiComponent],
  imports: [
    CommonModule,
    ApiRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class ApiModule { }
