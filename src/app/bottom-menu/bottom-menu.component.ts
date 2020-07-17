import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { NotificationService } from '../Services/notification.service';
import { ChatService } from '../Services/chat.service';
import { environment } from '../../environments/environment'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as moment from 'moment'
import { ToastUtilService } from '../Services/toast-util.service';
import * as $ from 'jquery';




@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {

  private stompClient;
  id = sessionStorage.getItem('userId')
  friendsArray = [];
  userName: string;
  profilePicture;
  checkStorage;
  notificationCount: number = 0;
  userType = sessionStorage.getItem("userType")
  email = sessionStorage.getItem("email")
  chatCount: number = 0;
  message;
  // @Input("noOfNotifications") noOfNotifications:number;

  constructor(private router: Router, private service: MainService,
    private notificationService: NotificationService, private chatService: ChatService,private toastService:  ToastUtilService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('username');
    this.initializeWebSocketConnection();
    this.checkSessionStorage();
    this.getProfilePicture();
    this.getNotificationCount();
    this.updateNotificationCount();
    this.getChatsCount()
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage



  }
  checkUserType() {
    if (this.userType == "admin")
      return true;
    else
      return false;
  }


  initializeWebSocketConnection() {
    const url = environment.baseUrl;
    let ws = new SockJS(url + "ws");
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {

      that.openGlobalSocket();
      that.goOnline()

    });
  }

  checkSessionStorage() {
    this.checkStorage = sessionStorage.getItem('profilePicture')
    if (this.checkStorage !== "null") {
      this.profilePicture = sessionStorage.getItem('profilePicture')
    }
  }

  ngOnDestroy() {
    if (this.stompClient)
      this.goOffline();
  }

  getAllFriends() {

    // this.profilePicture = sessionStorage.getItem('profilePicture');
    this.friendsArray = [];

    this.service.getAllFriendsAndStatus(this.id).subscribe(d => {
      if (d.status == 200) {
        console.log(d)
        d.result.map(u => {
          this.friendsArray.push(u);
        })
      }

    })
  }


  openGlobalSocket() {
    console.log("open global socket")
    let that = this;
    this.stompClient.subscribe(`/topic/notification/${this.id}`, (message) => {
      console.log((message.body), "   =========message")
     this.toastService.showToast("Hello", "#toast-9")
      // this.chats.push(JSON.parse(message.body));

    

    });
  }


 


  goOnline() {
    this.stompClient.send(`/app/go-online/${this.email}`, {});
  }

  goOffline() {
    this.stompClient.send(`/app/go-offline/${this.email}`, {});
  }

  goToNewsFeed() {
    if(this.userType == "admin"){
      this.router.navigate(['discoverevents'])
    }
    else{
      this.router.navigate(['newsfeed'])
    }
    
  }

  goToNotifications() {
    this.router.navigate(['notifications'])
  }
  goToMyProfile() {
    this.router.navigate(['profiles/', this.id])
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getProfilePicture() {
    this.service.sendPicture$.subscribe(d => {
      this.profilePicture = d
    })
  }

  updateNotificationCount() {
    this.notificationService.updateNotification$.subscribe(() => {
      console.log("heyhey")
      this.getNotificationCount();
    })
  }
  getNotificationCount() {
    this.notificationService.getAllNotificationCount(this.id)
      .subscribe((res) => {
        console.log(res)
        this.notificationCount = res.result;
      })
  }

  gotoChatroom(friendId) {
    this.chatService.initiateChat(this.id, friendId)
      .subscribe((chatroom) => {
        this.router.navigate([`chat/${chatroom}/${friendId}`])
      })
  }

  getChatsCount() {
    this.chatService.getChatCount(this.id)
      .subscribe((res) => this.chatCount = res)
  }
}
