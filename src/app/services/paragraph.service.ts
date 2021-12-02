import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class ParagraphService {
  constructor(private http: HttpClient) {}

  getTagAdaptedByIdParagraph(id: number) {
    return this.http.get(`${baseUrl}/adapter/paragraph/${id}`);
  }



  tagAdapted(data: any, id: number) {
    let formData = new FormData();

    if (data.file) {
      formData.append("file", data.file);
    }
    formData.append("text", data.text);
    formData.append("html_text", data.html_text);
    formData.append("tag_page_learning_object", data.tag_page_learning_object);
    //console.log(formData)

    return this.http.post(`${baseUrl}/adapter/paragraph/${id}`, formData, {
      reportProgress: false,
      observe: "events",
      responseType: "json",
    });
  }

  convertTextToAudio(id: number) {
    return this.http.get(`${baseUrl}/convert/paragraph/${id}`);
  }
}
