import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { LearningObjectService } from "../../../services/learning-object.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StorageService } from "../../../services/storage.service";
import { LearningObject } from "../../../models/LearningObject";
import { Message } from "primeng/api";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-adapter",
  templateUrl: "./adapter.component.html",
  styleUrls: ["./adapter.component.scss"],
})
export class AdapterComponent implements OnInit, OnDestroy {
  public file?: File;
  public progress: number = 0;
  public upload: boolean = false;
  public loader: boolean = false;
  public displayConditions: boolean;
  private navigateId: number;
  public learningObjects?: LearningObject[];
  private subscriptions: Subscription[] = [];
  public msgs: Message[] = [];
  public settingsForm: UntypedFormGroup;
  public checkboxs: Array<any>;

  constructor(
    private learningObjectService: LearningObjectService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private storageService: StorageService,
    private breadcrumbService: BreadcrumbService,
    private languageService: LanguageService
  ) {
    this.loadBreadcrumb();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadLearningsObjects();
    this.itemsCheckbox();
  }

  private async itemsCheckbox() {
    this.checkboxs = [
      {
        value: "all",
        name: (await this.languageService.get("adapter.areas.all")) || "", //"Todas",
      },
      {
        value: "image",
        name: (await this.languageService.get("adapter.areas.img.item")) || "", //"Imagen (Descripción de imagen)",
      },
      {
        value: "video",
        name:
          (await this.languageService.get("adapter.areas.video.item")) || "", //"Video (Subtitulado de video)",
      },
      {
        value: "audio",
        name:
          (await this.languageService.get("adapter.areas.audio.item")) || "", //"Audio (Descripción de audio)",
      },
      {
        value: "button",
        name: (await this.languageService.get("adapter.areas.btn.item")) || "", //"Botón de Adaptabilidad",
      },
      {
        value: "paragraph",
        name: (await this.languageService.get("adapter.areas.text.item")) || "", //"Párrafos de texto",
      },
    ];
    this.settingsForm = this.fb.group({
      method: ["handbook", Validators.required],
      areas: [this.checkboxs.map((check) => check.value), Validators.required],
    });
  }

  private async loadBreadcrumb() {
    this.breadcrumbService.setItems([
      {
        label: (await this.languageService.get("menu.home")) || "",
        routerLink: ["/"],
      },
      {
        label: (await this.languageService.get("menu.adapter")) || "",
        routerLink: ["/adapter"],
      },
    ]);
  }

  onSelect(event: any) {
    //console.log(this.settingsForm);
    this.file = event.addedFiles[0];
  }

  onRemove() {
    this.file = undefined;
  }

  getmethod(idx) {
    if (this.learningObjects[idx].config_adaptability.method === "handbook") {
      return "Manual";
    } else if (
      this.learningObjects[idx].config_adaptability.method === "automatic"
    ) {
      return "Automatica";
    } else if (
      this.learningObjects[idx].config_adaptability.method === "mixed"
    ) {
      return "Mixta";
    }
  }

  getareas(idx) {
    return this.learningObjects[idx].config_adaptability.areas.join(", ");
  }

  async onUpload() {
    //console.log("settingsForm", this.settingsForm);

    this.msgs = [];
    this.displayConditions = false;
    //let dataForm = this.settingsForm.value;
    let data = {
      file: this.file,
      ...this.settingsForm.value,
    };
    this.loader = true;

    let umploadSub = await this.learningObjectService
      .uploadObject(data)
      .subscribe(
        (res: any) => {
          //console.log("res", res);
          if (res.status === 400) {
            return;
          }

          if (res.body?.id) {
            this.navigateId = res.body.id;
            this.storageService.saveStorageItem("user_ref", res.body.user_ref);
          }

          if (res.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * res.loaded) / res.total);
          } else if (res instanceof HttpResponse) {
            this.upload = true;
          }
        },
        async (err) => {
          console.log(err);
          //console.log("settingsForm", this.settingsForm);
          if (err.error?.code === "object_adapted") {
            this.showMessage(
              "error",
              "Error",
              await this.languageService.get("adapter.messages.msg1")
            );
          }
          this.upload = false;
          this.loader = false;
          this.progress = 0;

          return;
        }
      );
    this.subscriptions.push(umploadSub);
  }

  private async showMessage(type: string, summary: string, message: string) {
    this.msgs = [];
    this.msgs = [
      {
        severity: type,
        summary: summary,
        detail: message,
      },
    ];
  }

  onCheckChange(evt, check) {
    //console.log("onCheckChange", evt, check);
    if (check.value === "all" && evt.checked) {
      //console.log(this.checkboxs.map((check) => check.value));
      this.settingsForm
        .get("areas")
        ?.setValue(this.checkboxs.map((check) => check.value));
      //console.log(this.settingsForm);
      return;
    } else if (check.value === "all" && !evt.checked) {
      this.settingsForm.get("areas")?.setValue([]);
      return;
    }

    if (
      !this.settingsForm.get("areas")?.value.includes(check.value) &&
      !evt.checked
    ) {
      this.settingsForm
        .get("areas")
        ?.setValue(
          this.settingsForm
            .get("areas")
            ?.value.filter((area) => area !== check.value)
        );
    } else {
      this.settingsForm
        .get("areas")
        ?.setValue([...this.settingsForm.get("areas")?.value, check.value]);
    }
  }

  showConditionModal() {
    //("showConditionModal", this.settingsForm);
    if (this.settingsForm.valid) {
      this.displayConditions = true;
    }
  }

  navigate(id: number = this.navigateId) {
    this.router.navigate(["/adapter", id]);
  }

  async loadLearningsObjects() {
    let learningsObjectsSub = await this.learningObjectService
      .getLearningsObjects()
      .subscribe((res: any) => {
        this.learningObjects = res;
        this.learningObjects.sort((a, b) => {
          return b.id - a.id;
        });
      });
    this.subscriptions.push(learningsObjectsSub);
  }

  async screenShot(url) {}
}
