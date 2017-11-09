import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  LoadingController,
  AlertController,
  ToastController,
} from 'ionic-angular';

// plugins
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';

// providers
import { CustomerProvider } from '../../providers/customer/customer';

// ifaces
import { ICustomer } from '../../models/customer';

// pages
import { CustomerPage } from '../customer/customer';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  db: SQLiteObject;
  customers: Array<ICustomer> = [];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public sqlite: SQLite,
    public customerProvider: CustomerProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public callNumber: CallNumber,
  ) {
    this.initDB();
  }

  initDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'shipping.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          this.customerProvider.getCustomers(db).then((data: any) => {
            let rows = data.rows;
          }, (error) => {
            this.db = db;
            this.createTable(db);
            this.checkSQLiteData(db);
          });

        })
        .catch(e => console.log(e));
    });
  }

  createTable(db: SQLiteObject) {
    let sql = `
      create table if not exists customer (
        id integer primary key autoincrement,
        firstname varchar(50) not null,
        lastname varchar(50),
        gender varchar(1),
        email varchar(80),
        address varchar(200),
        phone varchar(20),
        photo text, lat double, lng double
      )
    `;
    db.executeSql(sql, []).then((data) => {
      console.log('Create table success');
    }, (error) => {
      console.log('Create table failed! ', error);
    });
  }

  checkSQLiteData(db: SQLiteObject) {
    this.customerProvider.getCustomers(db).then((data: any) => {
      let rows = data.rows;
      if (rows.length > 0) {
        // exist data from SQLite
        console.log('Data exist in SQLite')
      } else {
        console.log('Load new data from API');
        this.loadFromAPI(db);
      }
    }, (error) => { });
  }

  loadFromAPI(db: SQLiteObject) {
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...'
    });

    console.log('Start loading data from API...');
    let parent = this;
    this.customerProvider.deleteAll(db).then((data) => {
      parent.customerProvider.loadFromAPI(db).then((data) => {
        parent.getCustomers(db);
      }, (error) => {
        loader.dismiss();
      });
    }, (error) => {
      loader.dismiss();
    });
    console.log('Load data completed!');
  }

  getCustomers(db: SQLiteObject) {
    let parent = this;
    this.customers = [];
    this.customerProvider.getCustomers(db).then((data: any) => {
      let rows = data.rows;
      for (let i = 0; i < rows.length; i++) {
        let v = rows.item(i);
        parent.customers.push({
          id: v.id,
          firstname: v.firstname,
          lastname: v.lastname,
          gender: v.gender,
          email: v.email,
          address: v.address,
          phone: v.phone,
          photo: v.photo, lat: v.lat, lng: v.lng
        });
      };
      console.log(this.customers.length);
      console.log('Get data completed');
    }, (error) => {
      console.log('Get data failed!', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
  }

  ionViewWillEnter() {
    if (this.db) {
      // get from sqlite
      this.getCustomers(this.db);
    } else {
    }
    console.log('ionViewWillEnter CustomerListPage');
  }

  edit(customer: ICustomer) {
    this.navCtrl.push(CustomerPage, { 'customer': customer });
  }

  remove(customer: ICustomer) {
    let toast = this.toastCtrl.create({
      duration: 3000
    });

    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'ต้องการลบลูกค้าหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.customerProvider.delete(this.db, customer.id).then((data) => {
              toast.setMessage('ลบข้อมูลเรียบร้อยแล้ว');
              toast.present();
              this.getCustomers(this.db);
            }, (error) => {
              console.log('Delete error', error);
            });
          }
        }
      ]
    });
    alert.present();
  }

  viewMap(customer: ICustomer) {
    this.navCtrl.push(MapPage, { 'customer': customer });
  }

  callPhone(customer: ICustomer) {
    this.callNumber.callNumber(customer.phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
