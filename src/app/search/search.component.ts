import { Component, OnInit } from '@angular/core';
import { MainService } from '../Services/main.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchName;
  listOfUsers = [];
  showError = false;
  id;
  constructor(private service: MainService,private router: Router) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId')
  }

  getUsersOnChange(){
    this.showError = false;
    this.checkSearchName()
    this.listOfUsers = [];
    this.service.searchUsers(this.searchName).subscribe(d=>{
      
      if(d.status == 200){
        
        d.result.map(n=>{
          let index = this.listOfUsers.findIndex(d=> d.id == n.id);
          if(!this.listOfUsers.includes(index))
            this.listOfUsers.push(n);          
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
    console.log("this is id",id)
    this.router.navigate(['profiles/',id])
  }


  
}
  
        //  if(this.id!=d.id){
        //    this.listOfUsers.push(d)
        //  }else{
        //    this.showError = true;
        //  }