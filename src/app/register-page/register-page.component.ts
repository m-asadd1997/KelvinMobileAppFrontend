import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from './register';
import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerObj: Register = new Register();
  innerHeight: number;
  constructor(private router:Router,private service: MainService, private toastService:ToastUtilService) { }

  ngOnInit(): void {
    this.registerObj.userType = null;
  }

  goToLogin(){
    this.router.navigate([""]);
  }

  registerUser(){

    this.service.registerUser(this.registerObj).subscribe(d=>{
      if(d.status == 200){
        this.toastService.showToast("Success","#toast-15");
        this.emptyObj();
        setTimeout(()=>this.router.navigate(['']),3000);
      }
      else{
        this.toastService.showToast("User Already Exists","#toast-16")
      }

    })

  }

  emptyValue(){
    this.registerObj.userType = null;
  }

  insertValue1(){
      this.registerObj.userType = "USER"
      console.log(this.registerObj.userType)

  }

  insertValue2(){
    this.registerObj.userType = "ADMIN"
    console.log(this.registerObj.userType)
  }

  emptyObj(){
    this.registerObj.email = null;
    this.registerObj.name = null;
    this.registerObj.password = null;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 100;
  console.log("height",this.innerHeight);
  
}

  
}
