import {Component, Input,ViewChild} from '@angular/core';
import {NavController} from "ionic-angular";
import {BirdsPage} from "../../pages/birds/birds";
import {TabsPage} from "../../pages/tabs/tabs";


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

  constructor() {
    console.log('Hello SidebarComponent Component');
    this.text = 'Hello World';
  }

  Doemchy() {
    this.navCtrl.push(BirdsPage)
  }

  ngAfterViewInit() {


  }
}
export class nani<T extends new () => NavController> {


}
