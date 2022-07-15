import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer, Subject } from "rxjs";
import { map } from "rxjs/operators";
//import { Socket } from "ngx-socket-io";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  public progress$: BehaviorSubject<any>;
  //socket:WebSocket;
  private subject: Subject<any>;

  constructor() {
    //this.socket = new WebSocket("ws://localhost:8000/api/adapter/video/progress/abcd/") //io('http://localhost:8000/api/adapter/video/progress/abcd/');
    this.progress$ = new BehaviorSubject({});
  }

  // public getProgress = () => {
  //   this.socket.onmessage((event:any) => {
  //     this.progress$.next(JSON.parse(event.data));
  //   });

  //   return this.progress$.asObservable();
  // };

  // public getProgress = () => {
  //   this.socket.onmessage = (event:any) => {
  //     this.progress$.next(JSON.parse(event.data));
  //   }
  //   return this.progress$.asObservable();
  // }

  public getProgress(id: number): Observable<any> {
    //return this.socket.fromEvent("fetchMovies");
    return this.connect(`${environment.serverWs}/adapter/video/progress/${id}`).pipe(map(res => JSON.parse(res.data)));
  }

  
  public connect(url): Subject<any> {
    if (!this.subject) {
      this.subject = this.create(url);
      //console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Subject<any> {
    let ws = new WebSocket(url);

    ws.onerror = (event) => {
      //console.log("WebSocket error: " + event);
    }

    ws.onopen = () => {
      //console.log("Successfully connected: " + url);
    }

    ws.onmessage = (event: any) => {
      //console.log("WebSocket mesague ", event.data);
      //this.progress$.next(JSON.parse(event.data));
    }

    ws.onclose = (event) => {
      //console.log("WebSocket closed: " + event);
    }

    let observable = new Observable((obs: Observer<any>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return Subject.create(observer, observable);
  }
}
