import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  constructor(
    private breadcrumbService: BreadcrumbService,
    private languageService: LanguageService
  ) { 
    this.loadBreadcrumb();
  }

  ngOnInit(): void {
  }

  private async loadBreadcrumb() {
    this.breadcrumbService.setItems([
      {
        label: (await this.languageService.get("menu.home")) || "",
        routerLink: ["/"],
      },
      {
        label: (await this.languageService.get("menu.guide")) || "",
        routerLink: ["/guide"],
      },
      {
        label: (await this.languageService.get("guide.audio.btn")) || "",
        routerLink: ["/guide/audio"],
      },
    ]);
  }

}
