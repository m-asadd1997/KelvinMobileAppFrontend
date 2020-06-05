import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  registerUser(obj):Observable<any>{
    return this.http.post(environment.baseUrl+"token/user",obj);
  }

  searchUsers(name):Observable<any>{
    return this.http.get(environment.baseUrl+"token/"+name);
  }

  getUserById(id):Observable<any>{
    return this.http.get(environment.baseUrl+"token/user/"+id)
  }


}
