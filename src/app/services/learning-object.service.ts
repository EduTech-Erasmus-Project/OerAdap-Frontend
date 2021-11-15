import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class LearningObjectService {
  constructor(private http: HttpClient) { }
  
  //Paso de datos mediante servicios
  mensaje: string;
  private enviarMensajeSubject = new Subject<string>();
  enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

  enviarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }

  
  //**************************************



  uploadObject(data: any) {
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

  getLearningsObjects() {

  }

  getLearningObject(id: number) {
    //console.log("id ref", id)
    return this.http.get(`${baseUrl}/learning_objects/${id}`)
  }

  getImagesForPge(id: number) {
    return this.http.get(`${baseUrl}/page/image/${id}`).pipe(map((data: any) => data));
  }

  updateImage(data: any, id: any) {
    return this.http.put(`${baseUrl}/page/image/${id}`, data).pipe(map((data: any) => data));
  }

  getAudiosForPge(id: number) {
    return this.http.get(`${baseUrl}/page/audio/${id}`).pipe(map((data: any) => data));
  }

  sentCreateAudio(data:any){
    return this.http.post(`${baseUrl}/page/audio`,data).pipe(map((data: any) => data));
  }

  updateAudio(data: any, id: any) {
    return this.http.put(`${baseUrl}/page/audio/${id}`, data).pipe(map((data: any) => data));
  }

}
