import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LearningObjectService } from "src/app/services/learning-object.service";

@Component({
  selector: "app-image-content",
  templateUrl: "./image-content.component.html",
  styleUrls: ["./image-content.component.css"],
})
export class ImageContentComponent implements OnInit {
  @Input() imagesGroup: any[];
  constructor() {}

  ngOnInit(): void {
    this.formtData();
  }

  private formtData() {
    this.imagesGroup = this.imagesGroup.map((image: any) => {
      return {
        id: image.id,
        id_tag_adapated: image.tags_adapted.id,
        link: image.tags_adapted.path_src,
        ref: image.tags_adapted.id_ref,
        text: image.tags_adapted.text,
        text_table: image.tags_adapted.text_table,
        img_fullscreen: image.tags_adapted.img_fullscreen,
      };
    });
  }
}
