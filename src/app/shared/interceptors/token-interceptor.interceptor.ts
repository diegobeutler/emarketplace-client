import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "../../pages/login/login.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private _loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._loginService.isAuthenticated) {
            req = req.clone({ setHeaders: { Authorization: 'Bearer ' + this._loginService.authInfo ?? '' } });
        }
        return next.handle(req);
    }

}
