import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class LearningObjectService {
  constructor(private http: HttpClient) {}

  uploadObject(file: File) {
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${baseUrl}/learning_objects/`, formData, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }
}
