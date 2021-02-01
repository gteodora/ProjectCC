import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from './services/app-service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 mediaSub: Subscription = new Subscription;
 deviceXs: boolean;
 isLoggedIn!: boolean;
 user!:any;

  constructor(public mediaObserver: MediaObserver,
    private httpClient: HttpClient,
    private router: Router,
    private appService: AppService){
    this.deviceXs=false;
    this.appService.user.subscribe(user => {
      this.user = user
    } );
  }

  ngOnInit(){
    this.appService.authenticate('','', true).subscribe(res => {
    },
      (err) => {
        if(err.status === 401) {
          this.router.navigate(['/login'])
        }
      }
    )

    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result:MediaChange) => {
        this.deviceXs=result.mqAlias === 'xs' ? true : false;
      }
  );
  }

  handleLogout() {
  this.appService.logout(() => {
    // this.isLoggedIn = false;
    sessionStorage.removeItem('user');
    this.router.navigate(['/login'])
  });
    }

}
