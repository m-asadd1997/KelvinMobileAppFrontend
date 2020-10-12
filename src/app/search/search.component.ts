import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from '../Services/main.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchName = "";
  listOfUsers = [];
  showError = false;
  id;
  innerHeight: number = window.innerHeight - 100;
  constructor(private service: MainService, private router: Router) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId')
  }

  getUsersOnChange(event) {
    console.log("search name", event)
    this.showError = false;
    this.checkSearchName()
    this.listOfUsers = [];
    this.service.searchUsers(this.searchName).subscribe(d => {
      if (d.status == 200) {
        this.listOfUsers = [];
        d.result.map(n => {
          // let index = this.listOfUsers.findIndex(d => d.id == n.id);
          // if (!this.listOfUsers.includes(index))
            this.listOfUsers.push(n);
        })
                
      }
      else {
        this.showError = true;
      }


    })
  }

  checkSearchName() {
    if (this.searchName === "") {
      this.listOfUsers = [];
      this.showError = false;
    }
  }

  goToProfile(id) {
  
    this.router.navigate(['profiles/', id])
  }

  gotoNewsFeed() {
    this.router.navigate(['newsfeed'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 102;
  console.log("height",this.innerHeight);
  
}

}

