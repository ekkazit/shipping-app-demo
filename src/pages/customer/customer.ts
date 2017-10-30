import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ICustomer } from '../../models/customer';

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  customer: ICustomer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.customer = this.navParams.get('myCustomer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HelloPage');
  }

  backToHome() {
    this.navCtrl.pop();
  }
}
