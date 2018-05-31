import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {bird} from "../birds/birds";

import Moment from 'moment';
/**
 * Generated class for the BirdSalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bird-sale',
  templateUrl: 'bird-sale.html',
})
export class BirdSalePage {

    birds = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,
    private storage: Storage) {
      this.getBirds();
  }

    humanDate(str) {
        return Moment(str).fromNow();
    }
    getBirds() {
        class resultData {
            data: Array<any>
        }

        let self = this;
            self.http.get('http://localhost:8081/api/birds/onsale/').subscribe((res: resultData) => {
                let data = res;
                self.birds = data.data;
                console.log(res);
            }, (err) => {
                console.log(err);
            });
    }

}
