import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from './register';
import { MainService } from '../Services/main.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerObj: Register = new Register();
  constructor(private router:Router,private service: MainService) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate([""]);
  }

  registerUser(){

    this.service.registerUser(this.registerObj).subscribe(d=>{
      console.log("resp", d);
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
}
