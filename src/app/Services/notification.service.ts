
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

    return this.http.get(environment.baseUrl + "api/get-notification-count/" + id);
  }

}
