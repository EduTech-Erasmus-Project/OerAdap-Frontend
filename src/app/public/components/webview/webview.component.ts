import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { LearningObject, Page } from "src/app/models/LearningObject";
import { LearningObjectService } from "src/app/services/learning-object.service";
import { EventService } from "../../../services/event.service";

@Component({
  selector: "app-webview",
  templateUrl: "./webview.component.html",
  styleUrls: ["./webview.component.scss"],
})
export class WebviewComponent implements OnInit {
  @Input() pages: Page[];
  @Output() eventPage: EventEmitter<any> = new EventEmitter();
  @ViewChild("webView") webView: ElementRef;
  public fullScreen: boolean = false;
  public idEnviar: number;
  pagesSelect: any[];
  selectedPage: any;

  private mensajeID: string;

  constructor(
    private learningObjectService: LearningObjectService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    //console.log("pages", this.pages)

    this.learningObjectService.enviarMensajeObservable.subscribe((mensaje) => {
      this.mensajeID = mensaje;
    });

    let filterIndex = this.pages.filter((page) =>
      page.preview_path.includes("index.html")
    );

    this.selectedPage = {
      name: filterIndex[0].title,
      code: filterIndex[0].preview_path,
      id: filterIndex[0].id,
      type: filterIndex[0].type,
    };

    //this.eventPage.emit(this.selectedPage)

    this.learningObjectService.enviarMensaje(this.selectedPage.id);

    this.pagesSelect = this.pages.map((page: Page) => {
      return {
        name: page.title,
        code: page.preview_path,
        id: page.id,
        type: page.type,
      };
    });

    // console.log("pages", this.pages);

    //console.log("sub event")
    this.eventService.getEvent().subscribe((event) => {
      if (this.selectedPage.type === "adapted") {
        console.log(this.selectedPage.code);
        var iframe: any = document.getElementById("web-view");
        iframe.src = this.selectedPage.code;
      }
    });
  }

  openFullscreen() {
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
    console.log("change", evt);
    this.eventPage.emit(evt.value);

    this.mensajeID = evt.value.id;
    //console.log("Es el id",this.mensajeID)
    this.learningObjectService.enviarMensaje(this.mensajeID);
  }
}
