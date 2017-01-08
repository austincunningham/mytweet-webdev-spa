import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from './services/messages';
import {TweetStatus} from './services/messages';
import {FollowingStatus} from './services/messages';
import MyTweetService from './services/mytweet-service';

@inject(MyTweetService, Aurelia, EventAggregator)
export class App {

  constructor(mts, au, ea) {
    this.au = au;
    this.mts = mts;
    ea.subscribe(LoginStatus, msg => {
      if (msg.status.success === true) {
        au.setRoot('home').then(() => {
          this.router.navigateToRoute('tweet');
        });
      } else {
        au.setRoot('app').then(() => {
          this.router.navigateToRoute('login');
        });
      }
    });
    ea.subscribe(FollowingStatus, msg =>{
      if (msg.status.success === true) {
        au.setRoot('home').then(() => {
          this.router.navigateToRoute('following');
        });
      } else {
        au.setRoot('home').then(() => {
          this.router.navigateToRoute('report');
        });
      }
    });

    ea.subscribe(TweetStatus, msg => {
      if (msg.status.success === true) {
        au.setRoot('home').then(() => {
          this.router.navigateToRoute('report');
        });
      /*} else {
        au.setRoot('home').then(() => {
          this.router.navigateToRoute('tweet');
        });*/
      }
    });
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }
    ]);

    config.mapUnknownRoutes(instruction => {
      return 'login';
    });

    this.router = router;
  }

  attached() {
    if (this.mts.isAuthenticated()) {
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('dashboard');
      });
    }
  }
}
