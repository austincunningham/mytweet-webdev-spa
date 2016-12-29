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
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
    //this.users.push(user);
    //console.log('registered ' + newUser.firstName + ' ' + newUser.lastName);
  }

  submitTweet(message, date) {
    let tweet = {
      message: message,
      name: this.email,
      date: date
    };
    this.tweets.push(tweet);
    console.log('submitted tweet ' + tweet.message + ' from ' + tweet.name);
  }

  login(email, password) {
    const status = {
      success: false,
      message: ''
    };

    if (this.users[email]) {
      if (this.users[email].password === password) {
        status.success = true;
        status.message = 'logged in';
      } else {
        status.message = 'Incorrect password';
      }
    } else {
      status.message = 'Unknown user';
    }

    return status;
  }
}
