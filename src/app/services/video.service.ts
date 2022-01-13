import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVidoTranscript(id: number) {
    //console.log("id get", id)
    return this.http.get(`${baseUrl}/adapter/gettranscript/${id}`);
  }

  generateAutomaticTranscript(id: number) {
    return this.http.post(`${baseUrl}/adapter/video/subtitle/generate/${id}`, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }

  addTranscript(id: number, data: any) {
    //console.log(data);
    //console.log(data.transcriptions.map(res => res ))
    let formData = new FormData();
    //var blob = new Blob([data], { type: "text/xml"});
    data.transcriptions.forEach(transcript => {
      formData.append("language", transcript.language.name);
      formData.append("code", transcript.language.code);
      formData.append("file", transcript.file_data);
    })

    //formData.append("data", blob);


    return this.http.post(`${baseUrl}/adapter/video/subtitle/add/${id}`, formData, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }
}
