import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { MainService } from '../Services/main.service';
import { Profile } from '../profile/profile';
import * as $ from 'jquery';
import { profile } from 'console';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public innerHeight: any = window.innerHeight - 100;
  profileObj: Profile = new Profile();
  token;
  typeChange = "password";
  constructor(private router: Router, private service: LoginService, private toastService: ToastUtilService, private mainService: MainService,private messagingService: MessagingService) { }


  ngOnInit(): void {
    this.checkToken();
   
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.getToken();
  }

  getToken(){
    
    this.messagingService.myMethod$.subscribe((data) => {
      console.log("response of token ",data)
      this.token=data.toString();
      console.log("token is here ",data)
      // sessionStorage.setItem("firebaseToken",this.token);
      

    }
  );
  }
  goToRegister() {
    this.router.navigate(['register'])

  }

  checkToken(){
    if(sessionStorage.getItem("token")){
      this.router.navigate(['newsfeed'])
    }
  };


  check(uname: string, p: string) {

    // var output = this.service.checkUserandPass(uname, p);
    this.service.checkUserandPass(uname, p).subscribe(
      res => {
        if (res.status == 200) {
          this.showToast();
          console.log(res.result)
          sessionStorage.setItem("userId", res.result.id);
          sessionStorage.setItem("token", res.result.token);
          sessionStorage.setItem("email", res.result.email);
          sessionStorage.setItem("username", res.result.username);
          sessionStorage.setItem("profilePicture", res.result.profilePicture);
          sessionStorage.setItem("userType", res.result.userType);
          this.profileObj.firebaseToken = this.token;
          this.service.setFireBaseToken(res.result.id,this.profileObj).subscribe();

          if(res.result.userType == "admin"){
            setTimeout(() => {
              this.router.navigate(['discoverevents'])
              // this.router.navigate([""]);
            }, 1000);
          }
          else{
            setTimeout(() => {
              this.router.navigate(['newsfeed'])
              // this.router.navigate([""]);
            }, 1000);
          }
         


        }
        else {

          this.toastService.showToast("Unauthorized", "#toast-16");

        }
      },
      error => {
        this.toastService.showToast("Unauthorized", "#toast-16");

      }
    );

    // if(output == true){
  }

  showToast() {
    this.toastService.showToast("Success", "#toast-15")
  }


  goToForgotPassword(){
    this.router.navigate(['forgot-password'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

onToggleShowPassword(){
  if(this.typeChange === "password"){
    this.typeChange = "text"
  }
  else if(this.typeChange === "text"){
    this.typeChange = "password"
  }
}


}
