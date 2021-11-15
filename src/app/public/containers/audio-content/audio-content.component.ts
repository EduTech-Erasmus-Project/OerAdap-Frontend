import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-content',
  templateUrl: './audio-content.component.html',
  styleUrls: ['./audio-content.component.css']
})
export class AudioContentComponent implements OnInit {
  @Input() audiosGroup: any[];
  @Input() nFoundAudio : boolean ;

  constructor() { }

  ngOnInit(): void {
    console.log("Estos audios"+this.audiosGroup);
  }

}
