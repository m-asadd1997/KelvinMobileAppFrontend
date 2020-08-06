import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from '../Services/main.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddEvent } from './add-event';
import { ToastUtilService } from '../Services/toast-util.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  image: any = null;
  // @HostListener('window:resize', ['$event'])
  // screenHeight;
  // screenWidth;
  innerHeight: number = window.innerHeight - 100;
  // registerForm: FormGroup;
  eventObj: AddEvent = new AddEvent();
  userId=sessionStorage.getItem("userId");
  eventId: any;
  
  constructor(private router: Router, private formBuilder: FormBuilder,private service:MainService, private activatedRoute: ActivatedRoute,private toastService: ToastUtilService) {
    this.eventId = this.activatedRoute.snapshot.params.id; 
    // this.onResize();
    // this.formBuilderFunction();
   }

  ngOnInit(): void {
    if(this.eventId){
      this.getEvent();
    }

  }

   getEvent(){
    this.service.getEventById(this.eventId).subscribe(d=>{
      if(d.status == 200){
        
        this.eventObj.description = d.result.description
        this.eventObj.image = d.result.image
        this.eventObj.url = d.result.url
        this.eventObj.userId = d.result.user.id
        
      }
      else{
        console.log("ERROR");
        
      }
    })
  }


  // onResize(event?) {
  //   this.screenHeight = window.innerHeight - 102;
  //   this.screenWidth = window.innerWidth;

  //   console.log(this.screenHeight)
  // }

  onImageChange(event) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onload = this._handleReaderImageLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }


  _handleReaderImageLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    this.eventObj.image = base64textString;
  }

  onSubmit() {


    // if (this.registerForm.invalid)
    //   return;

    // const { value: obj } = this.registerForm;

    // console.log(obj)

    // this.eventObj.description = obj.description;
    // this.eventObj.image = this.image;
    // this.eventObj.url = obj.url;
    // 

    if(this.eventId){
      this.eventObj.userId= this.userId;
      this.service.editEvent(this.eventId,this.eventObj)
      .subscribe((response) => {
        if(response.status == 200){
          this.toastService.showToast("Event updated", "#toast-9")
          setTimeout(()=>this.router.navigate(['discoverevents']),2000)
        }
        else{
          console.log("ERROR");
          
        }
       
      })
    }
    else{
      this.eventObj.userId= this.userId;
      this.service.submitEvent(this.eventObj)
      .subscribe((response) => {
        if(response.status == 200){
          this.toastService.showToast("Event Added", "#toast-9")
          setTimeout(()=>this.router.navigate(['discoverevents']),2000)
        }
        else{
          console.log("ERROR");
          
        }
      })
    }

    



  }

  // formBuilderFunction() {
  //   this.registerForm = this.formBuilder.group({
  //     image: ['', Validators.required],
  //     url: [''],
  //     description: ['', Validators.required],
  //   });
  // }


  goBack() {
    this.router.navigate(['discoverevents'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}
}
