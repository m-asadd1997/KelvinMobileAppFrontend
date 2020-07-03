import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private sendPictureFromProfile = new Subject<any>();
  sendPicture$ = this.sendPictureFromProfile.asObservable();

  constructor(private http:HttpClient) { }

  sendPicture(picture){
    this.sendPictureFromProfile.next(picture);
  }

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
  getAllFriendsAndStatus(id):Observable<any>{
    return this.http.get(environment.baseUrl+"api/get-all-friends-status/"+id);
  }

  getProfile(id):Observable<any>{
    return this.http.get(environment.baseUrl+"api/profile/getprofile/"+id);
  }

  saveDescription(obj):Observable<any>{
    return this.http.post(environment.baseUrl+"token/description",obj);
  }

  saveProfilePicture(obj):Observable<any>{
    return this.http.post(environment.baseUrl+"token/picture",obj)
  }

  saveGalleryImage(obj):Observable<any>{
    return this.http.post(environment.baseUrl+"api/gallery/",obj);
  }

  getAllImages(id):Observable<any>{
    return this.http.get(environment.baseUrl+"api/gallery/"+id);
  }

  getImageById(id):Observable<any>{
    return this.http.get(environment.baseUrl+"api/gallery/singleimage/"+id);
  }

  deleteGalleryImage(id):Observable<any>{
    return this.http.delete(environment.baseUrl+"api/gallery/"+id);
  }
  
}
