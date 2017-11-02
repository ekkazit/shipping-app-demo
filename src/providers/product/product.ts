import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { IProduct } from '../../models/product';

@Injectable()
export class ProductProvider {

  constructor(
    public http: Http,
    @Inject('API_URL') private url: string
  ) {
    console.log('Hello ProductProvider Provider');
  }

  getProducts(token) {
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.url + '/products', options)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  searchProduct(token, query) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.url + '/products/search/' + query, options)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getProductByCode(code) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/products/get/' + code)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  addProduct(product: IProduct) {
    return new Promise((resolve, reject) => {
      let data = {
        code: product.code,
        name: product.name,
        category_id: product.category_id,
        on_hand: product.on_hand,
        unit_price: product.unit_price,
        photo: product.photo
      };
      this.http.post(this.url + '/products/add', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  updateProduct(product: IProduct) {
    return new Promise((resolve, reject) => {
      let data = {
        productId: product.id,
        code: product.code,
        name: product.name,
        category_id: product.category_id,
        on_hand: product.on_hand,
        unit_price: product.unit_price,
        photo: product.photo
      };
      this.http.post(this.url + '/products/update', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

}
