import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// pages
import { HomePage } from '../pages/home/home';
import { CustomerPage } from '../pages/customer/customer';
import { LoginPage } from '../pages/login/login';
import { ProductListPage } from '../pages/product-list/product-list';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { ChartPage } from '../pages/chart/chart';

// providers
import { ProductProvider } from '../providers/product/product';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerPage,
    LoginPage,
    ProductListPage,
    CustomerListPage,
    QrcodePage,
    ChartPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerPage,
    LoginPage,
    ProductListPage,
    CustomerListPage,
    QrcodePage,
    ChartPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: 'API_URL', useValue: 'http://127.0.0.1:3000' },
    ProductProvider
  ]
})
export class AppModule {}
