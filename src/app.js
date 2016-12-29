import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from './services/messages';
//import MyTweetService from './services/mytweet-service';

@inject(Aurelia, EventAggregator)
export class App {

  loggedIn = false;
  showSignup = false;

  constructor(ea, mts) {
    this.myTweetService = mts;
    ea.subscribe(LoginStatus, msg=>{
      this.loggedIn = msg.status.success;
    });
  }

  signup() {
    this.showSignup = true;
  }

  logout() {
    console.log('Logging out`');
    this.loggedIn = false;
  }
}
