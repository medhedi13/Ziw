import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Headers} from "@angular/http";

/**
 * Generated class for the CagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cages',
  templateUrl: 'cages.html',
})
export class CagesPage {
    couples=[];
    cage={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {
      this.getCouples();
  }
  getCouples(){
      let self=this;
      this.storage.get("userid").then(function (userid) {
          self.http.get('http://localhost:8081/api/couples/user/' + userid).subscribe(res => {
              let data =res;
              self.couples = data.data;
              console.log(data);
          }, (err) => {
              console.log(err);
          });
      });
  }

    saveCage() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.cage.owner=userID;
            self.cage.number=Number(self.cage.number);
            console.log(self.cage);
            self.http.post('http://localhost:8081/api/cages/', JSON.stringify(self.cage),
                {headers: headers}).subscribe(res => {
                console.log(res);
                //
            }, (err) => {
                console.log(err);
            });
        });

    }


}
