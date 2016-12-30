/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';


@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class MyTweetService {
  users = []
  tweets = []
  //user = undefined;

  constructor(data, ea, ac) {
    //this.users = data.users;
    //this.tweets = data.tweets;
    this.ea = ea;
    this.ac = ac;
    this.getTweets();
    this.getUsers();
  }

  register(firstName, lastName, email, password){
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
    this.ac.post('/api/users/register', newUser).then(res => {
      this.getUsers();
      //newUser = user;
    });
    //this.users.push(user);
    //console.log('registered ' + newUser.firstName + ' ' + newUser.lastName);
  }

  submitTweet(message, date) {
    let tweet = {
      message: message,
      //name: user.email,
      date: date
    };
    this.tweets.push(tweet);
    console.log('submitted tweet ' + tweet.message + ' from ' + tweet.name);
  }

  login(email, password) {
    const status = {
      success: false,
      message: 'Login Attempt Failed'
    };

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email && this.users[i].password === password) {
        status.success = true;
        status.message = 'logged in';
      } else {
        status.message = 'Incorrect password';
      }
    }
    this.ea.publish(new LoginStatus(status));
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(status));
  }

  getTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
    });
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }
}
