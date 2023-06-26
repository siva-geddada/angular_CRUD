import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './model/user-model';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/api';
  httpHeaders = {

  }

  private _refresh = new Subject();
  constructor(public http: HttpClient) { }

  get refresh$() {
    return this._refresh
  }
  getAllUsers() {
    return this.http.get(this.baseUrl + '/getAllUsers');
  }
  addNewUser(data: any) {
    return this.http.post(this.baseUrl + '/signup', data).pipe(tap(() => {
      this._refresh.next(true)
    }))
  }
  editUser(data: any) {
    return this.http.get(this.baseUrl + '/getUser/' + `${data}`)
  }
  deleteUser(data: any) {
    return this.http.delete(this.baseUrl + '/deleteUser/' + `${data}`).pipe(tap(() => {
      this._refresh.next(true)
    }))
  }
}
