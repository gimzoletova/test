import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts';

import GroupsList from './GroupsList';
import PostsList from './PostsList';

class UserPage extends Component {
    render() {
      return (
        <div>
          <h2>{this.props.user}'s page</h2>
          <GroupsList user={this.props.user}/>
          <hr/>
          <PostsList page="user" posts={this.props.posts} />
        </div>
      );
    }
  }

  export default withTracker((props) => {    
    return {
        posts : Posts.find({user: props.user}).fetch()
    };
  })(UserPage);