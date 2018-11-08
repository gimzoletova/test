import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts';

import GroupsList from './GroupsList';
import PostsList from './PostsList';
import Header from './Header'

class UserPage extends Component {
    render() {
      return (
        <div>
          <Header />
          <h2>{this.props.user[0].username}'s page</h2>
          <GroupsList user={this.props.user}/>
          <hr/>
          <PostsList page="user" posts={this.props.posts} />
        </div>
      );
    }
  }

  export default withTracker((props) => {    
    return {
        posts : Posts.find({user: props.user[0]._id}).fetch()
    };
  })(UserPage);