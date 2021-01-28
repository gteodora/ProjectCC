import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AppService } from './services/app-service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
 mediaSub: Subscription = new Subscription;
 deviceXs: boolean;
 isLoggedIn = false;

  constructor(public mediaObserver: MediaObserver,
    private httpClient: HttpClient,
    private appService: AppService){
    this.deviceXs=false;
  }

  ngOnInit(){
    this.isLoggedIn = this.appService.isUserLoggedIn();

    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result:MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs=result.mqAlias === 'xs' ? true : false;
      }
  );
  }

  ngOnDestroy(){

  }
  handleLogout() {
  this.appService.logout();
  this.isLoggedIn = false;
    }

    public setIsLoggedIn(flag:boolean):void{
      this.isLoggedIn=flag;
    }
}
