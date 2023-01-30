import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { ContactService } from "src/app/services/contact.service";
import { Subscription } from "rxjs";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, OnDestroy {
  public angForm: UntypedFormGroup;
  private subscriptions: Subscription[] = [];
  public loader: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private contactService: ContactService,
    private breadcrumbService: BreadcrumbService,
    private languageService: LanguageService
  ) {
    this.loadBreadcrumb();
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {}

  private async loadBreadcrumb() {
    this.breadcrumbService.setItems([
      {
        label: (await this.languageService.get("menu.home")) || "",
        routerLink: ["/"],
      },
      {
        label: (await this.languageService.get("menu.contact")) || "",
        routerLink: ["/contact"],
      },
    ]);
  }

  private createForm() {
    this.angForm = this.fb.group({
      name: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "^([a-zA-Z0-9_'-'.]+)@([a-zA-Z0-9_'-'.]+).([a-zA-Z]{2,5})$"
          ),
        ],
      ],
      message: [null, Validators.required],
    });
  }
  async validateUser() {
    if (this.angForm.valid) {
      this.loader = true;
      let sendEmailSub = await this.contactService
        .sendEmail(this.angForm.value)
        .subscribe(
          (res: any) => {
            //console.log(res)
            if (res.Messages[0].Status === "success") {
              this.showSuccess();
              this.angForm.reset();
              this.loader = false;
            } else {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail:
                  "Se ha producido un error inesperado intente enviar de nuevo.",
              });
              this.loader = false;
            }
          },
          (err) => {
            console.log(err);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail:
                "Se ha producido un error inesperado intente enviar de nuevo.",
            });
            this.loader = false;
          }
        );
      this.subscriptions.push(sendEmailSub);
    } else {
      this.markTouchForm();
    }
  }
  showSuccess() {
    this.messageService.add({
      severity: "success",
      summary: "Gracias",
      detail: "Su mensaje se ah enviado correctamente",
    });
  }
  markTouchForm() {
    (<any>Object).values(this.angForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  get name() {
    return this.angForm.get("name");
  }
  get email() {
    return this.angForm.get("email");
  }
  get message() {
    return this.angForm.get("message");
  }
}
