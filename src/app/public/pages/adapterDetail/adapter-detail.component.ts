import { Component, OnInit, OnDestroy, Input, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { LearningObject } from "src/app/models/LearningObject";
import { Paragraph } from "src/app/models/Page";
import { LearningObjectService } from "src/app/services/learning-object.service";
import { PageService } from "src/app/services/page.service";
import { WebviewComponent } from "../../components/webview/webview.component";


@Component({
  selector: "app-adapter-detail",
  templateUrl: "./adapter-detail.component.html",
  styleUrls: ["./adapter-detail.component.scss"],
})
export class AdapterDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public paragraphs:Paragraph[];
  private id: number;
  public learningObject: LearningObject;

  private idPagina: number;

  public image: boolean;
  public video: boolean;
  public audio: boolean;
  public button: boolean;
  public paragraph: boolean;


  private currentPageId: number;
  private tabIndex:number = 0;

  private mensajeID: string;
  public imagesGroup: any[];
  public subscribes: Subscription[] = [];
  public nFoundImage: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private learningObjectService: LearningObjectService,
    private pageService:PageService
  ) {}


  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.learningObjectService.enviarMensajeObservable.subscribe(IDpage => {
      this.mensajeID = IDpage;
      this.loadDataI(Number(this.mensajeID));
    })

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
          console.log("learningObject", res);
          this.learningObject = res;
          let filterIndex = res.pages.filter(page => page.preview_path.includes('index.html'))
          this.currentPageId= filterIndex[0].id;
          this.image = this.getValueCheck("image");
          this.video = this.getValueCheck("video");
          this.audio = this.getValueCheck("audio");
          this.paragraph = this.getValueCheck("paragraph");
          this.loadParagraph();
        },
        (err) => {
          console.log(err);
          //redirigir a 404
        }
      );
    this.subscriptions.push(learningObjectSub);
  }

  async loadParagraph() {
    //console.log("loadParagraph page", this.currentPageId);
    let paragraphSub = await this.pageService.getParagraph(this.currentPageId).subscribe((res:any)=>{
        
        this.paragraphs = res;
        //console.log("res loadParagraph", this.paragraphs)
    }, err =>{
      this.paragraph = false;
    });
    this.subscriptions.push(paragraphSub);
  }
  loadImage() {
    console.log("loadImage page", this.currentPageId);
  }
  loadAudio() {
    console.log("loadAudio page", this.currentPageId);
  }
  loadVideo() {
    console.log("loadVideo page", this.currentPageId);
  }

  getValueCheck(value: string) {
    return this.learningObject.config_adaptability.areas.includes(value);
  }

  eventAdaptabilit(evt) {
   // console.log("father event ", evt);
    this.image = evt.image;
    this.video = evt.video;
    this.audio = evt.audio;
    this.paragraph = evt.paragraph;
  }


  eventPage(evt) {
    //console.log("event page", evt);
    this.currentPageId = evt.id;
    this.reLoadData(this.tabIndex);
  }

  onChangeTab(evt) {
    this.tabIndex = evt.index;
    this.reLoadData(this.tabIndex);
    //console.log("evt", evt);
  }

  private reLoadData(idx){
    switch (idx) {
      case 0:
        this.loadParagraph();
        break;
      case 1:
        this.loadImage();
        break;
      case 2:
        this.loadAudio();
        break;
      case 3:
        this.loadVideo();
        break;
    }
  }

  async loadDataI(id: number) {
    let groupImages = await this.learningObjectService.getImagesForPge(id).subscribe(
      (response) => {

        this.imagesGroup = response.map(image => {
          return {
            id: image.id,
            text: image.text,
            items: image.atributes.map((attribute: any) => {
              return {
                id: attribute.id,
                link: attribute.data_atribute,
              }
            })
          }
        })

        this.imagesGroup = this.imagesGroup;
        this.nFoundImage = false;
      },(err) => {
        this.nFoundImage = true;
      });
    this.subscribes.push(groupImages);
  }

  onSave(evt) {
    console.log("onSave " + evt);

  }

}
