import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

    get() {
      return this.http.get('/api/User'); //https://localhost:44352/ webapi host urls
    }

    post(formData) {
      return this.http.post('/api/User', formData);
    }

    put(id, formData) {
      return this.http.put('/api/User/' + id, formData);
    }

    delete(id) {
      return this.http.delete('/api/User/' + id);
    }
  }
