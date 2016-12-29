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
      { route: ['', 'home'], name: 'donate', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Tweet' },
      { route: 'report', name: 'report', moduleId: 'viewmodels/report/report', nav: true, title: 'Report' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;
  }
}
