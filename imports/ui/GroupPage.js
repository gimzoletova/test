import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Groups } from '../api/groups';
import { Users } from '../api/users';
import { Posts } from '../api/posts';

import PostsList from './PostsList';
import NewPostForm from './NewPostForm';
import UserPage from './UserPage'

class GroupPage extends Component {
  showUsers () {
    return this.props.users.map((user) => <li key={user[0]._id._str} onClick={() => {ReactDOM.render(<UserPage user={user[0].name}/>, document.getElementById('render-target'))}}>{user[0].name}</li>);
  }
  render () {
    return (
      <div>
        <h1>{this.props.groupName}</h1>
        {this.props.users.length === 0 ? <h3>Currently there are no members in this gruop</h3> : <span><h3>Members:</h3><ul>{this.showUsers()}</ul></span>}
        <hr/>
        <PostsList page="group" posts={this.props.posts} />
        <hr/>
        <NewPostForm group={this.props.groupName} user="Naomi"/>         
      </div>
    );
  }
}

export default withTracker((props) => {
  let users = [];
  let group = Groups.find({name: props.groupName}).fetch();
  if (group.length > 0) {
    group[0].users.map((userId) => {
      let user= Users.find({_id: new Meteor.Collection.ObjectID(userId)}).fetch();
      if (user.length > 0)
        users.push(user);
    })
  }
  return {
    users,
    posts : Posts.find({group: props.groupName}).fetch()
  };
})(GroupPage);