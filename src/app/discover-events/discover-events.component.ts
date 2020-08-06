import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastUtilService } from '../Services/toast-util.service';
import { MainService } from '../Services/main.service';


@Component({
  selector: 'app-discover-events',
  templateUrl: './discover-events.component.html',
  styleUrls: ['./discover-events.component.css']
})
export class DiscoverEventsComponent implements OnInit {
  innerHeight: number = window.innerHeight - 100;

  events = [];
  // @HostListener('window:resize', ['$event'])
  // screenHeight=null;
  // screenWidth;
  constructor(private router: Router, private toastService: ToastUtilService, private service: MainService) { 
    // this.onResize();
  }

  ngOnInit(): void {
      this.getAllEvents();
  }
  // onResize(event?) {
  //   this.screenHeight = window.innerHeight - 102;
  //   this.screenWidth = window.innerWidth;

  //   console.log(this.screenHeight)
  // }


  getAllEvents(){
    this.service.getAllEvents().subscribe(d=>{
      if(d.status == 200){
        d.result.map(data=>{
          this.events.push(data);
        })
      }
      else{
        console.log("ERROR");
        
      }
    })
  }


  gotoUserProfile(id) {
    this.router.navigate(['profiles/' + id])
  }

  gotoEventPreview(id){
    this.router.navigate(['previewevent/'+id])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

}
