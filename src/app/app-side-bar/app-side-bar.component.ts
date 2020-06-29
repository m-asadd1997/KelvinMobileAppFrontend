import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { ChatService } from '../Services/chat.service';

@Component({
  selector: 'app-app-side-bar',
  templateUrl: './app-side-bar.component.html',
  styleUrls: ['./app-side-bar.component.css']
})
export class AppSideBarComponent implements OnInit {

  userName;
  id;
  friendsArray = [];
  profilePicture;

  constructor(private router: Router, private service: MainService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('username');
    this.profilePicture = sessionStorage.getItem('profilePicture');

  }

  goToNewsFeed() {
    this.router.navigate(['newsfeed'])
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  goToMyProfile() {
    this.router.navigate(['profiles/', this.id])
  }

  getAllFriends() {
    this.friendsArray = [];
    this.id = sessionStorage.getItem('userId')
    this.service.getAllFriends(this.id).subscribe(d => {
      if (d.status == 200) {
        d.result.map(u => {
          this.friendsArray.push(u.friend);
        })
      }

    })
  }



  goToNotifications() {
    this.router.navigate(['notifications'])
  }

  gotoChatroom(friendId) {
    this.chatService.initiateChat(this.id, friendId)
      .subscribe((chatroom) => {
        this.router.navigate([`chat/${chatroom}/${friendId}`])
      })
  }


}
