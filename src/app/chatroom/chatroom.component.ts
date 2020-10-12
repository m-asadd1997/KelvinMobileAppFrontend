import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../Services/chat.service';
import { Chatroom } from './Chatroom'
import { MainService } from '../Services/main.service';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {


  userId = sessionStorage.getItem("userId");
  chatrooms: Array<any> = [];
  searchName;
  listOfUsers = [];
  showError = false;
  focused = false;
  // screenHeight = null;
  // screenWidth = null;
  innerHeight: number = window.innerHeight - 100;

  constructor(private router: Router, private service: ChatService, private mainService: MainService) {
    // this.onResize();
  }

  ngOnInit(): void {
    this.getAllChatrooms();
  }
  // onResize(event?) {
  //   this.screenHeight = window.innerHeight - 102;
  //   this.screenWidth = window.innerWidth;

  //   console.log(this.screenHeight)
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

  goBack() {
    this.router.navigate(['newsfeed']);
  }
  getUsersOnChange() {
    this.showError = false;
    this.checkSearchName()
    this.listOfUsers = [];
    this.mainService.searchUsers(this.searchName).subscribe(d => {

      if (d.status == 200) {
        this.listOfUsers = [];
        d.result.map(n => {
          // let index = this.listOfUsers.findIndex(d => d.id == n.id);
          // if (!this.listOfUsers.includes(index))
            this.listOfUsers.push(n);
        })
      }
      else {
        this.showError = true;
      }


    })
  }

  checkSearchName() {
    if (this.searchName === "") {
      this.listOfUsers = [];
      this.showError = false;
    }
  }

  getAllChatrooms() {
    this.service.getAllChatrooms(this.userId)
      .subscribe((res) => this.chatrooms = res)
  }

  chatWith(chatroomId, friendId) {
    this.router.navigate([`chat/${chatroomId}/${friendId}`])
  }

  initiateChat(friendId) {
    this.service.initiateChat(this.userId, friendId)
      .subscribe((chatroom) => {
        this.router.navigate([`chat/${chatroom}/${friendId}`])
      })
  }

}
