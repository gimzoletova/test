import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GroupPage from './GroupPage';

export default class Group extends Component {
    handleGroupButton() {
        Meteor.call('updateUsersOfGroup', this.props.group, Meteor.userId(), this.props.member);
     }
    render () {
        return (
            <div>
                <span style={{color: this.props.member ? "red" : "black"}} onClick={() =>{ReactDOM.render(<GroupPage group={this.props.group}/>, document.getElementById('render-target'))}}>{this.props.group.name}</span>
                <button onClick={this.handleGroupButton.bind(this)}>{this.props.member ? "Leave Group" : "Join Group"}</button>
            </div>
        );
    }
}
