import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-guide",
  templateUrl: "./guide.component.html",
  styleUrls: ["./guide.component.scss"],
})
export class GuideComponent implements OnInit {
  public items: MenuItem[];
  private path: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private languageService: LanguageService
  ) {
    this.path = this.route.snapshot.firstChild.url[0].path;
    this.loadBreadcrumb();
  }

  public activeIndex: number = 0;

  ngOnInit(): void {
    this.loadItems();
  }

  private async loadItems() {
    this.items = [
      {
        label:
          (await this.languageService.get("guide.exelearning.title")) || "",
        routerLink: "eXeLearning",
      },
      {
        label:
          (await this.languageService.get("guide.introduction.title")) || "",
        routerLink: "introduction",
      },
      {
        label: (await this.languageService.get("guide.upload.btn")) || "",
        routerLink: "upload",
      },
      {
        label: (await this.languageService.get("guide.tour.title")) || "",
        routerLink: "tour",
      },
      {
        label: (await this.languageService.get("guide.audio.btn")) || "",
        routerLink: "audio",
      },
      {
        label: (await this.languageService.get("guide.image.btn")) || "",
        routerLink: "image",
      },
      {
        label: (await this.languageService.get("guide.paragraph.btn")) || "",
        routerLink: "paragraph",
      },
      {
        label: (await this.languageService.get("guide.video.btn")) || "",
        routerLink: "video",
      },
      {
        label: (await this.languageService.get("guide.download.btn")) || "",
        routerLink: "download",
      },
    ];

    this.activeIndex = this.items.findIndex(
      (item) => item.routerLink === this.path
    );
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
    ]);
  }

  public prevPage() {
    this.activeIndex -= 1;
    this.router.navigate([`/guide/${this.items[this.activeIndex].routerLink}`]);
  }

  public nextPage() {
    this.activeIndex += 1;
    this.router.navigate([`/guide/${this.items[this.activeIndex].routerLink}`]);
  }
}
