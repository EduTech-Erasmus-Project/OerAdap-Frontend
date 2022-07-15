import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventService } from "../../../services/event.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-iframe",
  templateUrl: "./iframe.component.html",
  styleUrls: ["./iframe.component.css"],
})
export class IframeComponent implements OnInit, OnDestroy {
  @Input() page: any;

  private subscription:Subscription;

  constructor(private eventService: EventService) {}
  ngOnDestroy(): void {
    //console.log("unsuscribe iframe event")
    this.subscription.unsubscribe();

  }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent(){
    //.log("page", this.page)
    this.subscription = this.eventService.getEvent().subscribe((event) => {
      if (this.page.type === "adapted") {
        //console.log("event refresh", this.page)

        var iframe: any = document.getElementById("web-view");
        //iframe.contentWindow.location.reload();
        //iframe.src = "";
        //iframe.src = this.page.code;

        const url = iframe.src + '?timestamp=' + new Date().getTime()
        //document.getElementById('my-iframe-id').src = url
        iframe.contentWindow.location.href = url;

        //this.ngOnInit();

        //window.location.reload();
        //this.router.navigate([this.router.url])
      }
    });
  }
}
