import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CageModalPage} from "../cage-modal/cage-modal";
import {CouplesModalPage} from "../couples-modal/couples-modal";
import {HttpClient} from "@angular/common/http";

import {Storage} from "@ionic/storage";
/**
 * Generated class for the CouplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couples',
  templateUrl: 'couples.html',
})
export class CouplesPage {

    couples = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl:ModalController,
              private storage: Storage,
              private http: HttpClient) {

      this.getCouples();
  }

    getCouples() {

        class resultData {
            data: Array<any>
        }

        let self = this;
        new Promise(function (resolve) {

            self.storage.get("userid").then(function (userid) {
                self.http.get('http://localhost:8081/api/couples/user/' + userid).subscribe((res: resultData) => {
                    let data = res;
                    self.couples = data.data;
                    console.log(data);
                    resolve();
                }, (err) => {
                    console.log(err);
                });
            });
        })
    }
    openModal() {

        let modal = this.modalCtrl.create(CouplesModalPage);
        modal.onDidDismiss(data => {
            this.getCouples();
        });
        modal.present();
    }

}
