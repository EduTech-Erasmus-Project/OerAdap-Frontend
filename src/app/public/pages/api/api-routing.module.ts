import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiComponent } from './api.component';

const routes: Routes = [{ path: '', component: ApiComponent, data: {
  breadcrumb: null,
}, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
