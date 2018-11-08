import React, {Component} from 'react';

import HomePage from './HomePage';
import Login from './Login';

export default class App extends Component {
  render() {
    return Meteor.userId() === null ?
    <Login /> :
    <HomePage />;
  }
}
 