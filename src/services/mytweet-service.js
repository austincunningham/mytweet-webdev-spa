/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {FollowingStatus} from './messages';
import {TweetStatus} from './messages';
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
/*    this.getTweets();
    this.getUsers();*/
  }

  register(firstName, lastName, email, password) {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
    this.ac.post('/api/users/register', newUser).then(res => {
      this.getUsers();
    });
    //this.users.push(user);
    //console.log('registered ' + newUser.firstName + ' ' + newUser.lastName);
  }

  login(email, password) {
    const user = {
      'email': email,
      'password': password
    };
    this.ac.authenticate('/api/users/login', user);
    this.user = user;
  }

  submitTweet(message, date, email, number) {
    let tweet = {
      message: message,
      name: email,
      id: number,
      date: date
    };
    const status = {
      success: false,
      message: 'Message length greater than 140 characters'
    };

    tweet.date = Number(date);
    tweet.id = Math.floor(Math.random() * 1000000000);
    for (let i = 0; i < this.users.length; i++) {
      if (this.user.email === this.users[i].email && tweet.message.length < 140 ) {
        status.success = true;
        status.message = '';
        this.tweets.push(tweet);
        this.ac.post('/api/tweet/' + this.users[i]._id, tweet).then(res => {
          this.getTweets();
        });
      }
    }
    console.log('submitted tweet ' + tweet.message + ' from ' + tweet.name);
    this.ea.publish(new TweetStatus(status));
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ac.clearAuthentication();
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

  settings(firstName, lastName, email, password, _id) {
    let editedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      _id: _id
    };

    const status = {
      success: false,
      message: ''
    };

    this.ac.post('/api/users/settings', editedUser).then(res => {
      this.getUsers();
      status.success = true;
      status.message = 'User updated';
      this.ea.publish(new LoginStatus(status));
    });
  }

  follow(id) {
    const status = {
      success: false,
      message: 'Following Attempt Failed'
    };
    this.ac.post('/api/users/follow/' + id, this.user).then(res => {
      this.getUsers();
      this.alltweets = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === this.user.email) {
          this.user = this.users[i];
          status.success = true;
          status.message = 'following';
          this.ea.publish(new FollowingStatus(status, this.user));
        }
      }

    });
  }


  unfollow(id) {
    const status = {
      success: false,
      message: 'Login Attempt Failed'
    };
    this.ac.post('/api/users/unfollow/' + id, this.user).then(res =>{
      this.getUsers();
      this.alltweets = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === this.user.email) {
          this.user = this.users[i];
          status.success = false;
          status.message = 'logged in';
          this.ea.publish(new FollowingStatus(status, this.user));
        }
      }
    });
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }
}
