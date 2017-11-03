import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
// plugins
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// ifaces
import { ICustomer } from '../../models/customer';

// providers
import { CustomerProvider } from '../../providers/customer/customer';



@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  customer: ICustomer;
  db: SQLiteObject;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public platform: Platform,
    public toastCtrl: ToastController,
  ) {

    platform.ready().then(() => {
      let db = new SQLite();
      db.create({
        name: "shipping.db",
        location: "default"
      }).then((db: SQLiteObject) => {
        this.db = db;
        console.log('dabase open in customer');
      }, (error) => {
        console.log(error);
      });
    });

    this.customer = this.navParams.get('customer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HelloPage');
  }

  save() {
    let toast = this.toastCtrl.create({
      duration: 3000,
    });

    let promise;
    if (this.customer.id) {
      promise = this.customerProvider.update(this.db, this.customer);
    } else {
      promise = this.customerProvider.insert(this.db, this.customer);
    }

    promise.then((data) => {
      toast.setMessage('บันทึกข้อมูลเรียบร้อยแล้ว');
      toast.present();
      this.navCtrl.pop();
    }, (error) => {
      console.log(error);
    });

  }

}
