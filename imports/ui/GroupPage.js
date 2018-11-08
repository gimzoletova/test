import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts';

import PostsList from './PostsList';
import NewPostForm from './NewPostForm';
import UserPage from './UserPage'
import Header from './Header'

class GroupPage extends Component {
  showUsers () {
    return this.props.users.map((user) => <li key={user[0]._id} onClick={() => {ReactDOM.render(<UserPage user={user}/>, document.getElementById('render-target'))}}>{user[0].username}</li>);
  }
  
  render () {
    const isMember = () => {
      for (let user in this.props.users) {
        if (this.props.users[user][0]._id === Meteor.userId())
          return true;
      };
      return false;
    };

    return (
      <div>
        <Header />
        <h1>{this.props.group.name}</h1>
        {this.props.users.length === 0 ? <h3>Currently there are no members in this gruop</h3> : <span><h3>Members:</h3><ul>{this.showUsers()}</ul></span>}
        <hr/>
        <PostsList page="group" posts={this.props.posts} />
        <hr/>
        {isMember() && <NewPostForm group={this.props.group._id} />}         
      </div>
    );
  }
}

export default withTracker((props) => {
  let users = [];
  props.group.users.map((userId) => {
    let user = Meteor.users.find({_id: userId}).fetch();
    users.push(user);
  })
  return {
    users,
    posts : Posts.find({group: props.group._id}).fetch()
  };
})(GroupPage);