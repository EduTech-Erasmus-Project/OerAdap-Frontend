import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusComponent } from './aboutus.component';
import {CardModule} from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AboutusComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule,
    CardModule,
    SharedModule
  ]
})
export class AboutusModule { }
