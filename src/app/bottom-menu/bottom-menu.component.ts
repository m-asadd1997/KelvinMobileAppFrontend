import { Component, OnInit, Input, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "../Services/main.service";
import { NotificationService } from "../Services/notification.service";
import { ChatService } from "../Services/chat.service";
import { environment } from "../../environments/environment";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import * as moment from "moment";
import { ToastUtilService } from "../Services/toast-util.service";
import * as $ from "jquery";
import { MessagingService } from "../services/messaging.service";
import { NotificationBody } from "./notificationBody";
import { Profile } from '../profile/profile';

@Component({
  selector: "app-bottom-menu",
  templateUrl: "./bottom-menu.component.html",
  styleUrls: ["./bottom-menu.component.css"],
})
export class BottomMenuComponent implements OnInit {
  private stompClient;
  id = sessionStorage.getItem("userId");
  friendsArray = [];
  userName: string;
  profilePicture;
  checkStorage;
  notificationCount: number = 0;
  userType = sessionStorage.getItem("userType");
  email = sessionStorage.getItem("email");
  chatCount: number = 0;
  message;
  deferredPrompt: any;
  showButton = false;
  token: any;
  notificationObj: NotificationBody = new NotificationBody();
  reqCount: number = 0;
  userObj: Profile = new Profile();
  // @Input("noOfNotifications") noOfNotifications:number;

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    private service: MainService,
    private notificationService: NotificationService,
    private chatService: ChatService,
    private toastService: ToastUtilService
  ) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.userName = sessionStorage.getItem("username");
    this.initializeWebSocketConnection();
    this.checkSessionStorage();
    this.getProfilePicture();
    this.getNotificationCount();
    // this.updateNotificationCount();
    this.getChatsCount();
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.getToken();

    // this.getAllNotifications();
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }

  getToken() {
    this.messagingService.myMethod$.subscribe((data) => {
      console.log("response of token ", data);
      this.token = data.toString();
      console.log("token is here ", data);
    });
  }
  checkUserType() {
    if (this.userType == "admin") return true;
    else return false;
  }

  initializeWebSocketConnection() {
    const url = environment.baseUrl;
    let ws = new SockJS(url + "ws");
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.openGlobalSocketForRequestNotification();
      that.openGlobalSocketForPostNotification();
      that.goOnline();
    });
  }

  checkSessionStorage() {
    this.checkStorage = sessionStorage.getItem("profilePicture");
    if (this.checkStorage !== "null") {
      this.profilePicture = sessionStorage.getItem("profilePicture");
    }
  }

  ngOnDestroy() {
    if (this.stompClient) {
      this.goOffline();
      this.stompClient.unsubscribe();
      // this.stompClient.terminate()
    }
  }

  getAllFriends() {
    // this.profilePicture = sessionStorage.getItem('profilePicture');
    this.friendsArray = [];

    this.service.getAllFriendsAndStatus(this.id).subscribe((d) => {
      if (d.status == 200) {
        console.log(d);
        d.result.map((u) => {
          this.friendsArray.push(u);
        });
      }
    });
  }

  openGlobalSocketForRequestNotification() {
    console.log("open global socket");
    let that = this;
    this.stompClient.subscribe(`/topic/notification/${this.id}`, (message) => {
      console.log(JSON.parse(message.body), "   =========message");
      let notificationMsg = JSON.parse(message.body).result.message;
      let notificationId = JSON.parse(message.body).result.id;
      if (JSON.parse(message.body).status == 200) {
        this.notificationService
          .seenNotification(notificationId)
          .subscribe((d) => {
            //  this.notifyMe(notificationMsg);
          });
      }
    });
  }

  openGlobalSocketForPostNotification() {
    console.log("open global socket");
    let that = this;
    this.stompClient.subscribe(
      `/topic/post-notification/${this.id}`,
      (message) => {
        console.log(JSON.parse(message.body), "   =========message");
        let notificationMsg = JSON.parse(message.body).result.message;
        let notificationId = JSON.parse(message.body).result.id;
        let userId = JSON.parse(message.body).result.notificationFrom.id;
        if (JSON.parse(message.body).status == 200) {
          this.notificationService
            .seenAllPostNotifications(notificationId, userId)
            .subscribe((d) => {
              //  this.notifyMe(notificationMsg);
              
            });
            
        }
      }
    );
  }

  // getAllNotifications(){

  //   if(sessionStorage.length > 0 && this.id != null){
  //     this.notificationService.getAllNotifications(this.id).subscribe(d=>{
  //       console.log("notifications on app component")
  //       if(d.status == 200){

  //         d.result.map(data=>{
  //           this.notifyMe(data.message);
  //         })
  //       }
  //       else{
  //         console.log("no new notifications");

  //       }

  //     })
  //   }
  // }

  notifyMe(msg) {
    this.notificationObj.notification.title =
      "New notification from Montreal Sauvage";
    this.notificationObj.notification.body = msg;
    this.notificationObj.notification.icon = "assets/MTLSAUVAGE-LOGO.png";
    this.notificationObj.to = this.token;
    this.messagingService.sendNotification(this.notificationObj).subscribe();
  }

  goOnline() {
    this.stompClient.send(`/app/go-online/${this.email}`, {});
  }

  goOffline() {
    this.stompClient.send(`/app/go-offline/${this.email}`, {});
  }

  goToNewsFeed() {
    if (this.userType == "admin") {
      this.router.navigate(["discoverevents"]);
    } else {
      this.router.navigate(["newsfeed"]);
    }
  }

  goToNotifications() {
    
      this.updateNotificationsCount('req')
   
    
  }
  goToMyProfile() {
    this.router.navigate(["profiles/", this.id]);
  }
  logout() {
    this.stompClient.unsubscribe();
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  getProfilePicture() {
    this.service.sendPicture$.subscribe((d) => {
      this.profilePicture = d;
    });
  }

  updateNotificationCount() {
    this.notificationService.updateNotification$.subscribe(() => {
      console.log("heyhey");
      this.getNotificationCount();
    });
  }
  getNotificationCount() {
    this.notificationService
      .getNumberOfNotifications(this.id)
      .subscribe((res) => {
        console.log(res);
        this.notificationCount = res.result.numberOfNotifications;
        this.reqCount = res.result.numberOfFriendRequests;
        console.log("notification count ",res.result.numberOfNotifications);
        console.log("req count ",res.result.numberOfFriendRequests);
        
      });

      // console.log("notification count ",this.notificationCount)
      // console.log("req count ",this.reqCount)

  }

  gotoChatroom(friendId) {
    this.chatService.initiateChat(this.id, friendId).subscribe((chatroom) => {
      this.router.navigate([`chat/${chatroom}/${friendId}`]);
    });
  }

  getChatsCount() {
    this.chatService
      .getChatCount(this.id)
      .subscribe((res) => (this.chatCount = res));
  }

  // notifyMe(msg) {
  //   // Let's check if the browser supports notifications
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }

  //   // Let's check whether notification permissions have already been granted
  //   else if (Notification.permission === "granted") {
  //     // If it's okay let's create a notification
  //     // console.log(notification)
  //     this.showNotification(msg);
  //   }

  //   // Otherwise, we need to ask the user for permission
  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       // If the user accepts, let's create a notification
  //       console.log(permission)
  //       if (permission === "granted") {
  //         // console.log(notification)
  //         this.showNotification(msg);
  //       }
  //     });
  //   }

  // }

  showNotification(msg) {
    const notification = new Notification("Montreal Sauvage", {
      body: msg,
      icon: "assets/MTLSAUVAGE-LOGO.png",
    });
  }

  @HostListener("window:beforeinstallprompt", ["$event"])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      this.deferredPrompt = null;
    });
  }

  goToAddPostNotifications() {
   
      this.updateNotificationsCount('post')
    
  }

  updateNotificationsCount(type){
    if(this.notificationCount > 0 || this.reqCount > 0){
    if(type === 'req')
    {
      this.reqCount = 0;
    }
    else if(type == 'post'){
      this.notificationCount = 0;
    }
    
    this.userObj.numberOfFriendRequests = this.reqCount;
    this.userObj.numberOfNotifications = this.notificationCount;
    this.notificationService.updateNoOfNotifications(this.id,this.userObj).subscribe(d=>{
      if(d.status == 200){
        if(type === 'req'){
          this.router.navigate(["notifications"]);
        }
        else if(type === 'post')
        {
          this.router.navigate(["addpostnotifications"]);
        }
        this.getNotificationCount();       
      }      
    })
  }else{
    if(type === 'req'){
      this.router.navigate(["notifications"]);
    }
    else if(type === 'post')
    {
      this.router.navigate(["addpostnotifications"]);
    }
  }
  }
}
