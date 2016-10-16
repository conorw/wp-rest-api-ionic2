import { Component, ViewChild } from '@angular/core';

import { Events, Nav } from 'ionic-angular';

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
    public userData: UserProvider
  ) {
    this.listenToLoginEvents();
    userData.checkedLoggedInStatus();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => this.rootPage = ReportPage);
    this.events.subscribe('user:logout', () => this.rootPage = LoginPage);
  }
}