import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const cookieService = inject(CookieService); // 👈 use inject() instead of constructor
    
    const token = cookieService.get('Authorization');

    if(req.urlWithParams.indexOf('addAuth=true',0) != -1){
    // clone request and add a header
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    
    return next(modifiedReq);
    }

return next(req);
};
