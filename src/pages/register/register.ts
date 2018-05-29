import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  loading: any;
  regData = { email:'', password:'',phone:'',city:'' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  doSignup() {
    this.showLoader();
    this.authService.register(this.regData).then((result) => {
      this.loading.dismiss();
      this.navCtrl.push(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Communicating with ther server, please wait...'
    });

    this.loading.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
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
