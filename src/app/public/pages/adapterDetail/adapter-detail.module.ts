import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdapterDetailRoutingModule } from './adapter-detail-routing.module';
import { AdapterDetailComponent } from './adapter-detail.component';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../../shared/shared.module';
import { ContainersModule } from '../../containers/containers.module';


@NgModule({
  declarations: [AdapterDetailComponent],
  imports: [
    CommonModule,
    AdapterDetailRoutingModule,
    ComponentsModule,
    SharedModule,
    ContainersModule
  ]
})
export class AdapterDetailModule { }
