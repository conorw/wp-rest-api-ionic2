import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Report } from './report';

@NgModule({
  declarations: [
    Report,
  ],
  imports: [
    IonicPageModule.forChild(Report),
  ],
  exports: [
    Report
  ]
})
export class ReportModule {}
