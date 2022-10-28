import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventService } from "../../../services/event.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/models/LearningObject';

@Component({
  selector: "app-iframe",
  templateUrl: "./iframe.component.html",
  styleUrls: ["./iframe.component.scss"],
})
export class IframeComponent implements OnInit, OnDestroy {
  @Input() page: Page;

  private subscription:Subscription;

  constructor(private eventService: EventService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent(){
    this.subscription = this.eventService.getEvent().subscribe((event) => {
      if (this.page.type === "adapted") {
        var iframe: any = document.getElementById("web-view");
        const url = iframe.src + '?timestamp=' + new Date().getTime()
        iframe.contentWindow.location.href = url;
      }
    });
  }
}
