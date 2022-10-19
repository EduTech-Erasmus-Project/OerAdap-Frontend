import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

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
        label: (await this.languageService.get("guide.paragraph.btn")) || "",
        routerLink: ["/guide/paragraph"],
      },
    ]);
  }

}
