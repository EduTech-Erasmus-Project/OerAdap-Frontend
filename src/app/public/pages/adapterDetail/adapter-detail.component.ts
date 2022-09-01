import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LearningObject, Page } from "src/app/models/LearningObject";
import { LearningObjectService } from "src/app/services/learning-object.service";
import { PageService } from "src/app/services/page.service";
import { Paragraph, Video } from "../../../models/Page";
import { Metadata } from "../../../models/Metadata";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-adapter-detail",
  templateUrl: "./adapter-detail.component.html",
  styleUrls: ["./adapter-detail.component.scss"],
})
export class AdapterDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public paragraphs: Paragraph[];
  public videos: Video[];

  private id: number;
  public learningObject: LearningObject;
  public image: boolean;
  public video: boolean;
  public audio: boolean;
  public button: boolean;
  public paragraph: boolean;
  private currentPageId: number;
  private tabIndex: number = 0;
  public imagesGroup: any[];
  public audiosGroup: any[];
  public subscribes: Subscription[] = [];
  //public nFoundImage: boolean = false;
  //public nFoundAudio: boolean = false;
  public curremtPage: Page;
  public tabAdapted = true;
  public metadata?: Metadata[];
  public listAll: boolean = false;
  public loader: boolean = false;

  public dataTabPanel?: any;

  constructor(
    private route: ActivatedRoute,
    private learningObjectService: LearningObjectService,
    private pageService: PageService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    let subRouter = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.loadData();
    });
    this.subscriptions.push(subRouter);
  }

  private async loadData() {
    let learningObjectSub = await this.learningObjectService
      .getLearningObject(this.id)
      .subscribe(
        (res: any) => {
          //console.log("learningObject", res);
          this.learningObject = res;

          //filter pages website
          let pages_website = res.pages_adapted.filter((page) => {
            let pageSplit = page.preview_path.split("/");
            return pageSplit[pageSplit.length - 1].includes("website");
          });

          if (pages_website.length > 0) {
            this.learningObject.pages_adapted = pages_website;
          }

          //filter page index
          let filterIndex = res.pages_adapted.filter((page) => {
            let pageSplit = page.preview_path.split("/");
            return pageSplit[pageSplit.length - 1].includes("index.html");
          });

          this.currentPageId = filterIndex[0]?.id || res.pages_adapted[0].id;
          this.image = this.getValueCheck("image");
          this.video = this.getValueCheck("video");
          this.audio = this.getValueCheck("audio");
          this.paragraph = this.getValueCheck("paragraph");

          let areas = res.config_adaptability.areas.sort();

          //console.log("areas sort", areas);

          this.dataTabPanel = areas
            .filter((area) => area != "all" && area != "button")
            .map((area, idx) => {
              return {
                idx,
                name: area,
              };
            });
          //console.log(this.image);
          //console.log(this.video);
          //console.log(this.audio);
          //console.log(this.paragraph);
          let data = this.getDataTabPanel(0);
          this.reLoadData(data.name);
        },
        (err) => {
          this.router.navigate(["/404"]);
        }
      );
    this.subscriptions.push(learningObjectSub);
  }

  // async loadPageInfo(){
  //   let pageSub = await this.pageService.getPageInfo(this.currentPageId).subscribe((res:any)=>{
  //     console.log("res loadPageInfo", res);
  //     this.curremtPage = res;
  //   }, err =>{

  //     console.log("err")
  //   });
  //   this.subscriptions.push(pageSub);
  // }

  async loadParagraph() {
    //console.log("loadParagraph page", this.currentPageId);
    this.paragraphs = [];
    this.loader = true;
    let paragraphSub = await this.pageService
      .getParagraph(this.currentPageId)
      .subscribe(
        (res: any) => {
          //console.log("res loadParagraph", this.paragraphs)
          this.paragraphs = res;
          this.loader = false;
        },
        (error) => {
          //this.paragraph = false;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              "Error al cargar los datos, " + error.error?.message ||
              error.message,
          });
          this.loader = false;
        }
      );
    this.subscriptions.push(paragraphSub);
  }
  loadImage() {
    //console.log("loadImage page", this.currentPageId);
    this.loadDataI(Number(this.currentPageId));
  }
  loadAudio() {
    //console.log("loadAudio page", this.currentPageId);
    this.loadDataA(Number(this.currentPageId));
  }
  loadVideo() {
    //console.log("loadVideo page", this.currentPageId);
    this.videos = [];
    this.loader = true;
    let videoSub = this.pageService.getVideo(this.currentPageId).subscribe(
      (res: any) => {
        console.log("res loadVideo", res)
        this.videos = res;
        this.loader = false;
      },
      (error) => {
        console.log(error)
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail:
            "Error al cargar los datos, " + error.error?.message ||
            error.message,
        });
        this.loader = false;
      }
    );
    this.subscriptions.push(videoSub);
  }

  getValueCheck(value: string) {
    //console.log("data areas", this.learningObject.config_adaptability.areas);
    return this.learningObject.config_adaptability.areas.includes(value);
  }

  eventAdaptabilit(evt) {
    // console.log("father event ", evt);
    this.image = evt.image;
    this.video = evt.video;
    this.audio = evt.audio;
    this.paragraph = evt.paragraph;
  }

  getDataTabPanel(idx) {
    return this.dataTabPanel.find((area) => area.idx === idx);
  }

  eventPage(evt) {
    //console.log("eventPage", evt);
    if (evt.type === "adapted") {
      this.currentPageId = evt.id;
      let data = this.getDataTabPanel(this.tabIndex);
      this.reLoadData(data.name);
    }
  }

  onChangeTab(evt) {
    this.tabIndex = evt.index;
    let data = this.getDataTabPanel(evt.index);
    this.reLoadData(data.name);
    console.log("evt", evt);
  }

  private reLoadData(name) {
    console.log("reLoadData", name);
    //console.log("dataTabPanel", this.dataTabPanel);
    switch (name) {
      case "paragraph":
        this.loadParagraph();
        break;
      case "image":
        this.loadImage();
        break;
      case "audio":
        this.loadAudio();
        break;
      case "video":
        this.loadVideo();
        break;
    }
  }

  async loadDataI(id: number) {
    this.imagesGroup = [];
    this.loader = true;
    let sub = await this.learningObjectService.getImagesForPge(id).subscribe(
      (response) => {
        console.log("Datos", response);

        this.imagesGroup = response;
        this.loader = false;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail:
            "Error al cargar los datos, " + error.error?.message ||
            error.message,
        });
        this.loader = false;
      }
    );
    this.subscribes.push(sub);
  }

  private async loadDataA(id: number) {
    this.audiosGroup = [];
    this.loader = true;
    let sub = await this.learningObjectService.getAudiosForPge(id).subscribe(
      (response) => {
        console.log("Datos", response);
        this.audiosGroup = response;
        this.loader = false;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail:
            "Error al cargar los datos, " + error.error?.message ||
            error.message,
        });
        this.loader = false;
      }
    );
    this.subscribes.push(sub);
  }

  onSave(evt) {
    //console.log("onSave " + evt);
  }

  onChangeWebview(evt) {
    if (evt.index === 0) {
      this.tabAdapted = true;
      this.loadAudio();
    } else if (evt.index === 2) {
      console.log("get all audios ");
      this.listAllAudios();
      this.tabAdapted = false;
    } else if (evt.index === 3) {
      console.log("get all images ");
      this.listAllImages();
      this.tabAdapted = false;
    } else if (evt.index === 4) {
      console.log("get all videos ");
      this.listAllVideos();
      this.tabAdapted = false;
    } else {
      this.tabAdapted = false;
    }
  }

  private async listAllAudios() {
    try {
      this.listAll = true;
      this.audiosGroup = [];
      let res: any = await this.learningObjectService
        .getAllSounds(this.learningObject.id)
        .toPromise();
      this.audiosGroup = res;

      this.listAll = false;
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "Error al cargar los datos, " + error.error?.message ||
          error.message,
      });
      this.listAll = true;
    }
  }

  private async listAllImages() {
    try {
      this.listAll = true;
      this.imagesGroup = [];
      let res: any = await this.learningObjectService
        .getAllImages(this.learningObject.id)
        .toPromise();
      this.imagesGroup = res;
      this.listAll = false;
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "Error al cargar los datos, " + error.error?.message ||
          error.message,
      });
      this.listAll = true;
    }
  }

  private async listAllVideos() {
    try {
      this.listAll = true;
      this.videos = [];
      let res: any = await this.learningObjectService
        .getAllVideos(this.learningObject.id)
        .toPromise();
      this.videos = res;
      console.log("all videos", this.videos);
      this.listAll = false;
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "Error al cargar los datos, " + error.error?.message ||
          error.message,
      });
      this.listAll = true;
    }
  }
}
