import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
import { json } from 'stream/consumers';
import { Subscription, catchError, map } from 'rxjs';
import { isKeyObject } from 'util/types';
import { loginResponse } from '../../../models/loginResponse.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  error: string = '';
  serviceSubscribe: Subscription | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit() {
    this.loading = true;
    // this.authService.login({email: this.form.email, password: this.form.password});
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.serviceSubscribe = this.authService.login({ email: this.form.get('email')?.value, password: this.form.get('password')?.value })
      .pipe(catchError(e => this.error = e.error.message), map(result => result as loginResponse))
      .subscribe((result) => {
        if (typeof (result) !== 'string') {
          localStorage.setItem('user', JSON.stringify(result.data));
          this.route.navigateByUrl('/home');
        }
      });

    this.loading = false;
  }
  ngOnDestroy(): void {
    this.serviceSubscribe?.unsubscribe();
  }
}
