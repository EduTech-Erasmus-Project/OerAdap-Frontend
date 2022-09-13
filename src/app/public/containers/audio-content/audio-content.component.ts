import { Component, Input, OnInit } from '@angular/core';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-audio-content',
  templateUrl: './audio-content.component.html',
  styleUrls: ['./audio-content.component.css']
})
export class AudioContentComponent implements OnInit {
  @Input() audiosGroup: any;
  @Input() nFoundAudio : boolean = false;

  constructor() { }

  ngOnInit(): void {
    //console.log("Estos audios"+this.audiosGroup);
    //console.log("audio contente", this.audiosGroup);
    this.formaData();
  }

  private formaData(): void {
    this.audiosGroup = this.audiosGroup.map((audio: any) => {
      return {
        id: audio.id,
        html_text: audio.html_text,
        attributes: audio.attributes.map((attribute: any) => {
          return {
            path_src: attribute.data_attribute,
            path_system: attribute.path_system,
          };
        }),
        id_class_ref: audio.id_class_ref,
        id_tag_adapated: audio.tags_adapted?.id,
        link: audio.tags_adapted?.path_src,
        ref: audio.tags_adapted?.id_ref,
        text: audio.tags_adapted?.text,
        adaptation: audio.adaptation,

      };
    });
  }

}
