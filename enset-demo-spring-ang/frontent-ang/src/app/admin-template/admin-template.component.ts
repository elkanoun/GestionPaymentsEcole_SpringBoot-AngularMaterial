import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {

  constructor(private router : Router, 
              public authService : AuthService){
  }
  
  //imp ngOnInit()
  ngOnInit(){

  }

  //imp methode logout()
  logout(){
    this.authService.logout();
  }

}
