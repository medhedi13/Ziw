import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { email:'', password:'' };
  data: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private storage: Storage) {}

  doLogin() {
  this.showLoader();
    this.authService.login(this.loginData).then((result) => {
    this.loading.dismiss();
    this.data = result;
     if (this.data.success) {
       // set a key/value
      this.storage.set('token', this.data.token);

      // Or to get a key/value pair
      this.storage.get('token').then((val) => {
        console.log('Your token is', val);
      });
         this.navCtrl.setRoot(TabsPage);
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

  showLoader(){
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

}
