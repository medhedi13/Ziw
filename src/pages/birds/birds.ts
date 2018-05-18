import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {BirdModalPage} from "../bird-modal/bird-modal";

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
    selector: 'page-birds',
    templateUrl: 'birds.html',
})

export class BirdsPage {
    birds = [];
    bird: bird;
    familys = [];
    constructor(private http: HttpClient, private storage: Storage, private modalCtrl: ModalController) {
        this.getBirds();
    }

    openBird() {
        let modal = this.modalCtrl.create(BirdModalPage);
        modal.onDidDismiss(data => {
          this.getBirds();
        });
        modal.present();
    }

    getBirds() {
        class resultData {
            data: Array<any>
        }

        let self = this;
        this.storage.get("userid").then(function (userid) {
            self.http.get('http://localhost:8081/api/birds/user/' + userid).subscribe((res: resultData) => {
                let data = res;
                self.birds = data.data;
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        });
    }




    editBird(obj: bird) {
        this.bird = obj;
        let modal = this.modalCtrl.create(BirdModalPage,{bird:this.bird});
        modal.onDidDismiss(data => {
            this.getBirds();
        });
        modal.present();

        // this.addBirdBtn = false;
    }

    deleteBird(id) {
        class resultData {
            data: Array<any>
        }

        console.log(id);
        this.http.delete('http://localhost:8081/api/birds/' + id).subscribe((res: resultData) => {
            this.getBirds();
            console.log(res);
        }, (err) => {
            console.log(err);
        });

    }
}
