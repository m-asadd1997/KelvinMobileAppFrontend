import { Component, OnInit } from '@angular/core';
import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { Router } from '@angular/router';
import { Mail } from './mail';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  mailObj : Mail = new Mail();
  loader: boolean = false;
  constructor(private service: MainService,private toastService: ToastUtilService,private router:Router) { }

  ngOnInit(): void {
  }

  sendMail(){
    this.loader = true;
  this.service.sendMailOnForgotPassword(this.mailObj).subscribe(d=>{
    if(d.status == 200){
      this.toastService.showToast("Email send successfully", "#toast-15")
      this.loader = false;
    }
    else{
      this.toastService.showToast("User not found", "#toast-16");
      this.loader = false;
    }
  })
  }

  goBack() {
    this.router.navigate([''])
  }

}
