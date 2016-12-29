/**
 * Created by austin on 29/12/2016.
 */
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import MyTweetService from '../../services/mytweet-service';
import {LoginStatus} from '../../services/messages';

@inject(EventAggregator, MyTweetService)
export class Signup {

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(ea, mts) {
    this.ea = ea;
    this.myTweetService = mts;
  }

  register(e) {
    this.showSignup = false;
    this.myTweetService.register(this.firstName, this.lastName, this.email, this.password);
    const status = this.myTweetService.login(this.email, this.password);
    this.ea.publish(new LoginStatus(status));
  }
}
