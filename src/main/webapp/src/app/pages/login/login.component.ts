import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
    submitted = false;
    returnUrl?: string;
    error = '';
    
  credentials = {
    username: 'username1',
    password: 'username1'
  };
  formLoaded:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private app: AppService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
      this.loginForm = this.formBuilder.group({
        username: [''], //, Validators.required],
        password: [''], // Validators.required]
    })
  setTimeout(() => this.formLoaded = true, 500)

    // redirect to home if already logged in
    if (this.app.isAuthentificated) {
      this.router.navigate(['home']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.app.authenticate(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              //DODATI da se u app.ts apdejtuje isLoggedIn
                this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/book']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}
}
