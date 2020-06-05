import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ToastUtilService {

  constructor() { }

  showToast(msg,toastId){
    $(toastId)[0].innerText = msg
    $(toastId).addClass("show")
    setTimeout(() => {
      $(toastId).removeClass("show");
  }, 2000);
}
}
