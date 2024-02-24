import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserUrl:string  = " http://localhost:3000/users"


  constructor(private httpclient: HttpClient) { }
signup(obj:any):Observable<{msg:any}>{
  return this.httpclient.post<{msg:any}>(`${this.UserUrl}/signup`,obj);

}
login(obj:any): Observable<{ msg: string, token: Token}> {
  return this.httpclient.post<{ msg: string, token:Token }>(`${this.UserUrl}/login`, obj);
}

 }
