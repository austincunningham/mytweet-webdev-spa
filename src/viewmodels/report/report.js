/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../../services/mytweet-service';

@inject(MyTweetService)
export class Report{
  tweets = [];

  constructor(mts) {
    this.myTweetService = mts;
    this.tweets = this.myTweetService.tweets;
  }
}
