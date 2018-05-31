import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service/auth-service';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import {Storage} from '@ionic/storage';
import {HomePage} from "../home/home";
import {Events} from 'ionic-angular';
// import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {
    AuthService as AuthFb,
    FacebookLoginProvider
} from 'angular5-social-login';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    login = null;
    loading: any;
    loginData = {email: '', password: '', first_name: '', last_name: ''};
    data: any;

    constructor(public navCtrl: NavController,
                public authService: AuthService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private storage: Storage,
                public events: Events,
                private socialAuthService: AuthFb,
                private http:HttpClient
                // private facebook: Facebook
    ) {
    }

    doLogin() {
        this.showLoader();
        this.authService.login(this.loginData).then((result) => {
            this.loading.dismiss();
            this.data = result;
            if (this.data.success) {
                // set a key/value

                this.storage.set('token', this.data.token);
                this.storage.set('userid', this.data.data._id);

                // Or to get a key/value pair
                this.storage.get('token').then((val) => {
                    console.log('Your token is', val);
                });
                this.navCtrl.setRoot(HomePage);
                this.events.publish('userD5al', "x", Date.now());
            } else {
                this.presentToast(this.data.message);
            }
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });

    }

    register() {
        this.navCtrl.push(RegisterPage);
    }

    public showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    loginFBTest(socialPlatform : string){

        this.showLoader();
        let socialPlatformProvider;
        if(socialPlatform == "facebook"){
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {

                console.log(socialPlatform+" sign in data : " , userData);
                class resultData {
                    data: {
                        _id:String
                    };
                }

                this.loading.dismiss();
                let self=this;
                this.http.post("http://localhost:8081/api/users/loginfb",JSON.stringify(userData),{
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }).subscribe(function (res:resultData) {
                    self.storage.set('userid', res.data._id);

                    self.navCtrl.setRoot(HomePage);
                    self.events.publish('userD5al', "x", Date.now());
                })
            }
        );
    }

}
