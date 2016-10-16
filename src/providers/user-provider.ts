import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {
    stor: Storage;

    constructor(public events: Events) { 
        this.stor = new Storage();

    }
    AUTHTOKEN: string = "authtoken";
    login(username, password) {
        this.stor.remove(this.AUTHTOKEN);
        this.stor.set(this.AUTHTOKEN,username);
        this.events.publish('user:login');
    }


    logout() {
        this.stor.remove(this.AUTHTOKEN);
        this.events.publish('user:logout');
    }

    isLoggedIn() {
        return this.stor.get(this.AUTHTOKEN);
    }
}