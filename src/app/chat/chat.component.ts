import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatService } from '../Services/chat.service';
import { environment } from '../../environments/environment'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as moment from 'moment'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // @HostListener('window:resize', ['$event'])
  // screenHeight;
  // screenWidth;

  innerHeight: number = window.innerHeight - 100;
  private stompClient;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  scrollTop: number = null;
  userId = sessionStorage.getItem("userId");
  chatroomId: string;
  friendId: number;
  friendObj: any;
  chats: Array<any> = [];
  email=sessionStorage.getItem("email")

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _location: Location,
    private service: ChatService) {
    // this.onResize();
  }

  ngOnInit(): void {
    const { chatroom, friendId } = this.activatedRoute.snapshot.params;
    this.chatroomId = chatroom;
    this.friendId = friendId;

    if (this.chatroomId && friendId) {
      this.getChats(this.chatroomId, this.friendId);
      this.initializeWebSocketConnection()
    }


  }
  ngOnDestroy() {
    if (this.stompClient) {
      console.log("unsubscribeddddd")
      this.goOffline();
      this.stompClient.unsubscribe()
    }
  }
 
  initializeWebSocketConnection() {
    const url = environment.baseUrl;
    let ws = new SockJS(url + "ws");
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {

      that.openGlobalSocket()
      that.goOnline();

    });
  }
  openGlobalSocket() {
    let that = this;
    this.stompClient.subscribe(`/topic/chatroom/${this.chatroomId}`, (message) => {
      console.log(JSON.parse(message.body), "   =========message")
      this.chats.push(JSON.parse(message.body));
    

    });
  }
  goOnline() {
    this.stompClient.send(`/app/go-online/${this.email}`, {});
  }

  goOffline() {
    this.stompClient.send(`/app/go-offline/${this.email}`, {});
  }

  getChats(chatroomId, friendId) {
    this.service.getAllChatroomChats(chatroomId, friendId)
      .subscribe((res) => {
        console.log(res)
        this.friendObj = res.object;
        this.chats = res.list;
      
      })
  }

  sendMessage(messageInput) {
    if (messageInput.value.length > 0) {

      this.stompClient.send(`/app/chat/${this.friendObj.id}/${this.chatroomId}`, {}, JSON.stringify({ message: messageInput.value, userId: this.userId }));
      messageInput.value = "";
      // this.scrollToBottom();

    }

  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  formateTime(date) {
    return moment(date).format('LT');
  }

  getToday(){
    return moment(new Date()).format('LLLL')
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  // onResize(event?) {
  //   this.screenHeight = window.innerHeight - 102;
  //   this.screenWidth = window.innerWidth;
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

  goBack() {
    this._location.back()
  }
}
