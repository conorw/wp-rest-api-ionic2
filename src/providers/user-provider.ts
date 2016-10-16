import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Injectable()
export class UserProvider {
    stor: Storage;

    constructor(public events: Events, private http: Http) {
        this.stor = new Storage();
    }
    AUTHTOKEN: string = "authtoken";
    login(username, password) {
        let data = { username: username, password: password };

        this.stor.remove(this.AUTHTOKEN);
        // the important bit, contact the end point and ask for a token
        this.http.post('/server/wp-json/jwt-auth/v1/token', data)
            .subscribe(data => {
                this.stor.set(this.AUTHTOKEN, data);
                this.events.publish('user:login');
            },
            err => console.log(err)
            );
    }
    logout() {
        this.stor.remove(this.AUTHTOKEN);
        this.events.publish('user:logout');
    }
    checkedLoggedInStatus() {
        this.stor.get(this.AUTHTOKEN).then(output=>{
            if(output){
                this.events.publish('user:login');
            }});
    }
}