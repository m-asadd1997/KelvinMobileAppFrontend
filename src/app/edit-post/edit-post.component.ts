import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getHeapCodeStatistics } from 'v8';
import { PostService } from '../Services/post.service';
import { ToastUtilService } from '../Services/toast-util.service';
import Post from '../post/Post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  image: any = null;
  @HostListener('window:resize', ['$event'])
  screenHeight;
  screenWidth;
  id: any;
  postObj: Post;
  isCollapsed=false;  
  userType: string = sessionStorage.getItem("userType");
  formData: FormData;
 
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private service: PostService,private toastService: ToastUtilService) { 
    this.onResize();
    this.postObj = new Post();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id)
    this.getPost(this.id);
  }

  getPost(id) {
    this.service.getPostById(id)
      .subscribe((response) => {
        this.postObj = response;
       this.isCollapsed= this.postObj.description.length>200?true:false;
        console.log(this.postObj)
      })
  }

  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
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
    this.postObj.image = base64textString;
  }

  onSubmit(){
    if (this.id) {
      this.service.editPost(this.id,this.postObj).subscribe(d=>{
        if(d.status == 200){
          this.toastService.showToast("Event updated", "#toast-9")
          setTimeout(()=>this.router.navigate(['newsfeed']),2000)
        }
        else{
      console.log("ERROR");

        }
      })
    }
  }

  goBack() {
    this.router.navigate(['newsfeed'])
  }

}
