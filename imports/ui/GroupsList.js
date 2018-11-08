import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {Groups} from '../api/groups';

import Group from './Group'

class GroupsList extends Component {
  renderGroups(array, member) {
    return array.map((group) => (<Group key={array.indexOf(group)} group={group} member={member} />));
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
  let memberArray=[], notMemberArray=[];
  if (groups.length) {
    groups.forEach(group => {      
      if(group.users && group.users.includes(Meteor.userId())) {
        memberArray.push(group);
      }
      else {
        notMemberArray.push(group);
      }
    });
  }    
  return {
    memberArray,
    notMemberArray
  };
})(GroupsList);