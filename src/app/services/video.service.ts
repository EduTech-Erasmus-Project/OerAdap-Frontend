import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http:HttpClient) { }

  getVidoTranscript(id:number){
    //console.log("id get", id)
    return this.http.get(`${baseUrl}/adapter/gettranscript/${id}`);
  }

  generateAutomaticTranscript(id:number){
    return this.http.post(`${baseUrl}/adapter/video/subtitle/generate/${id}`,{});
  }


  
}
