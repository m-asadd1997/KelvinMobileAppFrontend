import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { FriendsIds } from './friendsIds';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id;
  userName;
  btnColor;
  friendStatus;
  friendsIdObj : FriendsIds = new FriendsIds();
  notificationBtns = false;
  isFriends: boolean = false;
  constructor(private router: Router,private activateRoute:ActivatedRoute,private service: MainService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(){
    this.id = this.activateRoute.snapshot.params['id'];
    if(this.id){
      this.service.getUserById(this.id).subscribe(d=>{
        if(d.status == 200){
          this.userName = d.result.name;
          this.updateButton(d.message);
        }
        else{
          console.log("error");         
        }
        
      })
    }

  }

  updateButton(status){
    if(status === "not friends")
    {
      this.changeBtnToAddFriend()
    }
    else if(status === "pending")
    {
      this.changeBtnToCancelRequest()
    }
    else if(status === "pendingN"){
      this.notificationBtns = true;
    }
    else{
     this.changeBtnToFriends()
    }
  }

  friendsButtonClick(){
    console.log(this.friendStatus)
    if(this.friendStatus == "Add friend"){
      
      
     this.populateFriendsIdObj();
      this.service.addFriend(this.friendsIdObj).subscribe(d=>{
        if(d.status == 200){
         this.changeBtnToCancelRequest()         
        }
        else{
          console.log("ERROR");          
        }      
      })
    }
    else if(this.friendStatus === "Cancel Request"){
      this.populateFriendsIdObj()
      this.service.cancelRequest(this.friendsIdObj).subscribe(d=>{
        if(d.status == 200){
         this.changeBtnToAddFriend();
        }     
        else{
          console.log("ERROR");        
        }
      })

    }
  }

  acceptRequest(){
    this.populateFriendsIdObj();
    this.service.acceptRequest(this.friendsIdObj).subscribe(d=>{
      if(d.status == 200){
        this.changeBtnToFriends()
      }
      else{
        console.log("ERROR");
        
      }
    })
  }

  deleteRequest(){
    this.populateFriendsIdObj();
    this.service.cancelRequest(this.friendsIdObj).subscribe(d=>{
      if(d.status == 200){
        this.changeBtnToAddFriend()
      }
      else{
        console.log("ERROR");
        
      }
    })
  }
  
  populateFriendsIdObj(){
    this.friendsIdObj.userId = sessionStorage.getItem('userId');
    this.friendsIdObj.friendId = this.id;
  }

  changeBtnToAddFriend(){
    this.btnColor = "btn btn-outline-primary btn-sm rounded shadowed mr-1 mb-1"
    this.friendStatus = "Add friend";
    this.notificationBtns = false;
    this.isFriends = false;
  }

  changeBtnToCancelRequest(){
    this.btnColor = "btn btn-outline-warning btn-sm rounded shadowed mr-1 mb-1"
    this.friendStatus = "Cancel Request"
    this.notificationBtns = false;
    this.isFriends = false;
  }

  changeBtnToFriends(){
   
    this.notificationBtns = false;
    this.isFriends = true;
  }

  goBack(){
    this.router.navigate(['newsfeed'])
  }
}
