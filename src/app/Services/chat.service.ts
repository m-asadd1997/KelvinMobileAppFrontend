import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { userInfo } from 'os';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  url: any = environment.baseUrl;

  initiateChat(user1, user2): Observable<any> {
    return this.http.get(this.url + "api/initiate-chat?user1=" + user1 + "&user2=" + user2)
  }

  getAllChatroomChats(chatroomId, userId): Observable<any> {
    return this.http.get(this.url + "api/get-all-chats/" + chatroomId + "/" + userId);
  }


  getChatCount(userId): Observable<any> {
    return this.http.get(this.url + "api/get-chat-count/" + userId)
  }

  getAllChatrooms(userId): Observable<any> {
    return this.http.get(this.url + "api/get-all-chatrooms/" + userId);
  }
}
