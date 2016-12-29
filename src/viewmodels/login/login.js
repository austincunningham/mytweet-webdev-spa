/**
 * Created by austin on 29/12/2016.
 */

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import MyTweetService from '../../services/mytweet-service';
import {LoginStatus} from '../../services/messages';

@inject(EventAggregator, MyTweetService)
export class Login {

  email = 'lisa@simpson.com';
  password = 'secret';

  constructor(ea, mts) {
    this.ea = ea;
    this.myTweetService = mts;
    this.prompt = '';
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    const status = this.myTweetService.login(this.email, this.password);
    this.ea.publish(new LoginStatus(status));
  }
}
