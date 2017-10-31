import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ModalController
} from 'ionic-angular';

// components
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

// ifaces
import { IProduct } from '../../models/product';

// providers
import { ProductProvider } from '../../providers/product/product';

// pages
import { SignaturePage } from '../signature/signature';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  product: IProduct;
  signatureImage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
  ) {
    this.signatureImage = navParams.get('signatureImage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  scanBarcode() {
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Scanning...',
    });

    this.barcodeScanner.scan().then((barcodeData) => {
      loader.present();

      if (barcodeData.cancelled) {
        loader.dismiss();
        return false;
      }

      this.productProvider.getProductByCode(barcodeData.text).then((data: any) => {
        if (data.ok) {
          this.product = data.product;
        }
        loader.dismiss();
      }, (error) => {
        loader.dismiss();
      });

    }, (err) => {
      console.log(err);
      loader.dismiss();
    });
  }

  takeSignature() {
    let modal = this.modalCtrl.create(SignaturePage);
    modal.onDidDismiss(data => {
      if (data) {
        this.signatureImage = data.signatureImage;
      }
    });
    modal.present();
  }
}
