import { Component, OnInit } from '@angular/core';
import { MainService } from '../Services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchName;
  listOfUsers = [];
  showError = false;
  constructor(private service: MainService,private router: Router) { }

  ngOnInit(): void {
  }

  getUsersOnChange(){
    this.checkSearchName()
    this.listOfUsers = [];
    this.service.searchUsers(this.searchName).subscribe(d=>{
      
      if(d.status == 200){
        d.result.map(d=>{
          this.listOfUsers.push(d)
        })
      }
      else{
        this.showError = true;
      }
    })
  }

  checkSearchName(){
    if(this.searchName === ""){
      this.showError = false;
    }
  }

  goToProfile(id){
    console.log(id)
    this.router.navigate(['profiles/',id])
  }

}
