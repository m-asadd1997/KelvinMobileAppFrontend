import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../Services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id;
  userName;
  constructor(private activateRoute:ActivatedRoute,private service: MainService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(){
    this.id = this.activateRoute.snapshot.params['id'];
    if(this.id){
      this.service.getUserById(this.id).subscribe(d=>{
        this.userName = d.result.name;
      })
    }

  }

}
