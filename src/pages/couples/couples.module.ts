import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouplesPage } from './couples';

@NgModule({
  declarations: [
    CouplesPage,
  ],
  imports: [
    IonicPageModule.forChild(CouplesPage),
  ],
})
export class CouplesPageModule {}
