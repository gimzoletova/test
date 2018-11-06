import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import {Groups} from '../api/groups';
import {Users} from '../api/users';

import Group from './Group'
import { Meteor } from 'meteor/meteor';

class GroupsList extends Component {
  handleGroupButton(member, group) {
    if (this.props.user_groups.length > 0) {
      console.log(member);
      let newArray;
      if (member) {
        newArray = _.without(this.props.user_groups[0].groups, group);
        console.log(newArray);
      }
      else {
        newArray = _.concat(this.props.user_groups[0].groups, group);
        console.log(newArray);
      }
      Meteor.call('updateUserGroups', this.props.user, newArray);
    }
    
  }
  renderGroupsOfUser() {
    if (this.props.user_groups.length > 0) {
      let array = this.props.user_groups[0].groups;
      return array.map((group) => (<Group key={array.indexOf(group)} group_name={group} member={true} handleGroupButton={this.handleGroupButton.bind(this)}/>));
    }
  }
  renderOtherGroups() {
    let allGroupsArray =[];
    this.props.groups.map((group) => {
      allGroupsArray.push(group.name);
    });
    if (this.props.user_groups.length > 0 && this.props.groups.length > 0) {
      let memberGroupsArray = this.props.user_groups[0].groups;
      let filteredArray = _.difference(allGroupsArray, memberGroupsArray);
      return filteredArray.map((group) => <Group key={filteredArray.indexOf(group)} group_name={group} handleGroupButton={this.handleGroupButton.bind(this)} />);
    }
  }
  render() {
    if (this.props.user_groups.length > 0)
      console.log(this.props.user_groups[0]._id._str);
    
    return (
      <div>
        <h3>Your Groups:</h3>
        {this.renderGroupsOfUser()}
        <h3>You Might Consider Join:</h3>
        {this.renderOtherGroups()}
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    groups: Groups.find({}).fetch(),
    user_groups: Users.find({name: props.user}).fetch()
  };
})(GroupsList);