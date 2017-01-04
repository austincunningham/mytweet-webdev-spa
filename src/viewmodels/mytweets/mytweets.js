/**
 * Created by austin on 03/01/2017.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class MyTweet {
  tweets = [];
  myTweets = [];

  constructor(mts) {
    this.myTweetService = mts;
    this.user = mts.user;
    mts.myTweets = [];
    for (let i = 0; i < mts.tweets.length; i++) {
      if (mts.tweets[i].name === this.user.email) {
        mts.tweets[i].date = new Date(mts.tweets[i].date);
        mts.mytweets.push(mts.tweets[i]);
      }
    }
    this.myTweets = mts.mytweets;
    this.mytweets = this.myTweetService.mytweets;
  }
}
