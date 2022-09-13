import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class VideoService {
  constructor(private http: HttpClient) {}

  public getAllVideos(id: number) {
    return this.http.get(`${baseUrl}/learning_objects/video/${id}`);
  }

  public getVidoTranscript(id: number) {
    return this.http.get(`${baseUrl}/adapter/gettranscript/${id}`);
  }

  public generateAutomaticTranscript(id: number) {
    return this.http.post(`${baseUrl}/adapter/video/subtitle/generate/${id}`, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }

  public addTranscript(id: number, data: any) {
    let formData = new FormData();
    data.transcriptions.forEach(transcript => {
      formData.append("language", transcript.language.name);
      formData.append("code", transcript.language.code);
      formData.append("file", transcript.file_data);
    })

    return this.http.post(`${baseUrl}/adapter/video/subtitle/add/${id}`, formData, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }

  public updateTranscript(id: number, data: any) {
    return this.http.post(`${baseUrl}/adapter/updatetranscript/${id}`, data);
  }

  public revertVideo(id: number, data: any) {
    return this.http
      .put(`${baseUrl}/revert/video/${id}`, data)
      .pipe(map((data: any) => data));
  }
}
