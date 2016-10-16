import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user-provider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;
  constructor(public UserProvider: UserProvider) {
  }
  
  login() {
    this.UserProvider.login(this.username, this.password);
  }

}
