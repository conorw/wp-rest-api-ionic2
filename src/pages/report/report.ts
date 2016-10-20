import { Component } from '@angular/core';
import { WordPressProvider } from '../../providers/wordpress-provider';
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  score: string;
  report: string;

  constructor(public events: Events, public wordpress: WordPressProvider) {
    this.listenToWordPressEvents();
  }

  private listenToWordPressEvents() {
    this.events.subscribe('wordpress:savestatus', (state) => {
      console.log(state);
      if (state[0].state === 'saving') {
        console.log('saving');
      }
      else if (state[0].state === 'finished') {
        console.log('finished');
      }
    });
    this.events.subscribe('wordpress:createdreport', () => console.log('created report'));
  }

  createReport() {
    this.wordpress.createReport(this.score, this.report);
  }
}
