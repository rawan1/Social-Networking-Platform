import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticateService } from "../services/authenticate.service";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authervice: AuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const isLoggedIn = this.authervice.isAuthenticated();
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl && localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user') || '')?.token;
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(request);
    }
}