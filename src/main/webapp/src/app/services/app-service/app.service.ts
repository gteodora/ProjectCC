import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  /////  public user: Observable<User>;
  public user: BehaviorSubject<any>=new BehaviorSubject<any>(null);
  authdata!: string;
  public isAuthentificated: boolean = false;

  constructor(private httpClient: HttpClient,
    private router: Router) {
      //this.isLogedIn=new BehaviorSubject<Boolean>(JSON.parse(localStorage.getItem('user')));
  }

  authenticate(username: string, password: string, fromApp?: boolean) {
    const locSt = localStorage.getItem('user')
    if(fromApp && locSt) {
      return this.httpClient.get(`${environment.apiUrl}/auth/auth`, {headers: new HttpHeaders({
        authorization: 'Basic ' + locSt
      })})
      .pipe(map((user: any) => {
        this.user.next(user);
        this.isAuthentificated = true;
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        sessionStorage.setItem('user', JSON.stringify(this.authdata));
        return user;
      }));
    }
   this.authdata = btoa(username + ':' + password);
    const headers = new HttpHeaders({
      authorization: 'Basic ' + this.authdata
    });

    return this.httpClient.get(`${environment.apiUrl}/auth/auth`, { headers })
      .pipe(map((user: any) => {
        this.user.next(user);
        this.isAuthentificated = true;
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        sessionStorage.setItem('user', JSON.stringify(this.authdata));
        return user;
      }));
  }
  logout(callback: Function) {
    this.isAuthentificated = false;
    this.user.next(null)
    callback()
  }

  isUserLoggedIn() {
    return this.user ? this.user : null
    let user = sessionStorage.getItem('user')
    if (user === null) return false
    return true
  }
}




