/**
 * Created by austin on 04/01/2017.
 */
/**
 * Created by austin on 03/01/2017.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class FindUserTweets {
  tweets = [];
  mytweets = [];
  email = '';


  constructor(mts) {
    this.myTweetService = mts;
    mts.getTweets();
    mts.getUsers();
    mts.mytweets = [];
    this.mytweets = this.myTweetService.mytweets;
  }

  findUser() {
    console.log(`email = ${this.email}`);
    this.myTweetService.findUser(this.email);
  }
}
