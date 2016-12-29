/**
 * Created by austin on 29/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';

@inject(MyTweetService)
export class Signup {

  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(mts) {
    this.myTweetService = mts;
  }

  register(e) {
    this.showSignup = false;
    this.myTweetService.register(this.firstName, this.lastName, this.email, this.password);
    this.myTweetService.login(this.email, this.password);
  }
}
