import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteRoutingModule } from './delete-routing.module';
import { DeleteComponent } from './delete.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    DeleteComponent
  ],
  imports: [
    CommonModule,
    DeleteRoutingModule,
    ProgressSpinnerModule
  ]
})
export class DeleteModule { }
