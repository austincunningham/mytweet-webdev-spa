/**
 * Created by austin on 03/01/2017.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class Report {
  tweets = [];

  constructor(mts) {
    this.myTweetService = mts;
    this.user = mts.user;
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].name === this.user.email) {
        this.tweets.push(tweets[i]);
      }
    }
    this.tweets = this.myTweetService.tweets;
  }
}
