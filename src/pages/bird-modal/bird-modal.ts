import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Storage} from "@ionic/storage";

/**
 * Generated class for the BirdModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class bird {
    _id: String;
    ring: String;
    name: String;
    family: String;
    birth: String;
    description: String;
    Photo: Array<any>;
    owner: String
}

@IonicPage()
@Component({
    selector: 'page-bird-modal',
    templateUrl: 'bird-modal.html',
})
export class BirdModalPage {

    bird: bird;
    addBirdBtn = true;
    familys = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage, private http: HttpClient) {
        this.bird = new bird();
        this.getFamily();
        this.addBirdBtn=true;
        if(navParams.get('bird'))
        {
            this.addBirdBtn=false;
            this.bird=navParams.get('bird');
        }
    }


    getFamily() {
        class resultData {
            data: Array<any>
        }

        this.http.get('http://localhost:8081/api/familys').subscribe((res: resultData) => {
            this.familys = res.data;
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }

    dismiss() {
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }

    addBird() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.bird.owner = userID;
            if (self.addBirdBtn) {
                self.http.post('http://localhost:8081/api/birds/', JSON.stringify(self.bird),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //TODO self.getBirds();
                    self.dismiss();
                }, (err) => {
                    console.log(err);
                });
            } else {
                self.http.put('http://localhost:8081/api/birds/' + self.bird._id, JSON.stringify(self.bird),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //TODO self.getBirds();
                    self.dismiss();
                    //
                }, (err) => {
                    console.log(err);
                });
            }
        });
    }
}
