import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {

  id;
  friendsArray = [];
  constructor(private router:Router,private service: MainService) { }

  ngOnInit(): void {
  }

  getAllFriends(){
    this.friendsArray = [];
    this.id = sessionStorage.getItem('userId')
    this.service.getAllFriends(this.id).subscribe(d=>{
      if(d.status==200){
        d.result.map(u=>{
          this.friendsArray.push(u.friend);
        })
      }
     
    })
  }

  goToNewsFeed(){
    this.router.navigate(['newsfeed'])
  }

  goToNotifications(){
    this.router.navigate(['notifications'])
  }
}
