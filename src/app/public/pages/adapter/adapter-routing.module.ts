import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdapterComponent } from "./adapter.component";

const routes: Routes = [
  {
    path: "",
    component: AdapterComponent,
    data: {
      breadcrumb: null,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdapterRoutingModule {}
