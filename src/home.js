/**
 * Created by austin on 29/12/2016.
 */
import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Tweet' },
      { route: 'report', name: 'report', moduleId: 'viewmodels/report/report', nav: true, title: 'All Tweets' },
      { route: 'mytweets', name: 'mytweets', moduleId: 'viewmodels/mytweets/mytweets', nav: true, title: 'My Tweets' },
      { route: 'findusertweets', name: 'findusertweets', moduleId: 'viewmodels/findusertweets/findusertweets', nav: true, title: 'Find User Tweets' },
      { route: 'following', name: 'following', moduleId: 'viewmodels/following/following', nav: true, title: 'Following' },
      { route: 'settings', name: 'settings', moduleId: 'viewmodels/settings/settings', nav: true, title: 'Settings' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }
}
