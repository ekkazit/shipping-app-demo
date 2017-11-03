import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';

// plugins
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// providers
import { CustomerProvider } from '../../providers/customer/customer';

// ifaces
import { ICustomer } from '../../models/customer';

// pages
import { CustomerPage } from '../customer/customer';

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
          this.db = db;
          this.createTable(db);
          this.loadFromAPI(db);

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
      // get from api
      this.customerProvider.getCustomerAPI().then((data: any) => {
        this.customers = data.rows;
      }, (error) => {
        console.log('get data from API error');
      });
    }

    console.log('ionViewWillEnter CustomerListPage');
  }

  edit(customer: ICustomer) {
    this.navCtrl.push(CustomerPage, { 'customer': customer });
  }

  delete(customer: ICustomer) {
  }

  viewMap(customer: ICustomer) {
  }

  callPhone(customer: ICustomer) {
  }
}
