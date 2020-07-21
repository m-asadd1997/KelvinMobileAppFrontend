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
    this.getChatsCount();
    this.getAllNotifications();
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

      that.openGlobalSocketForRequestNotification();
      that.openGlobalSocketForPostNotification();
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
      {this.goOffline();
        this.stompClient.unsubscribe()
        // this.stompClient.terminate()
      }

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


  openGlobalSocketForRequestNotification() {
    console.log("open global socket")
    let that = this;
    this.stompClient.subscribe(`/topic/notification/${this.id}`, (message) => {
      console.log(JSON.parse(message.body), "   =========message")
      let notificationMsg = JSON.parse(message.body).result.message
      let notificationId = JSON.parse(message.body).result.id;
      if(JSON.parse(message.body).status == 200){
        this.notificationService.seenNotification(notificationId).subscribe(d=>{
             this.notifyMe(notificationMsg);
          }
        );
      }
    

    });
  }

  openGlobalSocketForPostNotification() {
    console.log("open global socket")
    let that = this;
    this.stompClient.subscribe(`/topic/post-notification/${this.id}`, (message) => {
      console.log(JSON.parse(message.body), "   =========message")
      let notificationMsg = JSON.parse(message.body).result.message;
      let notificationId = JSON.parse(message.body).result.id;
      let userId = JSON.parse(message.body).result.notificationFrom.id
      if(JSON.parse(message.body).status == 200){
        this.notificationService.seenAllPostNotifications(notificationId,userId).subscribe(d=>{
             this.notifyMe(notificationMsg);
          }
        );
      }
      
      
    

    });
  }

  getAllNotifications(){
    
    if(sessionStorage.length > 0 && this.id != null){
      this.notificationService.getAllNotifications(this.id).subscribe(d=>{
        console.log("notifications on app component")
        if(d.status == 200){
          
          d.result.map(data=>{
            this.notifyMe(data.message);
          })
        }
        else{
          console.log("no new notifications");
          
        }
      
      })
    }
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
    this.stompClient.unsubscribe()
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

  notifyMe(msg) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      // console.log(notification)
      this.showNotification(msg);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        console.log(permission)
        if (permission === "granted") {
          // console.log(notification)
          this.showNotification(msg);
        }
      });
    }

  }

 

  showNotification(msg) {
    const notification = new Notification('Montreal Sauvage', {
      body: msg,
      icon: 'assets/MTLSAUVAGE-LOGO.png'
  
    })
  }

  


}
