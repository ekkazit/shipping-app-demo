import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// plugins
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { SignaturePadModule } from 'angular2-signaturepad';
import { Push } from '@ionic-native/push';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

// components
import { MyApp } from './app.component';

// pages
import { HomePage } from '../pages/home/home';
import { CustomerPage } from '../pages/customer/customer';
import { LoginPage } from '../pages/login/login';
import { ProductListPage } from '../pages/product-list/product-list';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { ChartPage } from '../pages/chart/chart';
import { SignaturePage } from '../pages/signature/signature';
import { SettingPage } from '../pages/setting/setting';
import { MapPage } from '../pages/map/map';

// providers
import { ProductProvider } from '../providers/product/product';
import { UserProvider } from '../providers/user/user';
import { CustomerProvider } from '../providers/customer/customer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerPage,
    LoginPage,
    ProductListPage,
    ProductDetailPage,
    CustomerListPage,
    QrcodePage,
    ChartPage,
    SignaturePage,
    SettingPage,
    MapPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerPage,
    LoginPage,
    ProductListPage,
    ProductDetailPage,
    CustomerListPage,
    QrcodePage,
    ChartPage,
    SignaturePage,
    SettingPage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    Push,
    ProductProvider,
    UserProvider,
    SQLite,
    CallNumber,
    GoogleMaps,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: 'API_URL', useValue: 'http://127.0.0.1:3000' },
    CustomerProvider,
  ]
})
export class AppModule { }
