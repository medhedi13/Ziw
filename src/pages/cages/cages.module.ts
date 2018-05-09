import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CagesPage } from './cages';
import {Http} from "@angular/http";

@NgModule({
  declarations: [
    CagesPage,
  ],
  imports: [
    IonicPageModule.forChild(CagesPage),
  ],
    providers:[
        Http
    ]
})
export class CagesPageModule {}
