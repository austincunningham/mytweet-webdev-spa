/**
 * Created by austin on 29/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class Logout {

  constructor(myTweetService) {
    this.myTweetService = myTweetService;
  }

  logout() {
    console.log('logging out');
    this.myTweetService.logout();
  }
}
