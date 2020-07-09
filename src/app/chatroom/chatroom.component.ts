import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../Services/chat.service';
import { Chatroom } from './Chatroom'
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {


  userId = sessionStorage.getItem("userId");
  chatrooms: Array<any> = [];

  constructor(private router: Router, private service: ChatService) {

  }

  ngOnInit(): void {
    this.getAllChatrooms();
  }


  goBack() {
    this.router.navigate(['newsfeed']);
  }


  getAllChatrooms() {
    this.service.getAllChatrooms(this.userId)
      .subscribe((res) => this.chatrooms = res)
  }

  chatWith(chatroomId, friendId) {
    this.router.navigate([`chat/${chatroomId}/${friendId}`])
  }

}
