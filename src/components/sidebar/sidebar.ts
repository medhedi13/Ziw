import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {BirdsPage} from "../../pages/birds/birds";

/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.html'
})
export class SidebarComponent {
  navCtrl: any;
  @Input("idSide") testing;
  text: string;
  content: any;

  constructor(public navCtrl:NavController) {
    console.log('Hello SidebarComponent Component');
    this.text = 'Hello World';
  }

  emchy() {
    this.navCtrl.push(BirdsPage);
  }
}