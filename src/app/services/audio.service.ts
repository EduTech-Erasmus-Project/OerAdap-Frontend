import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class AudioService {
  constructor(private http: HttpClient) {}

  public getAllSounds(id: number) {
    return this.http.get(`${baseUrl}/learning_objects/audio/${id}`);
  }

  public getAudiosForPge(id: number) {
    return this.http
      .get(`${baseUrl}/page/audio/${id}`)
      .pipe(map((data: any) => data));
  }

  public sentCreateAudio(data: any) {
    return this.http
      .post(`${baseUrl}/page/audio`, data)
      .pipe(map((data: any) => data));
  }

  public updateAudio(data: any, id: any) {
    return this.http
      .put(`${baseUrl}/page/audio/${id}`, data)
      .pipe(map((data: any) => data));
  }

  public revertAudio(id: number, data: any) {
    return this.http
      .put(`${baseUrl}/revert/audio/${id}`, data)
      .pipe(map((data: any) => data));
  }
}
