import { Component } from '@angular/core';
import { WordPressProvider } from '../../providers/wordpress-provider';
import { Events, LoadingController, Loading, ToastController } from 'ionic-angular';
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  private score: string;
  private report: string;
  private loader: Loading;

  constructor(private events: Events, private wordpress: WordPressProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.createLoader();
    this.listenToWordPressEvents();
  }
  private createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Saving..."
    });
  }
  private listenToWordPressEvents() {
    this.events.subscribe('wordpress:savestatus', (state) => {
      console.log(state);
      if (state[0].state === 'saving') {
        this.loader.present();
        console.log('saving');
      }
      else if (state[0].state === 'error') {
        this.loader.dismiss();
        this.createLoader();
        this.toastCtrl.create({ message: 'Error Saving Report', duration: 3000 }).present();
      }
      else if (state[0].state === 'finished') {
        this.loader.dismiss();
        this.createLoader();
        console.log('finished');
      }
    });
    this.events.subscribe('wordpress:createdreport', () => {
      this.toastCtrl.create({ message: 'Report Created', duration: 3000 }).present();
      this.report = '';
      this.score = '';
    });
  }
  createReport() {
    this.wordpress.createReport(this.score, this.report);
  }
}
