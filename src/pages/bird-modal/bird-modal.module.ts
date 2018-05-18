import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdModalPage } from './bird-modal';

@NgModule({
  declarations: [
    BirdModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdModalPage),
  ],
})
export class BirdModalPageModule {}
