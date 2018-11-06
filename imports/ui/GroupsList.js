import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import {Groups} from '../api/groups';
import {Users} from '../api/users';

import Group from './Group'
import { Meteor } from 'meteor/meteor';

class GroupsList extends Component {
  handleGroupButton(group_name, member) {
    let newArray;
    for (let group in this.props.groups) {
      if (this.props.groups[group].name === group_name) {
        if (member) {
            newArray = _.without(this.props.groups[group].users, this.props.user[0]._id._str);
        }
        else {
            newArray = _.concat(this.props.groups[group].users, this.props.user[0]._id._str);
        }
        Meteor.call('updateUsersOfGroup', group_name, newArray);
      }
    }
  }

  renderGroups(array, member) {
    return array.map((group) => (<Group key={array.indexOf(group)} group_name={group} member={member} handleGroupButton={this.handleGroupButton.bind(this)}/>));
  }
  
  render() {
    return (
      <div>
        <h3>Your Groups:</h3>
        {this.renderGroups(this.props.memberArray, true)}
        {this.props.showAllGroups && (<span><h3>You Might Consider Join:</h3>{this.renderGroups(this.props.notMemberArray, false)}</span>)}
      </div>
    );
  }
}

export default withTracker((props) => {
  let groups = Groups.find({}).fetch();
  let user = Users.find({name: props.user}).fetch();
  let memberArray=[], notMemberArray=[];
  if (groups.length >0 && user.length >0) {
    let userId = user[0]._id._str;
    groups.forEach(group => {      
      if(group.users && group.users.includes(userId)) {
        memberArray.push(group.name);
      }
      else {
        notMemberArray.push(group.name);
      }
    });
  }    
  return {
    groups,
    user,
    memberArray,
    notMemberArray
  };
})(GroupsList);