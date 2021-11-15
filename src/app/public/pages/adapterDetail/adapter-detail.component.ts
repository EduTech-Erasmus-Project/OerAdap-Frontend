import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { LearningObject, Page } from 'src/app/models/LearningObject';
import { LearningObjectService } from "src/app/services/learning-object.service";
import { PageService } from "src/app/services/page.service";
import { Paragraph, Video } from '../../../models/Page';

@Component({
  selector: "app-adapter-detail",
  templateUrl: "./adapter-detail.component.html",
  styleUrls: ["./adapter-detail.component.scss"],
})
export class AdapterDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public paragraphs:Paragraph[];
  public videos:Video[];

  private id: number;
  public learningObject: LearningObject;

  public image: boolean;
  public video: boolean;
  public audio: boolean;
  public button: boolean;
  public paragraph: boolean;


  private currentPageId: number;
  private tabIndex: number = 0;

  private mensajeID: string;
  public imagesGroup: any[];
  public audiosGroup: any[];

  public subscribes: Subscription[] = [];
  public nFoundImage: boolean = false;
  public nFoundAudio: boolean = false;

  public curremtPage: Page;

  public tabAdapted = true;


  constructor(
    private route: ActivatedRoute,
    private learningObjectService: LearningObjectService,
    private pageService: PageService
  ) { }


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
          console.log("learningObject", res);
          this.learningObject = res;
          let filterIndex = res.pages_adapted.filter(page => page.preview_path.includes('index.html'))
          this.currentPageId = filterIndex[0].id;
          this.image = this.getValueCheck("image");
          this.video = this.getValueCheck("video");
          this.audio = this.getValueCheck("audio");
          this.paragraph = this.getValueCheck("paragraph");

          //this.loadPageInfo();
          this.loadParagraph();

        },
        (err) => {
          console.log(err);
          //redirigir a 404
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
    let paragraphSub = await this.pageService.getParagraph(this.currentPageId).subscribe((res: any) => {

      console.log("res loadParagraph", this.paragraphs)
      this.paragraphs = res;

    }, err => {
      //this.paragraph = false;
    });
    this.subscriptions.push(paragraphSub);
  }
  loadImage() {
    console.log("loadImage page", this.currentPageId);
    this.loadDataI(Number(this.currentPageId));
  }
  loadAudio() {
    console.log("loadAudio page", this.currentPageId);
    this.loadDataA(Number(this.currentPageId));
  }
  loadVideo() {
    console.log("loadVideo page", this.currentPageId);
    this.videos = [];
    let videoSub = this.pageService.getVideo(this.currentPageId).subscribe((res:any)=>{
      console.log("res loadVideo", res)
      this.videos = res;
    }, err =>console.log(err));  
    this.subscriptions.push(videoSub);
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
    if (evt.type === "adapted") {
      this.currentPageId = evt.id;
      this.reLoadData(this.tabIndex);
    }
  }

  onChangeTab(evt) {
    this.tabIndex = evt.index;
    this.reLoadData(this.tabIndex);
    console.log("evt", evt);
  }

  private reLoadData(idx) {
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
        //console.log('Datos', response);
        this.imagesGroup = response.map((image: any) => {
          return {
            id: image.id,
            id_tag_adapated: image.tags_adapted.id,
            link: image.tags_adapted.path_src,
            ref: image.tags_adapted.id_ref,
            text: image.tags_adapted.text
          }
        })
        this.imagesGroup = this.imagesGroup;

        this.nFoundImage = false;

      }, (err) => {
        this.nFoundImage = true;
      });
    this.subscribes.push(groupImages);
  }

  async loadDataA(id: number) {
    let groupAudios = await this.learningObjectService.getAudiosForPge(id).subscribe(
      response => {
        this.audiosGroup = response.map((audio: any) => {
          return {
            id: audio.id,
            html_text : audio.html_text,
            attributes: audio.attributes.map((attribute: any) =>{
              console.log('Se muestrra'+attribute)
                return{
                  path_src : attribute.data_attribute,
                }
            }),
            id_class_ref : audio.id_class_ref,
            id_tag_adapated:audio.tags_adapted?.id ,
            link: audio.tags_adapted?.path_src,
            ref: audio.tags_adapted?.id_ref,
            text: audio.tags_adapted?.text 
          }
        })
        this.audiosGroup = this.audiosGroup;
        this.nFoundAudio = false;
      }, (err) => {
        this.nFoundAudio = true;
      });
    this.subscribes.push(groupAudios);

  }

  onSave(evt) {
    console.log("onSave " + evt);

  }

  onChangeWebview(evt) {
    console.log("onChangeWebview ", evt);
    if (evt.index === 0) {
      this.tabAdapted = true;
    } else {
      this.tabAdapted = false;
    }
  }

}
