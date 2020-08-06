import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();
// token=new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging,private http: HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  this.angularFireMessaging.messaging.subscribe(
    (_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    }
  )
}

requestPermission() {
  this.angularFireMessaging.requestToken.subscribe(
    (token) => {
      console.log(token);
      this.myMethodSubject.next(token);
    },
    (err) => {
      console.error('Unable to get permission to notify.', err);
    }
  );
}

receiveMessage() {
  this.angularFireMessaging.messages.subscribe(
    (payload) => {
      console.log("new message received. ", payload);
      // this.currentMessage.next(payload);
    })
}

sendNotification(obj: any):Observable<any>{
  let headerDict = {
    'Content-Type': 'application/json',
    'Authorization':'key=AAAA81_riiM:APA91bF8FtqkcElESD0Uh9bBY2IjGJsD4gHp7X5SIpyE66peD9pya6O3Mq7xlFZdMmlAlb8oFp9XSedYyrR5ImiUqep40g_GYBiXfjvjzcpm8ZpxyPjPK74Y4E0gK2uEnJk17-wMLmCJ'
  }
 let requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(headerDict), 
  };
  
  
    return this.http.post("https://fcm.googleapis.com/fcm/send",obj,requestOptions)
}

 
}
