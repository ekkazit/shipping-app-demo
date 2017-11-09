import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// plugins
import { SQLiteObject } from '@ionic-native/sqlite';

// interfaces
import { ICustomer } from '../../models/customer';


@Injectable()
export class CustomerProvider {

  constructor(
    public http: Http,
    @Inject('API_URL') private url: string
  ) {
    console.log('Hello CustomerProvider Provider');
  }

  insert(db: SQLiteObject, customer: ICustomer) {
    return new Promise((resolve, reject) => {
      let sql = `
        insert into customer (firstname, lastname, gender, email, address, phone, photo, lat, lng)
        values(?,?,?,?,?,?,?,?,?)
      `;
      db.executeSql(sql, [
        customer.firstname,
        customer.lastname,
        customer.gender,
        customer.email,
        customer.address,
        customer.phone,
        customer.photo, customer.lat, customer.lng
      ]).then(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  update(db: SQLiteObject, customer: ICustomer) {
    return new Promise((resolve, reject) => {
      let sql = `
        update customer
        set firstname=?, lastname=?, gender=?, email=?, address=?, phone=?, lat=?, lng=?
        where id=?
      `;
      db.executeSql(sql, [
        customer.firstname, customer.lastname, customer.gender, customer.email,
        customer.address, customer.phone, customer.lat, customer.lng, customer.id
      ]).then(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  delete(db: SQLiteObject, id) {
    return new Promise((resolve, reject) => {
      let sql = 'delete from customer where id=?';
      db.executeSql(sql, [id]).then(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  deleteAll(db: SQLiteObject) {
    return new Promise((resolve, reject) => {
      let sql = 'delete from customer';
      db.executeSql(sql, []).then(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getById(db: SQLiteObject, id) {
    return new Promise((resolve, reject) => {
      let sql = 'select * from customer where id=?';
      db.executeSql(sql, [id]).then(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getCustomers(db: SQLiteObject) {
    return new Promise((resolve, reject) => {
      let sql = 'select * from customer order by firstname';
      db.executeSql(sql, []).then(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getCustomerAPI() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/customers')
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  loadFromAPI(db: SQLiteObject) {
    let parent = this;

    return new Promise((resolve, reject) => {
      let sql = `
        insert into customer (firstname, lastname, gender, email, address, phone, photo, lat, lng)
        values(?,?,?,?,?,?,?,?,?)
      `;

      parent.getCustomerAPI().then((data: any) => {
        let customers = data.rows;
        customers.forEach((v) => {
          db.executeSql(sql, [
            v.firstname,
            v.lastname,
            v.gender,
            v.email,
            v.address,
            v.phone, v.photo, v.lat, v.lng]).then((data) => {
              console.log('Insert complete');
            }, (error) => {
              console.log('Insert failed');
            });
        });
        resolve(customers);
      }, (error) => {
        reject(error);
      });
    });
  }

  syncData(db: SQLiteObject, customer: ICustomer) {
    return new Promise((resolve, reject) => {
      let data = {
        productId: customer.id,
        firstname: customer.firstname,
        lastname: customer.lastname,
        gender: customer.gender,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
        photo: customer.photo,
        lat: customer.lat,
        lng: customer.lng
      };
      this.http.post(this.url + '/customers/syncdata', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
}
