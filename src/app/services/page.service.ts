import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http:HttpClient) { }

  getParagraph(pageId:number){
    return this.http.get(`${baseUrl}/page/paragraph/${pageId}`)
  }
  getImage(pageId:number){
    
  }
  getVideo(pageId:number){
    
  }
  getAudio(pageId:number){
    
  }
}