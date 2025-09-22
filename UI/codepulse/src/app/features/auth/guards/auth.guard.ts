import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  let token = cookieService.get('Authorization');
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.GetUser();
  //1.Check by using JWT to make sure the user is logged in.

  if (token && user) {
    token = token.replace("Bearer","") // removed Bearer keyword
    const decoded_token: any = jwtDecode(token); // Take the raw token
    const currentTime = new Date().getTime();
    const expirationtime = decoded_token.exp * 1000

    // check if the token experied?
    if(currentTime > expirationtime){ // move to login page
              console.log("expired bby");
        authService.Logout();
        return router.createUrlTree(['/login'],{queryParams:{returnUrl : state.url}});
    }
    else{// token still not expired
      if(user.roles.includes("Writer")){
        return true
      }
      else{
        alert("Unauthorized");
        return false
      }
    }

  }
  //1. If not logged in, logout and move to login page
   else { 
    authService.Logout();
    return router.createUrlTree(['/login'],{queryParams:{returnUrl : state.url}});
  }
};
