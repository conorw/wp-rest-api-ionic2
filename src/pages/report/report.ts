import { Component } from '@angular/core';
import { IonicPage, Events, LoadingController, Loading, ToastController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press-provider';
import { UserProvider } from '../../providers/user-provider';

@IonicPage()
@Component({
  selector: 'page-report',
  providers: [WordPressProvider],
  templateUrl: 'report.html',
})
export class Report {

  private score: string;
  private report: string;
  private loader: Loading;

  constructor(private events: Events, private wordpress: WordPressProvider, private user: UserProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.createLoader();
    this.listenToWordPressEvents();
  }
  createReport() {
    // pass the texbox input to our WordPress service
    this.wordpress.createReport(this.score, this.report);
  }
  private createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Saving..."
    });
  }
  private listenToWordPressEvents() {
    this.events.subscribe('wordpress:savestatus', (state) => {
      console.log(state);
      if (state.state === 'saving') {
        this.loader.present();
        console.log('saving');
      }
      else if (state.state === 'error') {
        this.loader.dismiss();
        this.createLoader();
        this.toastCtrl.create({ message: 'Error Saving Report', duration: 3000 }).present();
      }
      else if (state.state === 'finished') {
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
  logout() {
    this.user.logout();
  }
}
