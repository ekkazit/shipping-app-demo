import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// providers
import { ProductProvider } from '../../providers/product/product';

// interface
import { IProduct } from '../../models/product';

// pages
import { LoginPage } from '../login/login';
import { ProductDetailPage } from '../product-detail/product-detail';

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
    public storage: Storage,
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

    let parent = this;
    this.storage.get('token').then(function (token) {
      parent.productProvider.getProducts(token).then((data: any) => {
        parent.products = data.rows;
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
      });
    });
  }

  doRefresh(refresher) {
    let parent = this;
    this.storage.get('token').then(function (token) {
      parent.productProvider.getProducts(token).then((data: any) => {
        parent.products = data.rows;
        refresher.complete();
      }, (err) => {
        refresher.complete();
      });
    });
  }

  search(event) {
    let query = event.target.value;

    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'กำลังโหลด...'
    });

    loader.present();

    let parent = this;
    this.storage.get('token').then(function (token) {
      parent.productProvider.searchProduct(token, query).then((data: any) => {
        parent.products = data.rows;
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
      });
    });
  }

  addProduct() {
    this.navCtrl.push(ProductDetailPage, { 'product': {} });
  }

  editProduct(product) {
    this.navCtrl.push(ProductDetailPage, { 'product': product });
  }

  logout() {
    this.storage.remove('token');

    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    alert('You have logged out');
  }
}
