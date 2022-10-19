import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicComponent } from "./public.component";

const routes: Routes = [
  {
    path: "",
    component: PublicComponent,
    data: {
      breadcrumb: "Inicio",
    },
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
        data: {
          breadcrumb: null,
        },
      },
      {
        path: "terms-and-conditions",
        loadChildren: () =>
          import("./pages/terms/terms.module").then((m) => m.TermsModule),
        data: {
          breadcrumb: "Términos y condiciones",
        },
      },
     
      {
        path: "about-us",
        loadChildren: () =>
          import("./pages/aboutus/aboutus.module").then((m) => m.AboutusModule),
        data: {
          breadcrumb: "Quiénes Somos",
        },
      },
      {
        path: "adapter",
        loadChildren: () =>
          import("./pages/adapter/adapter.module").then((m) => m.AdapterModule),
        data: {
          breadcrumb: "Adaptador",
        },
      },
      {
        path: "contact",
        loadChildren: () =>
          import("./pages/conatct/contact.module").then((m) => m.ContactModule),
        data: {
          breadcrumb: "Contacto",
        },
      },
      // {
      //   path: "api-doc",
      //   loadChildren: () =>
      //     import("./pages/api/api.module").then((m) => m.ApiModule),
      //   data: {
      //     breadcrumb: "API Adaptador",
      //   },
      // },
      {
        path: "guide",
        loadChildren: () =>
          import("./pages/guide/guide.module").then((m) => m.GuideModule),
          data: {
            breadcrumb: "Guia de Usuario",
          },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
