import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class LearningObjectService {
  constructor(private http: HttpClient) {}

  uploadObject(data:any) {
    //console.log(data)
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("areas", data.areas);
    formData.append("method", data.method);
    //console.log(formData)
    return this.http.post(`${baseUrl}/learning_objects/`, formData, {
      reportProgress: true,
      observe: "events",
      responseType: "json",
    });
  }

  getLearningsObjects(){

  }

  getLearningObject(id:number){
    //console.log("id ref", id)
    return this.http.get(`${baseUrl}/learning_objects/${id}`)
  }
}
