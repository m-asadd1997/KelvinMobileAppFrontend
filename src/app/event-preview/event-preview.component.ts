import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.css']
})
export class EventPreviewComponent implements OnInit {
  innerHeight: number = window.innerHeight - 100;
  isCollapsed=false;
  eventId;
  screenHeight = null;
  screenWidth = null;
  eventObj = {
    date:null,
    description:null,
    url:null,
    image:null,
    name:null,
    profilePicture:null,
    userId: null

  }
  userType = sessionStorage.getItem("userType")
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private service:MainService,private toastService: ToastUtilService) { 
    this.eventId = this.activatedRoute.snapshot.params.id;
    // this.onResize();
  }

  ngOnInit(): void {
    this.getEvent();
  }

  checkUserType(){
    if(this.userType == "admin")
    return true;
   else
    return false;
  }
  // onResize(event?) {
  //   this.screenHeight = window.innerHeight - 102;
  //   this.screenWidth = window.innerWidth;

  //   console.log(this.screenHeight)
  // }

  getEvent(){
    this.service.getEventById(this.eventId).subscribe(d=>{
      if(d.status == 200){
        this.eventObj.date = d.result.date
        this.eventObj.description = d.result.description
        this.isCollapsed= this.eventObj.description.length>200?true:false;
        this.eventObj.image = d.result.image
        this.eventObj.url = d.result.url
        this.eventObj.profilePicture = d.result.user.profilePicture
        this.eventObj.name = d.result.user.name
        this.eventObj.userId = d.result.user.id
      }
      else{
        console.log("ERROR");
        
      }
    })
  }


  gotoNewsFeed() {
    this.router.navigate(['discoverevents'])
  }

  gotoUserProfile() {
    this.router.navigate(['profiles/'+this.eventObj.userId])
  }

  dateFormate(date) {
    return moment(date).format('MMMM Do YYYY');
  }

  deleteEvent(){
    this.service.deleteEvent(this.eventId).subscribe(d=>{
      if(d.status == 200){
        this.toastService.showToast("Event deleted", "#toast-9")
        setTimeout(()=>this.router.navigate(['discoverevents']),2000)
        
      }
      else{
        console.log("ERROR");
        
      }
    })
  }

  goToEditEvent(){
    this.router.navigate(['editevent/'+this.eventId]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

}
