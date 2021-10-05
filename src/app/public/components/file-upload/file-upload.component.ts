import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      methods: ["handbook", Validators.required],
      areas: [this.areas, Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    console.log(this.settingsForm.value);
  }

  onCheckChange(evt, event) {
    if (evt === "all" && event.checked) {
      this.areas = ["all", "image", "video", "audio", "button", "paragraph"];
    
    } else if (evt === "all" && !event.checked){
      this.areas = [];
 
    }else{
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
}
