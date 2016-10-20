import { Component, ViewChild } from '@angular/core';

import { Events, Nav } from 'ionic-angular';

import { ReportPage } from '../pages/report/report';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user-provider';
import { WordPressProvider } from '../providers/wordpress-provider';
import { HttpClient } from '../providers/http-client-service';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [UserProvider, WordPressProvider, HttpClient]
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  constructor(
    private events: Events,
    private userData: UserProvider
  ) {
    this.listenToLoginEvents();
    userData.checkedLoggedInStatus();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => this.rootPage = ReportPage);
    this.events.subscribe('user:logout', () => this.rootPage = LoginPage);
  }
}