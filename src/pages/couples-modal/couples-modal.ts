import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {cageType} from "../cage-modal/cage-modal";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Storage} from "@ionic/storage";
/**
 * Generated class for the CouplesModalPage page.
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
  selector: 'page-couples-modal',
  templateUrl: 'couples-modal.html',
})
export class CouplesModalPage {

    couple: coupleType;
    addCouple: Boolean;
    birds: Array<any>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private http: HttpClient,
              private viewCtrl: ViewController) {
      this.couple = new coupleType();
      this.addCouple = true;
      if (navParams.get('couple')) {
          this.addCouple = false;
          this.couple = navParams.get('couple');
      }
      this.birds = [];
      this.getBirds();
  }

    getBirds() {
        class resultData {
            data: Array<any>
        }

        let self = this;
        this.storage.get("userid").then(function (userid) {
            self.http.get('http://localhost:8081/api/birds/user/' + userid).subscribe((res: resultData) => {
                self.birds = res.data;
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        });
    }

    saveCouple() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.couple.owner = userID;
            if (self.addCouple) {

                self.http.post('http://localhost:8081/api/couples/', JSON.stringify(self.couple),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //

                    self.dismiss();
                }, (err) => {
                    console.log(err);
                });
            } else {

                self.http.put('http://localhost:8081/api/couples/' + self.couple._id, JSON.stringify(self.couple),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //

                    self.dismiss();
                }, (err) => {
                    console.log(err);
                });
            }
        });

    }
    dismiss() {
        this.viewCtrl.dismiss({});
    }


}
