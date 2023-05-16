import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LearningObjectService } from "src/app/services/learning-object.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"],
})
export class DeleteComponent implements OnInit {
  private key?: string;
  public resum: number;
  public loader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private learningObjectService: LearningObjectService
  ) {
    this.key = this.route.snapshot.queryParamMap.get("key");
    if (!this.key) {
      this.router.navigate(["/notfound"]);
    }
    //console.log(this.route.snapshot.queryParamMap.get('key'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    try {
      this.loader = true
      let res: any = await this.learningObjectService
        .delete({
          key: this.key,
        })
        .toPromise();
      this.resum = res.data;
      this.loader = false
    } catch (error) {
      console.log(error);
      this.router.navigate(["/notfound"]);
    }
  }
}
