import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CageModalPage} from "../cage-modal/cage-modal";
import {CouplesModalPage} from "../couples-modal/couples-modal";
import {HttpClient} from "@angular/common/http";

import {Storage} from "@ionic/storage";
import {cageType} from "../cages/cages";
/**
 * Generated class for the CouplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export class coupleType{
    _id:String;
    male: String;
    female: String;
    owner:String;
    name:String;
    description:String;
}
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
            self.storage.get("userid").then(function (userid) {
                self.http.get('http://localhost:8081/api/couples/user/' + userid).subscribe((res: resultData) => {
                    let data = res;
                    self.couples = data.data;
                    console.log(data);
                }, (err) => {
                    console.log(err);
                });
            });
    }
    openModal() {

        let modal = this.modalCtrl.create(CouplesModalPage);
        modal.onDidDismiss(data => {
            this.getCouples();
        });
        modal.present();
    }

    editCouple(obj:coupleType) {
        let modal = this.modalCtrl.create(CouplesModalPage, {couple: obj});
        modal.onDidDismiss(data => {
                 this.getCouples();
        });
        modal.present();

    }

    deleteCouple(id) {
        class resultData {
            data: Array<any>
        }

        console.log(id);
        this.http.delete('http://localhost:8081/api/couples/' + id).subscribe((res: resultData) => {
                this.getCouples();
            console.log(res);
        }, (err) => {
            console.log(err);
        });

    }
}
