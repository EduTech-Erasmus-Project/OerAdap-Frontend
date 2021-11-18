import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LearningObjectService } from 'src/app/services/learning-object.service';

@Component({
  selector: 'app-image-content',
  templateUrl: './image-content.component.html',
  styleUrls: ['./image-content.component.css']
})
export class ImageContentComponent implements OnInit {

 @Input() imagesGroup: any[];
  constructor() { }

  ngOnInit(): void {
   
  }
  
}
