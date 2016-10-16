import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ReportPage } from '../pages/report/report';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ReportPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ReportPage
  ],
  providers: []
})
export class AppModule {}
