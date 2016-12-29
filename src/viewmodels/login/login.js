/**
 * Created by austin on 29/12/2016.
 */

import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class Login {

  email = 'lisa@simpson.com';
  password = 'secret';

  constructor(mts) {
    this.myTweetService = mts;
    this.prompt = '';
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.myTweetService.login(this.email, this.password);
  }
}
