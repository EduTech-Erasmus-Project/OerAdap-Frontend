import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdapterDetailComponent } from "./adapter-detail.component";

const routes: Routes = [
  {
    path: "",
    component: AdapterDetailComponent,
    data: {
      breadcrumb: null,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdapterDetailRoutingModule {}
