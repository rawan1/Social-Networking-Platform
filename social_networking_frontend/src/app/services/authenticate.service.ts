import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { userRegisterationModel } from '../models/userRegisterationModel.model';
import { loginResponse } from '../models/loginResponse.model'
@Injectable({
  providedIn: 'root'
})
  export class AuthenticateService {

    backendUrl = environment.apiUrl + 'auth/';
    constructor(private http: HttpClient, private route: Router) { }

    login(payload: { email: string, password: string }): Observable<loginResponse> {
      return this.http.post<loginResponse>(this.backendUrl + 'login', payload);
    }
    isAuthenticated(): boolean {
      console.log(localStorage.getItem('user'));
      if (localStorage.getItem('user')) return true;
      this.route.navigateByUrl('/login');
      return false;
    }
    register(payload: userRegisterationModel): Observable<any> {
      return this.http.post<any>(this.backendUrl + 'register', payload);
    }
    logout(): Observable<unknown> {
      return this.http.post<unknown>(this.backendUrl + 'logout', {});

    }
  }
