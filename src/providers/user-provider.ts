import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '../providers/http-client';
import 'rxjs/Rx';

@Injectable()
export class UserProvider {
  constructor(public events: Events, private http: HttpClient, private stor: Storage) {
  }
  // this is a unique token for storing auth tokens in your local storage
  // for later use
  AUTHTOKEN: string = "myauthtokenkey";

  checkedLoggedInStatus() {
    this.stor.get(this.AUTHTOKEN).then(output => {
      if (output) {
        console.log(`User is logged in: ${output}`);
        this.events.publish('user:login');
      }
    });
  }
  // determine if the user/password can be authenticated and fire an event when finished
  login(username, password) {
    let data = { username: username, password: password };
    // remove any existing auth tokens from local storage
    this.stor.remove(this.AUTHTOKEN);
    // the important bit, contact the WP end point and ask for a token
    this.http.post('/server/wp-json/jwt-auth/v1/token', data).map(res => res.json())
      .subscribe(response => {
        // great we are authenticated, save the token in localstorage for future use
        this.stor.set(this.AUTHTOKEN, response.token);
        // and start using the token in every subsequent http request to the WP server
        this.http.addHeader('Authorization', 'Bearer ' + response.token);
        // fire an event to say we are authenticated
        this.events.publish('user:login');
      },
      err => console.log(err)
      );
  }
  logout() {
    this.stor.remove(this.AUTHTOKEN);
    this.events.publish('user:logout');
  }
}