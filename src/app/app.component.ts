import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Login } from '../pages/login/login';
import { Report } from '../pages/report/report';
import { UserProvider } from '../providers/user-provider';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [UserProvider]
})
export class MyApp {
  // the default root page is Login
  rootPage: any = Login;

  constructor(private events: Events, private userData: UserProvider) {
    // start listening to login and log out events
    // if the user is logged in then navigate to the Report page
    this.events.subscribe('user:login', () => this.rootPage = Report);
    this.events.subscribe('user:logout', () => this.rootPage = Login);

    // check to see if user has logged in before
    // if they have there will be a logged in event fired
    userData.checkedLoggedInStatus();
  }
}
