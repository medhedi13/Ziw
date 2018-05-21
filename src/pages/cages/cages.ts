import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpHeaders} from "@angular/common/http";
import {async} from "rxjs/scheduler/async";
import {BirdModalPage} from "../bird-modal/bird-modal";
import {bird} from "../birds/birds";
import {CageModalPage} from "../cage-modal/cage-modal";

/**
 * Generated class for the CagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


export class cageType {
    owner: string;
    number: number;
}

@IonicPage()
@Component({
    selector: 'page-cages',
    templateUrl: 'cages.html',
})
export class CagesPage {
    couples = [];
    cage: cageType;
    cages = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storage: Storage, private modalCtrl: ModalController) {
        this.cage = new cageType();
        (async () => {
            await this.getCouples();
            this.getCages();
        })();
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

        let modal = this.modalCtrl.create(CageModalPage);
        modal.onDidDismiss(data => {
            (async () => {
                await this.getCouples();
                this.getCages();
            })();
        });
        modal.present();
    }

    getCages() {
        let self = this;

        class resultData {
            data: Array<any>
        }

        this.storage.get("userid").then(function (userid) {
            self.http.get('http://localhost:8081/api/cages/user/' + userid).subscribe((res: resultData) => {
                let data = res.data, i, j;
                for (i in data) {
                    for (j in self.couples) {
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

    editCage(obj: cageType) {
        this.cage = obj;
        let modal = this.modalCtrl.create(CageModalPage, {cage: this.cage});
        modal.onDidDismiss(data => {
            (async () => {
                await this.getCouples();
                this.getCages();
            })();
        });
        modal.present();

    }

    deleteCage(id) {
        class resultData {
            data: Array<any>
        }

        console.log(id);
        this.http.delete('http://localhost:8081/api/cages/' + id).subscribe((res: resultData) => {
            (async () => {
                await this.getCouples();
                this.getCages();
            })();
            console.log(res);
        }, (err) => {
            console.log(err);
        });

    }

}
