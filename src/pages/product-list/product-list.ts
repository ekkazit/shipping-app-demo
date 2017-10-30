import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

// providers
import { ProductProvider } from '../../providers/product/product';

// interface
import { IProduct } from '../../models/product';

// pages
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  products: Array<IProduct> = [];

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'กำลังโหลด...'
    });

    loader.present();

    this.productProvider.getProducts().then((data:any) => {
      this.products = data.rows;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
    });
  }

  doRefresh(refresher) {
    this.productProvider.getProducts().then((data:any) => {
      this.products = data.rows;
      refresher.complete();
    }, (err) => {
      refresher.complete();
    });
  }

  search(event) {
    let query = event.target.value;

    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'กำลังโหลด...'
    });

    loader.present();

    this.productProvider.searchProduct(query).then((data:any) => {
      this.products = data.rows;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
    });
  }

  add() { }

  logout() {
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    alert('You have logged out');
  }
}
