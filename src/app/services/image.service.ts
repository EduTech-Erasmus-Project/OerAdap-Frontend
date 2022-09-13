import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public getImagesForPge(id: number) {
    return this.http
      .get(`${baseUrl}/page/image/${id}`)
      .pipe(map((data: any) => data));
  }

  public getAllImages(id: number) {
    return this.http.get(`${baseUrl}/learning_objects/image/${id}`);
  }

  public updateImage(data: any, id: any) {
    return this.http
      .put(`${baseUrl}/page/image/${id}`, data)
      .pipe(map((data: any) => data));
  }

  public updatePreviewImage(data: any, id: any) {
    return this.http
      .put(`${baseUrl}/adapter/image/preview/${id}`, data)
      .pipe(map((data: any) => data));
  }

  public revertImage(id: number, data: any) {
    return this.http
      .put(`${baseUrl}/revert/image/${id}`, data)
      .pipe(map((data: any) => data));
  }
}
