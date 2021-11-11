import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  @Input() item: any;

  private edit: boolean = false;
  private editTextArea = false;
  private textEdit : string;

  constructor() { }

  ngOnInit(): void {
    this.textEdit = this.item.text;
  }

  cliclEdit(texto) {
    if (texto == null) {
      return this.edit = true;
    } else {
      return this.edit = false;
    }
  }
  editar() {
    this.editTextArea = true;
  }
  cancel(){
    this.editTextArea = false;
  }
  createText(){
    this.editTextArea = true;
  }

}
