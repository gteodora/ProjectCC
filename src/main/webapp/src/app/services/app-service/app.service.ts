import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { User } from '../user/user.service';

import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  // BASE_PATH: 'http://localhost:8080'     //public URL:string = "http://localhost:8080/api/users";
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string='';
  public password: string='';
  authenticated=false;

  constructor(private httpClient: HttpClient,
    private location: Location) { }

  authenticate(credentials:any, callback: any){
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    return this.httpClient.get("http://localhost:8080/api/user/", {headers}).subscribe(
      (data:any)=> 
    {
      // window.location.reload()
      console.log(data);
      this.username=credentials.username;
      this.password=credentials.password;
      this.registerSuccessfulLogin(this.username, this.password);
      //this.location.reload();
     
    }
    );
    
    // .pipe(map((res)=> {
    //   console.log('pipe')
      // this.username=credentials.username;
      // this.password=credentials.password;
      // this.registerSuccessfulLogin(this.username, this.password);
    // }))
  }
  /* */
  registerSuccessfulLogin(username:string, password:string) {
    console.log('setovan session storage')
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }
  logout() {
    return this.httpClient.get("http://localhost:8080/logout").subscribe(
      (data:any)=> {

    })
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';

  }
  isUserLoggedIn(){
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    console.log('is user logged in',user)
    if (user === null) return false
    return true
  }
}
