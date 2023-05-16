import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Page } from "src/app/models/LearningObject";
import { LearningObjectService } from "src/app/services/learning-object.service";

@Component({
  selector: "app-webview",
  templateUrl: "./webview.component.html",
  styleUrls: ["./webview.component.scss"],
})
export class WebviewComponent implements OnInit {
  @Input() pages: Page[] = [];
  @Output() eventPage: EventEmitter<any> = new EventEmitter();
  @ViewChild("webView") webView: ElementRef;
  public fullScreen: boolean = false;
  //public idEnviar: number;
  //public pagesSelect: any[];
  public selectedPage: Page;

  //private mensajeID: string;

  constructor() {
    console.log("constructor");
  }

  ngOnInit(): void {
    console.log("pages", this.pages);
    // this.learningObjectService.sendMessageObservable.subscribe((mensaje) => {
    //   this.mensajeID = mensaje;
    // });

    //filter pages website
    let pages_website = this.filterPage("website_");
    // this.pages.filter((page) => {
    //   let pageSplit = page?.preview_path.split("/")
    //   return pageSplit[pageSplit.length-1].includes("website");
    // });

    console.log("pages_website", pages_website);

    if (pages_website.length > 0) {
      this.pages = pages_website;
    }

    //filter page index
    let filterPageIndex = this.filterPage("index.html");

    console.log("filterPageIndex", filterPageIndex);
    // this.pages.filter((page) =>{
    //   let pageSplit = page?.preview_path.split("/")
    //   return pageSplit[pageSplit.length-1].includes("index.html");
    // });

    //console.log("filterIndex", filterIndex);

    if (filterPageIndex.length > 0) {
      this.selectedPage = filterPageIndex[0];
    } else {
      this.selectedPage = this.pages[0];
    }
    //this.learningObjectService.sendMessage(this.selectedPage.id);
  }

  private filterPage(filter: string) {
    return this.pages.filter((page) => {
      let pageSplit = page?.preview_path.split("/");
      return pageSplit[pageSplit.length - 1].includes(filter);
    });
  }

  public openFullscreen() {
    const elem = this.webView.nativeElement;
    this.fullScreen = true;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
  closeFullscreen() {
    //document.getElementById('')
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    this.fullScreen = false;
  }

  onChange(evt) {
    //console.log("change", evt.value);
    this.eventPage.emit(evt.value);

    //this.mensajeID = evt.value.id;
    //console.log("Es el id",this.mensajeID)
    //this.learningObjectService.sendMessage(this.mensajeID);
  }
}
