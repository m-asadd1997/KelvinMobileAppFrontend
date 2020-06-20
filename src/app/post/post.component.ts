import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Post from './Post';
import { PostService } from '../Services/post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  image: any = null;
  userType: string = sessionStorage.getItem("userType");
  @HostListener('window:resize', ['$event'])
  screenHeight;
  screenWidth;
  registerForm: FormGroup;
  submitted = false;
  PostObj: Post;
  userId=sessionStorage.getItem("userId");
  

  constructor(private router: Router, private formBuilder: FormBuilder, private service: PostService) {
    this.PostObj = new Post();
    this.onResize();
    this.formBuilderFunction();
  }

  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
  }



  ngOnInit(): void {
  }




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
    this.image = base64textString;
  }

  onSubmit() {



    if (this.registerForm.invalid)
      return;

    const { value: obj } = this.registerForm;

    console.log(obj)

    this.PostObj.description = obj.description;
    this.PostObj.image = this.image;
    this.PostObj.url = obj.url;

    this.service.submitPost(this.userId,this.PostObj)
      .subscribe((response) => {
        console.log(response, "================")
        this.router.navigate(['newsfeed'])
      })



  }

  formBuilderFunction() {
    this.registerForm = this.formBuilder.group({
      image: ['', Validators.required],
      url: [''],
      description: ['', Validators.required],
    });
  }
  goBack() {
    this.router.navigate(['newsfeed'])
  }
}
