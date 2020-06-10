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

  addFriend(friendsIdObj):Observable<any>{
    return this.http.post(environment.baseUrl+"api/send-request",friendsIdObj);
  }

  cancelRequest(friendsIdObj):Observable<any>{
    return this.http.post(environment.baseUrl+"api/cancel-request",friendsIdObj)
  }

  acceptRequest(friendsIdObj):Observable<any>{
    return this.http.post(environment.baseUrl+"api/accept-request",friendsIdObj);
  }

  getAllRequests(id):Observable<any>{
    return this.http.get(environment.baseUrl+"api/get-all-requests/"+id);
  }

  getAllFriends(id):Observable<any>{
    return this.http.get(environment.baseUrl+"api/get-all-friends/"+id);
  }
}
