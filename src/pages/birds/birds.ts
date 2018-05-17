import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";

export class bird {
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
    familys=[];
    constructor(private http: HttpClient, private storage: Storage) {
        this.bird = new bird();
        this.getBirds();
        this.getFamily();
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

    addBird() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let self = this;
        this.storage.get("userid").then(function (userID) {
            self.bird.owner = userID;
            self.http.post('http://localhost:8081/api/birds/', JSON.stringify(self.bird),
                httpOptions).subscribe(res => {
                console.log(res);
                //
            }, (err) => {
                console.log(err);
            });
        });
    }

    getFamily() {
        class resultData {
            data: Array<any>
        }

        let self = this;
        this.http.get('http://localhost:8081/api/familys').subscribe((res: resultData) => {
            this.familys = res.data;
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
}
