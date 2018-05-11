import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpHeaders} from "@angular/common/http";
import {async} from "rxjs/scheduler/async";

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
    couples = [];
    cage = {};
    cages = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {
        (async () => {
            await this.getCouples();
            this.getCages();
        })();
    }

    getCouples() {
        let self = this;
        new Promise(function (resolve) {

            self.storage.get("userid").then(function (userid) {
                self.http.get('http://localhost:8081/api/couples/user/' + userid).subscribe(res => {
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

    getCages() {
        let self = this;
        this.storage.get("userid").then(function (userid) {
            self.http.get('http://localhost:8081/api/cages/user/' + userid).subscribe(res => {
                let data = res.data, i, j;
                for (i in data) {
                    for (j in self.couples)
                    {
                        console.log(self.couples[j]._id, data[i].couple);
                        if (self.couples[j]._id == data[i].couple)
                            data[i].coupleName = self.couples[j].description;
                    }
                }
                self.cages = data;
                console.log(data);
            }, (err) => {
                console.log(err);
            });
        });
    }

    saveCage() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
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
            self.http.post('http://localhost:8081/api/cages/', JSON.stringify(self.cage),
                httpOptions).subscribe(res => {
                console.log(res);
                //
            }, (err) => {
                console.log(err);
            });
        });

    }


}
