import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../Services/main.service';
import { FriendsIds } from './friendsIds';
import { Profile } from './profile';
import { ToastUtilService } from '../Services/toast-util.service';
import { NotificationService } from '../Services/notification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id;
  loggedInUserId;
  userName;
  btnColor;
  friendStatus;
  friendsIdObj : FriendsIds = new FriendsIds();
  profileObj: Profile = new Profile();
  notificationBtns = false;
  isFriends: boolean = false;
  hideRequestButtons: boolean = true;
  description = "";
  descriptionSection = false;
  profileId: any;
  noOfFriends;
  picture;
  showCloseOnAction: boolean = true;
  constructor(private router: Router,private notificationService:NotificationService,private activateRoute:ActivatedRoute,private service: MainService,private toastService: ToastUtilService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.loggedInUserId = sessionStorage.getItem('userId');
    this.getUserStatus();
    this.getProfile();
    this.checkIfLoggedInUser();
  }

  checkIfLoggedInUser(){
    if(this.id == this.loggedInUserId){
      this.hideRequestButtons = false;
    }
  }


  getUserStatus(){
    
    if(this.id){
      this.service.getUserById(this.id).subscribe(d=>{
        if(d.status == 200){
          
          this.updateButton(d.message);
        }
        else{
          console.log("error");         
        }
        
      })
    }

  }

  getProfile(){
    if(this.id){
      this.service.getUserById(this.id).subscribe(d=>{
        if(d.status == 200){
          
          this.userName = d.result.name;
          this.description = d.result.description;
          this.profileObj.profilePicture = d.result.profilePicture;
          this.noOfFriends = d.result.noOfFriends;
         
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
          this.notificationService.updateNotification()
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
          this.notificationService.updateNotification()
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
        this.notificationService.updateNotification()
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
        this.notificationService.updateNotification()
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

  toggleDescriptionSection(){
    this.descriptionSection = !this.descriptionSection
  }


  saveDescription(){
    this.profileObj.description = this.description;
    this.service.saveDescription(this.profileObj).subscribe(d=>{
      if(d.status == 200){
        this.description = d.result.description;
      }
      else{
        console.log("ERROR");
        
      }
    })
  }

  changeBtnToFriends(){
   
    this.notificationBtns = false;
    this.isFriends = true;
  }

  goBack(){
    this.router.navigate(['newsfeed'])
  }

  onImageChange(event) {
    this.showCloseOnAction = false;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onload =this._handleReaderImageLoaded.bind(this);
      this.picture = file.type
     
      //console.log("1"+this.appFormObj.resumeContentType)
      reader.readAsBinaryString(file);
     
      
    }
    
    // this.saveProfilePicture();
    
  }

  _handleReaderImageLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           let base64textString= btoa(binaryString);
           //console.log(btoa(binaryString));
           this.picture = base64textString;
          // console.log(this.appFormObj.resume)
          // this.saveProfilePicture();
          
          
           
   }

   saveProfilePicture(){
     this.profileObj.profilePicture = this.picture;
     if(this.profileObj.profilePicture != null){
     this.service.saveProfilePicture(this.profileObj).subscribe(d=>{
       if(d.status == 200){
       
        this.service.sendPicture(this.profileObj.profilePicture);
        //  this.toastService.showToast("Profile picture updated","#toast-3")
         sessionStorage.setItem("profilePicture",this.profileObj.profilePicture)
       }
     })
    }
   }

   showClose(){
     this.showCloseOnAction = true;
   }
  
}
