import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

Meteor.subscribe('userData');

import Header from './Header'
import UserPage from './UserPage'
import GroupsList from './GroupsList'

class HomePage extends Component {
    render() {
      return (
        <div>
          <Header />
          <h2 onClick={() => {ReactDOM.render(<UserPage user={this.props.user} />, 
                              document.getElementById('render-target'))}}>
            welcome, {this.props.user && this.props.user.username}.
          </h2>
          <GroupsList user={this.props.user} showAllGroups={true}/>
        </div>
      );
    }
  }

  export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(HomePage);