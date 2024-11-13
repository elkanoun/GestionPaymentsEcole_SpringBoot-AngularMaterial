import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated : boolean = false;
  public username : any;
  public roles : string []=[];
 
  //data login
  public users : any = {
    admin : { password :"1234", roles :['ADMIN']},
    user1 : { password :"1234", roles :['STUDENT']}
  }

  constructor(private router : Router) { 
  }
  
  //dev method login()
  public login(username : string, password : string){
    if(this.users[username] && password == this.users[username]['password'] ){
      this.username  = username;
      this.isAuthenticated = true;
      this.roles = this.users[username]['roles'];
      return true;
    }else{
      return false;
    }
  }

  //dev methode logout()
  logout(){
    this.isAuthenticated = false;
    this.username = undefined;
    this.roles = [];
    this.router.navigateByUrl("/login");
  }

}
