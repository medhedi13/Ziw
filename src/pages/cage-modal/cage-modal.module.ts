import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CageModalPage } from './cage-modal';

@NgModule({
  declarations: [
    CageModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CageModalPage),
  ],
})
export class CageModalPageModule {}
