import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/user-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined)
  constructor(private http : HttpClient,private cookieService : CookieService) { }
  
  loginSubmit(model : LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaserl}api/Auth/login`, model);
  }

  setUser( user : User): void{
    this.$user.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
  }
  user():Observable<User|undefined>{
    return this.$user.asObservable();
  }
 
  GetUser(): User | undefined{
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if(email && roles ){
      const user :User={
        email : email,
        roles : roles.split(',')
      };
      return user 
    }
    return undefined

  }
  Logout():void{
    // clear the whole local storage
    localStorage.clear();
    // delete the cookie
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);

  }
}
