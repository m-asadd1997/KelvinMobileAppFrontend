import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { FriendsIds } from '../profile/friendsIds';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  id;
  usersArray = [];
  friendsIdObj: FriendsIds = new FriendsIds();
  requestStatus;
  // showReqStatus = false;
  noOfNotifications = 0;
  screenHeight = null;
  screenWidth = null;
  constructor(private router: Router, private service: MainService, private notificationService: NotificationService) {
    this.onResize();
   }

  ngOnInit(): void {
    this.noOfNotifications = 0;
    this.getAllRequests()
  }

  getAllRequests() {
    this.usersArray = []
    this.id = sessionStorage.getItem('userId')
    this.service.getAllRequests(this.id).subscribe(d => {
      if (d.status == 200) {
        console.log("==========>",d);
        
        d.result.map(u => {
          this.usersArray.push(u.userObj);
          

        })
        
        
        this.noOfNotifications = this.usersArray.length;
      }
    })

    // = this.usersArray.length;




  }
  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
  }

  acceptRequest(id) {
    this.populateFriendsIdObj(id);
    this.service.acceptRequest(this.friendsIdObj).subscribe(d => {
      if (d.status == 200) {
        // this.requestStatus = "Accepted."
        // this.showReqStatus = true;
         this.getAllRequests()
        this.notificationService.updateNotification();
      }
      else {
        console.log("ERROR");

      }
    })
  }

  deleteRequest(id) {
    this.populateFriendsIdObj(id);
    this.service.cancelRequest(this.friendsIdObj).subscribe(d => {
      if (d.status == 200) {
        // this.requestStatus = "Deleted."
        // this.showReqStatus = true;
        this.notificationService.updateNotification();
        this.getAllRequests()
      }
      else {
        console.log("ERROR");

      }
    })
  }


  populateFriendsIdObj(id) {
    this.friendsIdObj.userId = sessionStorage.getItem('userId');
    this.friendsIdObj.friendId = id;
  }

  gotoNewsFeed(){
    this.router.navigate(['newsfeed'])
  }
}
