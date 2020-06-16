import { Component, OnInit, Input } from '@angular/core';
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
  userName: string;
  profilePicture;
  checkStorage;
  // @Input("noOfNotifications") noOfNotifications:number;
  
  constructor(private router:Router,private service: MainService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('username');
    
      // this.profilePicture = sessionStorage.getItem('profilePicture')
    this.checkSessionStorage();
    
    
    
    
    this.getProfilePicture();
    console.log(this.profilePicture);
    
   
   
  }
 
  checkSessionStorage(){
    this.checkStorage = sessionStorage.getItem('profilePicture')
    if(this.checkStorage !== "null"){
      this.profilePicture = sessionStorage.getItem('profilePicture')
    }
  }
  
  getAllFriends(){
    
    // this.profilePicture = sessionStorage.getItem('profilePicture');
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
  goToMyProfile(){
    this.router.navigate(['profiles/',this.id])
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getProfilePicture(){
    this.service.sendPicture$.subscribe(d=> {
      this.profilePicture = d
    })
  }

  
}
