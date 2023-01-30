import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  sendEmail(data){
    return this.http.post(`${baseUrl}/contact/`, data)
  }
  sendEmailRequestApi(data){
    return this.http.post(`${baseUrl}/requestapi/`, data)
  }
}
