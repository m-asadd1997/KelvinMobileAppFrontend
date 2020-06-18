import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { MainService } from '../Services/main.service';
import { Profile } from '../profile/profile';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  profileObj : Profile = new Profile();
  constructor(private router: Router, private service: LoginService,private toastService:ToastUtilService,private mainService: MainService) { }


  ngOnInit(): void {
    sessionStorage.clear();
  }

  goToRegister(){
    this.router.navigate(['register'])
  }

  check(uname: string, p: string) {
   
    // var output = this.service.checkUserandPass(uname, p);
    this.service.checkUserandPass(uname, p).subscribe(
      res => {
        if (res.status == 200) {
          this.showToast(); 
          console.log(res.result)       
          sessionStorage.setItem("userId",res.result.id);
          sessionStorage.setItem("token", res.result.token);
          sessionStorage.setItem("email", res.result.email);
          sessionStorage.setItem("username", res.result.username);
          sessionStorage.setItem("profilePicture",res.result.profilePicture);
          sessionStorage.setItem("userType",res.result.userType);
         
          
          setTimeout(() => {this.router.navigate(['newsfeed'])
            // this.router.navigate([""]);
          }, 1000);


        }
      else{
       
        this.toastService.showToast("Unauthorized","#toast-16");
        
      }
      },
      error=>{
        this.toastService.showToast("Unauthorized","#toast-16");

      }
    );

    // if(output == true){
  }

  showToast(){
    this.toastService.showToast("Success","#toast-15")
  }


}
