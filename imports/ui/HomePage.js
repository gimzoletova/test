import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import UserPage from './UserPage'
import GroupsList from './GroupsList'

export default class HomePage extends Component {
    render() {
      return (
        <div>
          <h2 onClick={() => {ReactDOM.render(<UserPage user={this.props.user} />, document.getElementById('render-target'))}}>welcome, {this.props.user}.</h2>
          <GroupsList user={this.props.user} showAllGroups={true}/>
        </div>
      );
    }
  }