import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormArray,
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { LearningObjectService } from "../../../services/learning-object.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StorageService } from "../../../services/storage.service";
import { LearningObject } from "../../../models/LearningObject";
import { Message, MessageService } from "primeng/api";

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

  public checkboxs: Array<any> = [
    {
      value: "all",
      name: "Todas",
    },
    {
      value: "image",
      name: "Imagen (Descripción de imagen)",
    },
    {
      value: "video",
      name: "Video (Subtitulado de video)",
    },
    {
      value: "audio",
      name: "Audio (Descripción de audio)",
    },
    {
      value: "button",
      name: "Botón de Adaptabilidad",
    },
    {
      value: "paragraph",
      name: "Párrafos de texto",
    },
  ];

  constructor(
    private learningObjectService: LearningObjectService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private messageService: MessageService,
    private storageService: StorageService
  ) {
    console.log("map", this.checkboxs.map((check) => check.value));
    this.settingsForm = this.fb.group({
      method: ["handbook", Validators.required],
      areas: [this.checkboxs.map((check) => check.value), Validators.required],
    });

    console.log("settingsForm", this.settingsForm);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadLearningsObjects();
  }

  onSelect(event: any) {
    console.log(this.settingsForm);
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

    console.log("settingsForm", this.settingsForm);

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

          console.log("res", res);
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
        (err) => {
          console.log(err);
          console.log("settingsForm", this.settingsForm);
          this.upload = false;
          this.loader = false;
          this.progress = 0;
          this.msgs = [
            {
              severity: "error",
              summary: "Error",
              detail: "Error, " + err.error?.message || err.message,
            },
          ];
          return;
        }
      );
    this.subscriptions.push(umploadSub);
  }

  onCheckChange(evt, check) {
    console.log("onCheckChange", evt, check);
    if (check.value === "all" && evt.checked) {
      console.log(this.checkboxs.map((check) => check.value));
      this.settingsForm
        .get("areas")
        ?.setValue(this.checkboxs.map((check) => check.value));
      console.log(this.settingsForm);
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
    console.log("showConditionModal", this.settingsForm);
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

  async screenShot(url) { }
}
