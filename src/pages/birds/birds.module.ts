import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdsPage } from './birds';

@NgModule({
  declarations: [
    BirdsPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdsPage),
  ],
})
export class BirdsPageModule {}
