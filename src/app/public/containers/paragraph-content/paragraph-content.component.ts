import { Component, Input, OnInit } from '@angular/core';
import { Paragraph } from 'src/app/models/Page';

@Component({
  selector: 'app-paragraph-content',
  templateUrl: './paragraph-content.component.html',
  styleUrls: ['./paragraph-content.component.scss']
})
export class ParagraphContentComponent implements OnInit {

  @Input() paragraphs:Paragraph[];

  constructor() { }

  ngOnInit(): void {

    //console.log(this.paragraphs);
  }

}
