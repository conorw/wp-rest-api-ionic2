import { Component, ViewChild } from '@angular/core';

import { Events, Nav, Platform } from 'ionic-angular';

import { ReportPage } from '../pages/report/report';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user-provider';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [UserProvider]
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  constructor(
    public events: Events,
    public userData: UserProvider,
    platform: Platform
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });

    // decide which menu items should be hidden by current login status stored in local storage
    if (userData.isLoggedIn()) {
      this.rootPage = ReportPage;
    }

    this.listenToLoginEvents();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => this.rootPage = ReportPage);
    this.events.subscribe('user:logout', () => this.rootPage = LoginPage);
  }

}