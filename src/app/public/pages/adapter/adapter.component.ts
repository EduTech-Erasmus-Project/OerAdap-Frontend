import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LearningObjectService } from "../../../services/learning-object.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StorageService } from "../../../services/storage.service";
import { LearningObject } from "../../../models/LearningObject";

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

  public settingsForm: FormGroup;
  private areas: string[] = [
    "all",
    "image",
    "video",
    "audio",
    "button",
    "paragraph",
  ];
  public checkAll: boolean = true;
  public checkboxs: any = [
    {
      value: "all",
      description: "Todas",
      checked: true,
    },
    {
      value: "image",
      description: "Imagen (Descripción de imagen)",
      checked: true,
    },
    {
      value: "video",
      description: "Video (Subtitulado de video)",
      checked: true,
    },
    {
      value: "audio",
      description: "Audio (Descripción de audio)",
      checked: true,
    },
    {
      value: "button",
      description: "Botón de Adaptabilidad",
      checked: true,
    },
    {
      value: "paragraph",
      description: "Párrafos de texto",
      checked: true,
    },
  ];

  constructor(
    private learningObjectService: LearningObjectService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    this.settingsForm = this.fb.group({
      method: ["handbook", Validators.required],
      areas: [this.areas, Validators.required],
    });

    //this.
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadLearningsObjects();
  }

  onSelect(event: any) {
    this.file = event.addedFiles[0];
  }

  onRemove() {
    //console.log(event);
    //this.files.splice(this.files.indexOf(event), 1);
    this.file = undefined;
  }

  async onUpload() {
    this.displayConditions = false;
    //console.log("upload", this.settingsForm.value)
    let data = {
      file: this.file,
      ...this.settingsForm.value,
    };
    this.loader = true;
    let umploadSub = await this.learningObjectService
      .uploadObject(data)
      .subscribe(
        (res: any) => {
          console.log("res upload", res.body);
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
          this.upload = false;
          this.loader = false;
          this.progress = 0;
        }
      );
    this.subscriptions.push(umploadSub);
  }

  onCheckChange(evt, event) {
    if (evt === "all" && event.checked) {
      this.areas = ["all", "image", "video", "audio", "button", "paragraph"];
    } else if (evt === "all" && !event.checked) {
      this.areas = [];
    } else {
      if (this.areas.includes("all")) {
        this.areas.splice(this.areas.indexOf("all"), 1);
      }
      if (this.areas.includes(evt)) {
        this.areas = this.areas.filter((res) => res != evt);
      } else {
        this.areas.push(evt);
      }
      if (this.areas.length >= 5 && !this.areas.includes("all")) {
        this.areas.unshift("all");
      }
    }
    this.settingsForm.patchValue({
      areas: this.areas,
    });
  }

  showConditionModal() {
    this.displayConditions = true;
  }

  navigate(id:number = this.navigateId) {
    this.router.navigate(["/adapter", id]);
  }

  async loadLearningsObjects() {
    let learningsObjectsSub = await this.learningObjectService
      .getLearningsObjects()
      .subscribe((res: any) => {
        this.learningObjects = res;

        console.log("object", this.learningObjects)

        this.screenShot("https://www.google.com");

        res.forEach((item) => {
          //const s = new Screenshot('http://google.com').width(800)
        });
      });
    this.subscriptions.push(learningsObjectsSub);
  }

  async screenShot(url) {
    
  }
}
