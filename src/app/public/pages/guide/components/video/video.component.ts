import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

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
        label: (await this.languageService.get("guide.video.btn")) || "",
        routerLink: ["/guide/video"],
      },
    ]);
  }

}
