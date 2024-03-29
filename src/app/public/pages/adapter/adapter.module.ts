import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdapterRoutingModule } from './adapter-routing.module';
import { AdapterComponent } from './adapter.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdapterComponent],
  imports: [
    CommonModule,
    AdapterRoutingModule,
    NgxDropzoneModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class AdapterModule { }
