import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Storage} from "@ionic/storage";

/**
 * Generated class for the CageModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class cageType {
    _id: String;
    owner: string;
    number: number;
    male: String;
    female: String;
}

@IonicPage()
@Component({
    selector: 'page-cage-modal',
    templateUrl: 'cage-modal.html',
})
export class CageModalPage {
    cage: cageType;
    addCage: Boolean;
    userid: String;
    birds: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private http: HttpClient,
                private viewCtrl: ViewController) {

        this.cage = new cageType();
        this.addCage = true;
        if (navParams.get('cage')) {
            this.addCage = false;
            this.cage = navParams.get('cage');
        }
        this.getUserId();
        this.birds = [];
        this.getBirds();
    }

    getUserId() {
        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.userid = userID;
        });
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
    saveCage() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.cage.owner = userID;
            self.cage.number = Number(self.cage.number);
            console.log(self.cage);
            if (self.addCage) {

                self.http.post('http://localhost:8081/api/cages/', JSON.stringify(self.cage),
                    httpOptions).subscribe(res => {
                    console.log(res);
                    //

                    self.dismiss();
                }, (err) => {
                    console.log(err);
                });
            } else {

                self.http.put('http://localhost:8081/api/cages/' + self.cage._id, JSON.stringify(self.cage),
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
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }

}
