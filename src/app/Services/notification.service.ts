
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  private sendNotification = new Subject<any>();
  updateNotification$ = this.sendNotification.asObservable();

  updateNotification() {
  
    this.sendNotification.next();
  }
  getAllNotificationCount(id): Observable<any> {

    return this.http.get(environment.baseUrl + "api/notification/get-notification-count/" + id);
  }

  getLiveNotification(toId,fromId,type):Observable<any>{
    return this.http.get(environment.baseUrl + "api/notification/"+toId+"/"+fromId+"/"+type);
  }

  getAllNotifications(id):Observable<any>{
    return this.http.get(environment.baseUrl + "api/notification/get-all-unseen/"+id)
  }

  seenNotification(id){
    return this.http.get(environment.baseUrl + "api/notification/seen-notification/"+id)

  }

  seenAllPostNotifications(id,userId){
    return this.http.get(environment.baseUrl+"api/notification/seen-all-notification/"+id+"/"+userId);
  }

  getAllNotificationsForLoggedInUser(id):Observable<any>{
    return this.http.get(environment.baseUrl + "api/notification/get-all/"+id)
  }

  deleteNotification(id):Observable<any>{
    return this.http.delete(environment.baseUrl+"api/notification/delete-notification/"+id);
  }

  getNumberOfNotifications(id):Observable<any>{
    return this.http.get(environment.baseUrl+"token/user/"+id)
  }

  updateNoOfNotifications(id,obj):Observable<any>{
    return this.http.put(environment.baseUrl+"token/update-notificationscount/"+id,obj);
  }
}
