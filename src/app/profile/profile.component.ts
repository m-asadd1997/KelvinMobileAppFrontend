import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MainService } from '../Services/main.service';
import { FriendsIds } from './friendsIds';
import { Profile } from './profile';
import { ToastUtilService } from '../Services/toast-util.service';
import { NotificationService } from '../Services/notification.service';
import { ProfileGallery } from './gallery';
import * as $ from 'jquery';


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
  friendsIdObj: FriendsIds = new FriendsIds();
  profileObj: Profile = new Profile();
  notificationBtns = false;
  isFriends: boolean = false;
  hideRequestButtons: boolean = true;
  description = "";
  descriptionSection = false;
  profileId: any;
  noOfFriends;
  picture;
  friendsArray = [];
  showCloseOnAction: boolean = true;
  @HostListener('window:resize', ['$event'])
  screenHeight ;
  screenWidth;
  mySubscription;
  profileGalleryObj: ProfileGallery = new ProfileGallery();
  message2: string;
  imagePath: any;
  imgURL: string | ArrayBuffer;
  showDialogOnAddPicture = false;
  formData = new FormData();
  profileGalleryArr = [];
  loaderOnImageDialog: any;
  showHideprivateProfile = false;
  constructor(private router: Router, private notificationService: NotificationService, private activateRoute: ActivatedRoute, private service: MainService, private toastService: ToastUtilService) {
    this.onResize();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.loggedInUserId = sessionStorage.getItem('userId');
    this.getUserStatus();
    this.getProfile();
    this.checkIfLoggedInUser();
    this.getAllFriends();
    this.getGalleryImages();
  }
  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
  }
  checkIfLoggedInUser() {
    if (this.id == this.loggedInUserId) {
      this.hideRequestButtons = false;
    }
  }


  getUserStatus() {

    if (this.id) {
      this.service.getUserById(this.id).subscribe(d => {
        if (d.status == 200) {
          
          this.updateButton(d.message);
        }
        else {
          console.log("error");
        }

      })
    }

  }

  getProfile() {
    if (this.id) {
      this.service.getUserById(this.id).subscribe(d => {
        if (d.status == 200) {

          
          this.userName = d.result.name;
          this.description = d.result.description;
          this.profileObj.profilePicture = d.result.profilePicture;
          this.noOfFriends = d.result.noOfFriends;

        }

        else {
          console.log("error");
        }

      })
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

  updateButton(status) {
    if (status === "not friends") {
      this.changeBtnToAddFriend()
    }
    else if (status === "pending") {
      this.changeBtnToCancelRequest()
    }
    else if (status === "pendingN") {
      this.notificationBtns = true;
      
    }
    else {
      this.changeBtnToFriends()
      
    }
  }

  friendsButtonClick() {
    console.log(this.friendStatus)
    if (this.friendStatus == "Add friend") {


      this.populateFriendsIdObj();
      this.service.addFriend(this.friendsIdObj).subscribe(d => {
        if (d.status == 200) {
          this.notificationService.updateNotification()
          this.changeBtnToCancelRequest()
        }
        else {
          console.log("ERROR");
        }
      })
    }
    else if (this.friendStatus === "Cancel Request") {
      this.populateFriendsIdObj()
      this.service.cancelRequest(this.friendsIdObj).subscribe(d => {
        if (d.status == 200) {
          this.notificationService.updateNotification()
          this.changeBtnToAddFriend();
        }
        else {
          console.log("ERROR");
        }
      })

    }
  }

  acceptRequest() {
    this.populateFriendsIdObj();
    this.service.acceptRequest(this.friendsIdObj).subscribe(d => {
      if (d.status == 200) {
        this.notificationService.updateNotification()
        this.changeBtnToFriends()
      }
      else {
        console.log("ERROR");

      }
    })
  }

  deleteRequest() {
    this.populateFriendsIdObj();
    this.service.cancelRequest(this.friendsIdObj).subscribe(d => {
      if (d.status == 200) {
        this.changeBtnToAddFriend()
        this.notificationService.updateNotification()
      }
      else {
        console.log("ERROR");

      }
    })
  }

  populateFriendsIdObj() {
    this.friendsIdObj.userId = sessionStorage.getItem('userId');
    this.friendsIdObj.friendId = this.id;
  }

  changeBtnToAddFriend() {
    this.btnColor = "btn btn-outline-primary btn-sm rounded shadowed mr-1 mb-1"
    this.friendStatus = "Add friend";
    this.notificationBtns = false;
    this.isFriends = false;
    this.showHideprivateProfile = false;
  }

  changeBtnToCancelRequest() {
    this.btnColor = "btn btn-outline-warning btn-sm rounded shadowed mr-1 mb-1"
    this.friendStatus = "Cancel Request"
    this.notificationBtns = false;
    this.isFriends = false;
    this.showHideprivateProfile = false;
  }

  toggleDescriptionSection() {
    this.descriptionSection = !this.descriptionSection
  }


  saveDescription() {
    this.profileObj.description = this.description;
    this.service.saveDescription(this.profileObj).subscribe(d => {
      if (d.status == 200) {
        this.toastService.showToast("Description updated","#toast-9")
        this.description = d.result.description;
      }
      else {
        console.log("ERROR");

      }
    })
  }

  changeBtnToFriends() {

    this.notificationBtns = false;
    this.isFriends = true;
    this.showHideprivateProfile = true;
  }

  gotoProfile(id) {
    console.log("yes")
    this.router.navigate(['profiles/' + id])
  }
  goBack() {
    this.router.navigate(['newsfeed'])
  }

  onImageChange(event) {
    this.showCloseOnAction = false;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onload = this._handleReaderImageLoaded.bind(this);
      this.picture = file.type
      reader.readAsBinaryString(file);


    }



  }

  _handleReaderImageLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    this.picture = base64textString;
    this.profileObj.profilePicture = this.picture;
  }

  saveProfilePicture() {
    
    if (this.profileObj.profilePicture != null) {
      this.service.saveProfilePicture(this.profileObj).subscribe(d => {
        if (d.status == 200) {

          this.service.sendPicture(this.profileObj.profilePicture);
           this.toastService.showToast("Profile picture updated","#toast-9")
          sessionStorage.setItem("profilePicture", this.profileObj.profilePicture)
        }
      })
    }
  }

  showClose() {
    this.showCloseOnAction = true;
   
  }

  handleCategoryBanner(file:FileList){
    
    this.profileGalleryObj.galleryImage=file[0];
    this.formData = new FormData();
    console.log(typeof(file[0]));
    
    
    this.showDialogOnAddPicture = true;
    this.preview(file)
    console.log(this.profileGalleryObj.galleryImage)
    
  }

  preview(files) {
    if (files.length === 0)
      return;
  
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message2 = "Only images are supported.";
      return;
    }
    this.loaderOnImageDialog = true;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.loaderOnImageDialog = false;
      
    }
  }

  onAddPictureClick(){
    this.showDialogOnAddPicture = false;
  }

  uploadPicture(){
    
    this.profileGalleryObj.userId = this.id;
    this.formData.append("userId",this.profileGalleryObj.userId);
    this.formData.append("galleryImage",this.profileGalleryObj.galleryImage);
    console.log("ye hai form data",this.profileGalleryObj.galleryImage)
    this.service.saveGalleryImage(this.formData).subscribe(d=>{
      if(d.status == 200){
        console.log("Uploaded")
        this.getGalleryImages();
        this.toastService.showToast("Picture uploaded","#toast-9")
      }
      else{
        console.log("ERROR");
        
      }
    })
  }

  getGalleryImages(){
    this.profileGalleryArr = [];
    this.service.getAllImages(this.id).subscribe(d=>{
      if(d.status == 200){
        d.result.map(data=>{
          this.profileGalleryArr.push(data);
        })
      }
    })
   
  }

 showPicture(id){
   this.router.navigate(['viewimage',id]);
   console.log("image id",id);
   
 }

}
