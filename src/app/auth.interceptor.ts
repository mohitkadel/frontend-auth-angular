import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        // add authorization header with basic auth credentials if available
        const user = this.loginService.user;
        const token = this.loginService.token;
        if (user && this.loginService.token) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': `${token}`
                }
            });
        }
        // request = request.clone({
        //     setHeaders: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // });
        console.log('request')
        console.log(request)
        request = request.clone({ url: 'https://test-school-api.herokuapp.com/api' + request.url });

        return next.handle(request);
    }
}
