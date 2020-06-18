import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {

  id = sessionStorage.getItem('userId')
  friendsArray = [];
  userName: string;
  profilePicture;
  checkStorage;
  notificationCount: number = 0
  // @Input("noOfNotifications") noOfNotifications:number;

  constructor(private router: Router, private service: MainService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('username');

    // this.profilePicture = sessionStorage.getItem('profilePicture')
    this.checkSessionStorage();




    this.getProfilePicture();
    // console.log(this.profilePicture);

    this.getNotificationCount();
    this.updateNotificationCount();



  }

  checkSessionStorage() {
    this.checkStorage = sessionStorage.getItem('profilePicture')
    if (this.checkStorage !== "null") {
      this.profilePicture = sessionStorage.getItem('profilePicture')
    }
  }

  getAllFriends() {

    // this.profilePicture = sessionStorage.getItem('profilePicture');
    this.friendsArray = [];

    this.service.getAllFriends(this.id).subscribe(d => {
      if (d.status == 200) {
        d.result.map(u => {
          this.friendsArray.push(u.friend);
        })
      }

    })
  }

  goToNewsFeed() {
    this.router.navigate(['newsfeed'])
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


}
