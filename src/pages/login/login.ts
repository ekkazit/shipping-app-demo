import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    let loader = this.loadingCtrl.create({
      content: 'Logging...',
      spinner: 'dots'
    });
    loader.present();

    this.userProvider.login(this.username, this.password)
      .then((data: any) => {
        loader.dismiss();
        if (data.ok) {
          this.storage.set('userId', data.userId);
          this.storage.set('token', data.token);
          this.storage.set('username', this.username);
          this.navCtrl.setRoot(HomePage);
        }
      }, (error) => {
        loader.dismiss();
        console.log(error);
      });
  }
}
