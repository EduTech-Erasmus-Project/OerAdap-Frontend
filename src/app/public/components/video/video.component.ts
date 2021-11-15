import { Component, Input, OnInit } from "@angular/core";
import { Video } from "../../../models/Page";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit {
  @Input() video: Video;

  constructor() {}

  ngOnInit(): void {}

  stopVideo() {
    var iframe = document.querySelector("iframe");
    var video = document.querySelector("video");
    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if (video) {
      video.pause();
    }
  }

  functionLoad(){
    console.log("load")
  }
}
