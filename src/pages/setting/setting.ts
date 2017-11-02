import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  accept: boolean;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public push: Push,
    public userProvider: UserProvider,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  changeToggle() {

    if (this.accept) {
      const options: PushOptions = {
        android: {},
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {},
        browser: {},
      };
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('registration').subscribe((registration: any) => {
        this.storage.get('userId').then((val) => {
          let userId = val;
          this.userProvider.registerDevice(userId, registration.registrationId);
        });
      });
    }
  }

  sendNotification() {
    let toast = this.toastCtrl.create({
      duration: 3000,
    });

    let title = 'ทดสอบการส่ง Notification';
    this.userProvider.sendPushNotificationAll(title, this.message).then(function (data: any) {

    });

    this.userProvider.sendToLine(this.message).then(function (data: any) {
      if (data.ok) {
        this.message = '';
        toast.setMessage('Send complete');
      } else {
        toast.setMessage('Send failed!');
      }
      toast.present();
    });
  }

}
