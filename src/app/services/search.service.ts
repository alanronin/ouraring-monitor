import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('assets/people.json');
  }

  search(q: string): Observable<any> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().pipe(
      map((data: any) => data
        .map(item => !!localStorage['person' + item.user_id] ?
          JSON.parse(localStorage['person' + item.user_id]) : item)
        .filter(item => JSON.stringify(item).toLowerCase().includes(q))
      ));
  }

  get(user_id: number) {
    return this.getAll().pipe(map((all: any) => {
      if (localStorage['person' + user_id]) {
        return JSON.parse(localStorage['person' + user_id]);
      }
      return all.find(e => e.user_id === user_id);
    }));
  }
}

/*export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj && obj.street || null;
    this.city = obj && obj.city || null;
    this.state = obj && obj.state || null;
    this.zip = obj && obj.zip || null;
  }
}*/

export class Person {
  user_id: number;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  //address: Address;

  constructor(obj?: any) {
    this.user_id = obj && Number(obj.user_id) || null;
    this.age = obj && Number(obj.age) || null;
    this.weight = obj && Number(obj.weight) || null;
    this.height = obj && Number(obj.height) || null;
    this.email = obj && obj.email || null;
    this.gender = obj && obj.gender || null;
    //this.address = obj && obj.address || null;
  }
}
