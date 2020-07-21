import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { ForgotPasswordDto } from './forgotPasswordDto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  newPassObj: ForgotPasswordDto = new ForgotPasswordDto();
  password: any;
  showFiels = true;
  showLoader: boolean = false;
  constructor(private router: Router,private service: MainService,private toastService: ToastUtilService,private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkTokenExpiry()
  }

  goBack(){
  this.router.navigate([''])
  }

  checkTokenExpiry(){
    this.newPassObj.token = this.activateRoute.snapshot.params['uuid'];
    this.newPassObj.date = new Date();
    this.service.checkTokenExpiry(this.newPassObj).subscribe(d=>{
      if(d.status == 200){
        this.newPassObj.email = d.result.email;
        this.showFiels = true;
        // this.mainLoader = false;
       
      }
      else{
        this.showFiels = false;
        // this.mainLoader = false;
      }
    })
  }

  resetPassword(){
    if(this.password === this.newPassObj.password){
      this.showLoader = true;
    this.service.saveNewPassword(this.newPassObj).subscribe(d=>{
      if(d.status == 200){
       
        this.showLoader = false;
        this.toastService.showToast("Password reset successfully", "#toast-15")
        setTimeout(()=>this.router.navigate(['']),3000)
      }
      else{
        this.toastService.showToast("Password reset failed", "#toast-16")
        this.showLoader = false;
      }
    })
    }
    else{
      this.password = null;
     
    }

    }

}
