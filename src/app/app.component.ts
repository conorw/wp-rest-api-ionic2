import { Component, ViewChild } from '@angular/core';
import { Events, Nav } from 'ionic-angular';

import { Login } from '../pages/login/login';
import { Report } from '../pages/report/report';

import { UserProvider } from '../providers/user-provider';
import { WordPressProvider } from '../providers/word-press-provider';
import { HttpClient } from '../providers/http-client';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [UserProvider, WordPressProvider, HttpClient]
})
export class MyApp {
  rootPage: any = Login;
  @ViewChild(Nav) nav: Nav;
  constructor(
    private events: Events,
    private userData: UserProvider
  ) {
    this.listenToLoginEvents();
    userData.checkedLoggedInStatus();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => this.rootPage = Report);
    this.events.subscribe('user:logout', () => this.rootPage = Login);
  }
}
