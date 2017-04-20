import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(private http:Http) { }

  newFeed():Observable<any>{
    return this.http.get(`${environment.apiUrl}special/api/new-feed`)
      .map(res=>res.json())
      .catch((err:any)=>Observable.throw(err.json().message || 'Server Error'))
  }

  isAuth():Observable<any>{
    return this.http.get(`${environment.apiUrl}special/api/isauth`)
      .map(res=>true)
      .catch((err:any)=>Observable.throw(err.json().message || 'Server Error'));
  }

  logout():Observable<any>{
    return this.http.get(`${environment.apiUrl}logout`)
      .map(res=>true)
      .catch((err:any)=>Observable.throw(err.json().message || 'Server Error'));
  }
}
