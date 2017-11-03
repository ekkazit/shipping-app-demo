import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { IUser } from '../../models/users';

@Injectable()
export class UserProvider {

  constructor(
    public http: Http,
    @Inject('API_URL') private url: string,
  ) {
    console.log('Hello UserProvider Provider');
  }

  registerDevice(userId, deviceToken) {
    return new Promise((resolve, reject) => {
      let data = {
        userId: userId,
        deviceToken: deviceToken,
      };
      this.http.post(this.url + '/fcm/registerdevice', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  sendPushNotificationAll(title, message) {
    return new Promise((resolve, reject) => {
      let data = {
        title: title,
        message: message,
      };
      this.http.post(this.url + '/fcm/sendall', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  sendToLine(message) {
    return new Promise((resolve, reject) => {
      let data = {
        message: message,
      };
      this.http.post(this.url + '/line/send', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }


  login(username, password) {
    console.log('user=' + username);
    return new Promise((resolve, reject) => {
      let data = {
        username: username,
        password: password
      };
      this.http.post(this.url + '/users/login', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

}

