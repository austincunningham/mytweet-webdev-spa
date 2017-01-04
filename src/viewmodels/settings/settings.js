/**
 * Created by austin on 04/01/2017.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';

@inject(MyTweetService)
export class Settings {
  user = this.user;
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  _id = '';

  constructor(mts) {
    this.myTweetService = mts;
    this.user = mts.user;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.password = '*****';
    this._id = this.user._id;
  }

  settings(e) {
    this.myTweetService.settings(this.firstName, this.lastName, this.email, this.password, this._id);
  }
}
