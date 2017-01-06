/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class Report {
  tweets = [];
  alltweets = [];

  constructor(mts) {
    this.myTweetService = mts;
    mts.getTweets();
    mts.getUsers();
    mts.alltweets = [];
    for (let i = 0; i < mts.tweets.length; i++) {
        mts.tweets[i].date = new Date(mts.tweets[i].date);
        mts.alltweets.push(mts.tweets[i]);
    }
    this.users = mts.users;
    this.alltweets = mts.alltweets;
    this.alltweets = this.myTweetService.alltweets;
  }

  follow(id) {
    this.myTweetService.follow(id);
  }
}
