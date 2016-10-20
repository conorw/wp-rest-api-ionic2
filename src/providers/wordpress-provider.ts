import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Http } from '@angular/http';

@Injectable()
export class WordPressProvider {
    constructor(public events: Events, private http: Http) {

    }

    createReport(score: string, report: string) {
        this.events.publish('wordpress:savestatus', { state: 'saving' });
        console.log('saving...' + score + report);
        this.events.publish('wordpress:savestatus', { state: 'finished' });
        this.events.publish('wordpress:createdreport');
    }
}