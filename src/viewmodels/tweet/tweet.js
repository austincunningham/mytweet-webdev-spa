/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetStatus} from '../../services/messages';

@inject( MyTweetService, EventAggregator)
export class tweet {

  message = '';
  date = new Date();
  users = [];
  tweets = [];
  statusMessage = '';

  constructor(mts, ea) {
    this.myTweetService = mts;
    mts.getTweets();
    mts.getUsers();
    this.users = mts.users;
    this.tweets = mts.tweets;
    this.user = mts.user;
    this.ea = ea;
    this.ea.subscribe(TweetStatus, msg => {
      this.statusMessage = msg.status.message;
    });
  }

  submitTweet() {
    console.log(`Message = ${this.message}`);
    let date = new Date();
    //console.log('Do I see an email address ' + this.user.email);
    this.myTweetService.submitTweet(this.message, this.date, this.user.email);
  }
};


