import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8081/api/';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
    }

    login(credentials) {
        return new Promise((resolve, reject) => {

            this.http.post(apiUrl + 'users/authenticate', JSON.stringify(credentials), {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
            )
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    register(data) {
        return new Promise((resolve, reject) => {

            this.http.post(apiUrl + 'users', JSON.stringify(data), {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
            )
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            localStorage.clear();
        });
    }

}
