import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../../models/Page';

@Component({
  selector: 'app-video-content',
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.css']
})
export class VideoContentComponent implements OnInit {

  @Input() videos:Video[];

  constructor() { }

  ngOnInit(): void {
  }

}
