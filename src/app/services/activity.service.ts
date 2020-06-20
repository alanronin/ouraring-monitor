import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor( private http: HttpClient ) { }

  getActivitySummary() {
    return this
      .http
      .get(`${environment.apiUrl}/v1/activity`);
  }
}
