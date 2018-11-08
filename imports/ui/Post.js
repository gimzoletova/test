import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {Groups} from '../api/groups';

class Post extends Component {
  render () {  
    let title;      
    if (this.props.page === "group") {
      let user = Meteor.users.find({_id: this.props.post.user}).fetch();
      title = `${user[0].username} posted:`;
    }
    else {
      title = `You posted on ${this.props.group[0].name}:`;
    }
    return (
      <div>
        <h4>{title}</h4>
        <p>{this.props.post.body}</p>
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    group : Groups.find({_id : props.post.group}).fetch()
  };
})(Post);