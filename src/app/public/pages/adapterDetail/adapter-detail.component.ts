import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { LearningObject } from "src/app/models/LearningObject";
import { LearningObjectService } from "src/app/services/learning-object.service";

@Component({
  selector: "app-adapter-detail",
  templateUrl: "./adapter-detail.component.html",
  styleUrls: ["./adapter-detail.component.scss"],
})
export class AdapterDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private id: number;
  public learningObject: LearningObject;

  public image: boolean;
  public video: boolean;
  public audio: boolean;
  public button: boolean;
  public paragraph: boolean;

  constructor(
    private route: ActivatedRoute,
    private learningObjectService: LearningObjectService
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
          console.log(res);
          this.learningObject = res;

          this.image = this.getValueCheck("image");
          this.video = this.getValueCheck("video");
          this.audio = this.getValueCheck("audio");
          this.paragraph = this.getValueCheck("paragraph");
        },
        (err) => {
          console.log(err);
          //redirigir a 404
        }
      );
    this.subscriptions.push(learningObjectSub);
  }

  getValueCheck(value: string) {
    return this.learningObject.config_adaptability.areas.includes(value);
  }

  eventAdaptabilit(evt) {
    console.log("father event ", evt);
    this.image = evt.image;
    this.video = evt.video;
    this.audio = evt.audio;
    this.paragraph = evt.paragraph;
  }
}
