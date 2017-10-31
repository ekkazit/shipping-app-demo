import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QrcodePage } from '../qrcode/qrcode';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  public signatureImage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePage');
  }

  drawCancel() {
    this.navCtrl.push(QrcodePage);
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.navCtrl.push(QrcodePage, { signatureImage: this.signatureImage });
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }
}
