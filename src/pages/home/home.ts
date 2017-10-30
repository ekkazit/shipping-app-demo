import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

import { CustomerListPage } from '../customer-list/customer-list';
import { ProductListPage } from '../product-list/product-list';
import { QrcodePage } from '../qrcode/qrcode';
import { ChartPage } from '../chart/chart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabProduct: any;
  tabQR: any;
  tabCustomer: any;
  tabChart: any;

  constructor(public app: App, public navCtrl: NavController) {
    this.tabProduct = ProductListPage;
    this.tabQR = QrcodePage;
    this.tabCustomer = CustomerListPage;
    this.tabChart = ChartPage;
  }

}
