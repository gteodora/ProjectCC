import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: 'username1',
    password: 'username1'};

  constructor(
    private app: AppService, 
    private http: HttpClient, 
    private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    console.log('login clicked');
    console.log('credentials:', this.credentials)
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('home');

    });
    // console.log('aaaaaaa')

   // this.app.authenticate(this.credentials);
  
  }

}
