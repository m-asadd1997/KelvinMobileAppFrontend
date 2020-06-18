import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { HostListener } from "@angular/core";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  image:any=null;
  userType:string=sessionStorage.getItem("userType");
  @HostListener('window:resize', ['$event'])
  screenHeight;
  screenWidth;
  onResize(event?) {
     this.screenHeight = window.innerHeight-200;
     this.screenWidth = window.innerWidth;

     console.log(this.screenHeight)
  }

  constructor(private router: Router) { 
    this.onResize();
  }

  ngOnInit(): void {
  }
  



  onImageChange(event) {
    // this.showCloseOnAction = false;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onload = this._handleReaderImageLoaded.bind(this);
      // this.image = file.type

      //console.log("1"+this.appFormObj.resumeContentType)
      reader.readAsBinaryString(file);


    }

    // this.saveProfilePicture();

  }


  _handleReaderImageLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    //console.log(btoa(binaryString));
    this.image = base64textString;
    // console.log(this.appFormObj.resume)
    // this.saveProfilePicture();



  }

  goBack() {
    this.router.navigate(['newsfeed'])
  }
}
