import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Subscription } from "rxjs";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnDestroy {
  private _subscription: Subscription;
  public items!: MenuItem[];

  constructor(public breadcrumbService: BreadcrumbService) {
    this._subscription = breadcrumbService.itemsHandler.subscribe(
      (response) => {
        this.items = response;
      }
    );
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
