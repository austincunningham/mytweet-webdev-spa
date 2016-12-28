/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';

@inject(Fixtures)
export default class MyTweetService {
  users = []
  tweets = []

  constructor(data) {
    this.users = data.users;
    this.tweets = data.tweets;
  }

  register(firstName, lastName, email, password){
    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users.push(user);
    console.log('registered ' + user.firstName + ' ' + user.lastName);
  }

  submitTweet(message, date) {
    let tweet = {
      message: message,
      date: date
    };
    this.tweets.push(tweet);
    console.log('submitted tweet ' + tweet.message + ' from ' + tweet.name);
  }
}
