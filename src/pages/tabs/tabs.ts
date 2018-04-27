import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LoginPage;
  tab3Root = RegisterPage;

  constructor() {

  }
}
