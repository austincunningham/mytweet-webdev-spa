/**
 * Created by austin on 05/01/2017.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';


@inject(MyTweetService)
export class Following {
  tweets = [];
  alltweets = [];

  constructor(mts) {
    this.myTweetService = mts;
    mts.alltweets = [];
    this.user = mts.user;
    this.users = mts.users;
    for (let i = 0; i < mts.tweets.length; i++) {
      mts.tweets[i].date = new Date(mts.tweets[i].date);
      for (let j = 0; j < this.user.following.length; j++) {
        console.log(this.user.following[j] + ' ' + mts.tweets[i].tweeter);
        if (this.user.following[j] === mts.tweets[i].tweeter) {
          console.log('push');
          mts.alltweets.push(mts.tweets[i]);
        }
      }
    }
    mts.alltweets = mts.alltweets.sort(Comparator);

    function Comparator(a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    }
    this.alltweets = mts.alltweets;
    this.alltweets = this.myTweetService.alltweets;
  }

  unfollow(id) {
    this.myTweetService.unfollow(id);
  }
}
