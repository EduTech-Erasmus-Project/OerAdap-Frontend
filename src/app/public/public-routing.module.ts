import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicComponent } from "./public.component";
import { PasswordResedComponent } from "../auth/password-resed/password-resed.component";

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
        path: "login",
        loadChildren: () =>
          import("../auth/login/login.module").then((m) => m.LoginModule),
        data: {
          breadcrumb: "Inicio de sesión",
        },
      },
      {
        path: "register",
        loadChildren: () =>
          import("../auth/sign-up/sign-up.module").then((m) => m.SignUpModule),
        data: {
          breadcrumb: "Registro",
        },
      },
      {
        path: "restart-password",
        loadChildren: () =>
          import("../auth/recover-password/recover-password.module").then(
            (m) => m.RecoverPasswordModule
          ),
        data: {
          breadcrumb: "Reestablecer contraseña",
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
        path: "password-resed/:uidb64/:token",
        loadChildren: () =>
          import("../auth/password-resed/password-resed.module").then(
            (m) => m.PasswordResedModule
          ),
        data: {
          breadcrumb: "Reestablecer contraseña",
        },
        component: PasswordResedComponent,
      },
      {
        path: "reset/:?",
        loadChildren: () =>
          import("../auth/reset/reset.module").then((m) => m.ResetModule),
        data: {
          breadcrumb: "Contraseña reestablecida",
        },
      },
      {
        path: "emailMessage",
        loadChildren: () =>
          import("../auth/emailMessage/email-message.module").then(
            (m) => m.EmailMessageModule
          ),
        data: {
          breadcrumb: "Enlace enviado",
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
        path: "information",
        loadChildren: () =>
          import("./pages/information/information.module").then(
            (m) => m.InformationModule
          ),
          data: {
            breadcrumb: "Información",
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
