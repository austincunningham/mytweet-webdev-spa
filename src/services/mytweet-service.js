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
  users = [];
  tweets = [];
  user = undefined;
  mytweets = [];
  alltweets = [];
  email = '';

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

  login(email, password) {
    const status = {
      success: false,
      message: 'Login Attempt Failed'
    };
    const user = {
      'email': email,
      'password': password
    }
    let logon = this.ac.post('/api/users/login', user).then(res => {
      logon = res.content;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === email && logon) {
          this.user = this.users[i];
          status.success = true;
          status.message = 'logged in';
        } else {
          status.message = 'Incorrect password';
        }
      }
      this.ea.publish(new LoginStatus(status, email));
    });
  }

  submitTweet(message, date, email, number) {
    let tweet = {
      message: message,
      name: email,
      id: number,
      date: date
    };

    tweet.date = Number(date);
    tweet.id = Math.floor(Math.random() * 1000000000);
    for (let i = 0; i < this.users.length; i++) {
      if (this.user.email === this.users[i].email) {
        this.tweets.push(tweet);
        this.ac.post('/api/tweet/' + this.users[i]._id, tweet).then(res => {
          this.getTweets();
        });
      }
    }
    console.log('submitted tweet ' + tweet.message + ' from ' + tweet.name);
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

  findUser(email) {
    this.email = email;
    for (let i = 0; i < this.tweets.length; i++) {
      if (this.tweets[i].name === this.email) {
        this.tweets[i].date = new Date(this.tweets[i].date);
        this.mytweets.push(this.tweets[i]);
      }
    }
  }

  settings(firstName, lastName, email, password, _id){
    let editedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      _id: _id
    };

    this.ac.post('/api/users/settings', editedUser).then(res => {
      this.getUsers();
    });
  }
}
