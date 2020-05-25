import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private service: LoginService) { }

  ngOnInit(): void {
  }

  goToRegister(){
    this.router.navigate(['register'])
  }

  check(uname: string, p: string) {
   
    // var output = this.service.checkUserandPass(uname, p);
    this.service.checkUserandPass(uname, p).subscribe(
      res => {
        if (res.status == 200) {
          console.log("success");
         
          sessionStorage.setItem("userId",res.result.id);
          sessionStorage.setItem("token", res.result.token);
          sessionStorage.setItem("email", res.result.email);
          sessionStorage.setItem("username", res.result.username);
        
          setTimeout(() => {
            console.log("Login successfull");
            
            // this.router.navigate([""]);
          }, 1000);


        }
      else{
       
        console.log("error");
        
      }
      },
      error=>{
               console.log("error");

      }
    );

    // if(output == true){
  }

}
