/**
 * Created by austin on 03/01/2017.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class MyTweet {
  tweets = [];
  mytweets = [];

  constructor(mts) {
    this.myTweetService = mts;
    mts.getTweets();
    mts.getUsers();
    this.user = mts.user;
    mts.mytweets.length = 0;
    for (let i = 0; i < mts.tweets.length; i++) {
      if (mts.tweets[i].name === this.user.email) {
        mts.tweets[i].date = new Date(mts.tweets[i].date);
        mts.mytweets.push(mts.tweets[i]);
      }
    }
    this.mytweets = mts.mytweets;
    this.mytweets = this.myTweetService.mytweets;
  }
}
