import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  constructor( private http: HttpClient ) { }

  getSleepSummary() {
    return this
      .http
      .get(`${environment.apiUrl}/v1/sleep`);
  }
}
