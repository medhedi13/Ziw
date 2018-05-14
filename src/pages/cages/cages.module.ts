import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CagesPage } from './cages';

@NgModule({
  declarations: [
    CagesPage,
  ],
  imports: [
    IonicPageModule.forChild(CagesPage),
  ],
    providers:[

    ]
})
export class CagesPageModule {}
