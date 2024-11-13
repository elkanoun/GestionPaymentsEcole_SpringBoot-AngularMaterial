import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm! : FormGroup;

  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private router : Router){
  }

  //imp methode ngOnInit()
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    })
  }

  //imp methode login()
  login(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let res:boolean = this.authService.login(username,password);
    if(res == true){
      this.router.navigateByUrl("/admin");
    }
  }

}
