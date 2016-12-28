/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../services/mytweet-service';

@inject(MyTweetService)
export class tweet {

  message = ' ';
  users = [];
  tweets = [];

  constructor(mts){
    this.myTweetService = mts;
    this.users = mts.users;
    this.tweets = mts.tweets;
  }

  submitTweet() {
    console.log(`Message = ${this.message}`);
  }
}
