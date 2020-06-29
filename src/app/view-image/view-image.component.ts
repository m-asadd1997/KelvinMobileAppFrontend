import { Component, OnInit } from '@angular/core';
import { MainService } from '../Services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastUtilService } from '../Services/toast-util.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {
  id: any;
  userName;
  picture;
  date;
  userProfilePicture: any;
  screenHeight = null;
  screenWidth = null;
  userId: any;


  constructor(private router:Router,private activateRoute: ActivatedRoute,private service:MainService,private toastService:ToastUtilService) {
    this.onResize();
   }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    if(this.id){
      this.getImage();
    }
  }

  getImage(){
    this.service.getImageById(this.id).subscribe(d=>{
      if(d.status ==200){
      
        this.userName = d.result.user.name;
        this.picture = d.result.galleryImage;
        this.date = d.result.date;
        this.userProfilePicture = d.result.user.profilePicture;
        this.userId = d.result.user.id;
        
      }else{
        console.log("ERROR");
        
      }
    })
  }
 
  gotoProfile(){
    this.router.navigate(['profiles/', this.userId])

  }

  dateFormate(date) {
    return moment(date).format('MMMM Do YYYY');
  }

  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
  }

  deleteImage(){
    this.service.deleteGalleryImage(this.id).subscribe(d=>{
      if(d.status == 200){
        console.log("Picture Deleted");
        this.toastService.showToast("Picture Deleted","#toast-9")
        setTimeout(()=>this.router.navigate(['profiles/', this.userId]),2000)
        
      }
      else{
        console.log("ERROR");
        
      }
    })
  }

}
