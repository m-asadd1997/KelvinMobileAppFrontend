import { Component } from '@angular/core';
import { NotificationService } from './Services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id: string;


  constructor(private service :NotificationService){
    this.darkMode();
    
  }
  darkMode(){
   
      var element = document.body;
      element.classList.toggle("dark-mode-active");
  
  }

  

  getAllNotifications(){
    this.id = sessionStorage.getItem("userId");
    if(sessionStorage.length > 0 && this.id != null){
      this.service.getAllNotifications(this.id).subscribe(d=>{
        console.log("notifications on app component")
        if(d.status == 200){
          
          d.result.map(data=>{
            this.notifyMe(data.message);
          })
        }
        else{
          console.log("no new notifications");
          
        }
      
      })
    }
  }

  notifyMe(msg) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      // console.log(notification)
      this.showNotification(msg);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        console.log(permission)
        if (permission === "granted") {
          // console.log(notification)
          this.showNotification(msg);
        }
      });
    }

  }

 

  showNotification(msg) {
    const notification = new Notification('Montreal Sauvage', {
      body: msg,
      icon: 'assets/MTLSAUVAGE-LOGO.png'
  
    })
  }
}
