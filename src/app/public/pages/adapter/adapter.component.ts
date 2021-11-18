import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { LearningObjectService } from "../../../services/learning-object.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-adapter",
  templateUrl: "./adapter.component.html",
  styleUrls: ["./adapter.component.scss"],
})
export class AdapterComponent implements OnInit {
  public file?: File;
  public progress: number = 0;
  public upload: boolean = false;
  public loader: boolean = false;
  public displayConditions: boolean;
  private navigateId: number;

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
    private messageService: MessageService,
    private learningObjectService: LearningObjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      method: ["handbook", Validators.required],
      areas: [this.areas, Validators.required],
    });

    //this.
  }

  ngOnInit(): void {}

  onSelect(event: any) {
    this.file = event.addedFiles[0];
  }

  onRemove() {
    //console.log(event);
    //this.files.splice(this.files.indexOf(event), 1);
    this.file = undefined;
  }

  onUpload() {
    this.displayConditions = false;
    //console.log("upload", this.settingsForm.value)
    let data = {
      file: this.file,
      ...this.settingsForm.value,
    };
    this.loader = true;
    this.learningObjectService.uploadObject(data).subscribe(
      (res: any) => {
        //console.log(res.body);
        if (res.body?.id) {
          this.navigateId = res.body.id;
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

  navigate() {
    this.router.navigate(["/adapter", this.navigateId]);
  }
}
