import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient } from '../providers/http-client';

@Injectable()
export class WordPressProvider {
  constructor(private events: Events, private http: HttpClient) {

  }
  createReport(score: string, report: string) {
    this.events.publish('wordpress:savestatus', { state: 'saving' });
    let data = {
      title: score,
      excerpt: report,
      content: report,
      status: 'publish'
    };
    // the important bit, make a request to the server to create a new post
    // The Authentication header will be added to the request automatically by our Interceptor service
    this.http.post('/server/wp-json/wp/v2/posts', data).subscribe(data => {
      this.events.publish('wordpress:savestatus', { state: 'finished' });
      this.events.publish('wordpress:createdreport');
    }, error => {
      this.events.publish('wordpress:savestatus', { state: 'error', message: error });
    });
  }
}