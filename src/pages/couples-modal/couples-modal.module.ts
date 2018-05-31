import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouplesModalPage } from './couples-modal';

@NgModule({
  declarations: [
    CouplesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CouplesModalPage),
  ],
})
export class CouplesModalPageModule {}
