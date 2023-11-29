import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { userRegisterationModel } from '../models/userRegisterationModel.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  backendUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient, private route: Router) { }

  logIn(payload: { email: string, password: string }): Observable<{ token: string, name: string }> {
    return this.http.post<{ token: string, name: string }>(this.backendUrl + 'login', payload);
  }
  isAuthenticated(): boolean {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('user')) return true;
    this.route.navigateByUrl('/login');
    return false;
  }
  register(payload: userRegisterationModel): Observable<never> {
    return this.http.post<never>(this.backendUrl + 'Register', payload);
  }
}
