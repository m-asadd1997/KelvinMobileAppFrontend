import { Component, OnInit, HostListener } from '@angular/core';
import { NotificationService } from '../Services/notification.service';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';

@Component({
  selector: 'app-addpost-notifications',
  templateUrl: './addpost-notifications.component.html',
  styleUrls: ['./addpost-notifications.component.css']
})
export class AddpostNotificationsComponent implements OnInit {
  id: string;
  notificationsArray: any[];
  innerHeight: number = window.innerHeight - 100;
  showEmpty: boolean = false;


  constructor(private router: Router, private service: MainService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications(){
    this.notificationsArray = []
    this.id = sessionStorage.getItem('userId')
    this.notificationService.getAllNotificationsForLoggedInUser(this.id).subscribe(d => {
      if (d.status == 200) {
        console.log("==========>",d);    
        d.result.map(u => {          
          this.notificationsArray.push(u);
        })
      }
      this.isArrayEmpty()
    })
    // = this.usersArray.length;

  }

  gotoNewsFeed(){
    this.router.navigate(['newsfeed'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

isArrayEmpty(){
  if(this.notificationsArray.length == 0)
    this.showEmpty = true;
  else this.showEmpty = false;
}

}
