import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class LearningObjectService {

  constructor(private http: HttpClient) {}

  public uploadObject(data: any) {
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("areas", data.areas);
    formData.append("method", data.method);
    return this.http.post(`${baseUrl}/learning_objects/`, formData, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }

  public getLearningsObjects() {
    return this.http.get(`${baseUrl}/learning_objects/`);
  }

  public getLearningObject(id: number) {
    //console.log("id ref", id)
    return this.http.get(`${baseUrl}/learning_objects/${id}`);
  }

  public getDownloadFileZip(id: any, data: any) {
    return this.http
      .post(`${baseUrl}/compress/learningObject/${id}`, data)
      .pipe(map((data: any) => data));
  }

  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getTagAdapted(id: any) {
    return this.http
      .get(`${baseUrl}/adapted/tag/${id}`)
      .pipe(map((data: any) => data));
  }

  public updateLearningObject_file_adapted(id: any, data: any) {
    return this.http
      .put(`${baseUrl}/adapted/learningObject/${id}`, data)
      .pipe(map((data: any) => data));
  }

  

  public getMetadataInfo() {
    return this.http.get(`${baseUrl}/metadata_info/`);
  }
}
