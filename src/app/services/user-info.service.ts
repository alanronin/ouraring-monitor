import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor( private http: HttpClient ) { }

  getUserInfo(token) {
    return this
      .http
      .get(`${environment.apiUrl}/v1/userinfo?${token}`);
  }
}
