import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GroupPage from './GroupPage';

export default class Group extends Component {
    handleGroupButton() {
        return this.props.handleGroupButton(this.props.group_name, this.props.member);
     }
    render () {
        return (
            <div>
                <span style={{color: this.props.member ? "red" : "black"}} onClick={() =>{ReactDOM.render(<GroupPage groupName={this.props.group_name}/>, document.getElementById('render-target'))}}>{this.props.group_name}</span>
                <button onClick={this.handleGroupButton.bind(this)}>{this.props.member ? "Leave Group" : "Join Group"}</button>
            </div>
        );
    }
}
