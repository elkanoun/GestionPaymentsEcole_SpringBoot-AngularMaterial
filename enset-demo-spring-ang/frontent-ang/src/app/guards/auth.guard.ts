import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/*pour etre guard doit etre svc,on l'annote avec @Injectable*/
@Injectable()  
export class AuthGuard{ /*cette classe implements first CanActivate*/

  constructor(private authService : AuthService, private router : Router){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.authService.isAuthenticated){
      return true;
    }else{
      this.router.navigateByUrl("/login");
      return false;
    }  
  }

}

