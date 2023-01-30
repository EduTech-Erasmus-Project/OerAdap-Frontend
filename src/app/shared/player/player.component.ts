import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment'
import { element } from 'protractor';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
@Input() path_src : string;

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  audioPlay: boolean = false;
  duration: any;
  currentTime: any;
  audio: any;
  seek: any;

  constructor() {
    this.currentTime = "00:00";
    this.duration = "00:00";
    this.seek = 0;
    this.audio = new Audio();
  }

  ngOnInit(): void {
    //this.audio = new Audio('/assets/music/anson-seabra-welcome-to-wonderland-official-lyric-video.mp3');
    //this.time = this.audio.duration
  
    this.audio.src = this.path_src;
    this.audio.load();
  }
  ngAfterViewInit() {
    //this.time = this.audio.nativeElement.duration
    //this.time = this.audio.nativeElement.duration
    //console.log(this.audio)
  }


  onPlay() {
    //console.log(this.audio)

    if (!this.audio.canplay) {
      //console.log('start')
      this.audioPlay = true;
      this.streamObserver().subscribe(event => { })
    }

    if (this.audio.paused) {
      //console.log('play')
      this.audioPlay = true;
      this.audio.play()

    } else {
      //console.log('pause')
      this.audioPlay = false;
      this.audio.pause()
    }
  }

  streamObserver() {
    return new Observable(observable => {

      const handler = (event: Event) => {
        //console.log(event)
        this.duration = this.timeFormat(this.audio.duration);
        this.currentTime = this.timeFormat(this.audio.currentTime);
        this.seek = this.audio.currentTime;
      }

      this.addEvent(this.audio, this.audioEvents, handler);
    })


  }

  addEvent(audio: any, audioEvents: string[], handler) {
    audioEvents.forEach(event => {
      audio.addEventListener(event, handler);
    });

  }
  /*
  removeEvent(audio: any, audioEvents: string[], handler) {
    audioEvents.forEach(event => {
      audio.removeEventListener(event, handler);
    });
  }*/

  onVolume(element) {
    //console.log('onVolume',elemt)
    this.audio.volume = element.value;
  }

  timeFormat(time, format = "mm:ss") {
    let momentTime = time*1000;
    return moment.utc(momentTime).format(format);
  }

  onSeekTo(element) {
    //console.log(element.value)
    this.audio.currentTime = element.value;

  }



}
