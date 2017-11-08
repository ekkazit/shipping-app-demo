import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// plugins
import { Camera, CameraOptions } from '@ionic-native/camera';

// providers
import { ProductProvider } from '../../providers/product/product';

// interfaces
import { IProduct } from '../../models/product';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product: IProduct;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public toastCtrl: ToastController,
    public camera: Camera,
  ) {
    this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  save() {
    let toast = this.toastCtrl.create({
      duration: 3000,
    });

    let promise;
    if (this.product.id) {
      promise = this.productProvider.updateProduct(this.product);
    } else {
      promise = this.productProvider.addProduct(this.product);
    }

    promise.then((data) => {
      if (data.ok) {
        toast.setMessage('บันทึกข้อมูลเรียบร้อยแล้ว');
        toast.present();
        this.navCtrl.pop();
      }
    }, (error) => {
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      allowEdit: false
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.photo = base64Image;
    }, (err) => {
      console.log('Camera Error!');
    });
  }

  browsePicture() {
    let options: CameraOptions = {
      destinationType: 0,
      sourceType: 0,
      allowEdit: true
    };
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.photo = base64Image;
    }, (err) => {
      console.log('Browse picture error!');
    });
  }

  removePicture() {
    this.product.photo = null;
  }

}
