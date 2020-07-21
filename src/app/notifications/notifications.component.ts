import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { FriendsIds } from '../profile/friendsIds';
import { NotificationService } from '../Services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  id;
  notificationsArray = [];
  friendsIdObj: FriendsIds = new FriendsIds();
  requestStatus;
  showReqStatus = false;
  noOfNotifications = 0;
  screenHeight = null;
  screenWidth = null;
  constructor(private router: Router, private service: MainService, private notificationService: NotificationService) {
    this.onResize();
   }

  ngOnInit(): void {
    this.noOfNotifications = 0;
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationsArray = []
    this.id = sessionStorage.getItem('userId')
    this.notificationService.getAllNotificationsForLoggedInUser(this.id).subscribe(d => {
      if (d.status == 200) {
        console.log("Notiss==========>",d);
        d.result.map(u => {
          this.notificationsArray.push(u);       

        })
        
        
        this.noOfNotifications = this.notificationsArray.length;
        
      }
      console.log("ye hai notifcation array", this.notificationsArray);
      
    })

    // = this.usersArray.length;




  }
  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
  }

  acceptRequest(id,notifcationId) {
    this.populateFriendsIdObj(id,notifcationId);
    this.service.acceptRequest(this.friendsIdObj).subscribe(d => {
      if (d.status == 200) {
        this.requestStatus = "Accepted."
        this.showReqStatus = true;
        this.notificationService.deleteNotification(notifcationId).subscribe(d=>{
          if(d.status == 200)
          this.getAllNotifications()
        })
         
        this.notificationService.updateNotification();
      }
      else {
        console.log("ERROR");

      }
    })
  }

  deleteRequest(id,notifcationId) {
    this.populateFriendsIdObj(id,notifcationId);
    this.service.cancelRequest(this.friendsIdObj).subscribe(d => {
      if (d.status == 200) {
        this.requestStatus = "Deleted."
        this.showReqStatus = true;
        this.notificationService.deleteNotification(notifcationId).subscribe(d=>{
          if(d.status == 200)
          this.getAllNotifications()
        })
        this.notificationService.updateNotification();
        
      }
      else {
        console.log("ERROR");

      }
    })
  }


  populateFriendsIdObj(id,notifcationId) {
    this.friendsIdObj.notificationId = notifcationId;
    this.friendsIdObj.userId = sessionStorage.getItem('userId');
    this.friendsIdObj.friendId = id;
  }

  gotoNewsFeed(){
    this.router.navigate(['newsfeed'])
  }

  dateFormate(date) {
    return moment(date).format('MMMM Do YYYY');
  }
}
