import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-birds',
  templateUrl: 'birds.html',
})

export class BirdsPage {
  birds = [];


  constructor( private http: HttpClient, private storage: Storage) {
    this.getBirds();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad BirdsPage');
  // };


  getBirds() {
      class resultData {
          data:Array<any>
      }
    let self = this;
    this.storage.get("userid").then(function (userid) {
      self.http.get('http://localhost:8081/api/birds/user/' + userid).subscribe((res:resultData) => {
        let data = res;
        self.birds = data.data;
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    });
  }
  addBird(){

  }
}
