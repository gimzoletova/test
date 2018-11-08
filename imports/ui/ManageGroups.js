import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import {Groups} from '../api/groups';

import Header from './Header'


class ManageGroups extends Component {
    handleUpdateGroup(group) {
        const updatedName = document.getElementById("groupname").value;
        Meteor.call('updateGroup', group, updatedName);
    }
    handleDeleteGroup(user) {
        Meteor.call('deleteGroup', user);
    }
    handleAddGroup(group) {
        const newName = document.getElementById("newGroupname").value;
        Meteor.call('addGroup', newName);
    }

    showGroups () {
        return this.props.groups.map((group) => <span key={group._id}>
                                                <li >{group.name}</li>
                                                <input type="text" id="groupname" placeholder="Change group name" />
                                                <button onClick={this.handleUpdateGroup.bind(this, group)}>Update</button>
                                                <button onClick={this.handleDeleteGroup.bind(this, group)}>Delete</button>
                                              </span>);
      }
    
    render() {
        console.log(this.props.users);
        // onClick={() => {ReactDOM.render(<UserPage user={[user]}/>, document.getElementById('render-target'))}}
      return (
        <div>
          <Header />
          <h2>Manage Groups</h2>
          {this.props.groups.length === 1 ? <h3>Currently there are no groups</h3> : <span><h3>Groups:</h3><ul>{this.showGroups()}</ul></span>}
          To add new group, enter group name and click "Add"
          <input type="text" id="newGroupname" />
          <button onClick={this.handleAddGroup}>Add</button>
        </div>
      );
    }
  }

  export default withTracker(() => {
  return {
    groups : Groups.find({}).fetch()

  };
})(ManageGroups);