import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../services/authenticate.service';
import { Subscription, catchError } from 'rxjs';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  submitted = false;
  serviceSubscribe: Subscription | undefined;
  errors: object | undefined;

  constructor(private formBuilder: FormBuilder, private service: AuthenticateService,
    private route: Router, private _snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.serviceSubscribe?.unsubscribe();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  onSubmit() {
    this.loading = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.serviceSubscribe = this.service.register(
      {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        name: this.form.get('name')?.value
      })
      .pipe(catchError(e => {
        this.loading = false;
        return this.errors = e.error.message
      }))
      .subscribe(() => {
        this._snackBar.open('Your registeration was successfully', 'close', {
          duration: 5000
        });
        this.route.navigateByUrl('/login');
      });


  }
  get f() {
    return this.form.controls;
  }
}
