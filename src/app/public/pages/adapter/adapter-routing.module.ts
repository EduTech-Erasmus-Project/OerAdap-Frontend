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
  {
    path: ":id",
    loadChildren: () =>
      import("../adapterDetail/adapter-detail.module").then(
        (m) => m.AdapterDetailModule
      ),
      data: {
        breadcrumb: "Edición de objeto de aprendizaje",
      },
      
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdapterRoutingModule {}
