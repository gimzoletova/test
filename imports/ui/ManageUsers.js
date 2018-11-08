import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Header from './Header'
import UserPage from './UserPage'
import AddUser from './AddUser'
import UpdateUser from './UpdateUser'

class ManageUsers extends Component {
    handleUpdateUser(user) {
        ReactDOM.render(<UpdateUser user={user}/>, document.getElementById('render-target'));
    }
    handleDeleteUser(user) {
        Meteor.call('deleteUser', user);
    }
    handleAddUser() {
        ReactDOM.render(<AddUser />, document.getElementById('render-target'));
    }

    showUsers () {
        return this.props.users.map((user) => {
            if (user._id !== Meteor.userId()) {
                return (
                    <span key={user._id}>
                        <li  onClick={() => {ReactDOM.render(<UserPage user={[user]}/>, document.getElementById('render-target'))}}>{user.username}</li>
                        <button onClick={this.handleUpdateUser.bind(this, user)}>Update</button>
                        <button onClick={this.handleDeleteUser.bind(this, user)}>Delete</button>
                    </span>);
                
            }
        });
      }
    
    render() {
        console.log(this.props.users);

      return (
        <div>
            <Header />
          <h2>Manage Users</h2>
          {this.props.users.length === 1 ? <h3>Currently there are no other users than you</h3> : <span><h3>Users:</h3><ul>{this.showUsers()}</ul></span>}
          <button onClick={this.handleAddUser}>Add user</button>
        </div>
      );
    }
  }

  export default withTracker(() => {
  return {
    users : Meteor.users.find({}).fetch()
  };
})(ManageUsers);