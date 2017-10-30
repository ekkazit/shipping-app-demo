import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductProvider {

  constructor(
    public http: Http,
    @Inject('API_URL') private url: string
  ) {
    console.log('Hello ProductProvider Provider');
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/products')
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  searchProduct(query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/products/search/' + query)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

}
