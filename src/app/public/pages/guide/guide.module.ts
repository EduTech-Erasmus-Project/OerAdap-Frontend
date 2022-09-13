import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [GuideComponent],
  imports: [
    CommonModule,
    GuideRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class GuideModule { }
