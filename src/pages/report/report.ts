import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user-provider';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {

  constructor(public user: UserProvider) {

  }

  logout() {
    this.user.logout();
  }

}
