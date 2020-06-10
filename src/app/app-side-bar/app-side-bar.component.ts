import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../Services/main.service';

@Component({
  selector: 'app-app-side-bar',
  templateUrl: './app-side-bar.component.html',
  styleUrls: ['./app-side-bar.component.css']
})
export class AppSideBarComponent implements OnInit {

  userName;
  id;
  @Input('friendsArray') friendsArray = [];

  constructor(private router: Router,private service: MainService) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username')
  }

  goToNewsFeed(){
    this.router.navigate(['newsfeed'])
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  
}
