import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models';
import {AuthService} from '../services/AuthService';
import {Subscription} from 'rxjs';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  user: User;
  isPermitted = false;
  private getUserSubscription: Subscription;

  constructor(private authService: AuthService, private titleService: Title) {
    this.titleService.setTitle('Home');
    this.getUserSubscription = this.authService.getUserSubject.subscribe( data => {this.user = data; });
  }


  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }

}
