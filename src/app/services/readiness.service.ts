import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadinessService {

  constructor( private http: HttpClient ) { }

  getReadinessSummary() {
    return this
      .http
      .get(`${environment.apiUrl}/v1/readiness`);
  }
}
