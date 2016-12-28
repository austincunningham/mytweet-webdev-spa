/**
 * Created by austin on 28/12/2016.
 */
import {inject} from 'aurelia-framework';
import MyTweetService from '../services/mytweet-service';

@inject(MyTweetService)
export class Register {

  firstName='';
  lastName='';
  email='';
  password='';

  constructor(mts){
    this.myTweetService = mts;
  }

  register() {
    this.myTweetService.register(this.firstName,this.lastName,this.email,this.password)
  }
}
