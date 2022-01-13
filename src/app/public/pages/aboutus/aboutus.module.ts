import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusComponent } from './aboutus.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [AboutusComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule,
    CardModule
  ]
})
export class AboutusModule { }
