/**
 * Created by austin on 29/12/2016.
 */


export class LoginStatus {
  constructor(status, email) {
    this.status = status;
    this.email = email;
  }
}

export class FollowingStatus {
  constructor(status, user) {
    this.status = status;
    this.user = user;
  }
}

export class TweetStatus {
  constructor(status) {
    this.status = status;
  }
}

export class DeleteStatus {
  constructor(status, user) {
    this.status = status;
    this.user = user;
  }
}
