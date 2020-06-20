import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../Services/post.service';
import Post from '../post/Post';
import * as moment from 'moment';
@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  postId: any;
  postObj: Post;
  screenHeight = null;
  screenWidth = null;
  isCollapsed=false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: PostService) {
    //  console.log(this.activatedRoute)
    this.onResize();
    this.postId = this.activatedRoute.snapshot.params.id;
    this.postObj = new Post();
  }

  ngOnInit(): void {
    this.getPost(this.postId)

  }
  onResize(event?) {
    this.screenHeight = window.innerHeight - 102;
    this.screenWidth = window.innerWidth;

    console.log(this.screenHeight)
  }


  gotoNewsFeed() {
    this.router.navigate(['newsfeed'])
  }

  getPost(id) {
    this.service.getPostById(id)
      .subscribe((response) => {
        this.postObj = response;
       this.isCollapsed= this.postObj.description.length>200?true:false;
        console.log(this.postObj)
      })
  }

  gotoUserProfile() {
    this.router.navigate(['profiles/' + this.postObj.userId])
  }

  dateFormate(date) {
    return moment(date).format('MMMM Do YYYY');
  }

}
