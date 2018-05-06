import { Component,ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { Events,Platform,Nav } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  menuLogin=true;

  tab1Root = HomePage;
  tab2Root = LoginPage;
  tab3Root = RegisterPage;
  tab4Root= ProfilePage;
  @ViewChild(Nav) nav:Nav;
    constructor(public events: Events) {
    events.subscribe('userD5al', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log('Welcome', user, 'at', time);
      this.menuLogin=false;
    });
  }
}
