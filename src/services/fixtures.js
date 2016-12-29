/**
 * Created by austin on 28/12/2016.
 */
export default class Fixtures {

  users = {
    'lisa@simpson.com': {
      firstName: 'Lisa',
      lastName: 'Simpson',
      email: 'lisa@simpson.com',
      password: 'secret'
    },
    'bart@simpson.com': {
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart@simpson.com',
      password: 'secret'
    }
  };

  tweets = [
    {
      message: 'lisas message',
      name: 'lisa@simpson.com',
      date: 'Wed Dec 28 2016 19:00:00 GMT+0000 (GMT Standard Time)'
    },
    {
      message: 'barts message',
      name: 'bart@simpson.com',
      date: 'Wed Dec 28 2016 19:00:01 GMT+0000 (GMT Standard Time)'
    }
  ];
}
