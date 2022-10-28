import { Component, OnInit, Input } from '@angular/core';
import { Metadata } from '../../../models/Metadata';

@Component({
  selector: 'app-oa-metadata',
  templateUrl: './oa-metadata.component.html',
  styleUrls: ['./oa-metadata.component.scss']
})
export class OaMetadataComponent implements OnInit {
  @Input() metadata?:Metadata[];

  constructor() { }

  ngOnInit(): void {
    
  }

}
